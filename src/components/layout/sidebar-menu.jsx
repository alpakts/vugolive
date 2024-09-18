'use client'
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default  function SidebarMenu({ isOpen, closeMenu }) {
  const user =  useSelector((state) => state.user.user);
  return (
    <div className={`fixed top-0 right-0 w-full z-50 h-full bg-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}>
      <button className="absolute top-4 right-4" onClick={closeMenu}>
        <Image width={24} height={24} src="/close.svg" alt="burger menu" />
      </button>

      <div className="flex flex-col space-y-4 p-4">
        <div className="text-2xl font-bold">Vugo Live</div>
        <div className="text-gray-300">Profilim</div>

        <nav className="flex flex-col space-y-2">
          <Link href="/popular" className="flex items-center space-x-2 text-lg hover:text-yellow-400">
            <span role="img" aria-label="Popüler">🎬</span>
            <span>Popüler</span>
          </Link>
          <Link href="/featured" className="flex items-center space-x-2 text-lg hover:text-yellow-400">
            <span role="img" aria-label="Öne Çıkan Yayıncılar">❤️</span>
            <span>Öne Çıkan Yayıncılar</span>
          </Link>
          <Link href="/hits" className="flex items-center space-x-2 text-lg hover:text-yellow-400">
            <span role="img" aria-label="Hits">⭐</span>
            <span>Hits</span>
          </Link>
        </nav>

        <Link href="/help" className="text-gray-400 text-sm hover:text-yellow-400">Yardım merkezi</Link>
       { !user && <button className="bg-white text-black px-4 py-2 rounded hover:bg-yellow-400">
          <Link href="/auth" onClick={()=>{
            closeMenu();
          }}>Giriş Yap</Link>
        </button>}
      </div>
    </div>
  );
}
