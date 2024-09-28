import Image from "next/image";

// components/RankingCard.js
export default function RankingCard({ name, rank, points, avatarUrl,index }) {
    return (
      <div className={`flex px-4 py-2 rounded-lg justify-between items-center flex-row text-center `}>
     
        <div className={`flex  items-center gap-5 `}>
        <p className="text-sm text-white " > {index}. </p>

          <Image
            src={avatarUrl}
            width={50}
            height={50}
            alt={`${name} avatar`}
            
            className="  rounded-full aspect-square border-yellow-400"
          />
           <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
           
        </div>
        <p className="text-sm text-white " >💎 {points} Puan</p>
       
      
      </div>
    );
  }
  