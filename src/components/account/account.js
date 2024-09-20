import React from 'react'
import MenuItem from '../web-components/menu-item'
import { FaWallet, FaUserAltSlash, FaUserPlus, FaShareAlt, FaRegBookmark, FaFileAlt, FaInfoCircle, FaChevronLeft, FaGooglePlay } from 'react-icons/fa';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import FollowersList from './components/followings';
import SlidingModal from '../web-components/modals/sliding-modal';
import BlocksList from './components/blocks';
import DiamondPage from './components/diamond';
import PublisherApplicationForm from './components/publisher-form';
const AccounHome = () => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('Çıkış Yapıldı')
    }).catch((error) => {
      console.error('Çıkış yapılırken bir hata oluştu:', error)
    })
  }
  return (
    <div className="w-full mt-6 space-y-4 text-white">
    {/* Elmas Yükleme */}
    <SlidingModal  OpenButton={<MenuItem icon={<FaWallet />} text="Elmas Yükleme" />} ><DiamondPage/></SlidingModal>
    {/* Takip Edilenler */}
   
    <SlidingModal  OpenButton={<MenuItem icon={<FaRegBookmark />} text="Takip Edilenler" />} ><FollowersList/></SlidingModal>
    {/* Engellenenler */}
    
    <SlidingModal  OpenButton={<MenuItem icon={<FaUserAltSlash />} text="Engellenenler" />} > <BlocksList/></SlidingModal>
    {/* Uygulamayı Paylaş */}
    <MenuItem icon={<FaShareAlt />} text="Uygulamayı Paylaş" />
    {/* Yayıncı Ol */}
    <SlidingModal  OpenButton={<MenuItem icon={<FaUserPlus />} text="Yayıncı Ol" />} > <PublisherApplicationForm/></SlidingModal>
    {/* Kullanım Koşulları */}
    <MenuItem icon={<FaFileAlt />} text="Kullanım Koşulları" />
    {/* Gizlilik Politikası */}
    <MenuItem onClick={()=>{
      window.location.pathname = '/privacy'
    }} icon={<FaInfoCircle />} text="Gizlilik Politikası" />
    <MenuItem icon={<FaGooglePlay />} text="Uygulamayı indir" />
    <div className='flex  flex-row gap-5 items-center ml-4'>
    <Image  src={'/logo.png'} width={50} height={50} alt='logo' /> <span>1.4</span>
    </div>
    <MenuItem onClick={handleLogout} icon={<FaChevronLeft  />} text="Çıkış Yap" />

  </div>
  )
}

export default AccounHome