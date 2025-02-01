'use client';
import React from "react";
import withAuth from "@/hocs/with-auth";
import ProfileCard from "./message-cart";
import { useEffect, useRef, useState } from "react";
import Loading from "@/app/(app)/loading";
import { initChat, updateAllMessagesBetweenUsers, updateChatBetweenUsers, updateMessageBetweenUsers } from "@/lib/services/firebase-service";
import { useAppSelector } from "@/lib/hooks";
import PopupModalComp from "../web-components/popup-modal/popup-modal";

function Messages() {
  const user = useAppSelector((state) => state.apiUser.apiUser);
  const modalRef = useRef(null);
  const [messages, setMessages] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null); 
  const longPressTimer = useRef(null);
  const updateMsg = (selectedMsg,updateData) =>{
    updateChatBetweenUsers(user.identity,selectedMsg.user?.user_identity,updateData);
  }
  const deleteAllMessages = () =>{
    updateAllMessagesBetweenUsers(user.identity,selectedMessage.user?.user_identity,);
  }

  useEffect(() => {
    if (!user || !user == -1) {
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

  const handleLongPressStart = (message) => {
    longPressTimer.current = setTimeout(() => {
      if (modalRef.current) {
        setSelectedMessage(message);
        modalRef.current.openModal();
      }
    }, 1000);
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer.current);
  };

  return (
    <div className="min-h-screen flex p-4 justify-center">
      <div className="max-w-md w-full">
        {messages.map((message, index) => {
          if (message.isDeleted === false) {
            return (
              <div
                key={index}
                onMouseDown={()=>handleLongPressStart(message)}
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
                onTouchStart={()=>{
                  handleLongPressStart(message)
                }}
                onTouchEnd={handleLongPressEnd}
              >
                <ProfileCard message={message} />
              </div>
            );
          }
        })}
        {messages.length === 0 && (
          <div className="text-white text-center">Mesajınız yok</div>
        )}
      </div>
      <PopupModalComp ref={modalRef}>
      <div className="modal-options bg-inherit p-4 rounded-lg shadow-md">
          <button className="option w-full text-left p-2 text-white " onClick={()=>{
            updateMsg(selectedMessage,{isDeleted:true,deletedId:new Date().toISOString()});
            modalRef.current.closeModal();
          }}>Sohbeti Sil</button>
          <button className="option w-full text-left p-2 text-white " onClick={()=>{
            deleteAllMessages();
            updateMsg(selectedMessage,{lastMsg:''});
            updateMsg(selectedMessage,{newMsg:false});
            modalRef.current.closeModal();
          }} >Sohbeti Temizle</button>
          <button className="option w-full text-left p-2 text-white " onClick={()=>{
            updateMsg(selectedMessage,{newMsg:true});
            modalRef.current.closeModal();
          }}>Okunmadı olarak işaretle</button>
          <button className="option w-full text-left p-2 text-white " onClick={()=>{
            modalRef.current.closeModal();
          }}>İptal et</button>
        </div>
      </PopupModalComp>
    </div>
  );
}

export default withAuth(Messages);
