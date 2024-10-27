"use client";
import CustomButton from "@/components/web-components/button/button";
import PopupModalComp from "@/components/web-components/popup-modal/popup-modal";
import { listenToNonEmptyHosts } from "@/lib/services/firebase-service";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";

export default function LiveHostList() {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const [hosts, setHosts] = useState([]); // Veriyi tutmak için state tanımlayın
  const popupModalRef = useRef(null);
  useEffect(() => {
    const unsubscribe = listenToNonEmptyHosts(setHosts);

    return () => unsubscribe();
  }, []);
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "m";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  return hosts.length >0 ?  hosts?.map((item) => (
    <>
      <button
        onClick={() => {
          popupModalRef.current?.openModal();
        }}
        key={item?.user_id}
      >
        <div className="relative text-white rounded-xl">
          <div className="absolute top-2 right-2 bg-red-600 bg-opacity-90 text-white rounded-full px-2 py-1 text-xs flex items-center z-20">
            <FaEye className="mr-1" />
            {formatViewCount(item?.watching_count)} izleyici
          </div>

          <Image
            src={fileBaseUrl + item?.user_image}
            alt={item?.user_name}
            width={100}
            height={100}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 20vw"
            className="h-full w-full object-cover aspect-[0.75] rounded-xl"
          />

          {/* Diğer Bilgiler */}
          <div className="text-white text-center absolute bottom-5 z-10 px-4 my-6 rounded-lg left-2 bg-gray-900 bg-opacity-30">
            {item?.status}
          </div>
          <div className="absolute bottom-0 py-2 z-20 bg-black bg-opacity-30 w-full">
            <div className="text-white text-sm w-fit mx-auto px-2 flex flex-row items-center font-bold p-[6px] bg-gray-900 rounded-full">
              <Image
                src="/diamond.png"
                className="w-4 h-4"
                width={16}
                height={10}
              />
              {item?.diamond_per_minute ?? 0} / Dakika
            </div>
            <div className="text-white px-2 text-sm flex flex-row items-center gap-2 font-bold">
              {item?.user_name} {item?.age}
              <Image
                src="/verified.png"
                className="w-4 h-4"
                width={16}
                height={10}
              />
            </div>
            <div className="text-white px-2 flex flex-row items-center gap-2 text-sm">
              {item?.city ? (
                item?.city === "🇹🇷" ? (
                  <Image src="/turkey.png" width={20} height={20} />
                ) : (
                  item?.city
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </button>
      <PopupModalComp ref={popupModalRef}>
        <div className="flex flex-col justify-center mt-5 p-4 gap-5">
          <div>
            Canlı yayın özelliği şuanda web uygulamasında kullanılamamaktadır.
          </div>
          <div className="flex flex-col justify-center gap-5">
            Canlı yayınlara mobil uygulama üzerinden ulaşabilirsiniz.
            <CustomButton
              className="flex justify-center items-center bg-black capitalize text-white gap-2"
              href={"https://www.google.com/"}
              target="blank"
            >
              Uygulamayı İndir{" "}
              <Image src={"/logo.png"} width={24} height={24}></Image>
            </CustomButton>
          </div>
        </div>
      </PopupModalComp>
    </>
  )) : <div className=" left-0 text-lg font-bold w-[90vw] mx-auto text-white  text-center">Buralar Sessiz, Bu Şehirde Sensiz Hiç Çekilmiyor</div>;
}
