import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FetchSingleTalk from "../../hooks/fetchSingleTalk";
import { useStateContext } from "../../contexts/ContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loader from "../../loader";
import { FaShare } from "react-icons/fa";
import anon from "../../assets/images/anon.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TalkComment from "./component/talkComment";
import timeEdit from "../../utils/timeEdit";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Helmet } from "react-helmet";
import Linkify from "react-linkify";
import { toast } from "sonner";
import { FaRegComment, FaRetweet } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import LikeTalk from "./component/likeTalk";
import FetchTalks from "../../hooks/fetchTalks";
import FetchProfileUser from "../../hooks/fetchUserProfile";
import TimeEdit from "../../utils/timeEdit";

import { ShareSocial } from "react-share-social";

const api = import.meta.env.VITE_GENERAL;
const api_general = import.meta.env.VITE_GENERAL;

const HOME = import.meta.env.VITE_HOME;
const api_h = import.meta.env.VITE_HOME;

const SingleTalk = () => {
  const { id, description } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = FetchSingleTalk(id, description);
  const { data: talks } = FetchTalks("All");
  const { token, darkMode } = useStateContext();
  const { data: singleTalkUser } = FetchProfileUser(data?.data?.data?.user_name);
  const { data: profile } = FetchProfileUser(token?.user_name);
  const handleNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/mypromotalk");
    }
  };
  const componentDecorator = (href, text, key) => (
    <a
      href={href}
      key={key}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: darkMode ? "#ADD8E6" : "#0000FF",
        textDecoration: "underline",
      }}
    >
      {text}
    </a>
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="min-h-screen grid place-items-center">
        <p>{error.message}</p>
      </div>
    );
  return (
    <>
      <Helmet>
        <meta property="og:description" content={data?.data?.data?.description || "This is a description of the post."} />
        <meta property="og:image" content={`${api}/${data?.data?.data?.titleImageurl}` || "default-image-url.jpg"} />
        <meta property="og:url" content={`${HOME}/mypromotalk/${id}`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={data?.data?.data?.description || "This is a description of the product."} />
        {/* <meta name="twitter:image" content={`${api}/public/storage${data?.data?.data?.titleImageurl.slice(7) || ""}` || "default-image-url.jpg"} /> */}
<meta
  name="twitter:image"
  content={
    data?.data?.data?.titleImageurl
      ? `${api}/public/storage${data.data.data.titleImageurl.slice(7)}`
      : "https://www.mypromosphere.com/default-image.jpg"
  }
/>

        {/* Favicon and other meta tags */}
        <title>{data?.data?.data?.description}</title>
        <meta
          name="description"
          content={data?.data?.data?.description}
        />
        <link rel="icon" type="image/jpg" href={data?.data?.data?.titleImageurl && `${api}/${data?.data?.data?.titleImageurl.slice(7)}`} />
      </Helmet>
      <section className="p-2 md:p-4 w-full">
        <div className="flex justify-between items-center">
          <h1
            className={`font-medium dark:text-white text-black md:text-[1.5rem] text-[1.3rem] md:mb-4 mb-2`}
          >
            MyPromoTalk
          </h1>
          <div onClick={handleNavigation}>
            <IoIosArrowRoundBack
              size={30}
              className={`cursor-pointer dark:text-white text-black`}
            />
          </div>
        </div>

        <div className="w-full flex gap-10 items-start break-words">
          <div
            className={`md:flex-[2] flex-1 w-full md:p-10 p-3 md:rounded-2xl rounded-xl
               bg-talkOrTweet text-black
              dark:text-mainTextDark dark:bg-darkBg
             `}
          >
            <div className="flex md:flex-row flex-col gap-2">
              <div className="">
                <Avatar className="w-10 h-10 ring-2 ring-transparent hover:ring-blue-500 transition-all duration-200">
                  <AvatarImage
                    src={`${api_general}/${singleTalkUser?.data?.data?.profileImage}` || anon}
                    alt={singleTalkUser?.data?.data?.user_name || "User"}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue text-white font-semibold">
                    {(singleTalkUser?.data?.data?.user_name || singleTalkUser?.data?.data?.user_name || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col basis-[90%] gap-1">
                <h5 className="font-[500] flex flex-col">
                  <Link to={`/profile/user/${data?.data?.data?.user_name}`}>
                    <p
                      className={`text-base text-black dark:text-white`}
                    >
                      {data?.data?.data?.user_name}
                    </p>
                  </Link>
                  <p className={`font-light text-xs text-black dark:text-mainTextDark`}>
                    {timeEdit(data?.data?.data?.created_at)}
                  </p>
                </h5>
                <p
                  className={`whitespace-pre-line jost text-black dark:text-mainTextDark`}
                >
                  <Linkify componentDecorator={componentDecorator}>
                    {data?.data?.data?.description}
                  </Linkify>
                </p>
                <div className=" w-full gap-[0.15rem] my-2">
                  {data?.data?.data?.titleImageurl && (
                    <img
                      src={`${api_general}/${data?.data?.data?.titleImageurl}`}

                      alt=""
                      className="w-full object-contain"
                    />
                  )}
                </div>
                <div className="flex w-full md:gap-0 gap-1 mt-2 flex-wrap">
                  <div className="md:basis-[65%] basis-[100%] flex justify-between items-center px-4 flex-wrap">
                    <div className="flex gap-2 items-center text-[0.85rem]">
                      <FaRegComment size={20} />
                      <p>{data?.data?.comment.length}</p>
                    </div>
                    <div>
                      <LikeTalk id={data?.data?.data?.id} />
                    </div>
                    <div className="">
                      <CopyToClipboard
                        onCopy={() => toast.success("Share the MyPromoTalk link with friends!")}
                        text={`${api_h}/mypromotalk/${id}`}
                      >
                        <div className="flex items-center gap-2 duration-200 rounded-md cursor-pointer">
                          <FaShare
                            size={20}
                            className="text-black dark:text-mainTextDark"
                          />
                          <p
                            className={`text-center jost text-black dark:text-mainTextDark`}
                          >
                            Share link
                          </p>
                        </div>
                      </CopyToClipboard>
                    </div>

                  </div>
                  <div className="md:basis-[35%] basis-[100%] flex md:items-end md:justify-end">
                    <ShareSocial
                      url={`${HOME}/mypromotalk/${id}/${encodeURIComponent(data?.data?.data?.description)}`}
                      socialTypes={["facebook", "twitter", "whatsapp"]}
                      style={{
                        root: {
                          background: "transparent",
                          borderRadius: 3,
                          border: 0,
                          color: "white",
                          maxWidth: "none",
                          minWidth: "initial",
                          padding: 0,
                        },
                        copyContainer: {
                          display: "none",
                        },
                        iconContainer: {
                          padding: 0,
                          width: "fit-content",
                        },
                        title: {
                          color: "aquamarine",
                          fontStyle: "italic",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #2F3336",
              }}
              className="flex md:flex-row gap-1 md:gap-0 flex-col bg-transparent pb-3 mt-3 flex-wrap"
            >
              <div className="md:basis-[8%] basis-[10%]">
                <Avatar className="w-10 h-10 aspect-square ring-2 ring-transparent hover:ring-blue-500 transition-all duration-200">
                  <AvatarImage
                    src={token ? `${api_general}/${profile?.data?.data?.profileImage}` : anon}
                    alt={profile?.data?.data?.user_image || "User"}
                    className="object-cover size-10 aspect-square"
                  />
                  <AvatarFallback className="bg-blue text-white font-semibold">
                    {(profile?.data?.data?.user_name || token?.user_name || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="md:basis-[92%] basis-[90%]">
                <TalkComment data={data?.data?.data} talkId={id} />
              </div>
            </div>
            <div>
              {data?.data?.comment?.map((comment, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: "1px solid #2F3336",
                  }}
                  className="flex gap-2 py-6 text-black "
                >
                  <div className="">
                    <img src={anon} className="w-10 h-10 rounded-full" />
                  </div>
                  <div className="flex flex-col basis-[90%] gap-1">
                    <h5
                      className={`font-[700] flex items-center gap-2 text-black dark:text-white`}
                    >
                      <p>{comment.name}</p>
                      <p
                        className={`font-[400] text-xs text-black dark:text-mainTextDark`}
                      >
                        {timeEdit(comment.created_at)}
                      </p>
                    </h5>
                    <p
                      className={`whitespace-pre-line jost text-black dark:text-mainTextDark`}
                    >
                      {comment.comment}
                    </p>
                    <div className="flex w-full md:gap-0 gap-1 mt-2 flex-wrap">
                      <div
                        className={`md:basis-[65%] basis-[100%] flex justify-between items-center px-4 flex-wrap text-black dark:text-mainTextDark`}
                      >
                        <div className="flex md:gap-4 gap-2 items-center text-[0.85rem]">
                          <FaRegComment />
                          <p>0</p>
                        </div>
                        <div className="flex md:gap-4 gap-2 items-center text-[0.85rem]">
                          <FaRetweet />
                          <p>0</p>
                        </div>
                        <div className="flex md:gap-4 gap-2 items-center text-[0.85rem]">
                          <FaHeart />
                          <p>0</p>
                        </div>
                        <div>
                          <FiUpload className="" />
                        </div>
                      </div>
                      <div className="md:basis-[35%] basis-[100%] flex  items-end justify-end"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`flex-1 md:block hidden bg-talkOrTweet dark:text-white dark:bg-darkBg md:p-8 p-4 md:rounded-2xl rounded-xl`}
          >
            <ReactSearchAutocomplete
              styling={{
                iconColor: "#000",
                searchIconMargin: "0 0 0 0",
                border: "none",
                borderRadius: "30px",
                width: "100%",
                backgroundColor: darkMode ? "#212121" : "white",
                color: darkMode ? "white" : "black",
              }}
              className={`singletalk-input jost w-full md:border-none focus:shadow-none h-10 lg:h-12`}
              placeholder="Search"
            />
            <div className="mt-4">
              <div>
                <h2
                  style={{
                    borderBottom: "1px solid #2F3336",
                  }}
                  className={`text-black dark:text-white py-4 font-[600] text-[1.1rem]`}
                >
                  Recent Talks
                </h2>
                <div className="flex flex-col gap-5 mt-4 my-3">
                  {talks?.data?.data.filter((talk) => talk.id !== id).map((talk) => (
                    <Link
                      to={`/mypromotalk/${talk.id}/${encodeURIComponent(data?.data?.data?.description)}`}
                      key={talk.id}
                      className="group flex items-start gap-4 *:duration-300"
                    >
                      <div className="group-hover:scale-110 origin-bottom">
                        <LazyLoadImage src={`${api_general}/${talk?.titleImageurl}`}
                          className="w-12 aspect-square object-cover rounded-md"
                          alt=""
                        />
                      </div>
                      <div className="flex-1  flex flex-col">
                        <h6 className="text-[0.75rem] text-[#676872] font-500">
                          {TimeEdit(talk?.created_at)}
                        </h6>
                        <p
                          className={`text-[0.8rem] text-black dark:text-white`}
                        >
                          {talk.description.length > 50
                            ? talk.description.slice(0, 60).concat("...")
                            : talk.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleTalk;
