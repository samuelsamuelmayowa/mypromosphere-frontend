import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase"; // Import your Firebase messaging instance
import { useStateContext } from "./contexts/ContextProvider";
const SendN = () => {
  // Function to send the token to the bac
  const { token } = useStateContext();
  const sendTokenToBackend = async (token) => {
    const user_id = 4;  // Replace with the actual user ID from your app's authentication system
    try {
      const response = await fetch("http://127.0.0.1:8000/api/store-token", {
        method: "POST",
        headers: {
           "Authorization": `Bearer ${token?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id:4,
          fcm_token: token,
        }),
      });
      console.log(response)

      // Handle the response if needed
      if (response.ok) {
        console.log("Token successfully sent to backend");
      } else {
        console.error("Error sending token to backend");
      }
    } catch (error) {
      console.error("Error while sending token to backend:", error.message);
    }
  };

  // Request permission and get the token
  const requestNotificationPermission = async () => {
    try {
      // Request permission to show notifications
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted");

        // Get the FCM token
        const token = await getToken(messaging, {
          vapidKey: "BDtAKIAnq742og964l2dF4uBcKxJ8MlK9uXfjqKgD5bfdlKtVC6NB4ny341RQ6HUTJjIXoQj_Ini9m4D-K4THi8" // Replace with your Firebase VAPID key
        });

        if (token) {
          console.log("FCM Token:", token);
          // Send the token to the backend
          sendTokenToBackend(token);
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

  useEffect(() => {
    requestNotificationPermission(); // Call the function when the component mounts
  }, []);

  return (
    <div>
      <h1>Sending Notification Token</h1>
      <p>We will request permission for notifications and send the FCM token to the backend.</p>
    </div>
  );
};

export default SendN;
