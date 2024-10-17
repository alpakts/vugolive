'use client';
import Loading from '@/app/loading';
import withAuth from '@/hocs/with-auth';
import { getUserProfile } from '@/lib/services/api-service';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../../../firebaseConfig';
import { getTotalMessageCountBetweenUsers, listenToMessagesBetweenUsers } from '@/lib/services/firebase-service'; // Firestore function ayrı dosyaya alınabilir
import ChatMessages from './chat-messages';
import ChatHeader from './chat-header';
import ChatMessageInput from './message-input';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

function ChatPage() {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const chatRef = useRef(null);
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const [pageSize, setPageSize] = useState(20);
  const [messageToUser , setMessageToUser] = useState(null);
  const [messages, setMessages] = useState(null);
  const [totalMessageCount, setTotalMessageCount] = useState(0);
  const userEmail = auth.currentUser?.email;
  const {user} = useParams();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scroll({ top: chatRef.current.scrollHeight });
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
          const messageCount = await getTotalMessageCountBetweenUsers(userEmail, userProfileResponse.data.data.identity);
          setTotalMessageCount(messageCount);
          unsubscribe = await listenToMessagesBetweenUsers(userEmail, userProfileResponse.data.data.identity, setMessages, pageSize);
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
  }, [pageSize,userEmail]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      setNewMessage("");
    }
  };

  if (!userEmail || !messageToUser || !messages) {
    return <Loading />;
  }

  return (
    <div className="max-w-none js-chat-cont bg-black fixed z-[999] left-0 w-screen overflow-hidden top-0 py-4 h-screen max-h-screen text-white flex flex-col">
      <ChatHeader messageToUser={messageToUser} fileBaseUrl={fileBaseUrl} />
      <main className="flex-grow p-4 flex overflow-auto flex-col justify-end">
        <ChatMessages
          messages={messages}
          userEmail={userEmail}
          fileBaseUrl={fileBaseUrl}
          pageSize={pageSize}
          totalMessageCount={totalMessageCount}
          setPageSize={setPageSize}
        />
        <ChatMessageInput
          apiUser = {apiUser}
          receiver={messageToUser}
          userEmail={userEmail}
          messageToUser={messageToUser}
        />
      </main>
    </div>
  );
}

export default withAuth(ChatPage);
