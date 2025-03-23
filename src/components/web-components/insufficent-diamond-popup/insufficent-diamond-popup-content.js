import React from 'react'
import CustomButton from '../button/button'
import Image from 'next/image'

const InsufficentDiamondPopupContent = ({popupRef}) => {
  return (
      <div className="flex flex-col items-center gap-4 justify-center p-4 h-[400px] px-6">
        <Image
                  src="/diamond.png"
                  alt="Diamond"
                  width={100}
                  height={100}
                />
        <h1 className="font-bold text-center text-base">Sohbete Devam etmek için yeterli elmasınız yok , Lütfen elmas satın alın ve sohbetin keyfini çıkarın</h1>
        <CustomButton onClick={()=>{
            window.location.href='/account/charge'
        }}  className="!p-4 w-full bg-primary text-black hover:text-white hover:bg-black">Elmas Satın Al</CustomButton>
        <CustomButton onClick={()=>popupRef.current.closeModal()} className="bg-black text-white opacity-70 !p-2 w-1/2">İptal Et</CustomButton>
      </div>
  )
}

export default InsufficentDiamondPopupContent