"use client";
import { useState } from "react";
import { FiGlobe, FiChevronDown, FiFilter } from "react-icons/fi"; // React Icons'dan iconlar
import { TbCategoryFilled } from "react-icons/tb";
export default function TabComponent({activeTab,setActiveTab}) {
 
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown'un açık olup olmadığını kontrol ediyoruz

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Dropdown durumunu değiştir
  };

  return (
    <div className="flex items-center py-4 space-x-4 text-sm justify-between ">
      {/* Sekmeler */}
      <div className="flex items-center border border-black rounded-full">
        <button
          className={`py-2 px-2 font-bold flex min-w-max items-center rounded-r-none  text-center justify-center ${
            activeTab === "Profiller"
              ? "bg-primary text-black"
              : "text-secondary bg-gray-900"
          }  rounded-full`}
          onClick={() => {
            setActiveTab("Profiller")
          }}
        >
          Profiller
        </button>
        <button
          className={`py-2 px-2 font-bold min-w-max flex items-center rounded-l-none  justify-center ${
            activeTab === "Canlı"
               ? "bg-primary text-black"
              : "text-secondary bg-gray-900"
          }  rounded-full`}
          onClick={() => {
            setActiveTab("Canlı")
          }}
        >
          Canlı Yayınlar
        </button>
      </div>

      {/* Global Dropdown */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 bg-black text-white py-2 px-4 rounded-full"
          onClick={toggleDropdown} // Dropdown'u aç/kapat
        >
          <TbCategoryFilled className="text-white" size={18} />
          <span>Kategoriler</span>
          <FiChevronDown className="text-white" size={16} />
        </button>

        {/* Dropdown Menüsü: Eğer `dropdownOpen` true ise gösterilir */}
        {dropdownOpen && (
          <div className="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="px-4 py-2 flex gap-x-3 items-center text-black hover:bg-gray-100">
              Global
              <FiGlobe className="text-black" size={18} />
            </div>
            <div className="px-4 py-2 flex gap-x-3 items-center text-black hover:bg-gray-100">
              Yerel <FiFilter className="text-black" size={18} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
