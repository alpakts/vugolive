// components/Provider.js
'use client';

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebaseConfig";
import { setUser } from "@/lib/slices/userSlice";
import { setApiUser } from "@/lib/slices/api-user-slice";
import { getUserProfile } from "@/lib/services/api-service";
import { IncomingCallModal } from "@/components/web-components/incoming-call-modal";
import { useRouter } from "next/navigation";
import { useIncomingCall } from "@/lib/hooks/use-incoming-call";

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [callData, setCallData] = useState(null);

  useIncomingCall(setCallData);

  const handleAccept = () => {
    router.push(callData?.callId);
    setCallData(null);
  };

  const handleReject = () => {
    console.log('Çağrı reddedildi.');
    setCallData(null);
  };
  useEffect(() => {
    const handleAuthChange = async (currentUser) => {
      try {
        const token = localStorage.getItem("token");
        const userIdentity = localStorage.getItem("userId");
        if (currentUser && token) {
          const user = await getUserProfile(userIdentity);
          dispatch(setUser(currentUser));
          dispatch(setApiUser(user.data.data));
        } else {
          clearLocalStorage();
          dispatch(setUser(-1));
          dispatch(setApiUser(-1));
        }
      } catch (error) {
        console.error("AuthProvider Error:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

    return () => unsubscribe();
  }, [dispatch]);

  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return <>  <IncomingCallModal
  callData={callData}
  onAccept={handleAccept}
  onReject={handleReject}
/>{children} </>;
}
