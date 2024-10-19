'use client';
import withAuth from "@/hocs/with-auth";
import ProfileCard from "./message-cart";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import {  initChat } from "@/lib/services/firebase-service";
import { useAppSelector } from "@/lib/hooks";


 function Messages() {
  const user = useAppSelector((state) => state.apiUser.apiUser);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = initChat(user.identity, setMessages);
    return () => unsubscribe();
  }, [user]);
  if (!user) {
    return <Loading></Loading>;
  }
  if (messages === null) {
    return <Loading></Loading>;
    
  }
  return (
    <div className="min-h-screen flex p-4  justify-center">
      <div className="max-w-md w-full">
        {messages.map((message, index) => {
          if (message.isDeleted === false) {
            return <ProfileCard key={index} message={message}></ProfileCard>;
          }
        })}
        {messages.length === 0 && (
          <div className="text-white text-center">Mesajınız yok</div>
        )}
      </div>
    </div>
  );
}
export default withAuth(Messages);
