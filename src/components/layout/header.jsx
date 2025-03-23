"use client";
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import SidebarMenu from "./sidebar-menu";
import Image from "next/image";
import Link from "next/link";
import {FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AiFillMessage } from "react-icons/ai";
import { checkHasNewMessage } from "@/lib/services/firebase-service";
import NotificationPermission from "../web-components/notification-permission/notification-permission";
import DownloadAppPrompt from "../web-components/download-app/download-app";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const user = useSelector((state) => state.user.user);
  const apiUser = useSelector((state) => state.apiUser.apiUser);
  
  useEffect(() => {
    let  unsubscribe = () => {};
      if (apiUser && user != -1) {
        unsubscribe = checkHasNewMessage(apiUser?.identity,setHasNewMessage);
      }
    return () => {
      unsubscribe();
    };
  }
  , [apiUser]);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((reg) => console.log('Service Worker registered'))
        .catch((err) => console.error('Service Worker registration failed', err));
    }
  }, []);
  return (
  <>
      <header
      className={`sticky top-0 left-0 w-full z-50 relative'
       transition-all duration-300 ease-in-out
      bg-black shadow-lg
      flex justify-between items-center p-4 text-white`}
    >
      <div className="text-xl font-bold hover:text-[#fee64e]">
        <Link href="/">Vugo Live</Link>
      </div>

      <div className="flex flex-row gap-5">
       {(apiUser != -1 && apiUser) && <Link href={"/account/messages"} className="relative">
          <AiFillMessage  size={24} />
          {hasNewMessage && <div className="w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0"></div>}
        </Link>}
        <button >
       {/* <Link href={'/account/charge'}>
       <Image
                width={24}
                height={24}
                className="aspect-square"
                src="/diamond.png"
                alt="diamond menu"
              />
       </Link> */}
        </button>
        {(apiUser == -1 || !apiUser) ? (
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Image
              width={24}
              height={24}
              src="/burger-bar.svg"
              alt="burger menu"
            />
          </button>
        ) : (
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {apiUser?.profileimages || apiUser?.images?.length > 0   ?
              <Image
              src={apiUser.profileimages?fileBaseUrl+apiUser?.profileimages: apiUser.images ? fileBaseUrl+apiUser.images[0]?.image: '' }
              alt={`${apiUser.fullName}'s profile`}
              width={0}
              height={0}
              sizes='100vw'
              className="w-6 h-6 rounded-full object-cover "
            /> : <FaUser className="w-6 h-6 rounded-full object-cover " />}
          </button>
        )}{" "}
      </div>
      <SidebarMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />

    </header>
      <NotificationPermission></NotificationPermission>
      <DownloadAppPrompt></DownloadAppPrompt>
  </>
  );
}
