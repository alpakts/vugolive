import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiSettings } from 'react-icons/fi';

const ChatHeader = ({ messageToUser, fileBaseUrl }) => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between border-b pb-2 border-gray-700">
      <div className="w-full flex gap-5 items-center ">
        <button className="text-white" onClick={() => router.back()}>
          <FiChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <Image
            src={messageToUser.images.length > 0 ? fileBaseUrl + messageToUser.images[0].image : "/profile-placeholder.png"}
            alt="Profile"
            width={50}
            height={40}
            className={`rounded-full object-contain aspect-square ${messageToUser.profileimages ? "" : "bg-secondary"}`}
          />
          <div>
            <h2 className="text-base font-bold flex gap-2 items-center">
              {messageToUser.fullName} <span className="text-sm">{messageToUser.age}</span>
              {messageToUser?.is_host ? <Image src="/verified.png" alt="Doğrulama" width={24} height={24} /> : null}
            </h2>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-400">{messageToUser.bio}</span>
            </div>
          </div>
         
        </div>
      </div>
      <button className="text-white px-2">
        <FiSettings size={24} />
      </button>
    </header>
  );
};

export default ChatHeader;
