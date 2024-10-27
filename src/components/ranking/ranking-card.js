import Image from "next/image";
import { FaUser } from "react-icons/fa";

// components/RankingCard.js
export default function RankingCard({ rank, item }) {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
    const user = item?.user;
    const name = user?.fullName?.split(' ')[0];
    return (
      <div className={`flex px-4 py-2 rounded-lg justify-between items-center flex-row text-center `}>
     
        <div className={`flex  items-center gap-5 `}>
        <p className="text-sm text-white " > {rank}. </p>
          {user.profileimages ?
              <Image
              src={fileBaseUrl+user?.profileimages}
              alt={`${name}'s profile`}
              width={50}
              height={50}
              sizes='100vw'
              className="rounded-full aspect-square border-yellow-400"
            /> : <FaUser className="rounded-full w-[50px] h-[50px] aspect-square border-yellow-400" />}
           <h3 className="text-sm font-bold text-white mb-2">{name}</h3>
           
        </div>
        <p className="text-sm text-white " >💎 {item?.total_diamonds} Puan</p>
       
      
      </div>
    );
  }
  