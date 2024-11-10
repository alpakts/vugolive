"use client";
import { useEffect, useState } from "react";
import { requestForToken } from "../../../../firebaseConfig";
import { updateUserProfile } from "@/lib/services/api-service";
import { useAppSelector } from "@/lib/hooks";

const NotificationPermission = () => {
  const [showPopup, setShowPopup] = useState(false);
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  useEffect(() => {
   if (apiUser != -1 && apiUser) {
    if (
      Notification.permission === "default" &&
      !localStorage.getItem("notificationsDenied")
    ) {
      setShowPopup(true);
    }else{
      requestForToken().then((token) => {
        updateUserProfile({ deviceToken: token, user_id: apiUser.id ,fullName:apiUser.fullName});
      });
    }

    if (
      Notification.permission === "granted" &&
      localStorage.getItem("notificationsDenied")
    ) {
      localStorage.removeItem("notificationsDenied");
      requestForToken().then((token) => {
        updateUserProfile({ deviceToken: token, user_id: apiUser.id,fullName:apiUser.fullName });
      });
        
    }
   }
  }, [apiUser]);

  // Kullanıcıdan bildirim iznini isteyen fonksiyon
  const requestNotificationPermission = () => {
    Notification.requestPermission().then(async (permission) => {
      if (permission === "granted") {
        const token = await requestForToken();
        updateUserProfile({ deviceToken: token, user_id: apiUser.id,fullName:apiUser.fullName });
      } else if (permission === "denied") {
        localStorage.setItem("notificationsDenied", "true");
      }
      setShowPopup(false);
    });
  };

  return (
    <>
      {showPopup && (
        <div className="fixed bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black p-6 rounded-lg shadow-lg text-center  w-full">
            <p className="mb-4 text-secondary">
              Mesaj ve aramalardan haberdar olmak için bildirimleri
              onaylamalısınız
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={requestNotificationPermission}
                className="px-4 py-2 bg-primary text-black rounded hover:bg-primary transition"
              >
                İzin Ver
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  localStorage.setItem("notificationsDenied", "true");
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationPermission;
