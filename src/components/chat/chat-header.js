import { blockHost, unblockHost } from '@/lib/services/api-service';
import { setApiUser } from '@/lib/slices/api-user-slice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {  FaUser } from 'react-icons/fa';
import {  FiChevronLeft, FiSettings, FiVideo } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import SlidingModal from '../web-components/modals/sliding-modal';
import ReportForm from '../account/components/report-user';
import { MdBlockFlipped, MdOutlineReportProblem } from 'react-icons/md';
import { useAppSelector } from '@/lib/hooks';
import { IoVideocamSharp } from 'react-icons/io5';

const ChatHeader = ({ messageToUser, fileBaseUrl,popupRef }) => {
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const dispatch = useDispatch();
  const slidingModalRef = useRef(null);
  const router = useRouter();
  const [menuOpen,setMenuOpen] = useState(false);
  useEffect(() => {
    if (apiUser) {
      dispatch(setApiUser({...apiUser,is_block_list:eval(apiUser.is_block_list)}));
    }
  }, []);
  const handleBlockUser = (userId,apiUser) => {
    blockHost(apiUser.id, userId).then(() => {
      popupRef.current.triggerPopup(<FaUser/>,'Kullanıcı engellendi.');
      dispatch(setApiUser({
        ...apiUser,
        is_block_list: apiUser.is_block_list?.concat([userId])
      }));
    }).catch((err) => console.log(err));
  }
  const handleRemoveBlock = (userId,apiUser) => {
    unblockHost(apiUser.id,userId).then(() => {
      popupRef.current.triggerPopup(<FaUser/>,'Kullanıcı engeli kaldırıldı.');
      dispatch(setApiUser({
        ...apiUser,
        is_block_list: apiUser.is_block_list.filter((id) => id !== userId)
      }));
    }).catch((err) => console.log(err));
  }
  return (
    <header className="flex items-center justify-between border-b pb-2 border-gray-700 relative">
      <div className="w-full flex gap-5 items-center ">
        <button className="text-white" onClick={() => router.push('/account/messages')}>
          <FiChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-3" onClick={()=>{
          router.push(`/profile?userId=${messageToUser.id}`);
        }}>
        {messageToUser.profileimages || messageToUser.images?.length > 0   ?
              <Image
              src={messageToUser.profileimages?fileBaseUrl+messageToUser?.profileimages: messageToUser.images ? fileBaseUrl+messageToUser.images[0]?.image: '' }
              alt={`${messageToUser.fullName}'s profile`}
              width={0}
              height={0}
              sizes='100vw'
              className="w-12 h-12 rounded-full object-cover mr-4"
            /> : <FaUser className="w-12 h-12 rounded-full object-cover mr-4" />}
          <div>
            <h2 className="text-base font-bold flex gap-2 items-center">
              {messageToUser.fullName?.split(' ').slice(0,1).join(' ')} <span className="text-xs">{messageToUser.age}</span>
              {messageToUser?.is_host ? <Image src="/verified.png" alt="Doğrulama" width={24} height={24} /> : null}
            </h2>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-400">{messageToUser.country_data?.country_name == '🇹🇷' ? <Image src={'/turkey.png'} width={24} height={24} />:messageToUser.country_data?.country_name }</span>
            </div>
          </div>
         
        </div>
      </div>
      { messageToUser.is_host == 2 && <button className="text-white px-2 relative">
        <IoVideocamSharp size={24}  onClick={()=>{
          router.push(`/chat/channel/${messageToUser.id}and${apiUser.id}?calledUser=${messageToUser.id}`);
        }} />
      
      </button>}
      <button className="text-white px-2 relative">
        <FiSettings size={24}  onClick={()=>setMenuOpen(!menuOpen)} />
      
      </button>
      <div className={`absolute top-full transition-transform duration-300 ease-in-out z-50 origin-top right-0 w-screen max-w-xl text-white bg-gray-800 rounded-lg shadow-lg ${menuOpen ? 'scale-100' : 'scale-0'}`}>
  <ul className="divide-y divide-gray-700">
    <SlidingModal
      ref={slidingModalRef}
      OpenButton={
        <li className="p-4 hover:bg-gray-700 flex items-center gap-2 cursor-pointer transition-colors duration-200" onClick={() => {}}>
          <MdOutlineReportProblem size={24} />
          Şikayet Et
        </li>
      }
    >
      <ReportForm closeModal={slidingModalRef?.current?.closeModal} host={messageToUser} />
    </SlidingModal>
    {!apiUser?.is_block_list?.includes(messageToUser.id) ? (
      <li
        className="p-4 hover:bg-gray-700 flex items-center gap-2 cursor-pointer transition-colors duration-200"
        onClick={() => {
          setMenuOpen(false);
          handleBlockUser(messageToUser.id,apiUser);
        }}
      >
       <MdBlockFlipped  size={24}  />
        Engelle
      </li>
    ) : (
      <li
        className="p-4 hover:bg-gray-700 flex items-center gap-2 cursor-pointer transition-colors duration-200"
        onClick={() => {
          setMenuOpen(false);
          handleRemoveBlock(messageToUser.id,apiUser);
        }}
      >
        <MdBlockFlipped  size={24}  />
        Engeli Kaldır
      </li>
    )}
  </ul>
</div>

    </header>
  );
};

export default ChatHeader;
