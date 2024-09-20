// components/FollowersList.js
import { FiChevronLeft } from "react-icons/fi";
import Image from "next/image";
import CustomButton from "@/components/web-components/button/button";

const BlocksList = () => {
  const users = [
    {
      name: "BARBİE",
      age: 27,
      flag: "🇹🇷",
      country: "Türkiye",
      profilePic: "/barbie.jpg",
      verified: true,
      emoji: "💋",
    },
    {
      name: "Zeynep",
      age: 24,
      flag: "🌟",
      country: "Vugo Yıldızları",
      profilePic: "/zeynep.jpg",
      verified: true,
      emoji: "🌟",
    },
    {
      name: "BARBİE",
      age: 27,
      flag: "🇹🇷",
      country: "Türkiye",
      profilePic: "/barbie.jpg",
      verified: true,
      emoji: "💋",
    },
    {
      name: "Zeynep",
      age: 24,
      flag: "🌟",
      country: "Vugo Yıldızları",
      profilePic: "/zeynep.jpg",
      verified: true,
      emoji: "🌟",
    },
    {
      name: "BARBİE",
      age: 27,
      flag: "🇹🇷",
      country: "Türkiye",
      profilePic: "/barbie.jpg",
      verified: true,
      emoji: "💋",
    },
    {
      name: "Zeynep",
      age: 24,
      flag: "🌟",
      country: "Vugo Yıldızları",
      profilePic: "/zeynep.jpg",
      verified: true,
      emoji: "🌟",
    },
    {
      name: "BARBİE",
      age: 27,
      flag: "🇹🇷",
      country: "Türkiye",
      profilePic: "/barbie.jpg",
      verified: true,
      emoji: "💋",
    },
    {
      name: "Zeynep",
      age: 24,
      flag: "🌟",
      country: "Vugo Yıldızları",
      profilePic: "/zeynep.jpg",
      verified: true,
      emoji: "🌟",
    },
    {
      name: "BARBİE",
      age: 27,
      flag: "🇹🇷",
      country: "Türkiye",
      profilePic: "/barbie.jpg",
      verified: true,
      emoji: "💋",
    },
    {
      name: "Zeynep",
      age: 24,
      flag: "🌟",
      country: "Vugo Yıldızları",
      profilePic: "/zeynep.jpg",
      verified: true,
      emoji: "🌟",
    },
    {
      name: "BARBİE",
      age: 27,
      flag: "🇹🇷",
      country: "Türkiye",
      profilePic: "/barbie.jpg",
      verified: true,
      emoji: "💋",
    },
    {
      name: "Zeynep",
      age: 24,
      flag: "🌟",
      country: "Vugo Yıldızları",
      profilePic: "/zeynep.jpg",
      verified: true,
      emoji: "🌟",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start bg-black text-secondary ">
      {/* Header */}
      <div className="flex items-center justify-center px-4 py-2">
        <h1 className="font-bold text-lg">ENGELLENENLER</h1>
      </div>

      {/* Followers List */}
      <div className="w-full flex-1 overflow-y-auto max-h-[80vh]">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center bg-slate-900 p-4 mb-4 rounded-lg shadow"
          >
            <Image
              src={
                "https://static.vecteezy.com/system/resources/thumbnails/037/281/091/small_2x/ai-generated-minimalist-vivid-advertisment-background-with-handsome-girl-with-books-and-copy-space-free-photo.jpeg"
              }
              alt={`${user.name}'s profile`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <h2 className="text-lg font-bold mr-2">{user.name}</h2>
                <span>{user.emoji}</span>
                <span className="ml-1 text-lg">{user.age}</span>
                {user.verified && (
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
                <span>{user.flag}</span> <span>{user.country}</span>
              </div>
            </div>
            <CustomButton  className="text-[10px]  !py-2 leading-none w-fit rounded-full  bg-red-300 text-red-500 hover:bg-red-400" >engeli kaldır</CustomButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlocksList;
