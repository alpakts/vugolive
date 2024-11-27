import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default function SecondRank({ item }) {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const router = useRouter();
  const user = item?.user;
  const name = user?.fullName?.split(" ")[0];
  return (
    <div className="relative p-6 rounded-xl text-center w-full  mx-auto">
      <div className="flex justify-center" onClick={()=>{
        router.push(`/profile?userId=${user.id}`);
      }}>
        <div className="w-28 h-28 rounded-full flex items-center justify-center relative">
          <div className="absolute w-28 h-28 flex justify-center items-center top-0 ">
            <Image
              src="/golden-frame.png"
              alt="Wreath"
              width={0}
              height={0}
              sizes="50vw"
              className="w-[100%]   max-w-none "
            />
          </div>
          {user.profileimages ? (
            <Image
              onClick={() => router.push(`/profile/?userId=${item.id}`)}
              src={fileBaseUrl + user?.profileimages}
              alt={`${name}'s profile`}
              width={50}
              height={50}
              sizes="100vw"
              className="w-full object-cover h-full rounded-full aspect-square border-yellow-400" 
            />
          ) : (
            <FaUser className="w-full h-full rounded-full" />
          )}
        </div>
      </div>

      {/* İsim ve Puan */}
      <h3 className="text-white text-xl font-bold mt-2">{name}</h3>
      <div className="flex justify-center  text-yellow-400"></div>
      <p className="text-white ">💎 {item.total_diamonds}</p>
    </div>
  );
}
