import Image from "next/image";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { tr } from 'date-fns/locale';
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import VideoPlayer from "../web-components/video-player/video-player";
import { FaPlayCircle, FaTrash } from "react-icons/fa";
import { updateAllMessagesBetweenUsers, updateSelectedMessagesBetweenUsers } from "@/lib/services/firebase-service";
import { useAppSelector } from "@/lib/hooks";

const groupMessagesByDate = (messages) => {
  return messages.reduce((groups, message) => {
    const messageDate = new Date(message.time);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let dateKey;
    if (messageDate.toDateString() === today.toDateString()) {
      dateKey = "Bugün";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      dateKey = "Dün";
    } else {
      dateKey = format(messageDate, "dd MMMM yyyy", { locale: tr });
    }

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(message);
    return groups;
  }, {});
};

const ChatMessages = ({
  messages,
  userEmail,
  fileBaseUrl,
  pageSize,
  setPageSize,
  totalMessageCount,
  messagesToId
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [longPressActivated, setLongPressActivated] = useState(false);
  const chatRef = useRef(null);
  const longPressTimer = useRef(null);
  const groupedMessages = groupMessagesByDate(messages);
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scroll({ top: chatRef.current.scrollHeight });
    }
  }, [messages]);
  useEffect(() => {
    selectedMessages.length  == 0 && setLongPressActivated(false);
    }, [selectedMessages]);
  const handleLongPressStart = (msg) => {
    longPressTimer.current = setTimeout(() => {
      if (!longPressActivated) {
        handleSelectMessage(msg);
        setLongPressActivated(true);
      }
    }, 500); 
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer.current);
  };

  const handleSelectMessage = (msg) => {
    if (selectedMessages.filter(x=>x.id == msg.id).length>0) {
      setSelectedMessages(selectedMessages.filter((xMsg) => xMsg.id !== msg.id));
    } else {
      setSelectedMessages([...selectedMessages, msg]);
    }
  };

  const handleCancelSelection = () => {
    setSelectedMessages([]);
    setLongPressActivated(false);
  };

  const handleDeleteMessages = () => {
    const selectedMessagesİds = selectedMessages.map((msg) => msg.id);
    updateSelectedMessagesBetweenUsers(apiUser?.identity,messagesToId,selectedMessagesİds);
    setSelectedMessages([]);
    setLongPressActivated(true);
  };

  return (
    <div ref={chatRef} className="space-y-4  flex-grow overflow-auto relative">
      {totalMessageCount > pageSize && (
        <button
          className="text-white bg-gray-600 px-3 py-1 rounded w-full"
          onClick={() => setPageSize(pageSize + 20)}
        >
          Daha fazla mesaj yükle
        </button>
      )}

      {selectedMessages.length > 0 && (
        <div className="fixed top-0 h-[72px] left-0 right-0 bg-gray-800 p-4 flex items-center justify-between z-10">
          <button
            onClick={handleCancelSelection}
            className="text-white text-sm"
          >
            İptal et
          </button>
          <FaTrash
            onClick={handleDeleteMessages}
            className="text-white cursor-pointer"
          />
        </div>
      )}

      {Object.keys(groupedMessages).map((dateKey, index) => (
        <div key={index}>
          <div className="text-center text-gray-500 my-4">{dateKey}</div>
          {groupedMessages[dateKey].map((msg, msgIndex) => {
            const messageTime = format(new Date(msg.time), "HH:mm");
            const isSelected = selectedMessages.filter(x=>x.id === msg.id).length > 0;
            return (
              <div
                key={msgIndex}
                className={
                  msg.senderUser?.user_identity === userEmail
                    ? "flex justify-end my-1 select-none"
                    : "flex justify-start my-1 select-none"
                }
                onMouseDown={() => handleLongPressStart(msg)}
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
                onTouchStart={() => handleLongPressStart(msg)}
                onTouchEnd={handleLongPressEnd}
                onClick={() => {
                  if (longPressActivated) {
                    handleSelectMessage(msg);
                  }
                }}
              >
                <div
                  className={`flex  ${msg.senderUser?.user_identity === userEmail && 'flex-row-reverse'} items-center gap-2  ${
                    isSelected ? "bg-blue-600 " : ""
                  } p-1 rounded-lg`}
                >
                  {msg.msgType === "text" && (
                    <div
                      className={
                        msg.senderUser?.user_identity === userEmail
                          ? "bg-primary text-black px-4 py-2 rounded-lg max-w-xs break-all"
                          : "bg-gray-900 text-white px-4 py-2 rounded-lg max-w-xs break-all"
                      }
                    >
                      {msg.msg}
                    </div>
                  )}
                  {msg.msgType === "image" && (
                    <div
                      className={
                        msg.senderUser?.userid === userEmail
                          ? "bg-primary text-black  rounded-lg max-w-xs"
                          : "bg-gray-900 text-white rounded-lg max-w-xs"
                      }
                    >
                      <PhotoProvider >
                        <PhotoView src={fileBaseUrl + msg.image}>
                          <Image
                            src={fileBaseUrl + msg.image}
                            alt="Resim"
                            width={100}
                            height={100}
                            className="rounded-lg aspect-auto"
                          />
                        </PhotoView>
                      </PhotoProvider>
                    </div>
                  )}
                  {msg.msgType === "video" && (
                    <div
                      className={
                        msg.senderUser?.userid === userEmail
                          ? "bg-primary text-black   rounded-lg max-w-xs relative"
                          : "bg-gray-900 text-white   rounded-lg max-w-xs relative"
                      }
                    >
                      <video
                        onClick={() => setIsVideoOpen(true)}
                        id="myVideo"
                        className="custom-video aspect-auto  max-h-[100vh]"
                      >
                        <source
                          src={fileBaseUrl + msg.image}
                          type="video/mp4"
                        />
                        Tarayıcınız bu videoyu desteklemiyor.
                      </video>
                      <div
                        onClick={() => setIsVideoOpen(true)}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2  bg-black p-2 -translate-y-1/2 rounded-full"
                      >
                        <FaPlayCircle size={24} color={"white"} />
                      </div>
                      <VideoPlayer
                        callback={setIsVideoOpen}
                        open={isVideoOpen}
                        src={fileBaseUrl + msg.image}
                      />
                    </div>
                  )}
                  {msg.msgType === "gift" && (
                    <div
                      className={
                        msg.senderUser?.userid === userEmail
                          ? "bg-primary text-black px-4 py-2 rounded-lg max-w-xs flex flex-col justify-center items-center"
                          : "bg-gray-900 text-white px-4 py-2 rounded-lg max-w-xs flex flex-col justify-center items-center"
                      }
                    >
                      <Image
                        src={fileBaseUrl + msg.image}
                        alt="Mesaj"
                        width={100}
                        height={100}
                        className="rounded-lg aspect-auto"
                      />
                      <Image
                        src={"/diamond.png"}
                        alt="Mesaj"
                        width={20}
                        height={20}
                        className="rounded-lg aspect-auto"
                      />
                      <span> {msg.msg}</span>
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">{messageTime}</div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
