// components/Provider.js (veya Provider bileşenini nereye koyduysanız)
'use client';

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebaseConfig";
import { setUser } from "@/lib/slices/userSlice";
import { setApiUser } from "@/lib/slices/api-user-slice";


export function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const token = localStorage.getItem("token");
      let apiUser = localStorage.getItem("user");
      if (apiUser) {
        apiUser = JSON.parse(apiUser);
      }
      if (currentUser && token) {
        dispatch(setUser(currentUser));
        dispatch(setApiUser(apiUser));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setUser(-1));
        dispatch(setApiUser(-1));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
