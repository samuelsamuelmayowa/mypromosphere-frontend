import ReactDOM from "react-dom/client";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
// import "./index.css";
import { ContextProvider } from "./contexts/ContextProvider";
import { AddToWishListProvider } from "./contexts/addToWishListContextProvider";
import { SaveTweetAndTalkProvider } from "./contexts/saveTalkAndTweetContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GoogleTag from "./Google";
import AppRouter from "./App";
import GoogleAd from "./Goggs/GoogleAd";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AddToWishListProvider>
      <SaveTweetAndTalkProvider>
        <ContextProvider>
          <QueryClientProvider client={queryClient}>
            <AppRouter />
            {/* <GoogleAd/> */}
            {/* <GoogleTag /> */}
            <SpeedInsights />
            <Analytics />
          </QueryClientProvider>
        </ContextProvider>
      </SaveTweetAndTalkProvider>
    </AddToWishListProvider>
  </React.StrictMode>
);

// Register the service worker for Firebase Cloud Messaging
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      // console.log("Service Worker registered successfully:", registration);
    })
    .catch((error) => {
      // console.error("Service Worker registration failed:", error);
    });
}
