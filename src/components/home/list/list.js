"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";


export default function List({item,activeTab}) {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  return (
          <>
          {activeTab === "Profiller" && 
            <Link href={`/profile?userId=${item.id}`}>
            <div key={item.id} className="relative  text-white  rounded-xl ">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
              >
                {item.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={fileBaseUrl+image.image}
                      alt={item.fullName}
                      width={100}
                      height={100}
                      sizes="(max-width: 768px) 30vw, 50vw"
                      className=" h-full w-full object-cover aspect-[0.75]  rounded-xl "
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="text-white text-center absolute bottom-5 z-10 px-4 my-6 rounded-lg left-2 bg-gray-900 bg-opacity-30">
                {item.status}
              </div>
              <div className="absolute bottom-0 py-2 z-20 bg-black bg-opacity-30 w-full">
              <div className="text-white text-sm w-fit mx-auto px-2 flex flex-row flex-nowrap items-center font-bold p-[6px]  bg-gray-900 rounded-full"><Image  src={'/diamond.png'} className="w-4 h-4" width={16} height={10} />{item.diamond_per_min ??0} / Dakika  </div>
              <div className="text-white px-2 flex flex-row flex-nowrap items-center gap-2 font-bold   ">{item.fullName} {item.age}<Image  src={'/verified.png'} className="w-4 h-4" width={16} height={10} />  </div>
              <div className="text-white px-2 flex flex-row flex-nowrap items-center gap-2    "><Image  src={'/turkey.png'} className="w-4 h-4" width={16} height={10} /> </div>
              </div>
            </div>
            </Link>
          }
          {activeTab === "Canlı" && 
            <Link href={`/profile?userId=${item.id}`}>
            <div key={item.id} className="relative  text-white  rounded-xl ">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
              >
                {item?.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={fileBaseUrl+image.image}
                      alt={item.fullName}
                      width={100}
                      height={100}
                      sizes="(max-width: 768px) 30vw, 50vw"
                      className="  w-full object-cover h-full aspect-auto  rounded-xl "
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="text-white text-center absolute bottom-5 z-10 px-4 my-6 rounded-lg left-2 bg-gray-900 bg-opacity-30">
                {item.status}
              </div>
              <div className="absolute bottom-0 z-20 bg-black bg-opacity-30 w-full">
              <div className="text-white px-2 flex flex-row flex-nowrap items-center gap-2 font-bold   ">{item.fullName} {item.age}<Image  src={'/verified.png'} className="w-4 h-4" width={16} height={10} />  </div>
              <div className="text-white px-2 flex flex-row flex-nowrap items-center gap-2    "><Image  src={'/turkey.png'} className="w-4 h-4" width={16} height={10} /> </div>
              </div>
            </div>
            </Link>
          }
          
          </>
  );
}
