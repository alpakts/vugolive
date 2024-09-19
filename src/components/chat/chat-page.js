import Image from 'next/image';
import { FiChevronLeft, FiFile, FiGift, FiSend, FiSettings } from 'react-icons/fi';

export default function ChatPage() {
  return (
    <div className=" min-h-[calc(100vh-56px)] text-white flex flex-col"> {/* Dark tema arka plan ve flex container */}
      
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-gray-700">
        <div className="w-full flex gap-5 items-center">
          <button className="text-white">
            <FiChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <Image
              src="/girl.png" 
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-bold">Sinem <span className="text-sm">24</span></h2>
              <div className="flex items-center gap-1">
                <Image src="/turkey.png" width={20} height={20} alt="Turkey" />
                <span className="text-gray-400">Türkiye</span>
              </div>
            </div>
            <Image src="/verified.png" alt="Doğrulama" width={24} height={24} />
          </div>
        </div>
        <button className="text-white">
          <FiSettings size={24} />
        </button>
      </header>

      {/* Main Chat Area */}
      <main className="flex-grow p-4 flex  flex-col justify-end"> {/* flex-grow ile alanın geri kalanını doldur */}
        
        {/* Mesajlar Alanı */}
        <div className="space-y-4 flex-grow overflow-auto"> {/* overflow-auto ile kaydırılabilir alan */}
          <div className="flex justify-center">
            <span className="text-gray-400 text-sm">30 Aug</span>
          </div>
          <div className="flex justify-end">
            <div className="bg-primary text-black px-4 py-2 rounded-lg max-w-xs">
              Sa
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore amet, nemo quae fugiat quas accusamus minus perferendis dolores saepe praesentium cum. Aliquid non vero rem, iure sunt aspernatur odit ex.
            </div>
          </div>
        </div>

        {/* Mesaj Gönderme Alanı */}
        <div className="flex items-center space-x-2 p-2 bg-gray-800 rounded-full"> {/* Sabit mesaj gönderme kutusu */}
          <input
            type="text"
            placeholder="Buraya yaz."
            className="bg-gray-800 text-white w-full px-4 py-2 rounded-full focus:outline-none"
          />
          <button>
            <FiSend size={24} /> 
          </button>
          <button>
            <FiGift size={24} />
          </button>
          <button>
            <FiFile size={24} />
          </button>
        </div>

      </main>
    </div>
  );
}
