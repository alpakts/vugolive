import { sendMessageBetweenUsers } from "@/lib/services/firebase-service";
import { useEffect, useRef, useState } from "react";
import { FiFile, FiGift, FiSend } from "react-icons/fi";
import SlidingModal from "../web-components/modals/sliding-modal";
import { getGifsList, getUrl } from "@/lib/services/api-service";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ChatMessageInput = ({ messageToUser, userEmail, apiUser }) => {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const router = useRouter();
  const [file , setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const slidingModalRef = useRef(null);
  const [giftList, setGiftList] = useState([]);
  useEffect(() => {
    getGifsList().then((res) => {
      setGiftList(res.data.data);
    }
    );
  }, []);
  const closeModal = () => {
    if (slidingModalRef.current) {
      slidingModalRef.current.closeModal();
    }
  };
  const handlesendMessage = async (msgType = 'text',gift,photo) => {
    if (newMessage.trim() === "" && msgType != 'gift'&& msgType != 'image' && msgType != 'video') {
      return;
    }
    if (newMessage.trim() !== "") {
      setNewMessage("");
    }
    let photoUrl = null;
    if (msgType == 'image' || msgType == 'video') {
      const fileResponse = await getUrl(photo);
      photoUrl = fileResponse.data.url;
    }
    sendMessageBetweenUsers(
      userEmail,
      messageToUser.identity,
      gift ? gift.diamond: newMessage,
      apiUser,
      messageToUser,
      msgType,
      gift,
      photoUrl
    )
  };

  return (
    <div className="flex items-center mb-4 space-x-2 p-2 bg-gray-800 rounded-full">
      <input
        type="text"
        placeholder="Buraya yaz."
        className="bg-gray-800 text-white w-full px-4 py-2 rounded-full focus:outline-none"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={()=>{
        handlesendMessage();
      }}>
        <FiSend size={24} />
      </button>
      {messageToUser?.is_host == 2 && (
          <SlidingModal modalTitle={''} ref={slidingModalRef} OpenButton={<FiGift size={24} />}>
          <div className="flex gap-2 p-2">
            <div className="bg-gray-900 w-fit px-4 py-3 rounded-full flex gap-2 items-center">
              <Image src={'/diamond.png'} className="aspect-square w-6 h-5" width={24} height={24} /> {apiUser?.diamond}
            </div>
            <div className="bg-gray-900 w-fit px-4 py-3 rounded-full flex gap-2 items-center" onClick={()=>{
              closeModal();
              router.push('/account/charge'); 
            }}>
              ekle <span className="text-lg">Elmaslar</span>
            </div>
          </div>
           <div className="grid grid-cols-4 mx-auto w-fit gap-3">
           {giftList.map((gift, index) => {
              return (
                <div key={index} className="flex items-center flex-col justify-between bg-gray-800 p-2 rounded-md mb-2 " onClick={()=>{
                  handlesendMessage('gift',gift);
                  closeModal();
                }}>
                  <div className="flex items-center">
                    <Image src={fileBaseUrl+gift.images} alt="gift" width={50} height={50} ></Image>
                  </div>
                  <div className="flex items-center">
                  <Image src={'/diamond.png'} className="aspect-square w-4 h-3" width={24} height={24} /> <span className="text-white">{gift.diamond}</span>
                    </div>
                </div>
              );

            })}
           </div>
          </SlidingModal>
      )}
      <button>
        <FiFile size={24} onClick={()=>{
          fileInputRef.current.click();
        }} />
       <input
  className="hidden"
  ref={fileInputRef}
  type="file"
  accept="image/*,video/*"
  onChange={(event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : null;
      if (fileType) {
        handlesendMessage(fileType, null, file);
        event.target.value = null;
      }
    }
  }}
/>
      </button>
    </div>
  );
};

export default ChatMessageInput;
