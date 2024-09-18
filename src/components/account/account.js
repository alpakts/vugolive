import React from 'react'
import MenuItem from '../web-components/menu-item'
import { FaWallet, FaUserAltSlash, FaUserPlus, FaShareAlt, FaRegBookmark, FaFileAlt, FaInfoCircle, FaChevronLeft } from 'react-icons/fa';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
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
    <MenuItem icon={<FaWallet />} text="Elmas Yükleme" />
    {/* Takip Edilenler */}
    <MenuItem icon={<FaRegBookmark />} text="Takip Edilenler" />
    {/* Engellenenler */}
    <MenuItem icon={<FaUserAltSlash />} text="Engellenenler" />
    {/* Uygulamayı Paylaş */}
    <MenuItem icon={<FaShareAlt />} text="Uygulamayı Paylaş" />
    {/* Yayıncı Ol */}
    <MenuItem icon={<FaUserPlus />} text="Yayıncı Ol" />
    {/* Kullanım Koşulları */}
    <MenuItem icon={<FaFileAlt />} text="Kullanım Koşulları" />
    {/* Gizlilik Politikası */}
    <MenuItem icon={<FaInfoCircle />} text="Gizlilik Politikası" />
    <div className='flex  flex-row gap-5 items-center ml-4'>
    <Image  src={'/logo.png'} width={50} height={50} alt='logo' /> <span>1.4</span>
    </div>
    <MenuItem onClick={handleLogout} icon={<FaChevronLeft  />} text="Çıkış Yağ" />

  </div>
  )
}

export default AccounHome