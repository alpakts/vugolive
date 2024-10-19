'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import PopupModalComp from '@/components/web-components/popup-modal/popup-modal';
import CustomButton from '@/components/web-components/button/button';
import { useAppSelector } from '@/lib/hooks';
import { updateIsVideoCall } from '@/lib/services/api-service';
import Loading from '@/app/(host)/loading';
import { useDispatch } from 'react-redux';
import { setApiUser } from '@/lib/slices/api-user-slice';

export default function DashboardTab() {
  const popupModalRef = useRef(null);
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const dispacth = useDispatch();
  const [isVideoCall, setIsVideoCall] = useState(apiUser?.is_video_call);
  const handleChangeVideoCallStatus = async () => {
    const response = await updateIsVideoCall(apiUser?.id,isVideoCall == 1 ? 0 : 1);
    if (response.status === 200) {
        setIsVideoCall(apiUser.is_video_call == 1 ? 0 : 1);
        dispacth(setApiUser({ ...apiUser, is_video_call: isVideoCall == 1 ? 0 : 1 }));
    }
    };
  const openModal = () => {
    popupModalRef.current.openModal();
    };
    useEffect(() => {
        setIsVideoCall(apiUser?.is_video_call);
    }, [apiUser]);
    if (apiUser == null) {
        return <Loading></Loading>;
        
    }
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <div>
          <p className="text-lg font-semibold">Aramalar İçin Uygun</p>
          <p className="text-sm text-gray-400">
            Bu açık olursa kullanıcılardan çağrı alırsınız.
          </p>
        </div>
        <button
          onClick={() => handleChangeVideoCallStatus()}
          className={`${
            isVideoCall ==1 ? 'bg-primary' : 'bg-gray-600'
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          {/* The circle inside the toggle switch that moves based on availability state */}
          <span
            className={`${
               isVideoCall == 1 ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </button>
      </div>

      {/* Start Live Broadcast Button */}
      <div className="flex items-center justify-center py-6">
        {/* Button to start the live broadcast */}
        <button className="bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold" onClick={()=>{
            openModal();
        }}>
          CANLI YAYINA BAŞLA
        </button>
      </div>

      {/* Diamond Section */}
      <div className="px-4 py-4 border-t border-b border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">ELMASLARINIZ</h2>
          <Image
            src="/logo.png"
            alt="Vugo Logo"
            width={40}
            height={40}
          />
        </div>
        <div className="text-4xl font-bold mb-2">{apiUser?.diamond}</div>
        <p className="text-sm text-gray-400">Minimum Çekim Miktarı: 10000</p>
        <button disabled={apiUser?.diamond<10000} className="bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold mt-4 w-full">
          ÇEKİMTALEBİ VER
        </button>
      </div>

      <div className="px-4 py-4">
        <h2 className="text-lg font-bold mb-2">Kazanılan Toplam Elmas</h2>
        <div className="text-2xl font-bold mb-4">0</div>
        <button className="bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold w-full">
          Çekim Talepleriniz
        </button>
      </div>
      <PopupModalComp ref={popupModalRef}>
        <div className='p-4 flex flex-col items-center justify-center '>
        <div>Canlı yayın başlatmak için uygulamayı indirebilirsinizr</div>
        <CustomButton target="_blank" href='https://www.google.com/' className="bg-black text-white my-2 mx-auto" >Uygulamayı indir</CustomButton>
        </div>
      </PopupModalComp>
    </>
  );
}
