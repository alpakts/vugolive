import React, { useEffect, useRef } from 'react'
import MenuItem from '../web-components/menu-item'
import { FaWallet, FaUserAltSlash, FaUserPlus, FaShareAlt, FaRegBookmark, FaFileAlt, FaInfoCircle, FaChevronLeft, FaGooglePlay, FaUser, FaUserLock } from 'react-icons/fa';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import FollowersList from './components/followings';
import SlidingModal from '../web-components/modals/sliding-modal';
import BlocksList from './components/blocks';
import DiamondPage from './components/diamond';
import PublisherApplicationForm from './components/publisher-form';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import Terms from '../contracts/terms';
import Kvkk from '../contracts/kvkk';
import Policy from '@/app/(app)/policy/page';
const AccounHome = () => {
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const router = useRouter();
  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }).catch((error) => {
      console.error('Çıkış yapılırken bir hata oluştu:', error)
    })
  }
  return (
    <div className="w-full mt-6 space-y-4 text-white">
      {/* Elmas Yükleme */}
      <SlidingModal
        OpenButton={<MenuItem icon={<FaWallet />} text="Elmas Yükleme" />}
      >
        <DiamondPage />
      </SlidingModal>
      {/* Takip Edilenler */}

      <SlidingModal
        OpenButton={
          <MenuItem icon={<FaRegBookmark />} text="Takip Edilenler" />
        }
      >
        <FollowersList />
      </SlidingModal>
      {/* Engellenenler */}

      <SlidingModal
        OpenButton={<MenuItem icon={<FaUserAltSlash />} text="Engellenenler" />}
      >
        {" "}
        <BlocksList />
      </SlidingModal>
      {/* Uygulamayı Paylaş */}
      <MenuItem
        icon={<FaShareAlt />}
        onClick={() => {
          if (navigator.share) {
            navigator
              .share({
                title: "Vugo Live",
                text: "Sende Vugo Live'a katıl ve eğlencenin tadını çıkar!",
                url: window.location.origin,
              })
          } else {
            console.log("Web Share API desteklenmiyor.");
          }
        }}
        text="Uygulamayı Paylaş"
      />
      {/* Yayıncı Ol */}
      {apiUser.is_host == 2 ? (
        <MenuItem
          icon={<FaUser />}
          text="Yayıncı Gösterge Paneli"
          onClick={() => {
            router.push("/account/host-panel");
          }}
        />
      ) : apiUser.is_host == 1 ? (
        <MenuItem icon={<FaUserLock />} text="Doğrulama Bekleniyor"></MenuItem>
      ) : (
        <SlidingModal
          OpenButton={<MenuItem icon={<FaUserPlus />} text="Yayıncı Ol" />}
        >
          {" "}
          <PublisherApplicationForm />
        </SlidingModal>
      )}
      {/* Kullanım Koşulları */}
      <SlidingModal
        OpenButton={<MenuItem icon={<FaFileAlt />} text="Kullanım Koşulları" />}
      >
        {" "}
        <Terms />
      </SlidingModal>

      {/* Gizlilik Politikası */}

      <SlidingModal
        OpenButton={
          <MenuItem icon={<FaInfoCircle />} text="Gizlilik Politikası" />
        }
      >
        {" "}
        <Kvkk />
      </SlidingModal>
      <SlidingModal
        OpenButton={
          <MenuItem icon={<FaInfoCircle />} text=" (CSAE) Konusunda Uygulama Politikası Beyanı" />
        }
      >
        {" "}
        <Policy />
      </SlidingModal>
      <MenuItem
        onClick={() => {
          router.push(process.env.NEXT_PUBLIC_APP_PUBLIC_URL);
        }}
        icon={<FaGooglePlay />}
        text="Uygulamayı indir"
      />
      <MenuItem
        onClick={handleLogout}
        icon={<FaChevronLeft />}
        text="Çıkış Yap"
      />
      <div className="flex  flex-row gap-5 items-center ml-4">
        <Image src={"/logo.png"} width={50} height={50} alt="logo" />{" "}
        <span>1.4</span>
      </div>
    </div>
  );
}

export default AccounHome