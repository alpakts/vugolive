import Image from 'next/image'
import React, { useEffect } from 'react'
import UpdateProfile from './components/update-profile'
import SlidingModal from '../web-components/modals/sliding-modal'
import {  FaUser, FaUserEdit } from 'react-icons/fa'
import PopupModalComp from '../web-components/popup-modal/popup-modal'
import CustomButton from '../web-components/button/button'

const AccountHeader = ({user}) => {
  if (!user) {
    return null;
    
  }
  const popupModal = React.useRef(null);
  useEffect(() => {
    if (user && user.gender == null) {
      popupModal.current.openModal();
    }else{
      popupModal.current.closeModal();
    }
  }
  , [])
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  return (
    <div className="flex flex-row flex-nowrap  justify-between mb-7 ">
    <div className="flex gap-5 flex-row items-center justify-center ">
    {user?.profileimages ?   <Image
        className="outline rounded-full bg-white outline-gray-900 aspect-square outline-offset-2 outline-[8px]"
        src={fileBaseUrl+user.profileimages}
        width={50}
        height={50}
      /> : (
        <FaUser className="outline rounded-full bg-black outline-gray-900 outline-offset-2 outline-[8px]" size={70} />
      )}
    
      <div><span>{user.fullName}</span>
      <div>ID: {user.id}</div></div>
    </div>
    <SlidingModal  OpenButton={<FaUserEdit  className="flex items-center h-full" size={24} />} ><UpdateProfile></UpdateProfile></SlidingModal>
    <PopupModalComp ref={popupModal} >
        <div className="flex flex-col items-center gap-4 justify-center p-4">
          <h1 className="text-lg font-bold">Keşfette diğer kullanıcılara görünmek için lütfen cinsiyetinizi seçiniz!</h1>
          <SlidingModal  OpenButton={<CustomButton className="bg-black text-white ">CİNSİYET SEÇ</CustomButton>} ><UpdateProfile></UpdateProfile></SlidingModal>
        </div>
      </PopupModalComp>
  </div>
  )
}

export default AccountHeader