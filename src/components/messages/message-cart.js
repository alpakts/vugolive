'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebaseConfig';
import { timeAgo } from '@/lib/utils/utils';

const ProfileCard = ({ message }) => {
    const router = useRouter();
    const baseFileUrl = process.env.NEXT_PUBLIC_FILE_URL; 
    const user = message.user;
    const routeToProfile = () =>{
        router.push(`/chat/${user.userid}`);
    }
    const date = timeAgo(message.time);
  return (
    <div className="flex items-center p-4 bg-gray-900 shadow-md rounded-lg space-x-4 mb-4" onClick={routeToProfile}>
      <Image
        src={user.image ? baseFileUrl+user.image : '/profile-placeholder.png'}
        alt={user.username}
        className={`w-16 h-16 object-contain rounded-full ${user.image ? '' : 'bg-secondary'}`}
        objectFit='cover'
        width={64}
        height={64}
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold">{user.username}</h2>
          <span className="text-gray-300">{user.age}</span>
          {user.is_host&& <Image src={'/verified.png'} height={24} width={24} ></Image>}
        </div>
        <p className="text-secondary  max-h-5 overflow-hidden ">{message.lastMsg}</p>
      </div>
      <span className="text-gray-400 text-sm">{date}</span>
    </div>
  );
};

export default ProfileCard;