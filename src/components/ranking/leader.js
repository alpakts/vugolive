import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default function LeaderboardItem({ item }) {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const router = useRouter();
  const user = item?.user;
  const name = user?.fullName?.split(" ")[0];
  return (
    <div className="relative   text-center w-64  mx-auto">
      <div className="flex justify-center">
        <div className="w-28 h-28  rounded-full flex items-center justify-center relative" onClick={()=>{
        router.push(`/profile?userId=${user.id}`);
      }}>
          <div className="absolute bottom-full">
            <img src="/crown.png" alt="Crown" className="w-10 " />
          </div>
          <div className="absolute w-28 h-28 flex justify-center items-center">
            <img
              src="/golden-leaf.png"
              alt="Wreath"
              className="w-[135%]  max-w-none "
            />
          </div>
          <div className="absolute top-full h-65 flex  items-center">
            <Image
              src="/star.png"
              alt="start"
              width={20}
              height={20}
              className="h-5  max-w-none "
            />
            <Image
              src="/star.png"
              alt="start"
              width={40}
              height={40}
              className="h-10  max-w-none "
            />
            <Image
              src="/star.png"
              alt="start"
              width={20}
              height={20}
              className="h-5 max-w-none "
            />
          </div>
          {user.profileimages ? (
            <Image
              src={fileBaseUrl + user?.profileimages}
              alt={`${name}'s profile`}
              width={50}
              height={50}
              sizes="100vw"
              className="rounded-full aspect-square object-cover w-full h-full border-yellow-400"
            />
          ) : (
            <FaUser className="rounded-full w-full h-full aspect-square border-yellow-400" />
          )}
        </div>
      </div>

      {/* İsim ve Puan */}
      <h3 className="text-white text-xl font-bold mt-10">{name}</h3>
      <div className="flex justify-center  text-yellow-400"></div>
      <p className="text-white ">💎 {item.total_diamonds}</p>
    </div>
  );
}
