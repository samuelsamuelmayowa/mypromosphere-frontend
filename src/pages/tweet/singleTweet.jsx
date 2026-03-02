import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FetchSingleTweet from "../../hooks/fetchSingleTweet";
import { useStateContext } from "../../contexts/ContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loader from "../../loader";
import anon from "../../assets/images/anon.png";
import TweetComment from "./component/tweetComment";
import timeEdit from "../../utils/timeEdit";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { FaRegComment, FaRetweet } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Linkify from 'react-linkify';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '../../utils/trends.css';

import { FiUpload } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import FetchTweet from "../../hooks/fetchTweet";
import FetchProfileUser from "../../hooks/fetchUserProfile";

import { ShareSocial } from 'react-share-social'
import { Helmet } from "react-helmet";

const api = import.meta.env.VITE_GENERAL;
const api_general = import.meta.env.VITE_GENERAL;
const HOME = import.meta.env.VITE_HOME;

const SingleTweet = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { data: tweet } = FetchTweet("All");
  const { token, darkMode } = useStateContext();
  const { data, isLoading, error } = FetchSingleTweet(id);
  const { data: singleTweetUser } = FetchProfileUser(data?.data?.data?.user_name);
  const { data: profile } = FetchProfileUser(token?.user_name);

  const handleNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/mypromotweet');
    }
  };

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer" style={{ color: darkMode ? '#ADD8E6' : '#0000FF', textDecoration: 'underline' }}>
      {text}
    </a>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tweetData = data?.data?.data;

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
        <title>{tweetData?.description}</title>
        <meta
          name="description"
          content={tweetData?.description
            ? `${tweetData?.description}`
            : "View detailed information about this promotional tweet on MyPromoTweet."}
        />
        <meta name="keywords" content="Promotional Tweet, Social Media, Comments, Shares, Likes" />
        <meta property="og:title" content={tweetData?.description} />
        <meta property="og:description" content={tweetData?.description
          ? `${tweetData?.description}...`
          : "View detailed information about this promotional tweet on MyPromoTweet."} />
        <meta property="og:image" content={tweetData?.titleImageurl
          ? `${api}/public/storage${tweetData?.titleImageurl.slice(7)}`
          : anon}
        />
        <meta property="og:url" content={`${HOME}/mypromotweet/${id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={tweetData?.description || "MyPromoTweet - View Tweet"} />
        <meta name="twitter:description" content={tweetData?.description
          ? `${tweetData?.description}`
          : "View detailed information about this promotional tweet on MyPromoTweet."} />
        <meta name="twitter:image" content={tweetData?.titleImageurl
          ? `${api}/public/storage${tweetData?.titleImageurl.slice(7)}`
          : anon} />
        <link rel="icon" href={tweetData?.titleImageurl.slice(7)} type="image/x-icon" />
      </Helmet>
      <section className="p-2 md:p-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className={`font-medium dark:text-white text-black md:text-[1.5rem] text-[1.3rem] md:mb-4 mb-2`}>
            MyPromoTweet
          </h1>
          <div onClick={handleNavigation}>
            <IoIosArrowRoundBack size={30} className={`cursor-pointer dark:text-white text-black`} />
          </div>
        </div>
        <div className="w-full flex gap-10 items-start break-words">
          <div className={`md:flex-[2] flex-1 w-full md:p-10 p-3 md:rounded-2xl rounded-xl bg-talkOrTweet text-black dark:bg-darkBg dark:text-mainTextDark `}>
            <div className="flex md:flex-row flex-col gap-2">
              <div className="">
                <Avatar className="w-10 h-10 ring-2 ring-transparent hover:ring-blue-500 transition-all duration-200">
                  <AvatarImage
                    src={`${api_general}/${singleTweetUser?.data?.data?.profileImage}` || anon}
                    alt={singleTweetUser?.data?.data?.user_name || "User"}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue text-white font-semibold">
                    {(singleTweetUser?.data?.data?.user_name || singleTweetUser?.data?.data?.user_name || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col basis-[90%] gap-1">
                <h5 className="font-[500] flex flex-col">
                  <Link to={`/profile/user/${data?.data?.data?.user_name}`}>
                    <p className={`text-base text-black dark:text-white`}>{data?.data?.data?.user_name}</p>
                  </Link>
                  <p className={`font-light text-xs text-black dark:text-mainTextDark`}>{timeEdit(data?.data?.data?.created_at)}</p>
                </h5>
                <p className={`whitespace-pre-line jost text-black dark:text-mainTextDark`}>
                  <Linkify componentDecorator={componentDecorator}>
                    {data?.data?.data?.description}
                  </Linkify>
                </p>
                <Splide className={`single-tweet w-full`} options={{
                  type: 'slide',
                  gap: "2.4px",
                  perPage: 2,
                  pagination: true,
                  snap: true,
                  drag: 'free',
                  arrows: data?.data?.other_images.length > 1 ? true : false,
                  width: "100%",
                  // height: "300px",
                  breakpoints: {
                    1200: {
                      perPage: 2
                    },
                    640: {
                      perPage: 1,
                    },
                    300: {
                      perPage: 1
                    }
                  },
                }}>
                  <SplideSlide>
                    <img src={`${api}/public/storage/${data?.data?.data?.titleImageurl}`} className="w-full h-full object-cover" alt="" />
                  </SplideSlide>
                  {data?.data?.other_images.map((item, index) => (
                    <SplideSlide key={index}>
                      <img src={`${item.itemadsimagesurls}`} alt="" className="w-full h-full object-cover" />
                    </SplideSlide>
                  ))}
                </Splide>
                <div className="flex w-full md:gap-0 gap-1 mt-2 flex-wrap">
                  <div className="md:basis-[65%] basis-[100%] flex justify-between items-center px-4 flex-wrap">
                    <div className="flex md:gap-4 gap-2 items-center text-[0.85rem]">
                      <FaRegComment />
                      <p>{data?.data?.comments.length}</p>
                    </div>
                    <div className="flex md:gap-4 gap-2 items-center text-[0.85rem]">
                      <FaRetweet />
                      <p>0</p>
                    </div>
                    <div className="flex md:gap-4 gap-2 items-center text-[0.85rem]">
                      <GrFavorite />
                      <p>0</p>
                    </div>
                  </div>
                  <div className="md:basis-[35%] basis-[100%] flex md:items-end md:justify-end">
                    <ShareSocial
                      url={`${HOME}/mypromotweet/${id}`}
                      socialTypes={['facebook', 'twitter', 'whatsapp']}
                      style={{
                        root: {
                          background: 'transparent',
                          borderRadius: 3,
                          border: 0,
                          color: 'white',
                          maxWidth: 'none',
                          minWidth: 'initial',
                          padding: 0,
                        },
                        copyContainer: {
                          display: 'none'
                        },
                        iconContainer: {
                          padding: 0,
                          width: 'fit-content'
                        },
                        title: {
                          color: 'black',
                          fontStyle: 'italic'
                        }
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
                <Avatar className="w-10 h-10 ring-2 ring-transparent hover:ring-blue-500 transition-all duration-200">
                  <AvatarImage
                    src={token ? `${api_general}/${profile?.data?.data?.profileImage}` : anon}
                    alt={profile?.data?.data?.user_image || "User"}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue text-white font-semibold">
                    {(profile?.data?.data?.user_name || token?.user_name || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="md:basis-[92%] basis-[90%]">
                <TweetComment data={data?.data?.data} tweetId={id} />
              </div>
            </div>
            <div>
              {data?.data?.comments?.map((comment, index) => (
                <div key={index}
                  style={{
                    borderBottom: "1px solid #2F3336",
                  }}
                  className="flex gap-2 py-6 text-black "
                >
                  <div className="">
                    <img src={anon} className="w-10 h-10 rounded-full" />
                  </div>
                  <div className="flex flex-col basis-[90%] gap-1  dark:text-white">
                    <h5 className={`font-[700] flex items-center gap-2 text-black dark:text-white`}>
                      <p>{comment.name}</p>
                      <p className={`font-[400] text-xs text-black dark:text-mainTextDark`}>{timeEdit(comment.created_at)}</p>
                    </h5>
                    <p className={`whitespace-pre-line jost text-black dark:text-mainTextDark`}>
                      {comment.comment}
                    </p>

                    <div className={`flex w-full md:gap-0 gap-1 mt-2 flex-wrap text-black dark:text-mainTextDark`}>
                      <div className="md:basis-[65%] basis-[100%] flex justify-between items-center px-4 flex-wrap">
                        <div className="flex md:gap-4 gap-2 items-center text-[0.85rem]">
                          <FaRegComment />
                          <p>0</p>
                        </div>
                        <div className="flex md:gap-4 gap-2 items-center text-[0.85rem]">
                          <FaRetweet />
                          <p>0</p>
                        </div>
                        <div className="flex md:gap-4 gap-2 items-center text-[0.85rem]">
                          <GrFavorite />
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
          <div className={`flex-1 md:block hidden bg-talkOrTweet dark:bg-darkBg dark:text-white  md:p-8 p-4 md:rounded-2xl rounded-xl`}>
            <ReactSearchAutocomplete
              styling={{
                iconColor: "#000",
                border: "none",
                searchIconMargin: '0 0 0 0',
                borderRadius: "30px",
                width: "100%",
                backgroundColor: darkMode ? "#212121" : "white",
                color: darkMode ? "white" : "black"
              }}
              className={`singletweet-input jost w-full md:border-none focus:shadow-none h-10 lg:h-12`}
              placeholder="Search"
            />
            <div className="mt-4">
              <div>
                <h2 style={{
                  borderBottom: "1px solid #2F3336",
                }}
                  className={`text-black dark:text-white py-4 font-[600] text-[1.1rem]`}>
                  Recent Tweets
                </h2>
                <div className="flex flex-col gap-5 mt-4 my-3">
                  {tweet?.data?.data.filter((twt) => twt.id !== id).map((twt) => (
                    <Link to={`/mypromotweet/${twt.id}`} key={twt.id} className="group flex items-start gap-4 *:duration-300">
                      <div className="group-hover:scale-110 origin-bottom">
                        <LazyLoadImage src={`${api_general}/public/storage${twt?.titleImageurl.slice(7)}`} className="w-12 aspect-square object-cover rounded-md" alt="" />
                      </div>
                      <div className="flex-1  flex flex-col">
                        <h6 className="text-[0.75rem] text-[#676872] font-500">
                          {(timeEdit(twt?.created_at))}
                        </h6>
                        <p className={`text-[0.9rem] text-black dark:text-white`}>
                          {twt.description.length > 50 ? twt.description.slice(0, 60).concat("...") : twt.description}
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

export default SingleTweet;
