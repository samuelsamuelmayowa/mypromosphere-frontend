import { useEffect, useState } from "react";
import { messaging } from "../../firebase"; // Ensure you're importing the messaging instance correctly
import { onMessage } from "firebase/messaging";

const ReceiveNotification = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    // Request notification permission
    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setIsPermissionGranted(true);
        console.log("Notification permission granted.");
      } else {
        setIsPermissionGranted(false);
        console.log("Notification permission denied.");
      }
    };

    requestNotificationPermission();

    // Listen for foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      try {
        console.log("Message received in foreground: ", payload);
        
        // Ensure payload has the correct structure
        if (payload.notification) {
          const { title, body, icon } = payload.notification;

          // Display the notification
          new Notification(title, { body, icon });
        } else {
          console.warn("Payload does not have notification data.");
        }
      } catch (error) {
        console.error("Error displaying notification: ", error);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {isPermissionGranted ? (
        <p>Notifications are enabled and active.</p>
      ) : (
        <p>Please enable notifications to receive updates.</p>
      )}
    </div>
  );
};

export default ReceiveNotification;
