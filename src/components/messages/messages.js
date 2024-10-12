'use client';
import withAuth from "@/hocs/with-auth";
import ProfileCard from "./message-cart";
import { auth,db } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";


 function Messages() {
  const user = auth.currentUser;
  if (!user) {
    return <Loading></Loading>;
  }
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    const email = user?.email;
    fetchUserChatList(email).then((res) => {
      if (res.length > 0) {
        setMessages(res);
      }
    });
  }, []);
  useEffect(() => {
    // Kullanıcının chat listesine abone ol
    const unsubscribe = initChat(user.email, setMessages);

    // Bileşen unmount olduğunda dinleyiciyi durdur
    return () => unsubscribe();
  }, [user.email]);
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
const fetchUserChatList = async (userEmail) => {
  try {
    const userDocRef = doc(db, "userchatlist", userEmail);

    const userChatListRef = collection(userDocRef, "userlist");
    const userChatListQuery = query(userChatListRef, orderBy("time", "desc"));
    const querySnapshot = await getDocs(userChatListQuery);
    const chatList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return chatList;
  } catch (error) {
    console.error("Error fetching user chat list: ", error);
  }
};
const listenToUserChatList = (userEmail, setMessages) => {
  const userDocRef = doc(db, "userchatlist", userEmail);

  const userChatListRef = collection(userDocRef, "userlist");
  const userChatListQuery = query(userChatListRef, orderBy("time", "desc"));
  const unsubscribe = onSnapshot(userChatListQuery, (snapshot) => {
    const chatList = snapshot.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data(), 
    }));

    setMessages(chatList); // Burada UI'yı güncelliyoruz
    console.log("Anlık güncellenen mesajlar:", chatList);
  });

  return unsubscribe;
};
const initChat = (userEmail, setMessages) => {
  const unsubscribe = listenToUserChatList(userEmail, setMessages);

  return () => unsubscribe();
};