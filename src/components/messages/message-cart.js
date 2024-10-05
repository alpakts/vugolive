'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProfileCard = ({ name, age, message, timeAgo, imageUrl,id }) => {
    const router = useRouter();
    const routeToProfile = () =>{
        router.push(`/chat/${id}`);
    }
  return (
    <div className="flex items-center p-4 bg-gray-900 shadow-md rounded-lg space-x-4 mb-4" onClick={routeToProfile}>
      <Image
        src={imageUrl}
        alt={name}
        className="w-16 h-16 object-contain rounded-full"
        objectFit='cover'
        width={64}
        height={64}
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold">{name}</h2>
          <span className="text-gray-300">{age}</span>
          <Image src={'/verified.png'} height={24} width={24} ></Image>
        </div>
        <p className="text-secondary">{message}</p>
      </div>
      <span className="text-gray-400 text-sm">{timeAgo}</span>
    </div>
  );
};

export default ProfileCard;