'use client';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";

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

let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log('Firebase Analytics is supported and initialized.');
  } else {
    console.warn('Firebase Analytics is not supported in this environment.');
  }
}).catch((error) => {
  console.error('Error checking Analytics support:', error);
});

export { auth, provider, analytics, db };
