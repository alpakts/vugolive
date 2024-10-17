import Image from 'next/image';
import { format } from 'date-fns'; // Tarih işlemleri için date-fns kullanıyoruz
import { useEffect, useRef } from 'react';

// Mesajları tarihe göre gruplandıran fonksiyon
const groupMessagesByDate = (messages) => {
  return messages.reduce((groups, message) => {
    const messageDate = new Date(message.time);
    const dateKey = format(messageDate, 'yyyy-MM-dd'); // YYYY-MM-DD formatında anahtar

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(message);
    return groups;
  }, {});
};

const ChatMessages = ({ messages, userEmail, fileBaseUrl, pageSize, setPageSize, totalMessageCount }) => {
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
        const formattedDate = format(date, 'MMMM d, yyyy');

        return (
          <div key={index}>
            {/* Tarih başlığı */}
            <div className="text-center text-gray-500 my-4">
              {formattedDate}
            </div>

            {/* Gruplandırılmış mesajlar */}
            {groupedMessages[dateKey].map((msg, msgIndex) => {
              const messageTime = format(new Date(msg.time), 'HH:mm'); 

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
                    {msg.msgType === "image" && (
                      <div
                        className={
                          msg.senderUser?.userid === userEmail
                            ? "bg-primary text-black px-4 py-2 rounded-lg max-w-xs"
                            : "bg-gray-900 text-white px-4 py-2 rounded-lg max-w-xs"
                        }
                      >
                        <Image
                          src={fileBaseUrl + msg.image}
                          alt="Mesaj"
                          width={100}
                          height={100}
                          className="rounded-lg aspect-auto"
                        />
                      </div>
                    )}
                    {msg.msgType === "gift" && (
                      <div
                        className={
                          msg.senderUser?.userid === userEmail
                            ? "bg-primary text-black px-4 py-2 rounded-lg max-w-xs"
                            : "bg-gray-900 text-white px-4 py-2 rounded-lg max-w-xs"
                        }
                      >
                        <Image
                          src={fileBaseUrl + msg.image}
                          alt="Mesaj"
                          width={100}
                          height={100}
                          className="rounded-lg aspect-auto"
                        />
                      </div>
                    )}
                    {/* Saat ve dakika */}
                    <div className="text-xs text-gray-400 mt-1">{messageTime}</div>
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
