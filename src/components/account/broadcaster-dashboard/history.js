"use client";
import Loading from "@/app/(app)/loading";
import { useAppSelector } from "@/lib/hooks";
import { getPaymentHistory } from "@/lib/services/api-service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function History() {
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    if (apiUser == null) {
      return;
    }
    getPaymentHistory(apiUser?.id, 0, 20).then((response) => {
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
          href='/account/host-panel'
          className="text-white mr-4"
        >
          <FiChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold">ÇEKİM TALEPLERİM</h1>
      </div>
      <div className="p-4">
        {history &&
          history.map((item, index) => {
            const status =
              item.request_status == 0 ? (
                <div className=" bg-gray-900 text-sm text-gray-600 rounded-full px-2">
                  Beklemede
                </div>
              ) : item.request_status == 1 ? (
                <div className=" rounded-full text-sm bg-green-200 text-[#25D366] px-2">
                  Onaylandı
                </div>
              ) : (
                <div className="rounded-full text-sm bg-red-300 text-red-700 px-2">
                  Reddedildi
                </div>
              );
            return (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md mb-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base gap-2  font-bold flex">
                      {item.redeem_token} {status}
                    </h2>
                    <p className="text-sm font-extrabold mt-1">
                      Elmas : {item.diamond}
                    </p>
                    <p className="text-xs  mt-1">
                      Ödenen Miktar : ₺{item.amount_paid}
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
