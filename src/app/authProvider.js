// components/Provider.js (veya Provider bileşenini nereye koyduysanız)
'use client';

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebaseConfig";
import { clearUser, setUser } from "@/lib/slices/userSlice";


export function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser));
      } else {
        dispatch(setUser(-1));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
