'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FiChevronLeft, FiFile, FiGift, FiSend, FiSettings } from 'react-icons/fi';

export default function ChatPage() {
  const chatRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scroll({top: chatRef.current.scrollHeight, behavior: 'smooth'});
    }
  }, []);
  return (
    <div className=" max-w-none js-chat-cont bg-black fixed z-[999] left-0  w-screen overflow-hidden top-0 py-4 h-screen max-h-screen text-white flex flex-col"> {/* Dark tema arka plan ve flex container */}
      
      <header className=" flex items-center justify-between border-b pb-2 border-gray-700">
        <div className="w-full flex gap-5 items-center ">
          <button className="text-white" onClick={()=> router.back()}>
            <FiChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <Image
              src="/girl.png" 
              alt="Profile"
              width={50}
              height={40}
              className="rounded-full object-contain aspect-square"
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
        <button className="text-white px-2">
          <FiSettings size={24} />
        </button>
      </header>

      {/* Main Chat Area */}
      <main className="flex-grow p-4 flex overflow-auto flex-col justify-end"> {/* flex-grow ile alanın geri kalanını doldur */}
        
        {/* Mesajlar Alanı */}
        <div ref={chatRef}  className="space-y-4 flex-grow overflow-auto"> {/* overflow-auto ile kaydırılabilir alan */}
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
