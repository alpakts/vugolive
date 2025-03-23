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
  where,
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
    const filteredMessages = messages.filter((message) => message.not_deleted_identities.includes(userEmail1));
    setMessages(filteredMessages);
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

  const chatMessagesQuery = query(chatMessagesRef, where("not_deleted_identities", "array-contains", userEmail1));

  const querySnapshot = await getDocs(chatMessagesQuery);

  let totalMessageCount = querySnapshot.size;


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
  photoUrl = null,
  free = false
) => {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const transaction = await transactDiamonds(
    senderDetails,
    reveiverDetails,
    gift,
    free
  );
  if (transaction == "openmodal" ) {
    return "openmodal";
  }
  const combinedEmail = [userEmail1, userEmail2].sort().join("");
  let chatDocRef = doc(db, "chat", combinedEmail);

  const chatMessagesRef = collection(chatDocRef, "chat");
  const image =
    msgType == "image" || msgType == "video"
      ? photoUrl
      : msgType == "gift"
      ? gift.images
      : null;
  const newMessage = {
    id: Date.now().toString(),
    msg: messageContent,
    msgType: msgType,
    image: image,
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
  sendNotification(
    reveiverDetails.deviceToken,
    `${senderDetails.fullName} adlı kullanıcıdan mesaj`,
    gift ? gift.diamond.toString() : messageContent,
    {
      url: window.location.origin + "/chat/" + senderDetails.id,
      icon: senderDetails.profileimages
        ? fileBaseUrl + senderDetails.profileimages
        : senderDetails.images
          ? fileBaseUrl + senderDetails.images[0]?.image
          : "",
    }
  );
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
    const userDocRef = doc(
      db,
      "userchatlist",
      userEmail,
      "userlist",
      messageId
    );

    await updateDoc(userDocRef, {
      newMsg: false,
    });

    console.log(`Message ${messageId} marked as read.`);
  } catch (error) {
    console.error("Error updating message status: ", error);
  }
};
export const checkHasNewMessage = (userEmail, setHasNewMessages) => {
  const userDocRef = doc(db, "userchatlist", userEmail);
  const userChatListRef = collection(userDocRef, "userlist");
  const userChatListQuery = query(userChatListRef, orderBy("time", "desc"));

  const unsubscribe = onSnapshot(userChatListQuery, (snapshot) => {
    const hasNewMessages = snapshot.docs.some(
      (doc) => doc.data().newMsg === true
    );
    setHasNewMessages(hasNewMessages);
  });
  return unsubscribe;
};
const transactDiamonds = async (sender, receiver, gift,free) => {
  if (free) {
    return true;
  }
  var isMessageFree = checkMessageIsFree(sender, receiver,gift);
  if (isMessageFree.isFee == false) {
    return true;
  }

  const response = await getAppSettings();
  const appsettings = response.data.data.app;
  const messageCharge = appsettings.host_message_charge ?? 1;
  let amount = appsettings.user_message_charge ?? 26;
  if (gift) {
    amount = gift.diamond;
  }
  const messageType = gift ? 1 : 0;
  const transactResponse = await minusDiamonds(sender.id, amount,sender.is_host,1,messageType,receiver.id);
  if (transactResponse.data.message == "diamoand minush") {
    if (isMessageFree.paymentToHost) {
      const amountGift = gift ? gift.diamond : 0;
      await addDiamonds(receiver.id, gift ? amountGift :amount- messageCharge,0,receiver.is_host,0,messageType,sender.id);
      return true;
    }
  } else {
    return "openmodal";
  }
};
const checkMessageIsFree = (sender, receiver,gift) => {
  if (
    sender.save_profile?.includes(receiver.id) &&
    receiver.save_profile?.includes(sender.id)
  ) {
    return {
      paymentToHost: false,
      isFee: false,
    };
  } else if (sender.is_host != 2 && receiver.is_host == 2 && !gift) {
    return {
      paymentToHost: true,
      isFee: true,
    };
  } else if (sender.is_host == 2 && receiver.is_host != 2) {
    return {
      paymentToHost: false,
      isFee: false,
    };
  } else if (sender.is_host == 2 && receiver.is_host == 2 && gift) {
    return {
      paymentToHost: true,
      isFee: true,
    };
  } else if (sender.is_host == 2 && receiver.is_host == 2) {
    return {
      paymentToHost: false,
      isFee: true,
    };
  }
  return {
    paymentToHost: true,
    isFee: true,
  };
};
export const deleteMessage = async (userEmail, messageId) => {
  try {
    const userDocRef = doc(
      db,
      "userchatlist",
      userEmail,
      "userlist",
      messageId
    );

    await updateDoc(userDocRef, {
      isDeleted: true,
      deletedId: userEmail,
    });

    console.log(`Message ${messageId} deleted.`);
  } catch (error) {
    console.error("Error deleting message: ", error);
  }
};

export const updateChatBetweenUsers = async (
  userEmail1,
  userEmail2,
  updateValue
) => {
  try {
    const chatDocRef = doc(db, "userchatlist", userEmail1,'userlist', userEmail2);

    await updateDoc(chatDocRef, updateValue);

    return true;
  } catch (error) {
    console.error("Error updating message: ", error);
    return false;
  }
};
export const updateMessageBetweenUsers = async (
  userEmail1,
  userEmail2,
  messageId,
) => {
  try {
    const combinedEmail = [userEmail1, userEmail2].sort().join("");
    const chatDocRef = doc(db, "chat", combinedEmail, "chat", messageId);
    const chatDocSnap = await getDoc(chatDocRef);
    if (!chatDocSnap.exists()) {
      console.error("Message not found.");
      return false;
    }
    const existingData = chatDocSnap.data();
    const updatedMessage = {
     
      time: Date.now(), // Mesajın düzenlendiği zamanı belirtmek için güncelleniyor
    };

    await updateDoc(chatDocRef, updatedMessage);

    console.log(`Message ${messageId} updated successfully.`);
    return true;
  } catch (error) {
    console.error("Error updating message: ", error);
    return false;
  }
};
export const updateSelectedMessagesBetweenUsers = async (
  senderEmail,
  receiverEmail,
  messagesToDelete
) => {
  try {
    // Kullanıcıların birleşik email'ine göre chat referansını oluşturuyoruz
    const combinedEmail = [senderEmail, receiverEmail].sort().join("");
    const chatMessagesRef = collection(db, "chat", combinedEmail, "chat");

    // Tüm mesajları almak için getDocs kullanıyoruz
    const chatMessagesSnapshot = await getDocs(chatMessagesRef);

    if (chatMessagesSnapshot.empty) {
      console.log("No messages found.");
      return false;
    }

    // Belirtilen mesaj kimliklerini güncelle
    const updatePromises = chatMessagesSnapshot.docs.map(async (messageDoc) => {
      const messageData = messageDoc.data();

        // Sadece messagesToDelete içinde olan ve senderEmail tarafından gönderilen mesajları güncelle
      if (messagesToDelete.includes(messageData.id)) {
        const notDeletedIdentities = messageData.not_deleted_identities?.filter(
          identity => identity !== senderEmail
        );
        const messageRef = doc(db, "chat", combinedEmail, "chat", messageDoc.id);
        await updateDoc(messageRef, {
          not_deleted_identities: notDeletedIdentities, // Belirli bir alanı yeni değerle güncelle
        });
      }
    });

    // Bütün güncellemeler tamamlandığında devam et
    await Promise.all(updatePromises);

    console.log(`Selected messages sent by ${senderEmail} to ${receiverEmail} updated successfully.`);
    return true;
  } catch (error) {
    console.error("Error updating selected messages: ", error);
    return false;
  }
};
export const updateAllMessagesBetweenUsers = async (
  userEmail1,
  userEmail2,
) => {
  try {
    // Kullanıcıların birleşik email'ine göre chat referansını oluşturuyoruz
    const combinedEmail = [userEmail1, userEmail2].sort().join("");
    const chatMessagesRef = collection(db, "chat", combinedEmail, "chat");

    // Tüm mesajları almak için getDocs kullanıyoruz
    const chatMessagesSnapshot = await getDocs(chatMessagesRef);

    if (chatMessagesSnapshot.empty) {
      console.log("No messages found.");
      return false;
    }

    // Her mesajı güncelle
    const updatePromises = chatMessagesSnapshot.docs.map(async (messageDoc) => {
      const messageData=messageDoc.data();
      const notDeletedIdentities = messageData.not_deleted_identities?.filter(identity=>identity!=userEmail1);
      const messageRef = doc(db, "chat", combinedEmail, "chat", messageDoc.id);
      await updateDoc(messageRef, {
        not_deleted_identities: notDeletedIdentities, // Belirli bir alanı yeni değerle güncelle
      });
    });

    // Bütün güncellemeler tamamlandığında devam et
    await Promise.all(updatePromises);

    console.log(`All messages between ${userEmail1} and ${userEmail2} updated successfully.`);
    return true;
  } catch (error) {
    console.error("Error updating all messages: ", error);
    return false;
  }
};
export const sendNotification = async (targetToken, title, body,extraData) => {
  try {
    const res = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: targetToken, // Hedef cihaza ait FCM token
        title,              // Bildirim başlığı
        body,               // Bildirim içeriği
        extraData
      }),
    });

    const data = await res.json();
    if (data.success) {
      console.log("Bildirim başarıyla gönderildi:", data.response);
    } else {
      console.error("Bildirim gönderme hatası:", data.error);
    }
  } catch (error) {
    console.error("İstek sırasında hata oluştu:", error);
  }
};
export const transactVideoCallDiamonds = async (sender, receiver,free = false) => {
  if (free) {
    return true;
  }
  let amount =  receiver.diamond_per_min ??0;
  const transactResponse = await minusDiamonds(sender.id,amount,sender.is_host,1,0,receiver.id);
  if (transactResponse.data.message == "diamoand minush") {
      await addDiamonds(receiver.id,amount,2,receiver.is_host,0,0,sender.id);
      return true
  } else {
    return "openmodal";
  }
};
export const listenToNonEmptyHosts = (setHosts) => {
  const hostListRef = collection(db, "live_host_list");
  const hostsQuery = query(hostListRef, orderBy("watching_count", "desc"));

  const unsubscribe = onSnapshot(hostsQuery, (snapshot) => {
    const nonEmptyHosts = snapshot.docs
      .filter((doc) => doc.exists() && Object.keys(doc.data()).length > 0)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    setHosts(nonEmptyHosts);
  });

  return unsubscribe;
};