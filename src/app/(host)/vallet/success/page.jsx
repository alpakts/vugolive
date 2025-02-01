'use client';
import { useAppSelector } from '@/lib/hooks';
import { addDiamonds } from '@/lib/services/api-service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loading from '../../loading';

const Page = () => {
  const router = useRouter();
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (apiUser) {
      const amount = localStorage.getItem("amount");
      addDiamonds(apiUser?.id,amount,2,apiUser.is_host,-1,2,apiUser?.id).then((response) => {
        if (response.data.status == true) {
          setSuccess(true);
          localStorage.removeItem("amount");
          setLoading(false);
        }else{
          setSuccess(false);
          setLoading(false);
        }
      });
    }
  }, [apiUser])
  if (loading) {
    return <Loading></Loading>;
  }
  return (
 <>
<div className="flex items-center justify-center h-screen bg-black text-primary">
    {success ? (
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Ödeme Başarılı!</h1>
        <p className="text-lg mb-6">
          İşleminiz başarıyla tamamlandı. <br />
          Teşekkür ederiz!
        </p>
        <button
        onClick={()=>router.push('/') }
          className="px-6 py-2 bg-primary text-black font-semibold rounded-md hover:bg-yellow-600"
        >
          Ana Sayfaya Dön
        </button>
      </div>
      ): (
        <div className="text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Ödeme Başarısız!</h1>
        <p className="text-lg mb-6">
          İşleminizi tamamlayamadık. Lütfen destek ekibimizle iletişime geçin.
        </p>
        <button
          onClick={()=>router.push('/') }
          className="px-6 py-2 bg-primary text-black font-semibold rounded-md hover:bg-yellow-600"
        >
          Ana Sayfaya Dön
        </button> 
        </div>
      )}
    </div>
 </>
  )
}

export default Page