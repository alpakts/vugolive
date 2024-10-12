'use client';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getMessaging, getToken, onMessage, isSupported as isMessagingSupported } from "firebase/messaging";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBmN7ZCNsp2w0S63c1oM9253yEKJpwhwUY",
  authDomain: "vugo-6fdfc.firebaseapp.com",
  projectId: "vugo-6fdfc",
  storageBucket: "vugo-6fdfc.appspot.com",
  messagingSenderId: "935414459479",
  appId: "1:935414459479:web:3ef3d626af5cb7e0560712",
  measurementId: "G-KTFB40H461"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

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

    // Kullanıcıdan bildirim izni alma ve device token alma fonksiyonu
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;
    

    // Bildirim geldiğinde ön planda yakalama fonksiyonu
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  } else {
    console.warn('Firebase Messaging is not supported in this environment.');
  }
}).catch((error) => {
  console.error('Error checking Messaging support:', error);
});
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: vapidKey });
    if (currentToken) {
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token.', err);
  }
};

export { auth, provider, analytics, db, messaging };
