'use client';
import Loading from '@/app/(app)/loading';
import withAuth from '@/hocs/with-auth';
import { getUserProfile } from '@/lib/services/api-service';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../../../firebaseConfig';
import { getTotalMessageCountBetweenUsers, listenToMessagesBetweenUsers, markMessageAsRead } from '@/lib/services/firebase-service'; // Firestore function ayrı dosyaya alınabilir
import ChatMessages from './chat-messages';
import ChatHeader from './chat-header';
import ChatMessageInput from './message-input';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import PopupComp from '../web-components/popup/popup';

function ChatPage() {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const chatRef = useRef(null);
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const [pageSize, setPageSize] = useState(20);
  const [messageToUser , setMessageToUser] = useState(null);
  const [messages, setMessages] = useState(null);
  const [totalMessageCount, setTotalMessageCount] = useState(0);
  const userEmail = auth.currentUser?.email;
  const popUpRef = useRef(null);
  const {user} = useParams();
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scroll({ top: chatRef.current.scrollHeight });
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [chatRef.current]);

  useEffect(() => {
    let unsubscribe;
    if (userEmail) {
      const fetchChatData = async () => {
        try {
          const userProfileResponse = await getUserProfile(user);
          setMessageToUser(userProfileResponse.data.data);
          const messageCount = await getTotalMessageCountBetweenUsers(userEmail, userProfileResponse.data.data.identity);
          setTotalMessageCount(messageCount);
          markMessageAsRead(userEmail,userProfileResponse.data.data.identity);
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

  if (!userEmail || !messageToUser || !messages) {
    return <Loading />;
  }

  return (
    <div className={`max-w-none js-chat-cont bg-black fixed z-[999] left-0 w-screen top-0 py-4  max-h-full text-white flex flex-col overflow-hidden h-screen`}>
      <ChatHeader messageToUser={messageToUser} popupRef={popUpRef} fileBaseUrl={fileBaseUrl} />
      <main className="flex-grow px-2 flex overflow-auto flex-col justify-end">
        <ChatMessages
          messages={messages}
          userEmail={userEmail}
          messagesToId={messageToUser.identity}
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
          popupRef={popUpRef}
        />
        <PopupComp ref={popUpRef}></PopupComp>
      </main>
    </div>
  );
}

export default withAuth(ChatPage);
