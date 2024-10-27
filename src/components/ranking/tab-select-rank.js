"use client";
export default function TabComponentRank({ activeTab, setActiveTab,activeOrder,setActiveOrder,activeOpType,setActiveOpType }) {
  const orderList =[
    {name:"Günlük",value:0},
    {name:"Haftalık",value:1},
    {name:"Aylık",value:2}
  ];
  return (
    <div className="flex flex-col items-center pb-2  text-sm justify-between ">
      {/* Sekmeler */}
      <div className="flex items-center  rounded-full w-full">
        <button
          className={`py-2 px-2 font-bold flex min-w-max items-center rounded-r-none  text-center justify-center  w-full ${
            activeTab === 2
              ? "bg-primary text-black"
              : "text-secondary bg-black"
          } `}
          onClick={() => {
            setActiveTab(2);
            setActiveOpType(0);
          }}
        >
          Yayıncılar
        </button>
        <button
          className={`py-2 px-2 font-bold min-w-max flex items-center rounded-l-none  justify-center w-full ${
            activeTab === 0
              ? "bg-primary text-black"
              : "text-secondary bg-black"
          }  `}
          onClick={() => {
            setActiveTab(0);
            setActiveOpType(1);
          }}
        >
          Destekçiler
        </button>
      </div>
      <div className="flex gap-2 py-2 items-start w-full">
        {orderList.map((item,index)=>(
          <button
            key={index}
            className={`py-2 px-2 font-bold min-w-max flex items-center rounded-lg justify-center w-ful  text-black ${
              activeOrder === item.value
                ? "bg-primary text-black"
                : "text-black bg-secondary"
            }  `}
            onClick={() => {
              setActiveOrder(item.value);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
