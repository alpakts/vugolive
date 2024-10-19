"use client";
import { useEffect, useState } from "react";
import SidebarMenu from "./sidebar-menu";
import Image from "next/image";
import Link from "next/link";
import SlidingModal from "../web-components/modals/sliding-modal";
import { FaCompass, FaHeart, FaTrophy } from "react-icons/fa";
import { useSelector } from "react-redux";
import ForYou from "../account/components/for-you";
import { AiFillMessage } from "react-icons/ai";
import { checkHasNewMessage } from "@/lib/services/firebase-service";

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
  return (
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
       {apiUser && <Link href={"/account/messages"} className="relative">
          <AiFillMessage  size={24} />
          {hasNewMessage && <div className="w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0"></div>}
        </Link>}
        <SlidingModal
          OpenButton={
            <button className="flex items-center space-x-2 text-lg hover:text-yellow-400">
              <FaCompass  size={24} />
            </button>
          }
        >
          <ForYou />
        </SlidingModal>
        <button >
       <Link href={'/account/charge'}>
       <Image
                width={24}
                height={24}
                src="/diamond.png"
                alt="diamond menu"
              />
       </Link>
        </button>
        <Link href={"/ranking"}>
          <FaTrophy className="text-primary" size={24} />
        </Link>
        {user == -1 ? (
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
            <Image
              width={24}
              height={24}
              src={apiUser?.profileimages ? fileBaseUrl+apiUser.profileimages: "/profile-placeholder.png"}
              alt="burger menu"
              className={`rounded-full ${apiUser?.profileimages ? "" : "bg-secondary"}`}
            />
          </button>
        )}{" "}
      </div>

      <SidebarMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
    </header>
  );
}
