// components/FollowersList.js
'use client';
import CustomButton from "@/components/web-components/button/button";
import { useAppSelector } from "@/lib/hooks";
import { getExploreProfilesByGender } from "@/lib/services/api-service";
import { sendMessageBetweenUsers } from "@/lib/services/firebase-service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const hiMessages = [
  "Merhaba Günün nasıl geçiyor.",
  "Merhaba tanışabilir miyiz?",
  "Selam! Nerelisin?",
  "Merhaba! Seninle sohbet etmek güzel olurdu"
];

const getRandomHiMessage = () => {
  const randomIndex = Math.floor(Math.random() * hiMessages.length);
  return hiMessages[randomIndex];
};

const ForYou = () => {
  const filebaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const apiUser =useAppSelector((state) => state.apiUser.apiUser);
  useEffect(() => {
    const userId=localStorage.getItem("userId");
    getExploreProfilesByGender(userId??250,apiUser?.gender??0).then((response) => {
      setUsers(response.data.data);
    }).catch((err) => console.log(err));
  }, [apiUser]); 
  const sayHiToUser = async (sender, receiver) => {
    if (sender && receiver) {
      const hiMessage = getRandomHiMessage();
      await sendMessageBetweenUsers(sender.email, receiver.email, hiMessage, sender, receiver, "text");
      router.push(`/chat/${receiver.id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start bg-black text-secondary">
      {/* Header */}
      <div className="flex items-center justify-center px-4 py-2">
        <h1 className="font-bold text-lg">Önerilenler</h1>
      </div>

      {/* Followers List */}
      <div className="w-full flex-1 overflow-y-auto  max-h-[80vh]">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center bg-slate-900 p-4 mb-4 rounded-lg shadow relative"
            onClick={() => {
              window.location.href = `/profile?userId=${user.id}`
            }
            }
          >
            <Image
              src={user.profileimages?filebaseUrl+user?.profileimages:'/profile-placeholder.png'}
              alt={`${user.fullName}'s profile`}
              width={0}
              height={0}
              sizes="100vw"
              className={`w-24 h-auto rounded-full aspect-square object-cover mr-4 ${user.profileimages ? '':'bg-secondary'}`}
            />
            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <h2 className="text-lg font-bold mr-2">{user.fullName}
                <div className="text-sm break-words font-normal mr-2 w-36">{user.about}</div>
                </h2>
                
                <span>{user.emoji}</span>
                {user.is_host == 1 && (
                  <Image
                    className="ml-1"
                    src={"/verified.png"}
                    width={16}
                    height={16}
                    alt="verified"
                  />
                )}
                <CustomButton className={'p-2 bg-red-200 text-red-400 right-3 top-1/2  translate-y-[-50%] italic absolute '} onClick={(event)=>{
                  event.stopPropagation();
                  sayHiToUser(apiUser,user);
                }} >
                  Hi
                  <span role="img" aria-label="Öne Çıkan Yayıncılar">
                    ❤️
                  </span>
                </CustomButton>
              </div>
              <div className="text-sm text-gray-500">
                <span>{user.flag}</span> <span>{user.country}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForYou;
