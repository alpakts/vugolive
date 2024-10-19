"use client";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { addDiamonds, getAppSettings, minusDiamonds } from "./api-service";
export const listenToMessagesBetweenUsers = async (
  userEmail1,
  userEmail2,
  setMessages,
  pageSize = 20
) => {
  const combinedEmail = [userEmail1, userEmail2].sort().join("");
  let chatDocRef = doc(db, "chat", combinedEmail);
  const chatMessagesRef = collection(chatDocRef, "chat");

  const chatMessagesQuery = query(
    chatMessagesRef,
    orderBy("time", "desc"),
    limit(pageSize)
  );
  const unsubscribe = onSnapshot(chatMessagesQuery, async (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data()).reverse();
    if (messages.length === 0) {
      await listenToMessagesBetweenUsers(
        userEmail2,
        userEmail1,
        setMessages,
        pageSize
      );
    }
    setMessages(messages);
  });

  return unsubscribe;
};
export const getTotalMessageCountBetweenUsers = async (
  userEmail1,
  userEmail2
) => {
  const combinedEmail = [userEmail1, userEmail2].sort().join("");
  let chatDocRef = doc(db, "chat", combinedEmail);
  const chatMessagesRef = collection(chatDocRef, "chat");

  const chatMessagesQuery = query(chatMessagesRef);

  const querySnapshot = await getDocs(chatMessagesQuery);

  let totalMessageCount = querySnapshot.size;

  if (totalMessageCount === 0) {
    const reversedCombinedEmail = [userEmail2, userEmail1].join("");
    chatDocRef = doc(db, "chat", reversedCombinedEmail);
    const reversedChatMessagesRef = collection(chatDocRef, "chat");

    const reversedChatMessagesQuery = query(reversedChatMessagesRef);
    const reversedQuerySnapshot = await getDocs(reversedChatMessagesQuery);

    totalMessageCount = reversedQuerySnapshot.size;
  }

  return totalMessageCount;
};
export const sendMessageBetweenUsers = async (
  userEmail1,
  userEmail2,
  messageContent,
  senderDetails,
  reveiverDetails,
  msgType = "text",
  gift = null,
) => {
  const transaction = await transactDiamonds(senderDetails ,reveiverDetails,gift);
  if (transaction == false) {
    return false;
  }
  const combinedEmail = [userEmail1, userEmail2].sort().join("");
  let chatDocRef = doc(db, "chat", combinedEmail);

  const chatMessagesRef = collection(chatDocRef, "chat");
  const newMessage = {
    id: Date.now(),
    msg: messageContent,
    msgType: msgType,
    image: gift ? gift.images : null,
    not_deleted_identities: [userEmail1, userEmail2],
    senderUser: {
      age: senderDetails.age || "",
      city: senderDetails.city || "",
      date: Date.now(),
      image:
        senderDetails.images?.length > 0
          ? senderDetails.images[0].image
          : senderDetails.profileimages || null,
      is_host: (senderDetails.is_host == 2 && true) || false,
      is_new_msg: true,
      selected: true,
      user_identity: userEmail1,
      userid: senderDetails.id || "",
      username: senderDetails.fullName || "Anonim",
    },
    time: Date.now(),
  };
  await setDoc(doc(chatMessagesRef, Date.now().toString()), newMessage);
  const user1ChatListRef = collection(
    db,
    "userchatlist",
    userEmail1,
    "userlist"
  );
  const user2ChatListRef = collection(
    db,
    "userchatlist",
    userEmail2,
    "userlist"
  );
  const chatListUpdateSender = {
    lastMsg: messageContent,
    time: Date.now(),
    newMsg: false,
    conversationId: combinedEmail,
    isDeleted: false,
    deletedId: "",
    time: Date.now(), // Ekstra bir zaman damgası eklenebilir
    user: {
      age: reveiverDetails.age || null,
      city: reveiverDetails.city || null,
      date: Date.now(),
      image:
        reveiverDetails.images?.length > 0
          ? reveiverDetails.images[0].image
          : reveiverDetails.profileimages || null,
      is_host: reveiverDetails.is_host == 2 ? true : false,
      is_new_msg: true,
      selected: true,
      user_identity: userEmail2,
      userid: reveiverDetails.id || "",
      username: reveiverDetails.fullName || "Anonim",
    },
  };
  const chatListUpdateReceiver = {
    lastMsg: messageContent,
    time: Date.now(),
    newMsg: true,
    isDeleted: false,
    deletedId: "",
    conversationId: combinedEmail,
    time: Date.now(),
    user: {
      age: senderDetails.age || null,
      city: senderDetails.country || null,
      date: Date.now(),
      image:
        senderDetails.images?.length > 0
          ? senderDetails.images[0].image
          : senderDetails.profileimages || null,
      is_host: senderDetails.is_host == 2 ? true : false,
      is_new_msg: true,
      selected: true,
      user_identity: userEmail1,
      userid: senderDetails.id || "",
      username: senderDetails.fullName || "Anonim",
    },
  };

  // Kullanıcı 1'in userchatlist belgesini kontrol et, yoksa oluştur, varsa güncelle
  const user1DocRef = doc(user1ChatListRef, userEmail2); // userEmail2 ile belge ID'si olarak kullanıyoruz
  const user1DocSnap = await getDoc(user1DocRef);
  if (user1DocSnap.exists()) {
    await setDoc(user1DocRef, chatListUpdateSender, { merge: true });
  } else {
    await setDoc(user1DocRef, chatListUpdateSender);
  }

  // Kullanıcı 2'nin userchatlist belgesini kontrol et, yoksa oluştur, varsa güncelle
  const user2DocRef = doc(user2ChatListRef, userEmail1); // userEmail1 ile belge ID'si olarak kullanıyoruz
  const user2DocSnap = await getDoc(user2DocRef);
  if (user2DocSnap.exists()) {
    await setDoc(user2DocRef, chatListUpdateReceiver, { merge: true });
  } else {
    await setDoc(user2DocRef, chatListUpdateReceiver);
  }
  return true;
};
export const fetchUserChatList = async (userEmail) => {
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
export const listenToUserChatList = (userEmail, setMessages) => {
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
export const initChat = (userEmail, setMessages) => {
  const unsubscribe = listenToUserChatList(userEmail, setMessages);

  return () => unsubscribe();
};
export const markMessageAsRead = async (userEmail, messageId) => {
  try {
    const userDocRef = doc(db, "userchatlist", userEmail, "userlist", messageId);
    
    await updateDoc(userDocRef, {
      newMsg: false,
    });

    console.log(`Message ${messageId} marked as read.`);
  } catch (error) {
    console.error("Error updating message status: ", error);
  }
};
export const checkHasNewMessage = (userEmail,setHasNewMessages) => {
  const userDocRef = doc(db, "userchatlist", userEmail);
  const userChatListRef = collection(userDocRef, "userlist");
  const userChatListQuery = query(userChatListRef, orderBy("time", "desc"));

  const unsubscribe = onSnapshot(userChatListQuery, (snapshot) => {
    const hasNewMessages = snapshot.docs.some((doc) => doc.data().newMsg === true);
    setHasNewMessages(hasNewMessages); 
  });

  return unsubscribe;
};
const transactDiamonds = async (sender, receiver,gift) => {
    const response = await getAppSettings();
    const appsettings = response.data.data.app;
    let amount = appsettings.user_message_charge??26;
    if (gift) {
        amount = gift.diamond;
    }
    const transactResponse = await minusDiamonds(sender.id, amount);
    if (transactResponse.data.message == "diamoand minush") {
        if (sender.is_host != 2 && receiver.is_host == 2) {
            await addDiamonds(receiver.id, appsettings.user_message_charge??26,1);
        }
    }else{
        window.location.href = "/account/charge";
        return false;
    }
   
   
}