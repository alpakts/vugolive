"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
export default function List() {
  const items = [
    {
      id: 1,
      name: "Destina Yayında",
      status: "Sohbet",
      image_set: [
        "https://content.latest-hairstyles.com/wp-content/uploads/collarbone-cut-with-soft-waves-1.jpg",
        "https://i2.pickpik.com/photos/956/544/972/teen-girl-young-beautiful-preview.jpg",
        "https://files.myglamm.com/site-images/original/Curly-Hair-square-face-hairstyle.png",
      ],
    },
    {
      id: 2,
      name: "Elif Yayında",
      status: "Sohbet",
      image_set: [
        "https://i2.pickpik.com/photos/956/544/972/teen-girl-young-beautiful-preview.jpg",
        "https://content.latest-hairstyles.com/wp-content/uploads/collarbone-cut-with-soft-waves-1.jpg",
        "https://files.myglamm.com/site-images/original/Curly-Hair-square-face-hairstyle.png",
      ],
    },
    {
      id: 3,
      name: "Merve Yayında",
      status: "Sohbet",
      image_set: [
        "https://files.myglamm.com/site-images/original/Curly-Hair-square-face-hairstyle.png",
        "https://content.latest-hairstyles.com/wp-content/uploads/collarbone-cut-with-soft-waves-1.jpg",
        "https://i2.pickpik.com/photos/956/544/972/teen-girl-young-beautiful-preview.jpg",
      ],
    },
    {
      id: 4,
      name: "Selin Yayında",
      status: "Sohbet",
      image_set: [
        "https://content.latest-hairstyles.com/wp-content/uploads/collarbone-cut-with-soft-waves-1.jpg",
        "https://i2.pickpik.com/photos/956/544/972/teen-girl-young-beautiful-preview.jpg",
        "https://files.myglamm.com/site-images/original/Curly-Hair-square-face-hairstyle.png",
      ],
    },
    {
      id: 5,
      name: "Duygu Yayında",
      status: "Sohbet",
      image_set: [
        "https://i2.pickpik.com/photos/956/544/972/teen-girl-young-beautiful-preview.jpg",
        "https://content.latest-hairstyles.com/wp-content/uploads/collarbone-cut-with-soft-waves-1.jpg",
        "https://files.myglamm.com/site-images/original/Curly-Hair-square-face-hairstyle.png",
      ],
    },    {
      id: 1,
      name: "Destina Yayında",
      status: "Sohbet",
      image_set: [
        "https://content.latest-hairstyles.com/wp-content/uploads/collarbone-cut-with-soft-waves-1.jpg",
        "https://i2.pickpik.com/photos/956/544/972/teen-girl-young-beautiful-preview.jpg",
        "https://files.myglamm.com/site-images/original/Curly-Hair-square-face-hairstyle.png",
      ],
    },
    {
      id: 2,
      name: "Elif Yayında",
      status: "Sohbet",
      image_set: [
        "https://i2.pickpik.com/photos/956/544/972/teen-girl-young-beautiful-preview.jpg",
        "https://content.latest-hairstyles.com/wp-content/uploads/collarbone-cut-with-soft-waves-1.jpg",
        "https://files.myglamm.com/site-images/original/Curly-Hair-square-face-hairstyle.png",
      ],
    },
    {
      id: 3,
      name: "Merve Yayında",
      status: "Sohbet",
      image_set: [
        "https://files.myglamm.com/site-images/original/Curly-Hair-square-face-hairstyle.png",
        "https://content.latest-hairstyles.com/wp-content/uploads/collarbone-cut-with-soft-waves-1.jpg",
        "https://i2.pickpik.com/photos/956/544/972/teen-girl-young-beautiful-preview.jpg",
      ],
    },
    {
      id: 4,
      name: "Selin Yayında",
      status: "Sohbet",
      image_set: [
        "https://content.latest-hairstyles.com/wp-content/uploads/collarbone-cut-with-soft-waves-1.jpg",
        "https://i2.pickpik.com/photos/956/544/972/teen-girl-young-beautiful-preview.jpg",
        "https://files.myglamm.com/site-images/original/Curly-Hair-square-face-hairstyle.png",
      ],
    },
    {
      id: 5,
      name: "Duygu Yayında",
      status: "Sohbet",
      image_set: [
        "https://i2.pickpik.com/photos/956/544/972/teen-girl-young-beautiful-preview.jpg",
        "https://content.latest-hairstyles.com/wp-content/uploads/collarbone-cut-with-soft-waves-1.jpg",
        "https://files.myglamm.com/site-images/original/Curly-Hair-square-face-hairstyle.png",
      ],
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-base font-bold mb-4 border-b border-primary pb-3">
        Sizin İçin Önerilenler
      </h2>

      <div className="grid grid-cols-2 gap-4 relative">
        {items.map((item) => (
          <>
          <Link href={`/profile?userId=${item.id}`}>
            <div key={item.id} className="relative  text-white  rounded-xl ">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {item.image_set.map((image, index) => (
                  <SwiperSlide>
                    <Image
                      src={image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="  w-full object-cover h-full aspect-square  rounded-xl "
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="text-white text-center absolute bottom-5 z-10 px-4 my-6 rounded-lg left-2 bg-black bg-opacity-10">
                {item.status}
              </div>
              <div className="text-white p-2   ">{item.name}</div>
            </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}
