// components/DiamondPage.js
'use client';
import Image from 'next/image';
import CustomButton from '@/components/web-components/button/button';
import { getDiamondPurchaseList, getUserProfile } from '@/lib/services/api-service';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';

const DiamondPage = async () => {
  const [diamondList,setDiamondList] = useState([]);
  const [loading,setLoading] = useState(true);
  const [apiUser,setApiUser] = useState({});
  useEffect(() => {
    const userId=localStorage.getItem('userId');
    getDiamondPurchaseList().then((response) => {
      setDiamondList(response.data.data);
    });
    getUserProfile(userId).then((response) => {
      setApiUser(response.data.data);
      setLoading(false);
    });
    },[]);
    if (loading) {
      return <Loading></Loading>;
      
    }
  return (
    <div className=" bg-black text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-center px-4 py-2">
        <h1 className="font-bold text-lg">VUGO | CÜZDAN</h1>
      </div>

      {/* Diamonds Section */}
      <div className="text-center py-3">
       <div className='flex space-x-2 mx-auto justify-center'>
       <Image
          src="/diamond.png" // Replace with your own image or icon
          alt="Diamond"
          width={50}
          height={50}
        />
        <h2 className="text-4xl font-bold">{apiUser?.diamond}</h2>
       </div>
        <p className="text-lg">ELMASLARIN</p>
      </div>
        <CustomButton className="font-bold text-lg w-full bg-white py-2 text-black text-center rounded-lg mb-6">
          Elmas Kazanmak İçin Tıkla
        </CustomButton>

      <div className="px-4 text-center">
        <p className="text-sm mb-4">
          Sohbet, video görüşmeleri ve canlı yayınlar gibi tüm özelliklerin
          tadını çıkarmak için lütfen Elmas satın alın.
        </p>

        {/* Diamond Purchase Options */}
        <div className="space-y-4 overflow-auto max-h-[30vh]">
          {diamondList.map((diamond, index) => (
            <div
              key={diamond.id}
              className="flex justify-between items-center bg-secondary text-black p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <Image
                  src="/diamond.png" // Replace with diamond image
                  alt="Diamond"
                  width={30}
                  height={30}
                />
                <span className="text-lg font-bold">{diamond.diamond}</span>
              </div>
              <CustomButton className="bg-black text-white font-bold py-2 px-4 rounded-full">
                ₺ {diamond.price}
              </CustomButton>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Text */}
      <div className="px-4 py-6 text-center text-sm text-gray-500">
        <p>
          Satın alma işlemine devam ederek Koşulları kabul etmiş olursunuz.
        </p>
        <p className="text-black font-bold">
          Kullanım Koşulları ve Gizlilik Politikası
        </p>
      </div>
    </div>
  );
};

export default DiamondPage;
