import Image from "next/image";

export default function SidebarMenu({ isOpen, closeMenu }) {
    return (
       <div className={`fixed top-0 right-0 w-full z-50 h-full bg-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}>
      {/* Menüyü kapatma butonu */}
      <button className="absolute top-4 right-4" onClick={closeMenu}>
        <Image width={24} height={24} src="/close.svg" alt="burger menu" />
      </button>

      {/* Sol üstte logo ve menü başlıkları */}
      <div className="flex flex-col space-y-4 p-4">
        <div className="text-2xl font-bold">Vugo Live</div>
        <div className="text-gray-300">Profilim</div>

        <nav className="flex flex-col space-y-2">
          <a href="#" className="flex items-center space-x-2 text-lg hover:text-yellow-400">
            <span role="img" aria-label="Popüler">🎬</span>
            <span>Popüler</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-lg hover:text-yellow-400">
            <span role="img" aria-label="Öne Çıkan Yayıncılar">❤️</span>
            <span>Öne Çıkan Yayıncılar</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-lg hover:text-yellow-400">
            <span role="img" aria-label="Hits">⭐</span>
            <span>Hits</span>
          </a>
        </nav>

        <a href="#" className="text-gray-400 text-sm hover:text-yellow-400">Yardım merkezi</a>
        <button className="bg-white text-black px-4 py-2 rounded hover:bg-yellow-400">Giriş Yap</button>
      </div>
    </div>
    );
  }
  