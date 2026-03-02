/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import "./index.css";

import Loader from "./loader.jsx";
// import TestN from "./TestN.jsx";
import SendN from "./SendN.jsx";
// import SendNotification from "./Notification/SendNotifcation.jsx";
import ReceiveNotification from "./Notification/ReceiveNotification.jsx";
import SendNotification from "./Notification/SendNotification.jsx";
import PostAVideo from "./pages/dashBoard/components/PostAVideo.jsx";
import Videosingle from "./pages/Feeds/components/singleVideo/videosingle.jsx";
import ImageVideo from "./pages/dashBoard/components/ImageVideo.jsx";
const FeedsHome = React.lazy(() => import("./pages/Feeds/feedsHome.jsx"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage/SignUp"));
const LoginPage = React.lazy(() => import("./pages/LoginPage/Login"));
const DashBoard = React.lazy(() => import("./pages/dashBoard/DashBoard.jsx"));
const Learn = React.lazy(() => import("./pages/dashBoard/components/learn.jsx"));
const SingleFeedPage = React.lazy(() =>
  import("./pages/Feeds/singleFeedPage/singleFeedPage.jsx")
);
const ProfilePostPage = React.lazy(() =>
  import("./pages/profile/components/profilePost.jsx")
);
const ProfileVideoPage = React.lazy(() =>
  import("./pages/profile/components/profileVideos.jsx")
);

const ProfileHome = React.lazy(() => import("./pages/profile/profileHome.jsx"));
const ForYou = React.lazy(() =>
  import("./pages/Feeds/components/tweetAndTalks.jsx")
);
const TrendingAds = React.lazy(() =>
  import("./pages/Feeds/components/trendingAds.jsx")
);
const WishList = React.lazy(() => import("./pages/saves/wishlist.jsx"));
const TweetSaves = React.lazy(() => import("./pages/saves/tweetSave.jsx"));
const TalkSaves = React.lazy(() => import("./pages/saves/talkSave.jsx"));
const PostAPicture = React.lazy(() =>
  import("./pages/dashBoard/components/PostAPicture.jsx")
);
const GoogleCallback = React.lazy(() => import("./GoogleAuth/GoogleCallback"));
const PostAds = React.lazy(() =>
  import("./pages/dashBoard/components/PostAds.jsx")
);
const MyUploads = React.lazy(() =>
  import("./pages/dashBoard/components/Myupload.jsx")
);
const Error = React.lazy(() => import("./error.jsx"));
const MyVideos = React.lazy(() =>
  import("./pages/dashBoard/components/MyVideos.jsx")
);
const ProfileEdit = React.lazy(() =>
  import("./pages/profile/components/ProfileEdit.jsx")
);
const PersonalInfo = React.lazy(() =>
  import("./pages/profile/components/PersonalInfo.jsx")
);
const TweetHome = React.lazy(() => import("./pages/tweet/promotweet.jsx"));
const Promotalk = React.lazy(() => import("./pages/promotalk/promotalk.jsx"));
const SingleTweet = React.lazy(() => import("./pages/tweet/singleTweet.jsx"));
const SingleTalk = React.lazy(() => import("./pages/promotalk/singleTalk.jsx"));

const TermsAndCondition = React.lazy(() =>
  import("./pages/TandC/termsAndCondition.jsx")
);

// LEARNING
const LearningHeader = React.lazy(()=> import("./components/Lesson/header.jsx"));
import Landing from "./components/Lesson/Landing.jsx";
import CoursePage from "./components/Lesson/coursePage.jsx";
import Admin from "./pages/LoginPage/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <FeedsHome />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <TrendingAds />
          </Suspense>
        ),
      },
      {
        path: "/learning",
        element: (
          <Suspense fallback={<Loader />}>
            <LearningHeader />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <Landing />
          },
          {
            path: ":courseId",
            element: <CoursePage />
          }
        ]
      },
      {
        path: "/receivenotication",
        element: <ReceiveNotification />,
      },
      {
        path: "/sendnotication",
        element: <SendNotification />,
      },

      {
        path: "/send",
        element: <SendN />,
      },

      {
        path: "/mypromotweet",
        element: (
          <Suspense fallback={<Loader />}>
            <TweetHome />
          </Suspense>
        ),
      },
      {
        path: "/mypromotweet/:id",
        element: <SingleTweet />,
      },

      {
        path: "/mypromotalk",
        element: (
          <Suspense fallback={<Loader />}>
            <Promotalk />
          </Suspense>
        ),
      },
      {
        path: "/mypromotalk/:id/:description",
        element: (
          <Suspense fallback={<Loader />}>
            <SingleTalk />
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Suspense fallback={<Loader />}>
            <WishList />
          </Suspense>
        ),
      },
      {
        path: "/tweetBookmark",
        element: (
          <Suspense fallback={<Loader />}>
            <TweetSaves />
          </Suspense>
        ),
      },
      {
        path: "/talkBookmark",
        element: (
          <Suspense fallback={<Loader />}>
            <TalkSaves />
          </Suspense>
        ),
      },
      {
        path: "/for-you",
        element: <ForYou />,
      },
      {
        path: "feed/:id/:productName",
        element: (
          <Suspense fallback={<Loader />}>
            <SingleFeedPage />
          </Suspense>
        ),
      },
      {
      path: "/sellervideos/:id/:description",
        element: (
          <Suspense fallback={<Loader />}>
            <Videosingle />
          </Suspense>
        ),
      },

      {
        path: "/profile/user/:user_name",
        element: <ProfileHome />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <ProfilePostPage />
              </Suspense>
            ),
          },
          {
            path: "videos",
            element: (
              <Suspense fallback={<Loader />}>
                <ProfileVideoPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <DashBoard />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <MyUploads />,
              </Suspense>
            ),
          },
          {
            path: "learn-with-mypromosphere",
            element: (
              <Suspense fallback={<Loader />}>
                <Learn />
              </Suspense>
            ),
          },
          {
            path: "market",
            element: <ImageVideo />,
            children:[
              {
                path: "postvideo",
                element: <PostAVideo />,
              },
              {
                path: "postAd",
                element: <PostAds />,
              },
            ]
          },


          {
            path: "myvideos",
            element: <MyVideos />,
          },
          {
            path: "profileEdit",
            element: <ProfileEdit />,
          },
          {
            path: "personal-Info",
            element: <PersonalInfo />,
          },
          {
            path: "UserProfile/post",
            element: <PostAPicture />,
          },

          {
            path: "UserProfile/postvideo",
            element: <PostAVideo />,
          },

          {
            path: "postvideo",
            element: <PostAVideo />,
          },
          {
            path: "postAd",
            element: <PostAds />,
          },
        ],
      },
    ],
  },
    {
    path: "auth/google",
    element: <GoogleCallback />,
  },
  {
    path: "Login",
    element: (
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    ),
  },

  {
 path: "admin",
    element: (
      <Suspense fallback={<Loader />}>
        <Admin />
      </Suspense>
    ),
  }, 




  {
    path: "signup",
    element: (
      <Suspense fallback={<Loader />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: "/termsAndCondition",
    element: (
      <Suspense fallback={<Loader />}>
        <TermsAndCondition />
      </Suspense>
    ),
  },
]);

export default router;
