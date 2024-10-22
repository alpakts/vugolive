"use client";
import TabComponent from "./tab-select";
import List from "./list/list";
import { useEffect, useState } from "react";
import SkeletonImage from "../web-components/skeleton/skeloton-image";
import { getExploreProfiles } from "@/lib/services/api-service";



export default function HomeIndex() {
  const [users, setUsers] = useState(null);
  const [category, setCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("Profiller");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const apiUser = localStorage.getItem("userId");
    getExploreProfiles(category??0,apiUser??250).then((response) => {
      setUsers(response.data.data);
      setLoading(false);
    }
    ).catch((err)=>console.log(err));

  },[activeTab,category]);

  return  ( 
    <div className="p-4">
      <TabComponent activeTab={activeTab} category={category} setCategory={setCategory} setActiveTab={setActiveTab} />
  
      <h1 className="text-base font-bold mb-4 border-b border-primary pb-3">
        Sizin İçin Önerilenler
      </h1>
      {!loading ?(
        <div className="grid grid-cols-2 gap-4 relative">
          {users.map((item, index) => (
            <List key={index} activeTab={activeTab} item={item} />
          ))}
        </div>
      ) : (
        <SkeletonImage count={10} haveLine={false} ></SkeletonImage>
      )}
      
    </div>
  ) 
  
}
