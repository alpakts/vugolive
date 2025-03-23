// components/DiamondPage.js
'use client';
import Image from 'next/image';
import CustomButton from '@/components/web-components/button/button';
import { getDiamondPurchaseList, getUserProfile, valletRequest } from '@/lib/services/api-service';
import { useEffect, useState } from 'react';
import Loading from '@/app/(app)/loading';
import { GrDocumentText } from "react-icons/gr";
import { useRouter } from 'next/navigation';
import PaymentForm from './payment/payment-form';

const DiamondPage = async () => {
  const [diamondList,setDiamondList] = useState([]);
  const [loading,setLoading] = useState(true);
  const [apiUser,setApiUser] = useState({});
  const [currentStep,setCurrentStep] = useState(0);
  const [selectedDiamond,setSelectedDiamond] = useState(null);
  const router = useRouter();
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
    // const getPaymentForm = (diamond) =>{
    //  if (apiUser) {
    //   valletRequest(diamond.price,apiUser.fullName,apiUser.fullName,diamond.diamond,"05333333333",apiUser.email).then((response) => {
    //     console.log(response.data);
    //   });
    //  }
    // }
    if (loading) {
      return <Loading></Loading>;
      
    }
  return (
    <div className=" bg-black text-white p-4">
        {/* <a className="bg-white my-5" href="https://www.gpay.com.tr" target="blank" title="www.gpay.com.tr | Gpay "><Image src="https://www.gpay.com.tr/assets/gpay_logo/gpay-atm-450px.png" target="blank" title="www.gpay.com.tr | Gpay" width={400} height={80} className="h-auto w-full"  alt="www.gpay.com.tr | Gpay "/></a> */}
      <div className="flex items-center justify-center px-4 py-2 w-full relative">
        <h1 className="font-bold text-lg">VUGO | CÜZDAN</h1> 
        <div className='absolute right-0 flex-col flex justify-center items-center top-5' onClick={()=>{
          router.push('/account/diamond-history');
        }}>
          <GrDocumentText size={24} /> 
          <p className='text-sm w-9'>Elmas Kaydı</p>
        </div>
      </div>

      {/* Diamonds Section */}
      <div className="text-center py-3">
       <div className='flex space-x-2 mx-auto justify-center'>
       <Image
          src="/diamond.png"
          alt="Diamond"
          width={50}
          height={50}
        />
        <h2 className="text-4xl font-bold">{apiUser?.diamond}</h2>
       </div>
        <p className="text-lg">ELMASLARIN</p>
      </div>
        <CustomButton onClick={()=>{
          window.open('https://wa.me/05312983233?text=Merhaba%20Elmas%20Fiyat%20Listenizi%20Alabilir%20miyim?%20');
        }} className="font-bold !text-lg w-full bg-white py-2 text-black text-center rounded-lg mb-6">
          Satın alımlar devredışı yönetim ile iletişime geçiniz
        </CustomButton>

      {/* <div className="px-4 text-center">
        <p className="text-sm mb-4">
          Sohbet, video görüşmeleri ve canlı yayınlar gibi tüm özelliklerin
          tadını çıkarmak için lütfen Elmas satın alın.
        </p>

        <div className="space-y-4 overflow-auto max-h-[40vh]">

          {currentStep == 0 && diamondList.map((diamond, index) => (
            <div
              key={diamond.id}
              className="flex justify-between items-center bg-secondary text-black p-4 rounded-lg"
              onClick={()=>{
                setSelectedDiamond(diamond);
                setCurrentStep(1)
              }}
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
          {currentStep == 1 && (
            <PaymentForm diamond={selectedDiamond} setStep={setCurrentStep} />
            )}
        </div>
      </div> */}

      {/* Footer Text */}
      {/* <div className="px-4 py-6 text-center text-sm text-gray-500">
        <p>
          Satın alma işlemine devam ederek Koşulları kabul etmiş olursunuz.
        </p>
        <p className="text-black font-bold">
          Kullanım Koşulları ve Gizlilik Politikası
        </p>
      </div> */}
    </div>
  );
};

export default DiamondPage;
