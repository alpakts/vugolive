"use client";
import Image from "next/image";
import Link from "next/link";

export default function List({ item, activeTab }) {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  return (
    <Link href={`/profile?userId=${item.id}`}>
      <div key={item.id} className="relative  text-white  rounded-xl ">
        <Image
          src={fileBaseUrl + item.images[0].image}
          alt={item.fullName}
          width={100}
          height={100}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 20vw"
          className=" h-full w-full object-cover aspect-[0.75]  rounded-xl "
        />
        <div className="text-white text-center absolute bottom-5 z-10 px-4 my-6 rounded-lg left-2 bg-gray-900 bg-opacity-30">
          {item.status}
        </div>
        <div className="absolute bottom-0 py-2 z-20 bg-black bg-opacity-30 w-full">
          <div className="text-white text-sm w-fit mx-auto px-2 flex flex-row flex-nowrap items-center font-bold p-[6px]  bg-gray-900 rounded-full">
            <Image
              src={"/diamond.png"}
              className="w-4 h-4"
              width={16}
              height={10}
            />
            {item.diamond_per_min ?? 0} / Dakika{" "}
          </div>
          <div className="text-white px-2 text-sm flex flex-row flex-nowrap items-center gap-2 font-bold   ">
            {item.fullName} {item.age}
            <Image
              src={"/verified.png"}
              className="w-4 h-4"
              width={16}
              height={10}
            />{" "}
          </div>
          <div className="text-white px-2 flex flex-row flex-nowrap items-center gap-2  text-sm    ">
            {item.country_data ? (
              item.country_data.country_name == "🇹🇷" ? (
                <Image src="/turkey.png" width={20} height={20} />
              ) : (
                item.country_data.country_name
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
