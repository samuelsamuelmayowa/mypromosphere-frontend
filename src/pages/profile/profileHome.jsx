import { useEffect } from "react";
import { useParams } from "react-router-dom";
import bgLOGO from "../../assets/icons/icon2.svg";
import anon from "../../assets/images/anon.png";
import { BsTelephone } from "react-icons/bs";
import { BsGlobe } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdOutlineDynamicFeed, MdDashboard } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import { useStateContext } from "../../contexts/ContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { Helmet } from "react-helmet";
import Linkify from "react-linkify";
import FetchAds from "../../hooks/otherUsersPosts";
import ReactWhatsapp from "react-whatsapp";
import FetchProfileUser from "../../hooks/fetchUserProfile";

const api_gerenal = import.meta.env.VITE_GENERAL;
const api_see = import.meta.env.VITE_HOME;

const ProfileHome = () => {
  const { token, darkMode } = useStateContext();
  const { pathname } = useLocation();
  const { user_name } = useParams();
  const { data, isLoading } = FetchProfileUser(user_name);
  const { data: ads } = FetchAds(user_name);

  // console.log(data.data.data[0].aboutMe)
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

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      {isLoading && (
        <div className="min-h-screen grid place-content-center">
          <div
            className={`text-black dark:text-white inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]`}
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      {!isLoading && (
        <section className="relative">
          <section>
            <div className="w-full relative">
              {data?.data?.data?.backgroundimage ? (
                <LazyLoadImage
                  src={
                    data?.data?.data?.backgroundimage
                      ? `${api_gerenal}/${data?.data?.data?.backgroundimage}`
                      : anon
                  }
                  alt=""
                  className="w-full h-[200px] md:h-[300px] object-center object-cover"
                />
              ) : (
                <LazyLoadImage
                  src={bgLOGO}
                  alt="background"
                  className="w-full h-[200px] md:h-[350px] object-center object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <LazyLoadImage
                src={
                  data.data.data[0].profileImage
                    ? `${api_gerenal}/${data.data.data[0].profileImage}`
                    : anon
                }
                alt="profile picture"
                className="xs:w-[30%] xs:left-4 sm:top-[50%] xs:top-[65%] w-[20%] absolute left-8 md:left-20 lg:top-[80%] top-[80%] md:top-[85%] md:w-[15%] exl:top-[70%] lg:w-[13%] aspect-square object-cover object-top rounded-full border-4 border-white"
              />
            </div>
          </section>
          <div className="">
            <article className="mt-10 md:mt-20 md:px-20 px-4 flex justify-between md:flex-row flex-col gap-10">
              <div className="w-full flex-1 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h1
                    className={`font-700 md:text-2xl text-lg capitalize text-black dark:text-mainTextDark jost`}
                  >
                    {data?.data?.data?.name ||
                      data?.data?.data?.user_name ||
                      user_name ||
                      "No Name"}
                  </h1>
                  <CopyToClipboard
                    onCopy={() => toast.success("Profile Link Copied")}
                    text={`${api_see}/profile/user/${encodeURIComponent(
                      data?.data?.data?.name ||
                      data?.data?.data?.user_name ||
                      user_name
                    )}`}
                  >
                    <div className="flex items-center gap-2 duration-200 rounded-md cursor-pointer">
                      <FaShare
                        size={20}
                        className="text-black dark:text-mainTextDark"
                      />
                      <p
                        className={`text-center jost text-black dark:text-mainTextDark`}
                      >
                        Copy promote link
                      </p>
                    </div>
                  </CopyToClipboard>
                </div>
                <div
                  className={`flex items-center gap-x-2 text-black dark:text-mainTextDark`}
                >
                  <BsGlobe className="md:text-base text-sm" />
                  <Linkify componentDecorator={componentDecorator} class="">
                    <p className="jost w-full break-words">
                      {data.data.data[0].websiteName ?? "No website name"}
                    </p>
                  </Linkify>
                </div>
                <div
                  className={`flex items-center gap-x-2 text-black dark:text-mainTextDark`}
                >
                  <BsTelephone className="md:text-base text-sm" />
                  <p className="jost">
                    { data.data.data[0].user_phone ??
                      "User has not added their whatsApp Number"}
                    <ReactWhatsapp
                      number="1-212-736-5000"
                      // message="Hello World!!!"
                    />
                  </p>
                </div>
                {token?.user_name === user_name && (
                  <div>
                    <Link to="/dashboard" className={``}>
                      <div className="flex gap-2 items-center">
                        <MdDashboard
                          size={20}
                          className={`animate-bounce text-black dark:text-mainTextDark`}
                        />
                        <p
                          className={`text-center text-black dark:text-mainTextDark jost`}
                        >
                          My DashBoard
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-2 jost">
                <h1
                  className={`font-bold md:text-2xl text-lg text-black dark:text-mainTextDark`}
                >
                  About me  
                </h1>
                <p
                  className={`whitespace-pre-line rounded-md p-3 px-6 text-black bg-[#dcdcdc] dark:text-mainTextDark dark:bg-DARKBG`}
                >
                  {data.data.data[0].aboutMe ?? "No about me"}
                </p>
              </div>
            </article>
            <article className="">
              <div className="w-[80%] mx-auto">
                <div className="profile-links flex  items-center my-4">
                  {ads?.data.ads && (
                    <div
                      className={`flex-1 text-center jost text-black dark:text-mainTextDark`}
                    >
                      <NavLink
                        to={`/profile/user/${user_name}`}
                        className={({ isActive }) =>
                          isActive &&
                            pathname ===
                            `/profile/user/${encodeURIComponent(user_name)}`
                            ? "ads ads-active text-purple py-4 font-medium flex justify-center items-center gap-2 md:text-base text-sm"
                            : "ads py-4 font-medium flex justify-center items-center md:text-base text-sm"
                        }
                      >
                        {pathname === `/profile/user/${user_name}` && (
                          <MdOutlineDynamicFeed size={20} />
                        )}
                        <p className="md:text-lg">Ads</p>
                      </NavLink>
                    </div>
                  )}
                  <div className={`flex-1 text-center jost text-black dark:text-mainTextDark`}>
                    <NavLink
                      to={`/profile/user/${user_name}/videos`}
                      className={({ isActive }) =>
                        isActive &&
                          pathname ===
                          `/profile/user/${encodeURIComponent(
                            user_name
                          )}/videos`
                          ? "talk talk-active text-purple py-4 font-medium flex justify-center items-center gap-2 md:text-base text-sm"
                          : "talk py-4 font-medium flex justify-center items-center md:text-base text-sm"
                      }>
                      {pathname === `/profile/user/${user_name}/videos` && (
                        <CiChat1 size={20} />
                      )}
                      <p className="md:text-lg">Videos</p>
                    </NavLink>
                  </div>
                </div>
              </div>
            </article>
            <div className="my-2 relative">
              <Outlet context={user_name} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProfileHome;
