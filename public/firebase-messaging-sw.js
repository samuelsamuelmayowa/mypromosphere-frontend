importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvVL--yTQY1xDYH0Ske8us3rq5zcEwa88",
  authDomain: "www.mypromosphere.com",
  projectId: "mypromospherenigeria",
  storageBucket: "mypromospherenigeria.appspot.com",
  messagingSenderId: "264515986823",
  appId: "1:264515986823:web:e6f1db5935e616ff6edf22",
  measurementId: "G-6R118SL509",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification.title || "Default Title";
  const notificationOptions = {
    body: payload.notification.body || "Default Body",
    icon: payload.notification.icon || "/favicon.ico",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


self.addEventListener('push', (event) => {
  console.log('Push event received:', event);
  const payload = event.data ? event.data.json() : {};
  console.log('Payload:', payload);

  const title = payload.notification?.title || 'New Notification';
  const options = {  
    body: payload.notification?.body || 'You have a new message.',
    icon: payload.notification?.icon || 'default-icon.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// // importScripts(
// //   "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
// // );
// // importScripts(
// //   "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
// // );

// // import { initializeApp } from "firebase/app";
// // import { getMessaging } from "firebase/messaging";
// // import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCvVL--yTQY1xDYH0Ske8us3rq5zcEwa88",
//   authDomain:"mypromospherenigeria.firebaseapp.com",
//   projectId:  "mypromospherenigeria",
//   storageBucket:  "mypromospherenigeria.appspot.com",
//   messagingSenderId:"264515986823",
//   appId: "1:264515986823:web:e6f1db5935e616ff6edf22",
//   measurementId:"G-6R118SL509",
//   // databaseURL: "https://project-id.firebaseio.com",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
// const analytics = getAnalytics(app);


// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log("[firebase-messaging-sw.js] Received background message", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
// // Register the service worker as a module
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js", { type: "module" })
//     .then((registration) => {
//       console.log("Service Worker registered successfully:", registration);
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }

// export { messaging };
