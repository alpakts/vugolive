import Image from 'next/image'
import React from 'react'
import UpdateProfile from './components/update-profile'
import SlidingModal from '../web-components/modals/sliding-modal'
import { FaEdit, FaUser, FaUserEdit } from 'react-icons/fa'

const AccountHeader = ({user}) => {
  if (!user) {
    return null;
    
  }
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
        <FaUser className="outline rounded-full bg-white outline-gray-900 outline-offset-2 outline-[8px]" size={70} />
      )}
    
      <span>{user.fullName}</span>
    </div>
    <SlidingModal  OpenButton={<FaUserEdit  className="flex items-center h-full" size={24} />} ><UpdateProfile></UpdateProfile></SlidingModal>
   
  </div>
  )
}

export default AccountHeader