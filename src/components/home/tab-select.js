"use client";
import { getCountryList } from "@/lib/services/api-service";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi"; // React Icons'dan iconlar
import { TbCategoryFilled } from "react-icons/tb";
export default function TabComponent({ activeTab, setActiveTab, setCategory }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown'un açık olup olmadığını kontrol ediyoruz
  useEffect(() => {
    getCountryList()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Dropdown durumunu değiştir
  };
  useMemo(() => {
    activeCategory ? setCategory(activeCategory.id) : setCategory(null);
  }, [activeCategory]);
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
            setActiveTab("Profiller");
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
            setActiveTab("Canlı");
          }}
        >
          Canlı Yayınlar
        </button>
      </div>

      {/* Global Dropdown */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 bg-black text-white py-2 px-4 rounded-full flex"
          onClick={toggleDropdown} // Dropdown'u aç/kapat
        >
          {activeCategory ? (
            ""
          ) : (
            <TbCategoryFilled className="text-white" size={18} />
          )}
          <span>
            {activeCategory ? (
              activeCategory.country_name === "🇹🇷" ? (
                <Image src="/turkey.png" width={20} height={20} />
              ) : (
                activeCategory.country_name
              )
            ) : (
              "Kategoriler"
            )}
          </span>
          <FiChevronDown className="text-white" size={16} />
        </button>

        {/* Dropdown Menüsü: Eğer `dropdownOpen` true ise gösterilir */}
        {dropdownOpen && (
          <div className="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
            <div
              className="px-4 py-2 flex gap-x-3 items-center text-black hover:bg-gray-100"
              onClick={() => {
                setActiveCategory(null);
                toggleDropdown();
              }}
            >
              <span>Tümü</span>
            </div>
            {categories.map((category) => (
              <div
                className="px-4 py-2 flex gap-x-3 items-center text-black hover:bg-gray-100"
                onClick={() => {
                  setActiveCategory(category);
                  toggleDropdown();
                }}
              >
                <span>
                  {category.country_name == "🇹🇷" ? (
                    <Image src="/turkey.png" width={20} height={20} />
                  ) : (
                    category.country_name
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
