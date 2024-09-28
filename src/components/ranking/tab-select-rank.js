"use client";
export default function TabComponentRank({activeTab,setActiveTab}) {
 
  return (
    <div className="flex items-center pb-2 space-x-4 text-sm justify-between ">
      {/* Sekmeler */}
      <div className="flex items-center  rounded-full w-full">
        <button
          className={`py-2 px-2 font-bold flex min-w-max items-center rounded-r-none  text-center justify-center  w-full ${
            activeTab === "Profiller"
              ? "bg-primary text-black"
              : "text-secondary bg-black"
          } `}
          onClick={() => {
            setActiveTab("Profiller")
          }}
        >
          Yayıncılar
        </button>
        <button
          className={`py-2 px-2 font-bold min-w-max flex items-center rounded-l-none  justify-center w-full ${
            activeTab === "Canlı"
               ? "bg-primary text-black"
              : "text-secondary bg-black"
          }  `}
          onClick={() => {
            setActiveTab("Canlı")
          }}
        >
         Destekçiler
        </button>
      </div>

    </div>
  );
}
