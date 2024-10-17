// components/Provider.js
'use client';

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebaseConfig";
import { setUser } from "@/lib/slices/userSlice";
import { setApiUser } from "@/lib/slices/api-user-slice";

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const apiUserStatic = localStorage.getItem("user");
  useEffect(() => {
    let apiUser = localStorage.getItem("user");
    if (apiUser == -1 || apiUser == null) {

        if (apiUser) {
          apiUser = JSON.parse(apiUser);
        }
        dispatch(setApiUser(apiUser));
      
    }
    const handleAuthChange = async (currentUser) => {
      try {
        const token = localStorage.getItem("token");
        let apiUser = localStorage.getItem("user");

        if (apiUser) {
          apiUser = JSON.parse(apiUser);
        }

        if (currentUser && token) {
          // Kullanıcı Firebase'de mevcut ve token varsa, Redux'a kullanıcıyı kaydet
          dispatch(setUser(currentUser));
          dispatch(setApiUser(apiUser));
        } else {
          // Kullanıcı mevcut değilse, localStorage'ı temizle ve Redux'a -1 gönder
          clearLocalStorage();
          dispatch(setUser(-1));
          dispatch(setApiUser(-1));
        }
      } catch (error) {
        console.error("AuthProvider Error:", error);
        // Opsiyonel olarak, hata mesajları ya da bir hata yönetimi işlemi eklenebilir
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

    return () => unsubscribe();
  }, [dispatch,apiUserStatic]);

  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return <>{children}</>;
}
