'use client';

import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function BroadcasterDashboard() {
  const [isAvailableForCalls, setIsAvailableForCalls] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-300">
        <button className="text-black mr-4">
          <FiChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">YAYINCI GÖSTERGE PANELİ</h1>
      </div>

      {/* Availability Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300">
        <div>
          <p className="text-lg font-semibold">Aramalar İçin Uygun</p>
          <p className="text-sm text-gray-500">
            Bu açık olursa kullanıcılardan çağrı alırsınız.
          </p>
        </div>
       
      </div>

      {/* Start Live Broadcast */}
      <div className="flex items-center justify-center py-6">
        <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold">
          CANLI YAYINA BAŞLA
        </button>
      </div>

      {/* Diamond Section */}
      <div className="px-4 py-4 border-t border-b border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">ELMAS YÜKLEME</h2>
          <Image
            src="/vugo-logo.png"
            alt="Vugo Logo"
            width={40}
            height={40}
          />
        </div>
        <div className="text-4xl font-bold mb-2">1000009</div>
        <p className="text-sm text-gray-500">Minimum Çekim Miktarı: 10000</p>
        <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold mt-4 w-full">
          ÇEKİMTALEBİ VER
        </button>
      </div>

      {/* Earned Diamonds Section */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-bold mb-2">Kazanılan Toplam Elmas</h2>
        <div className="text-2xl font-bold mb-4">0</div>
        <button className="bg-gray-300 text-black py-3 px-6 rounded-lg font-semibold w-full">
          Çekim Talepleriniz
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around py-3">
        <button className="flex flex-col items-center text-black">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM3 10a7 7 0 1114 0A7 7 0 013 10z" />
          </svg>
          Gösterge Paneli
        </button>
        <button className="flex flex-col items-center text-black">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 0H4v10h12V5z" />
          </svg>
          Mesaj
        </button>
        <button className="flex flex-col items-center text-black">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a5 5 0 00-5 5v2a5 5 0 0010 0V7a5 5 0 00-5-5z" />
            <path d="M4 15a3 3 0 016 0v1H4v-1z" />
          </svg>
          Profil
        </button>
      </div>
    </div>
  );
}
