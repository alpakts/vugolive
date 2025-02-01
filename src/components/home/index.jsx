"use client";
import TabComponent from "./tab-select";
import List from "./list/list";
import { useEffect, useRef, useState } from "react";
import SkeletonImage from "../web-components/skeleton/skeloton-image";
import { getExploreProfiles } from "@/lib/services/api-service";
import LiveHostList from "./list/live-hosts";
import Badges from "./badge";
import { useSearchParams } from "next/navigation";
import PopupModalComp from "../web-components/popup-modal/popup-modal";
import SlidingModal from "../web-components/modals/sliding-modal";
import UpdateProfile from "../account/components/update-profile";
import CustomButton from "../web-components/button/button";
import { useAppSelector } from "@/lib/hooks";
import PostComponent from "./post";



export default function HomeIndex(params) {
  const [users, setUsers] = useState(null);
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(null);
  const [activeTab, setActiveTab] = useState(searchParams.get('at') == 2 ? "Canlı": "Profiller");
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const popupModal = useRef(null);
  useEffect(() => {
    if (apiUser && apiUser != -1){
      if (apiUser && apiUser.gender == null) {
        popupModal.current.openModal();
      }else{
        popupModal.current.closeModal();
      }
    }
    
  }
  , [apiUser])
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
  useEffect(() => {
    setActiveTab(searchParams.get('at') == 2 ? "Profiller":"Canlı");
  }
  , [searchParams]);
  return  ( 
    <div className="p-4">
      <TabComponent activeTab={activeTab} category={category} setCategory={setCategory} setActiveTab={setActiveTab} />
      {
        activeTab == 'Profiller' && (
          <h1 className="text-base font-bold mb-4 border-b border-primary pb-3">
            Sizin İçin Önerilenler
          </h1>
        )   
      }
      {
        activeTab == 'Canlı' && (
          <h1 className="text-base font-bold mb-4 border-b border-primary pb-3">
          Anlar
          </h1>
        )
      }
      {
        activeTab == 'Anlar' && (
          <h1 className="text-base font-bold mb-4 border-b border-primary pb-3">
            Anlar
          </h1>
        )
      }
      <Badges></Badges>
      {!loading ?(
        <>
        <div className="grid grid-cols-2 gap-4 relative">
          {activeTab == 'Profiller' && users.map((item, index) => (
            <List key={index}  item={item} />
          ))}

        </div>
        {activeTab == 'Canlı' && 
            <PostComponent />
          }
        </>
      ) : (
        <SkeletonImage count={10} haveLine={false} ></SkeletonImage>
      )}
      <PopupModalComp ref={popupModal} >
        <div className="flex flex-col items-center gap-4 justify-center p-4">
          <h1 className="text-lg font-bold">Keşfette diğer kullanıcılara görünmek için lütfen cinsiyetinizi seçiniz!</h1>
          <SlidingModal  OpenButton={<CustomButton className="bg-black text-white ">CİNSİYET SEÇ</CustomButton>} ><UpdateProfile></UpdateProfile></SlidingModal>
        </div>
      </PopupModalComp>
    </div>
  ) 
  
}
