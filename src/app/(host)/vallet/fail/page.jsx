'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {
    const router = useRouter();
    useEffect(() => {
        localStorage.removeItem("amount");
    }, [])
  return (
    <div>   <div className="flex items-center justify-center h-screen bg-black text-primary">
    <div className="text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Ödeme Başarısız!</h1>
      <p className="text-lg mb-6">
        İşleminizi tamamlayamadık. Lütfen tekrar deneyin veya destek ekibimizle iletişime geçin.
      </p>
      <button
        className="px-6 py-2 bg-primary text-black font-semibold rounded-md hover:bg-yellow-600"
        onClick={()=>router.push('/') }
      >
      
        Ana Sayfaya Dön
      </button>
    </div>
  </div></div>
  )
}

export default Page