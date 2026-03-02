import React, { useState } from "react";
// import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
const SendNotification = () => {
  const { token } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(""); // Input field to specify the user ID

  const handleSendNotification = async () => {
    if (!userId) {
      setMessage("User ID is required.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Fetch the FCM token for the user
      const tokenResponse = await fetch(
        `http://127.0.0.1:8000/api/send-notification/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const tokenData = await tokenResponse.json();

      if (!tokenData.fcm_token) {
        setMessage("No FCM token found for the user.");
        return;
      }

      const fcmToken = tokenData.fcm_token;

      // Send the notification
      const notificationResponse = await fetch(
        "http://127.0.0.1:8000/api/send-notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fcm_token: fcmToken }),
        }
      );
      console.log(notificationResponse);
      const notificationData = await notificationResponse.json();
      setMessage(notificationData.message || "Notification sent successfully.");
      console.log(notificationData)
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={handleSendNotification} disabled={isLoading || !userId}>
        {isLoading ? "Sending..." : "Send Notification"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendNotification;
