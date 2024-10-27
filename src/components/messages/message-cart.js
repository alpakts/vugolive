'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { timeAgo } from '@/lib/utils/utils';
import { FaCircle, FaImage, FaUser } from 'react-icons/fa';

const ProfileCard = ({ message }) => {
    const router = useRouter();
    const baseFileUrl = process.env.NEXT_PUBLIC_FILE_URL; 
    const user = message.user;
    const routeToProfile = () =>{
        router.push(`/chat/${user.userid}?consId=${message.conversationId}`);
    }
    const date = timeAgo(message.time);
  return (
    <div className="flex items-center p-4 bg-gray-900 shadow-md rounded-lg space-x-4 mb-4 relative select-none" onClick={routeToProfile}>
          {user.image   ?
              <Image
              src={baseFileUrl+user.image}
              alt={`${user.username}'s profile`}
              width={0}
              height={0}
              sizes='100vw'
              className="w-12 h-12 rounded-full object-cover mr-4"
            /> : <FaUser className="w-12 h-12 rounded-full text-secondary object-cover mr-4" />}
      {message.newMsg && <div className='absolute text-primary gap-2 top-2 right-2 flex flex-row flex-nowrap  items-center'>
      yeni mesaj <FaCircle className=" text-lg " />
      </div>}
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h2 className="text-base font-bold ">{user.username.split(' ').slice(0,1).join(' ')}</h2>
          <span className="text-gray-300 text-sm">{user.age}</span>
          {user.is_host == 2 && <Image src={'/verified.png'} height={24} width={24} ></Image>}
        </div>
        <p className="text-secondary text-xs  max-h-4 overflow-hidden ">{message.lastMsg.length > 0 ?message.lastMsg: message.msgType == 'image' || message.msgType == 'video' ? (<>
          <FaImage /> 
        </>): ''}</p>
      </div>
      <span className="text-gray-400 text-sm">{date}</span>
    </div>
  );
};

export default ProfileCard;