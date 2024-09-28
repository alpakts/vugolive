export default function LeaderboardItem() {
  return (
    <div className="relative   text-center w-64  mx-auto">
      <div className="flex justify-center">
        <div className="w-28 h-28  rounded-full flex items-center justify-center relative">
          <div className="absolute bottom-full">
            <img src="/crown.png" alt="Crown" className="w-10 " />
          </div>
          <div className="absolute w-28 h-28 flex justify-center items-center">
            <img src="/golden-leaf.png" alt="Wreath" className="w-[135%]  max-w-none " />
          </div>
          <div className="absolute top-full h-65 flex  items-center">
            <img src="/star.png" alt="start" className="h-5  max-w-none " />
            <img src="/star.png" alt="start" className="h-10  max-w-none " />
            <img src="/star.png" alt="start" className="h-5  max-w-none " />
          </div>
          <img src="/girl.png" alt="Vugo Logo" className="w-full h-full rounded-full" />
        </div>
      </div>

      {/* İsim ve Puan */}
      <h3 className="text-white text-xl font-bold mt-10">Vugo Türkiye</h3>
      <div className="flex justify-center  text-yellow-400">
      </div>
      <p className="text-white ">💎 14177</p>
    </div>
  );
}
