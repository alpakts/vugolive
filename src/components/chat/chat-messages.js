import Image from "next/image";
import { format } from "date-fns"; // Tarih işlemleri için date-fns kullanıyoruz
import { useEffect, useRef, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import VideoPlayer from "../web-components/video-player/video-player";
import { FaPlay, FaPlayCircle } from "react-icons/fa";
// Mesajları tarihe göre gruplandıran fonksiyon
const groupMessagesByDate = (messages) => {
  return messages.reduce((groups, message) => {
    const messageDate = new Date(message.time);
    const dateKey = format(messageDate, "yyyy-MM-dd"); // YYYY-MM-DD formatında anahtar
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
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const chatRef = useRef(null);
  const groupedMessages = groupMessagesByDate(messages);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scroll({ top: chatRef.current.scrollHeight });
    }
  }, [messages]);
  return (
    <div ref={chatRef} className="space-y-4 flex-grow overflow-auto">
      {totalMessageCount > pageSize && (
        <button
          className="text-white bg-gray-600 px-3 py-1 rounded w-full"
          onClick={() => setPageSize(pageSize + 20)}
        >
          Daha fazla mesaj yükle
        </button>
      )}

      {Object.keys(groupedMessages).map((dateKey, index) => {
        const date = new Date(dateKey);
        const formattedDate = format(date, "MMMM d, yyyy");

        return (
          <div key={index}>
            {/* Tarih başlığı */}
            <div className="text-center text-gray-500 my-4">
              {formattedDate}
            </div>

            {/* Gruplandırılmış mesajlar */}
            {groupedMessages[dateKey].map((msg, msgIndex) => {
              const messageTime = format(new Date(msg.time), "HH:mm");

              return (
                <div
                  key={msgIndex}
                  className={
                    msg.senderUser?.user_identity === userEmail
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div className="flex flex-col items-start">
                    {msg.msgType === "text" && (
                      <div
                        className={
                          msg.senderUser?.user_identity === userEmail
                            ? "bg-primary text-black px-4 py-2 rounded-lg max-w-xs"
                            : "bg-gray-900 text-white px-4 py-2 rounded-lg max-w-xs"
                        }
                      >
                        {msg.msg}
                      </div>
                    )}
                    {msg.msgType == "image" && (
                      <div
                        className={
                          msg.senderUser?.userid === userEmail
                            ? "bg-primary text-black px-4 py-2 rounded-lg max-w-xs"
                            : "bg-gray-900 text-white px-4 py-2 rounded-lg max-w-xs"
                        }
                      >
                        <PhotoProvider>
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
                    {msg.msgType == "video" && (
                      <div
                        className={
                          msg.senderUser?.userid === userEmail
                            ? "bg-primary text-black px-4 py-2 rounded-lg max-w-xs relative"
                            : "bg-gray-900 text-white px-4 py-2 rounded-lg max-w-xs relative"
                        }
                      >
                        <video
                          onClick={() => setIsVideoOpen(true)}
                          id="myVideo"
                          className="custom-video aspect-auto rounded-3xl max-h-[100vh]"
                        >
                          <source
                            src={fileBaseUrl + msg.image}
                            type="video/mp4"
                          />
                          Tarayıcınız bu videoyu desteklemiyor.
                        </video>
                        <div onClick={() => setIsVideoOpen(true)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2  bg-black p-2 -translate-y-1/2 rounded-full">
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
                    {/* Saat ve dakika */}
                    <div className="text-xs text-gray-400 mt-1">
                      {messageTime}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
