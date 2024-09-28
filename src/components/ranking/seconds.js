export default function SecondRank() {
    return (
      <div className="relative p-6 rounded-xl text-center w-full  mx-auto">
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full flex items-center justify-center relative">
            <div className="absolute w-28 h-28 flex justify-center items-center top-0 ">
              <img src="/golden-frame.png" alt="Wreath" className="w-[100%]   max-w-none " />
            </div>
            <img src="/girl.png" alt="Vugo Logo" className="w-full h-full rounded-full" />
          </div>
        </div>
  
        {/* İsim ve Puan */}
        <h3 className="text-white text-xl font-bold mt-2">Vugo Türkiye</h3>
        <div className="flex justify-center  text-yellow-400">
        </div>
        <p className="text-white ">💎 14177</p>
      </div>
    );
  }
  