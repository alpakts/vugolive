// components/FollowersList.js
import { FiChevronLeft } from "react-icons/fi";
import Image from "next/image";
import CustomButton from "@/components/web-components/button/button";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import Loading from "@/app/(app)/loading";
import { getBlockedProfiles, unblockHost } from "@/lib/services/api-service";

const BlocksList = () => {
  const filebaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const router = useRouter();
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBlockedProfiles(apiUser.id,0,25).then((response) => {
      setHosts(response.data.data);
      setLoading(false);
    }).catch((err) => console.log(err));
  }, []); 
  if (loading) {
    return <Loading></Loading>
  }
  const handleRemoveBlock = (hostId) => {
    unblockHost(apiUser.id,hostId).then((response) => {
      setHosts(hosts.filter((host) => host.id !== hostId));
    }).catch((err) => console.log(err));

  }

  return (
    <div className="flex flex-col items-center justify-start bg-black text-secondary ">
      {/* Header */}
      <div className="flex items-center justify-center px-4 py-2">
        <h1 className="font-bold text-lg">ENGELLENENLER</h1>
      </div>

      {/* Followers List */}
      <div className="w-full flex-1 overflow-y-auto max-h-[80vh]">
        {hosts.length >0 ? hosts.map((host, index) => (
          <div
            key={index}
            className="flex items-center bg-slate-900 p-4 mb-4 rounded-lg shadow"
            onClick={() => router.push(`/profile/?userId=${host.id}`)}
          >
            <Image
                src={host.profileimages?filebaseUrl+user?.profileimages: host.images ? filebaseUrl+host.images[0].image :'/profile-placeholder.png'}
              alt={`${host.fullName}'s profile`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <h2 className="text-lg font-bold mr-2">{host.fullName}</h2>
                <span>{host.emoji}</span>
                <span className="ml-1 text-lg">{host.age}</span>
                {host.is_host && (
                  <Image
                    className="ml-1"
                    src={"/verified.png"}
                    width={16}
                    height={16}
                    alt="verified"
                  />
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span>{host.flag}</span> <span>{host.country}</span>
              </div>
            </div>
            <CustomButton onClick={()=>handleRemoveBlock(host.id)}  className="text-[10px]  !py-2 leading-none w-fit rounded-full  bg-red-300 text-red-500 hover:bg-red-400" >engeli kaldır</CustomButton>
          </div>
        )):<div className='text-center text-white'>Engellenen Kullanıcı Bulunamadı</div>}
        
      </div>
    </div>
  );
};

export default BlocksList;
