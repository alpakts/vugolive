"use client";
import { onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { messaging } from "../../../firebaseConfig";

export function useIncomingCall(setCallData) {
  useEffect(() => {
    if (!messaging) return;
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Çağrı bildirimi alındı:", payload);
      if (payload.data && payload.data.type === "videoCall") {
        setCallData({
          callerName: payload.data.callerName,
          callerAvatar: payload.data.callerAvatar,
          callId: payload.data.url,
        });
      }
    });

    return () => unsubscribe();
  }, [setCallData,messaging]);
}
