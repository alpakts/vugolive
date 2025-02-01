"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import SlidingModal from "../web-components/modals/sliding-modal";
import ForYou from "../account/components/for-you";
import { FaCamera, FaCompass, FaHeart, FaStar, FaTrophy, FaUser } from "react-icons/fa";
import { RiCustomerServiceFill } from "react-icons/ri";
export default function SidebarMenu({ isOpen, closeMenu }) {
  const user = useSelector((state) => state.apiUser.apiUser);
  return (
    <div
      className={`fixed top-0 right-0 w-full z-50 h-full bg-black text-white transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-500 ease-in-out`}
    >
      <button className="absolute top-4 right-4" onClick={closeMenu}>
        <Image width={24} height={24} src="/close.svg" alt="burger menu" />
      </button>

      <div className="flex flex-col space-y-4 p-4">
        <div className="text-2xl font-bold">Vugo Live</div>

        <nav className="flex flex-col space-y-2">
        {(user != -1 && user) && (
       <>
       <Link
            href="/account"
            className="flex items-center space-x-2 text-lg hover:text-yellow-400"
            onClick={() => {
              closeMenu();
            }}
          >
            <FaUser size={24} />
            <span>Profilim</span>
          </Link>
          <Link
            href="/account/moments"
            className="flex items-center space-x-2 text-lg hover:text-yellow-400"
            onClick={() => {
              closeMenu();
            }}
          >
            <FaCamera size={24} />
            <span>Anlarım</span>
          </Link>
          <div className="bg-secondary h-1  rounded-full "></div>
       </>
          )}
          <Link
            href="/ranking"
            className="flex items-center space-x-2 text-lg hover:text-yellow-400 "
            onClick={() => {
              closeMenu();
            }}
          >
              <FaTrophy className='text-primary' size={24} />
            <span>En İyiler</span>
          </Link>
          <SlidingModal
          OpenButton={
            <button
                className="flex items-center space-x-2 text-lg hover:text-yellow-400"
              >
                <FaCompass  size={24} />
                <span>Önerilenler</span>
              </button>
          }
          
          >
            <ForYou />
          </SlidingModal>
          <Link
            href="/?at=2"
            onClick={()=>{
              closeMenu();
            }}
            className="flex items-center space-x-2 text-lg hover:text-yellow-400"
          >
            <FaStar size={24} className='text-primary' />
            <span>Hits</span>
          </Link>
        </nav>
        <div className="bg-secondary h-1  rounded-full "></div>


        <Link
            href="/support"
            className="flex items-center space-x-2 text-lg hover:text-yellow-400"
            onClick={() => {
              closeMenu();
            }}
          >
            <RiCustomerServiceFill size={24} className='text-secondary' />
            <span>Yardım Merkezi</span>
          </Link>
        {(user == -1 || !user ) && (
          <Link
            className="bg-white text-black text-center px-4 py-2 rounded hover:bg-yellow-400"
            href="/auth"
            onClick={() => {
              closeMenu();
            }}
          >
            Giriş Yap
          </Link>
        )}
        {(user == -1 || !user ) && (
          <Link
            className="bg-white text-black text-center px-4 py-2 rounded hover:bg-yellow-400 flex justify-center items-center space-x-2"
            href="/auth"
            onClick={() => {
              closeMenu();
              window.open(process.env.NEXT_PUBLIC_APP_PUBLIC_URL);
            }}
          >
           <Image src={'/logo.png'} width={16} height={16}/>  Uygulamayı İndir
          </Link>
        )}
      </div>
    </div>
  );
}
