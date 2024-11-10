'use client';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getMessaging, getToken, onMessage, isSupported as isMessagingSupported } from "firebase/messaging";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app);

// Firebase Analytics
let analytics;
isAnalyticsSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log('Firebase Analytics is supported and initialized.');
  } else {
    console.warn('Firebase Analytics is not supported in this environment.');
  }
}).catch((error) => {
  console.error('Error checking Analytics support:', error);
});

// Firebase Messaging
let messaging;
isMessagingSupported().then((supported) => {
  if (supported) {
    messaging = getMessaging(app);
    console.log('Firebase Messaging is supported and initialized.');


    onMessage(messaging, (payload) => {
      notifyUser(payload);
    });
  } else {
    console.warn('Firebase Messaging is not supported in this environment.');
  }
}).catch((error) => {
  console.error('Error checking Messaging support:', error);
});

export const requestForToken = async () => {
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;
  try {
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    const currentToken = await getToken(messaging, { vapidKey: vapidKey, serviceWorkerRegistration: registration });
    if (currentToken) {
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token.', err);
  }
};

const notifyUser =  (payload) =>{
  console.log('Message received. ', payload);
  const notificationTitle = payload.notification?.title??'Bildirim';
  const notificationOptions = {
    body: payload.notification.body,
    data: payload.data,
    icon: payload.data?.icon ?? '/logo.png',
  };

  // Tarayıcı bildirim iznini kontrol edin
  if (Notification.permission === "granted") {
    createNotification(notificationTitle, notificationOptions,)
  } else if (Notification.permission !== "denied") {
    // İzin istenmemişse kullanıcıdan izin isteyin
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        createNotification(notificationTitle, notificationOptions)
      }
    });
  }
}
const createNotification = (notificationTitle, notificationOptions) =>{
    const notification = new Notification(notificationTitle, notificationOptions);
    notification.onclick = (event) => {
      event.preventDefault();
      window.open(notificationOptions.data.url, '_blank');
    };
}
export { auth, provider, analytics, db, messaging };
