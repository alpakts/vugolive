"use client";
import Skeleton from "@/components/web-components/skeleton/skeleton";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
const Profile = () => {
  const [user, setUser] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(null);
  const params = useSearchParams();
  const userId = params.get("userId");

  useEffect(() => {
    if (!userId) {
      window.location.href = "/";
    }
    fetch(`https://640f6027cde47f68db4929d6.mockapi.io/api/users/50`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);
  console.log(user, userId);

  return (
    <div className="p-4 min-h-screen text-white">
      {user != null ? (
        <div className="max-h-fit">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCreative]}
            effect={"creative"}
            spaceBetween={50}
            className="w-full h-full"
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
            {[user?.avatar, user?.avatar2, user?.avatar3].map(
              (image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={user?.name?.first}
                    width={0}
                    loading="lazy"
                    sizes="100vw"
                    height={0}
                    className="w-full object-fill h-full aspect-square rounded-3xl"
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
          <div className="px-2 ">
            <h1 className="text-xl  flex items-center gap-2  font-bold mt-4 capitalize text-white">
              {user?.name} <span className="text-2xl"> {user.age}</span>{" "}
              <Image src="/verified.png" width={20} height={20} />
            </h1>
            <div className=" flex gap-x-2 text-sm items-center ">
            <Image src="/turkey.png" width={20} height={20} />
            <span className="opacity-75">Türkiye</span>
          </div>
          <div className=" text-sm opacity-75 flex gap-x-2 my-2 ">
            Universite Öğrencisi
          </div>
          <div>
            <h2>Video Galeri</h2>
            <div className="videos my-4  ">
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                className="w-full h-full"
                slidesPerView={3}
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
                {[
                  "/video-girl.mp4",
                  "/video-girl.mp4",
                  "/example-video.mp4",
                ].map((image, index) => (
                  <SwiperSlide className="relative" key={index}>
                    <video
                      alt={user?.name}
                      className="w-full object-fill h-full aspect-square rounded-3xl"
                      poster={user.avatar}
                      onClick={(e) => {
                        setCurrentVideo(e.currentTarget.firstChild.src);
                        setIsVideoOpen(true);
                      }}
                    >
                      <source src={image} type="video/mp4" /> Tarayıcınız bu
                      videoyu desteklemiyor.
                    </video>
                    <button
                      className="absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary   p-3 rounded-full"
                    >
                        <Image src={"play.svg"} width={20} height={20} />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="py-2"> İlgi Alanları</div>
            <div className="flex flex-wrap gap-2"> 
            {['Kodlama', 'Yazılım', 'Web Tasarım', 'Web Geliştirme', 'Kitap okumak'].map((item, index) => (
              <span key={index} className="bg-gray-900 text-white font-bold px-2 py-1 rounded-full text-xs mr-2">
                {item}
              </span>
            ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 my-8">
          <CustomButton className="bg-gray-900  text-base text-white"  >SOHBETİ BAŞLAT {user?.name}</CustomButton>
          <CustomButton  className="bg-gray-900  text-base text-white">PAYLAŞ {user.name} PROFİLİ </CustomButton>
          <CustomButton  className="bg-gray-900  text-base text-white">ŞİKAYET ET  {user.name} </CustomButton>
          </div>
          </div>
         
        </div>
      ) : (
        <Skeleton isImage={true} lines={3} />
      )}
      <VideoPlayer
        callback={setIsVideoOpen}
        open={isVideoOpen}
        user={user}
        src={currentVideo}
      ></VideoPlayer>
    </div>
  );
};

export default Profile;
