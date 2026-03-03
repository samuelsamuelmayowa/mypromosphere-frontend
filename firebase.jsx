// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// Firebase configuration from environment variables
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_KEY,
  // authDomain: import.meta.env.VITE_authDomain,
  // projectId: import.meta.env.VITE_projectId,
  // storageBucket: import.meta.env.VITE_storageBucket,
  // messagingSenderId: import.meta.env.VITE_messagingSenderId,
  // appId: import.meta.env.VITE_appId,
  // measurementId: import.meta.env.VITE_measurementId,

   apiKey: "AIzaSyDjBnmik_7FCYzSJYktYeuKHqNtxLRebfs",
  authDomain: "mypromopsherereborn.firebaseapp.com",
  projectId: "mypromopsherereborn",
  storageBucket: "mypromopsherereborn.firebasestorage.app",
  messagingSenderId: "1088107194704",
  appId: "1:1088107194704:web:eeabd28fd0049838e4e455",
  measurementId: "G-RY12QKXE3H"
};


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firebase services
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export default app;
