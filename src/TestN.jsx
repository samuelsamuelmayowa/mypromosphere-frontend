import { messaging } from "../firebase.jsx";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";

const TestN = () => {
  // Request Notification Permission
  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted");
        // Now that permission is granted, get the FCM token
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_V_KEY, // Replace with your Firebase VAPID key
        });

        if (token) {
          console.log("FCM Token:", token);
          // Send the token to your Laravel backend to store for sending notifications
        } else {
          console.log("No token received. Permission may have been denied.");
        }
      } else {
        console.log("Notification permission denied");
      }
    } catch (error) {
      console.error("Error while retrieving token:", error);
    }
  };

  // Handle incoming messages (foreground)
  useEffect(() => {
    // Listen for foreground messages
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // Handle the payload or display notification
      // You could use the Notification API here to display a notification
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
      });
    });

    // Request permission and get token
    requestNotificationPermission();
  }, []);

  return (
    <div>
      <h1>Notification Permission Request</h1>
      <p>We will ask for permission to send notifications when you visit this page.</p>
    </div>
  );
};

export default TestN;
