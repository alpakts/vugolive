'use client';
import Loading from '@/app/loading';
import withAuth from '@/hocs/with-auth';
import { getUserProfile } from '@/lib/services/api-service';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiFile, FiGift, FiSend, FiSettings } from 'react-icons/fi';
import { auth, db } from '../../../firebaseConfig';
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';

function ChatPage() {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const chatRef = useRef(null);
  const [pageSize, setPageSize] = useState(20);
  const router = useRouter();
  const [messageToUser , setMessageToUser] = useState(null);
  const { user } = useParams();
  
  const userEmail = auth.currentUser?.email;

  const [messages, setMessages] = useState(null); // State hook, mesajları burada saklıyoruz
  const [newMessage, setNewMessage] = useState(""); // Gönderilecek mesaj için state

  // Sayfa açıldığında otomatik scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scroll({ top: chatRef.current.scrollHeight});
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); 

  useEffect(() => {
    let unsubscribe; 
    if (userEmail) {
      const fetchChatData = async () => {
        try {
          const userProfileResponse = await getUserProfile(user);
          setMessageToUser(userProfileResponse.data.data);
          unsubscribe = await listenToMessagesBetweenUsers(userEmail, userProfileResponse.data.data.identity, setMessages,pageSize);
        } catch (error) {
          console.error("Error fetching chat data:", error);
        }
      };
      fetchChatData();
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [pageSize]); // userEmail ve user değiştiğinde bu useEffect çalışacak
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {

      setNewMessage("");
    }
  };
  console.log(messageToUser);
  if (!userEmail || !messageToUser || !messages) {
    return <Loading />;
  }

  return (
    <div className="max-w-none js-chat-cont bg-black fixed z-[999] left-0 w-screen overflow-hidden top-0 py-4 h-screen max-h-screen text-white flex flex-col">
      <header className="flex items-center justify-between border-b pb-2 border-gray-700">
        <div className="w-full flex gap-5 items-center ">
          <button className="text-white" onClick={() => router.back()}>
            <FiChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <Image
              src={messageToUser.images.length>0 ? fileBaseUrl + messageToUser.images[0].image: "/profile-placeholder.png"}
              alt="Profile"
              width={50}
              height={40}
              className={`rounded-full object-contain aspect-square ${messageToUser.profileimages ? "" : "bg-secondary"}`}
            />
            <div>
              <h2 className="text-lg font-bold">
                {messageToUser.fullName} <span className="text-sm">{messageToUser.age}</span>
              </h2>
              <div className="flex items-center gap-1">
                <Image src="/turkey.png" width={20} height={20} alt="Turkey" />
                <span className="text-gray-400">Türkiye</span>
              </div>
            </div>
            {messageToUser?.is_host ? <Image src="/verified.png" alt="Doğrulama" width={24} height={24} /> : null}
          </div>
        </div>
        <button className="text-white px-2">
          <FiSettings size={24} />
        </button>
      </header>

      <main className="flex-grow p-4 flex overflow-auto flex-col justify-end">
        <div ref={chatRef} className="space-y-4 flex-grow overflow-auto">
          <button
            className="text-white bg-gray-600 px-3 py-1 rounded w-full"
            onClick={() => setPageSize(pageSize + 20)} 
          >
            Daha fazla mesaj yükle
          </button>
          {messages &&
            messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.senderUser?.user_identity === userEmail
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                {msg.msgType == "text" && (
                  <div
                    className={
                      msg.senderUser?.user_identity === userEmail
                        ? "bg-primary text-black px-4 py-2 rounded-lg max-w-xs"
                        : "bg-gray-900 text-white px-4 py-2 rounded-lg max-w-xs"
                    }
                  >
                    {msg.msg} {/* Mesaj içeriğini göster */}
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
                    <Image
                      src={fileBaseUrl + msg.image}
                      alt="Mesaj"
                      width={100}
                      height={100}
                      className="rounded-lg aspect-auto"
                    />
                  </div>
                )}
                {msg.msgType == "gift" && (
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
              </div>
            ))}
        </div>

        {/* Mesaj Gönderme Alanı */}
        <div className="flex items-center mb-4 space-x-2 p-2 bg-gray-800 rounded-full">
          <input
            type="text"
            placeholder="Buraya yaz."
            className="bg-gray-800 text-white w-full px-4 py-2 rounded-full focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>
            <FiSend size={24} />
          </button>
          {
            <button>
              <FiGift size={24} />
            </button>
          }
          <button>
            <FiFile size={24} />
          </button>
        </div>
      </main>
    </div>
  );
}

export default withAuth(ChatPage);

// Firestore'dan iki kullanıcı arasındaki mesajları çekmek için fonksiyon

const listenToMessagesBetweenUsers = async (userEmail1, userEmail2, setMessages, pageSize = 20) => {
  const combinedEmail = [userEmail1, userEmail2].join("");
  let chatDocRef = doc(db, "chat", combinedEmail);
 

  const chatMessagesRef = collection(chatDocRef, "chat");

  // Önce en yeni mesajları ters sırada çekiyoruz
  const chatMessagesQuery = query(chatMessagesRef, orderBy("time", "desc"), limit(pageSize));
  const unsubscribe = onSnapshot(chatMessagesQuery, async (snapshot) => {
    
    const messages = snapshot.docs.map((doc) => doc.data()).reverse();
    if (messages.length ==0) {
      await listenToMessagesBetweenUsers(userEmail2, userEmail1, setMessages, pageSize);
    }
    setMessages(messages);
  });

  return unsubscribe;
};

