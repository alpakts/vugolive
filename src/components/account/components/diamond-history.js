"use client";
import Loading from "@/app/(app)/loading";
import withAuth from "@/hocs/with-auth";
import { useAppSelector } from "@/lib/hooks";
import { getDiamondHistory } from "@/lib/services/api-service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

const spendingTypes = {
    0: "Ücretli Sohbet",
    1: "Hediye",
    2: "Yükleme",
}

function DiamondHistory() {
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    if (apiUser == null) {
      return;
    }
    getDiamondHistory(apiUser.id).then((response) => {
      setHistory(response.data.data);
    });
  }, [apiUser]);
  if (apiUser == null) {
    return <Loading></Loading>;
  }
  console.log(history);
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header section with a back button and title */}
      <div className="flex items-center px-4 py-4 border-b border-gray-700">
        <Link
          href='/account/charge'
          className="text-white mr-4"
        >
          <FiChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold">ELMAS GEÇMİŞİ</h1>
      </div>
      <div className="p-4">
        {history &&
          history.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-red-300 p-4 rounded-lg shadow-md mb-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base gap-2  font-bold flex">
                      <div className=" bg-red-400 text-sm text-red-600 rounded-full px-2">
                  {spendingTypes[item.diamond_spending_type]}
                </div>
                    </h2>
                    <p className="text-sm font-extrabold mt-1">
                      Elmas : {item.diamond_amount}
                    </p>
                    <p className="text-xs  mt-1">
                      Tarih : {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default withAuth(DiamondHistory)