"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCreative,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import VideoPlayer from "@/components/web-components/video-player/video-player";
import CustomButton from "@/components/web-components/button/button";
import Skeleton from "@/components/web-components/skeleton/skeleton";
import { IoVideocamSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { useAppSelector } from "@/lib/hooks";
import { getHostProfile, saveProfile,removeFromSaved } from "@/lib/services/api-service";
import PopupComp from "@/components/web-components/popup/popup";
import { FaHeart } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import SlidingModal from "@/components/web-components/modals/sliding-modal";
import ReportUser from "@/components/account/components/report-user";
const Profile = () => {
  const slidingModalRef = useRef(null);

  const currentUser = useAppSelector((state) => state.user.user);
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const [host, setHost] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const popupRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(null);
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get("userId");
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const startVideoCall = () =>{
    router.push(`/chat/channel/${host.id+currentUser?.email}`);
  }
  const closeModal = () => {
    if (slidingModalRef.current) {
      slidingModalRef.current.closeModal();
    }
  };
  useEffect(() => {
    if (!userId) {
      window.location.href = "/";
    }
    if (apiUser) {
      getHostProfile(apiUser.id,userId)
      .then((res) =>{
        setHost(res.data.data);
        setIsFavorite(res.data.data.save?true:false);
      })
    }
   
    
  }, [apiUser]);
  const handleShowPopup = (icon,children) => {
    if (popupRef.current) {
      popupRef.current.triggerPopup(icon,children); 
    }
  };
  const handlesaveProfile = async (uid,hid) => {
    try {
      const res = await saveProfile(uid,hid);
      if(res.data.status){
        setIsFavorite(true);
        handleShowPopup(<FaHeart/>,'Takip edildi');
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
  const handleRemoveFromSaved = async (uid,hid) => {
    try {
      const res = await removeFromSaved(uid,hid);
      if(res.data.status){
        setIsFavorite(false);
        handleShowPopup(<CiCircleRemove />,'Takipten çıkarıldı');
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="p-4 min-h-screen text-white">
      {host != null ? (
        <div className="max-h-fit">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            {" "}
            {/* Ekran boyutuna göre grid yapısı */}
            <Swiper
              modules={[
                Navigation,
                Pagination,
                Scrollbar,
                A11y,
                EffectCreative,
              ]}
              effect={"creative"}
              spaceBetween={50}
              className="w-full h-full relative"
              slidesPerView={1}
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, 0, -400],
                },
                next: {
                  translate: ["100%", 0, 0],
                },
              }}
            >
              {host?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={fileBaseUrl + image.image}
                    alt={host?.fullName}
                    width={500}
                    height={500}
                    loading="lazy"
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="w-full h-auto aspect-square object-cover rounded-3xl"
                  />
                </SwiperSlide>
              ))}
              <div
                className="flex gap-2 absolute right-4 top-4 z-40 items-center bg-white rounded-full p-2 "
                onClick={() => {
                  isFavorite
                    ? handleRemoveFromSaved(apiUser.id, host.id)
                    : handlesaveProfile(apiUser.id, host.id);
                }}
              >
                <FaHeart
                  className={isFavorite ? "text-red" : "text-black"}
                  size={30}
                  color={isFavorite ? "red" : "black"}
                />
              </div>
              <div className="absolute bottom-4 w-full items-center justify-center flex gap-2 z-10 ">
                <div
                  className="flex gap-2 items-center bg-white rounded-full p-2 hover:bg-primary"
                  onClick={() => {
                    router.push(`/chat/${host.id}`);
                  }}
                >
                  <AiFillMessage size={30} color="black" />
                </div>
                <div
                  className="flex gap-2 items-center  bg-white rounded-full p-2 hover:bg-primary"
                  onClick={startVideoCall}
                >
                  <IoVideocamSharp size={30} color="black" />
                </div>
              </div>
            </Swiper>
            <div className="px-2">
              <h1 className="text-xl flex items-center gap-2 font-bold mt-4 capitalize text-white lg:text-3xl">
                {host?.fullName} <span className="text-2xl"> {host.age}</span>{" "}
                <Image src="/verified.png" width={20} height={20} />
              </h1>
              <div className="flex gap-x-2 text-sm items-center lg:text-lg">
                <Image src="/turkey.png" width={20} height={20} />
                <span className="opacity-75">Türkiye</span>
              </div>
              <div className="text-sm opacity-75 flex gap-x-2 my-2 lg:text-base">
                {host.about}
              </div>

              <h2 className="text-lg lg:text-xl mt-4">Video Galeri</h2>
              <div className="videos my-4">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={30}
                  className="w-full h-full"
                  slidesPerView={2}
                  breakpoints={{
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {host?.video.map((video, index) => (
                    <SwiperSlide className="relative" key={index}>
                      <video
                        alt={host?.fullName}
                        className="w-full object-fill h-full aspect-square rounded-3xl max-h-[95vh]"
                        poster={fileBaseUrl + host.images[0].image}
                        onClick={(e) => {
                          setCurrentVideo(e.currentTarget.firstChild.src);
                          setIsVideoOpen(true);
                        }}
                      >
                        <source
                          src={fileBaseUrl + video.video}
                          type="video/mp4"
                        />
                        Tarayıcınız bu videoyu desteklemiyor.
                      </video>
                      <button className="absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary p-3 rounded-full">
                        <Image src={"play.svg"} width={20} height={20} />
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="py-2 text-lg lg:text-xl">İlgi Alanları</div>
              <div className="flex flex-wrap gap-2">
                {host.intrests.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gray-900 text-white font-bold px-2 py-1 rounded-full text-xs lg:text-base mr-2"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-2 my-8 lg:my-12">
                <CustomButton
                  className="bg-gray-900 text-base text-white "
                  onClick={() => {
                    router.push(`/chat/${host.id}`);
                  }}
                >
                  SOHBETİ BAŞLAT {host?.fullName}
                </CustomButton>
                <CustomButton
                  className="bg-gray-900 text-base text-white "
                  onClick={() => {
                    const shareData = {
                      title: "Vugo",
                      text: `${host?.fullName} profilini inceleyin`,
                      url: window.location.href,
                    }
                    navigator.share(shareData);
                  }}
                >
                  PAYLAŞ {host?.fullName} PROFİLİ
                </CustomButton>
                <SlidingModal
                  ref={slidingModalRef}
                  OpenButton={
                    <CustomButton className="bg-gray-900 text-base text-white w-full">
                      ŞİKAYET ET {host?.fullName}
                    </CustomButton>
                  }
                >
                  <ReportUser closeModal={closeModal} host={host} />{" "}
                </SlidingModal>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton isImage={true} lines={3} />
      )}

      <VideoPlayer
        callback={setIsVideoOpen}
        open={isVideoOpen}
        user={host}
        src={currentVideo}
      />
      <PopupComp ref={popupRef} icon={<FaHeart />}></PopupComp>
    </div>
  );
};

export default Profile;

