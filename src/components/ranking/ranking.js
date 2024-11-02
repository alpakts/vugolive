'use client';
import LeaderboardItem from "@/components/ranking/leader";
import RankingCard from "@/components/ranking/ranking-card";
import SecondRank from "@/components/ranking/seconds";
import React, { useEffect, useState } from "react";
import TabComponentRank from "./tab-select-rank";
import { getPurchaseTransactions } from "@/lib/services/api-service";
import { useAppSelector } from "@/lib/hooks";
import Loading from "@/app/(app)/loading";
import { useSearchParams } from "next/navigation";

const Ranking = () => {
  const searchParams = useSearchParams();
  const [listData, setListData] = useState([]);
  const [activeTab, setActiveTab] = useState(searchParams.get('at')  == 0 ? 0 : 2);
  const [activeOrder, setActiveOrder] = useState(0);
  const [activeOpType, setActiveOpType] = useState(0);
  const [loading, setLoading] = useState(true);
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);

  useEffect(() => {
    if (!apiUser) return;
    setLoading(true);
    // userType: 2 yayıncı, 0/1 kullanıcı
    // operationType: 0 elmas kazanan, 1 elmas harcayan
    // duration: 0 daily, 1 weekly, 2 monthly
    getPurchaseTransactions(apiUser.id ?? 250, activeTab, activeOpType, activeOrder).then((response) => {
      setListData(response.data.data);
      setLoading(false);
    });
  }, [apiUser, activeOrder, activeTab]);
  useEffect(() => {
    setActiveTab(searchParams.get('at')  == 0 ? 0 : 2);
  }, [searchParams]);
  return (
    <div className="relative w-full bg-fixed bg-cover bg-no-repeat bg-center px-4">
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
      <div className="relative z-10 w-full min-h-screen overflow-auto">
        <div className="w-full text-center text-secondary text-2xl py-2 bg-black">
          En İyi Sıralama
        </div>

        {/* Tab Selection */}
        <TabComponentRank
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeOrder={activeOrder}
          setActiveOrder={setActiveOrder}
          activeOpType={activeOpType}
          setActiveOpType={setActiveOpType}
        />

        {/* Leaderboard Items */}
      {!loading ? (
       <>
       <div className="p-4 py-7">
          {listData[0] && (
            <LeaderboardItem
              item={listData[0]}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 px-4">
          {listData[1] && (
            <SecondRank
              item={listData[1]}
            />
          )}
          {listData[2] && (
            <SecondRank
              item={listData[2]}
            />
          )}
        </div>

        {/* Remaining Ranks */}
        <div className="flex flex-col px-4 space-y-4 mt-4">
          {listData.slice(3).map((item, index) => (
            <RankingCard
              key={index}
              rank={index + 4} // Since slice starts from the 4th rank
              item={item}
            />
          ))}
        </div>
       </>
        ) : (
          <Loading className='min-h-fit' />
        )}
      </div>
    </div>
  );
};

export default Ranking;
