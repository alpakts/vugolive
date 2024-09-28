'use client';
import { useState, useEffect, useRef } from 'react';
import SidebarMenu from './sidebar-menu';
import Image from 'next/image';
import Link from 'next/link';
import SlidingModal from '../web-components/modals/sliding-modal';
import DiamondPage from '../account/components/diamond';
import { FaTrophy, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  return (
      <header
      className={`sticky top-0 left-0 w-full z-50 relative'
       transition-all duration-300 ease-in-out
      bg-black shadow-lg
      flex justify-between items-center p-4 text-white`}
    >
      <div className="text-xl font-bold hover:text-[#fee64e]">
        <Link  href="/">Vugo Live</Link>
      </div>
     
      <div className="flex flex-row gap-5">
      
        <Link href={user != -1?'/account':'auth'}>
        <FaUser size={24} />
        </Link>
        <button>
         
          <SlidingModal  OpenButton={ <Image width={24} height={24} src="/diamond.svg" alt="diamond menu" />} ><DiamondPage/></SlidingModal>
        </button>
        <Link href={'/ranking'}>
          <FaTrophy  size={24} />
       </Link>
      
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Image width={24} height={24} src="/burger-bar.svg" alt="burger menu" />
        </button>
      </div>

      <SidebarMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
    </header>
  );
}
