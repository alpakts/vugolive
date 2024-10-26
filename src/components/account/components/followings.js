
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {getSavedProfiles } from '@/lib/services/api-service';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/(app)/loading';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';

const FollowersList = () => {
  const filebaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const router = useRouter();
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSavedProfiles(apiUser.id,0,25).then((response) => {
      setHosts(response.data.data);
      setLoading(false);
    }).catch((err) => console.log(err));
  }, []); 
  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className="flex flex-col items-center justify-start bg-black text-secondary">
      {/* Header */}
      <div className="flex items-center justify-center px-4 py-2">
        <h1 className="font-bold text-lg">TAKİP EDİLENLER</h1>
      </div>

      {/* Followers List */}
      <div className="w-full flex-1 overflow-y-auto  max-h-[80vh]">
        {hosts.length >0 ? hosts.map((user, index) => (
          <div
            key={index}
            className="flex items-center bg-slate-900 p-4 mb-4 rounded-lg shadow"
            onClick={() => router.push(`/profile/?userId=${user.id}`)}
          >
            {user.profileimages || user.images?.length > 0   ?
              <Image
              src={user.profileimages?filebaseUrl+user?.profileimages: user.images ? filebaseUrl+user.images[0]?.image: '' }
              alt={`${user.fullName}'s profile`}
              width={0}
              height={0}
              sizes='100vw'
              className="w-12 h-12 rounded-full object-cover mr-4"
            /> : <FaUser className="w-12 h-12 rounded-full object-cover mr-4" />}
            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <h2 className="text-lg font-bold mr-2">{user.fullName}</h2>
                <span>{user.emoji}</span>
                <span className="ml-1 text-lg">{user.age}</span>
                {user.is_host && (
                  <Image className='ml-1' src={'/verified.png'} width={16} height={16} alt="verified" />
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span>{user.flag}</span> <span>{user.country}</span>
              </div>
            </div>
          </div>
        )) : <div className='text-center text-white'>Henüz takip edilen yok</div>}
      </div>
    </div>
  );
};

export default FollowersList;
