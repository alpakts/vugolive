'use client';
import LeaderboardItem from "@/components/ranking/leader";
import RankingCard from "@/components/ranking/ranking-card";
import SecondRank from "@/components/ranking/seconds";
import React, { useEffect, useState } from "react";
import TabComponentRank from "./tab-select-rank";

const rankingData = [
  { name: "Cem Filiz", rank: 1, points: 7730, avatarUrl: "/girl.png" },
  { name: "Leoooo", rank: 2, points: 3304, avatarUrl: "/girl.png" },
  { name: "Yaren", rank: 3, points: 724, avatarUrl: "/girl.png" },
  { name: "alper", rank: 4, points: 75, avatarUrl: "/girl.png" },
  { name: "Mehmet", rank: 5, points: 65, avatarUrl: "/girl.png" },
  { name: "Ayşe", rank: 6, points: 50, avatarUrl: "/girl.png" },
];

const Ranking = () => {
  const [listData,setListData] = useState([]);
  const [activeTab, setActiveTab] = useState("Profiller");

  return (
    <div className="relative w-full bg-fixed bg-cover bg-no-repeat bg-center p-4">
      {/* Overlay to darken the background for better visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
      {/* Content */}
      <div className="relative z-10 w-full min-h-screen overflow-auto">
        <div className="w-full text-center text-secondary text-2xl py-2 bg-black">
          En İyi Sıralama
        </div>
      <TabComponentRank activeTab={activeTab} setActiveTab={setActiveTab}></TabComponentRank>
        <div className="p-4 py-7">
          <LeaderboardItem />
        </div>

        {/* Second and Third Ranks - in grid */}
        <div className="grid grid-cols-2 gap-4 px-4">
          <SecondRank />
          <SecondRank />
        </div>

        {/* Rest of the ranking list */}
        <div className="flex flex-col px-4 space-y-4 mt-4">
          {rankingData.slice(3).map((user, index) => (
            <RankingCard
              key={index}
              name={user.name}
              rank={user.rank}
              points={user.points}
              avatarUrl={user.avatarUrl}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
