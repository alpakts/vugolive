import Image from 'next/image'
import React from 'react'
import UpdateProfile from './components/update-profile'
import SlidingModal from '../web-components/modals/sliding-modal'

const AccountHeader = ({user}) => {
  if (!user) {
    return null;
    
  }
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  return (
    <div className="flex flex-row flex-nowrap  justify-between mb-7 ">
    <div className="flex gap-5 flex-row items-center ">
      <Image
        className="outline rounded-full bg-white outline-gray-900 outline-offset-2 outline-[8px]"
        src={user?.profileimages ? fileBaseUrl+user.profileimages: "/profile-placeholder.png"}
        width={70}
        height={70}
      />
      <span>{user.fullName}</span>
    </div>
    <SlidingModal  OpenButton={<Image src={"/edit-icon.svg"}  width={40} height={40} />} ><UpdateProfile></UpdateProfile></SlidingModal>
   
  </div>
  )
}

export default AccountHeader