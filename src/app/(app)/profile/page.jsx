'use client';
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VideoPlayer from "@/components/web-components/video-player/video-player";
import CustomButton from "@/components/web-components/button/button";
import Skeleton from "@/components/web-components/skeleton/skeleton";
import { IoVideocamSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { useAppSelector } from "@/lib/hooks";
import { getHostProfile, saveProfile, removeFromSaved } from "@/lib/services/api-service";
import PopupComp from "@/components/web-components/popup/popup";
import { FaHeart, FaUser } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import SlidingModal from "@/components/web-components/modals/sliding-modal";
import ReportUser from "@/components/account/components/report-user";
import { sendMessageBetweenUsers } from "@/lib/services/firebase-service";

const Profile = () => {
  const slidingModalRef = useRef(null);
  const popupRef = useRef(null);
  const router = useRouter();
  const params = useSearchParams();
  
  const currentUser = useAppSelector((state) => state.user.user);
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const [host, setHost] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(null);

  const userId = params.get("userId");
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;

  const startVideoCall = () => {
    router.push(`/chat/channel/${host.id}and${apiUser.id}?calledUser=${host.id}`);
  };

  const closeModal = () => {
    if (slidingModalRef.current) {
      slidingModalRef.current.closeModal();
    }
  };

  useEffect(() => {
    if (!userId) {
      router.push("/");
      return;
    }
    getHostProfile(apiUser?.id ?? 250, userId).then((res) => {
      setHost(res.data.data);
      if (apiUser?.save_profile?.includes(res.data.data.id)) {
        setIsFavorite(true);
      }
    });
  }, [apiUser]);

  const handleShowPopup = (icon, message) => {
    popupRef.current?.triggerPopup(icon, message);
  };

  const handleSaveProfile = async () => {
    try {
      const res = await saveProfile(apiUser.id, host.id);
      if (res.data.status) {
        setIsFavorite(true);
        handleShowPopup(<FaHeart />, "Takip edildi");
      }
      await sendMessageBetweenUsers(
        apiUser.identity,
        host.identity,
        "Seni takip Ettim. Birbirimizi takip ettikten sonra arkadaş olabiliriz.",
        apiUser,
        host,
        "text",
        null,
        null,
        true
      );
      router.push(`/chat/${host.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromSaved = async () => {
    try {
      const res = await removeFromSaved(apiUser.id, host.id);
      if (res.data.status) {
        setIsFavorite(false);
        handleShowPopup(<CiCircleRemove />, "Takipten çıkarıldı");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 min-h-screen text-white">
      {host ? (
        <div className="max-h-fit">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profil Görselleri */}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, EffectCreative]}
              effect={"creative"}
              spaceBetween={50}
              className="w-full h-full relative"
              slidesPerView={1}
              creativeEffect={{
                prev: { shadow: true, translate: [0, 0, -400] },
                next: { translate: ["100%", 0, 0] },
              }}
            >
              {host.is_host === 2
                ? host.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={fileBaseUrl + image.image}
                        alt={host.fullName}
                        width={500}
                        height={500}
                        loading="lazy"
                        className="w-full h-auto aspect-square object-cover rounded-3xl"
                      />
                    </SwiperSlide>
                  ))
                : [host.profileimages].map((image, index) => (
                    <SwiperSlide key={index}>
                      {image ? (
                        <Image
                          src={fileBaseUrl + image}
                          alt={host.fullName}
                          width={500}
                          height={500}
                          loading="lazy"
                          className="w-full h-auto aspect-square object-cover rounded-3xl"
                        />
                      ) : (
                        <FaUser className="w-full h-auto aspect-square object-cover rounded-3xl" color="white" />
                      )}
                    </SwiperSlide>
                  ))}
              {/* Favori İkonu */}
              <div
                className="flex gap-2 absolute right-4 top-4 z-40 items-center bg-white rounded-full p-2"
                onClick={isFavorite ? handleRemoveFromSaved : handleSaveProfile}
              >
                <FaHeart size={30} color={isFavorite ? "red" : "black"} />
              </div>
              {/* Mesaj ve Video İkonları */}
              <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
                <div className="flex items-center bg-white rounded-full p-2 hover:bg-primary" onClick={() => router.push(`/chat/${host.id}`)}>
                  <AiFillMessage size={30} color="black" />
                </div>
                {host.is_video_call === 1 && host.is_host == 2 && (
                  <div className="flex items-center bg-white rounded-full p-2 hover:bg-primary" onClick={startVideoCall}>
                    <IoVideocamSharp size={30} color="black" />
                  </div>
                )}
              </div>
            </Swiper>
            {/* Profil Bilgileri ve Aksiyon Butonları */}
            <div className="px-2">
              <h1 className="text-base flex items-center gap-2 font-bold mt-4 capitalize text-white lg:text-3xl">
                {host.fullName} <span className="text-sm"> {host.age}</span>
                {host.is_host === 2 && <Image src="/verified.png" width={20} height={20} />}
              </h1>
              <div className="flex gap-x-2 text-sm items-center lg:text-lg">
                <span className="opacity-75">{host.country_data ? host.country_data.country_name === '🇹🇷' ? <Image src="/turkey.png" width={20} height={20} /> : host.country_data.country_name : ''}</span>
              </div>
              <div className="text-sm opacity-75 flex gap-x-2 my-2 lg:text-base">{host.about}</div>

              {host.video?.length > 0 && (
                <>
                  <h2 className="text-sm lg:text-xl mt-4">Video Galeri</h2>
                  <div className="videos my-4">
                    <Swiper modules={[Navigation]} spaceBetween={30} className="w-full h-full" slidesPerView={2} breakpoints={{ 1024: { slidesPerView: 4 } }}>
                      {host.video.map((video, index) => (
                        <SwiperSlide className="relative" key={index}>
                          <video
                            alt={host.fullName}
                            className="w-full object-fill h-full aspect-square rounded-3xl max-h-[95vh]"
                            poster={fileBaseUrl + host.images[0].image}
                            onClick={(e) => {
                              setCurrentVideo(e.currentTarget.firstChild.src);
                              setIsVideoOpen(true);
                            }}
                          >
                            <source src={fileBaseUrl + video.video} type="video/mp4" />
                            Tarayıcınız bu videoyu desteklemiyor.
                          </video>
                          <button className="absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary p-3 rounded-full">
                            <Image src="play.svg" width={20} height={20} />
                          </button>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </>
              )}

              {host.intrests?.length > 0 && (
                <>
                  <div className="py-2 text-sm lg:text-xl">İlgi Alanları</div>
                  <div className="flex flex-wrap gap-2">
                    {host.intrests.map((item, index) => (
                      <span key={index} className="bg-gray-900 text-white font-bold px-2 py-1 rounded-full text-xs lg:text-base mr-2">
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <div className="flex flex-col gap-2 my-8 lg:my-12">
                <CustomButton className="bg-gray-900 text-xs text-white" onClick={() => router.push(`/chat/${host.id}`)}>
                  SOHBETİ BAŞLAT {host.fullName}
                </CustomButton>
                <CustomButton className="bg-gray-900 text-xs text-white" onClick={() => navigator.share({ title: "Vugo", text: `${host.fullName} profilini inceleyin`, url: window.location.href })}>
                  PAYLAŞ {host.fullName} PROFİLİ
                </CustomButton>
                <SlidingModal ref={slidingModalRef} OpenButton={<CustomButton className="bg-gray-900 text-xs text-white w-full">ŞİKAYET ET {host.fullName}</CustomButton>}>
                  <ReportUser closeModal={closeModal} host={host} />
                </SlidingModal>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton isImage={true} lines={3} />
      )}
      <VideoPlayer callback={setIsVideoOpen} open={isVideoOpen} user={host} src={currentVideo} />
      <PopupComp ref={popupRef} icon={<FaHeart />} />
    </div>
  );
};

export default Profile;
