"use client";
import TabComponent from "./tab-select";
import List from "./list/list";
import { useEffect, useState } from "react";
import SkeletonImage from "../web-components/skeleton/skeloton-image";

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
const getUserList = async (id) => {
  var response = await fetch(`https://640f6027cde47f68db4929d6.mockapi.io/api/users`);
  return await response.json();
};

export default function HomeIndex() {
  const [users, setUsers] = useState(null);
  const [activeTab, setActiveTab] = useState("Profiller");
  useEffect(() => {
    getUserList().then((data) => {
      setUsers(data);
    }
    );
  },[activeTab]);


  return  ( 
    <div className="p-4">
      <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
  
      <h1 className="text-base font-bold mb-4 border-b border-primary pb-3">
        Sizin İçin Önerilenler
      </h1>
      {users?.length>0 ?(
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
