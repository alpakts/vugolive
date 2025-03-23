"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiX } from "react-icons/fi";

const DownloadAppPrompt = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("downloadAppDismissed")) {
      setShowPopup(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("downloadAppDismissed", "true");
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && false && (
        <div className="fixed bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="bg-black p-6 rounded-lg shadow-lg text-center w-full relative  ">
            <p className="mb-4 text-secondary">
              Daha iyi bir deneyim için uygulamamızı indirebilirsiniz!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href={process.env.NEXT_PUBLIC_APP_PUBLIC_URL}
                onClick={handleDismiss}
                className="px-4 py-2 bg-primary text-black rounded hover:bg-primary transition w-full"
                target="_blank"
              >
                Uygulamayı İndir
              </Link>
              
                <FiX size={40} className=" absolute p-2 right-2 top-2 " onClick={handleDismiss} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadAppPrompt;
