'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const amount = localStorage.getItem("amount");
    console.log(amount);
  }, [])
  return (
 <>
<div className="flex items-center justify-center h-screen bg-black text-primary">
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
    </div>
 </>
  )
}

export default Page