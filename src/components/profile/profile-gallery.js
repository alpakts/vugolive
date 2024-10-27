import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaHeart, FaUser } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoVideocamSharp } from "react-icons/io5";
import Image from "next/image";

const ProfileGallery = ({ host, fileBaseUrl, isFavorite, onToggleFavorite, onMessageClick, onVideoCallClick }) => (
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
    <div className="flex gap-2 absolute right-4 top-4 z-40 items-center bg-white rounded-full p-2" onClick={onToggleFavorite}>
      <FaHeart size={30} color={isFavorite ? "red" : "black"} />
    </div>
    <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
      <div className="flex items-center bg-white rounded-full p-2 hover:bg-primary" onClick={onMessageClick}>
        <AiFillMessage size={30} color="black" />
      </div>
      {host.is_video_call === 1 && (
        <div className="flex items-center bg-white rounded-full p-2 hover:bg-primary" onClick={onVideoCallClick}>
          <IoVideocamSharp size={30} color="black" />
        </div>
      )}
    </div>
  </Swiper>
);

export default ProfileGallery;
