import Image from 'next/image';
import React from 'react';
import { FaUser } from 'react-icons/fa';

export function IncomingCallModal({ callData, onAccept, onReject }) {
  if (!callData) return null;
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  return (
    <div className="fixed top-0 z-[9999] w-screen h-screen bg-black bg-opacity-70 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-screen h-screen justify-center  bg-black p-6 rounded-lg shadow-lg">
        {
          callData.callerAvatar ? (
            <Image
              src={fileBaseUrl+callData.callerAvatar}
              alt={callData.callerName}
              width={100}
              height={100}
              className="rounded-full"
            />
          )
            : <FaUser className="w-24 h-24 text-gray-500" />
        }
        <h2 className="text-xl text-secondary mt-8 font-bold mb-2">{callData.callerName} seni arıyor...</h2>
        <div className="flex gap-4">
          <button
            onClick={onAccept}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            Kabul Et
          </button>
          <button
            onClick={onReject}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  );
}
