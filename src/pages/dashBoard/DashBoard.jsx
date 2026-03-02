import { useState } from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import anon from "../../assets/images/anon.png";
import { FaShare, FaBook } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";
import { CiChat1 } from "react-icons/ci";
import { MdDynamicFeed } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { GrLogin } from "react-icons/gr";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Helmet } from "react-helmet";
import FetchProfileUser from "../../hooks/fetchUserProfile";

const api = import.meta.env.VITE_HOME;
const api_gerenal = import.meta.env.VITE_GENERAL;

const dashVariant = {
  initial: {
    opacity: 0,
    x: "-200%",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 0.5,
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    x: "-200%",
    transition: {
      when: "afterChildren",
    },
  },
};

function Dashboard() {
  const { pathname } = useLocation();
  const { token, LogOut } = useStateContext();
  const [dashBoardMobileNav, setDashBoardMobileNav] = useState(false);
  const { data } = FetchProfileUser(token?.user_name);

  const handleToggle = () => {
    setDashBoardMobileNav((prev) => !prev);
  };

  if (!token) return <Navigate to="/" />;

  return (
    <>
      <Helmet>
        <title>My DashBoard</title>
      </Helmet>
      <main
        className={`rounded-tr-2xl rounded-br-2xl bg-offwhite dark:bg-BODYDARKBG min-h-screen`}
      >
        <div className={`fixed w-fit z-40`}>
          <div
            className={`dark:bg-darkblue bg-darkblue stroke-white dark:stroke-mainTextDark  rounded-lg m-1 relative z-50`}
          >
            <label className={`hamburger md:hidden block px-2 w-fit`}>
              <input
                onChange={handleToggle}
                type="checkbox"
                checked={dashBoardMobileNav}
              />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>
          <motion.div
            variants={dashVariant}
            initial="initial"
            animate={dashBoardMobileNav ? "animate" : "initial"}
            className={`md:hidden jost min-h-dvh fixed inset-0 z-30 flex flex-col gap-5 px-5 py-8 bg-white dark:bg-darkBg`}
          >
            <div>
              <div
                onClick={LogOut}
                className="ml-auto flex items-center justify-end gap-2 cursor-pointer w-fit"
              >
                <GrLogin size={20} />
                <p className="jost">Logout</p>
              </div>
              <div className="flex flex-col gap-5">
                <CopyToClipboard
                  onCopy={() => {
                    setDashBoardMobileNav(false);
                    toast.success("Profile Link Copied");
                  }}
                  text={`${api}/profile/user/${token?.user_name}`}
                >
                  <div
                    className={`p-3 flex items-center gap-2 duration-200 rounded-md cursor-pointer text-black dark:text-mainTextDark`}>
                    <FaShare size={20} className="" />
                    <p className="text-center">Copy your promote link</p>
                  </div>
                </CopyToClipboard>
                <NavLink
                  to={"profileEdit"}
                  className={({ isActive }) =>
                    isActive ? "text-white dark:text-white dark:bg-[#34353c] bg-darkblue rounded-md" : ""
                  }
                >
                  <button
                    onClick={() => setDashBoardMobileNav(false)}
                    className={`flex items-center gap-2 p-3 duration-200rounded-md cursor-pointer`}>
                    <IoIosSettings size={20} className="" />
                    <p className="text-center">Edit profile</p>
                  </button>
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive && pathname === "/dashboard"
                      ? "text-white dark:text-white dark:bg-[#34353c] bg-darkblue rounded-md" : ""
                  }
                >
                  <button
                    onClick={() => setDashBoardMobileNav(false)}
                    className={`flex items-center gap-2 p-3`}
                  >
                    <MdDynamicFeed size={20} />
                    <p className="jost">Post</p>
                  </button>
                </NavLink>
                <NavLink
                  to={"myvideos"}
                  className={({ isActive }) =>
                    isActive ? "text-white dark:text-white dark:bg-[#34353c] bg-darkblue rounded-md" : ""
                  }>
                  <button
                    onClick={() => setDashBoardMobileNav(false)}
                    className={`flex items-center gap-2 p-3`}
                  >
                    <CiChat1 size={20} />
                    <p className="jost">Talks & Tweets</p>
                  </button>
                </NavLink>
              </div>
            </div>
            <NavLink
              to={`UserProfile/post`}
              className={({ isActive }) =>
                isActive
                  ? "text-white dark:text-white dark:bg-[#34353c] bg-darkblue rounded-md" : ""
              }
            >
              <button
                onClick={() => setDashBoardMobileNav(false)}
                className={`cursor-pointer flex items-center gap-2 p-3`}
              >
                <FiPlusSquare className="animate-bounce" size={20} />
                <p className={`jost`}>
                  Market your products
                </p>
              </button>
            </NavLink>
            <NavLink
              to="learn-with-mypromosphere"
              className={({ isActive }) =>
                isActive && pathname === "/dashboard/learn-with-mypromosphere" ? "*:text-purple *:dark:text-lightblue" : ""
              }
            >
              <button
                className={`flex items-center gap-2 duration-200 text-black dark:text-mainTextDark p-3`}
              >
                <FaBook size={20} />
                <span className="jost">Learn with MyPromoSphere</span>
              </button>
            </NavLink>
          </motion.div>
        </div>
        <section className="flex items-start">
          <article
            className={`hidden sticky top-0 left-0 min-h-screen bg-white dark:bg-darkBg w-fit md:flex items-center md:items-start text-start flex-col md:gap-6 gap-4 py-3 md:py-6 px-10`}
          >
            <div className="flex flex-col md:gap-6 gap-4">
              <div className="flex flex-col gap-2">
                {data?.data?.data?.profileImage ? (
                  <img
                    src={`${api_gerenal}/${data?.data?.data?.profileImage}`}
                    alt={"profile-picture"}
                    className="w-[60px] aspect-square rounded-full object-cover object-center"
                  />
                )
                  :
                  (
                    <img
                      src={anon}
                      alt={"profile-picture"}
                      className="w-[60px] aspect-square rounded-full object-cover object-center"
                    />
                  )}

                <h1
                  className={`font-medium text-sm capitalize md:block hidden text-black dark:text-white`}
                >
                  {token ? `${token["user_name"]}` : "Anonymous"}
                </h1>
                <p className="text-xs text-slate-400 dark:text-slate-400 md:block hidden jost">
                  {token ? `${token["user"]}` : "Anonymous"}
                </p>
              </div>
              <div className="flex items-center md:items-start flex-col md:gap-6 gap-4 justify-center gap-x-6 jost">
                <NavLink
                  to={`UserProfile/post`}
                  className={({ isActive }) =>
                    isActive ? "*:text-purple *:dark:text-lightblue" : ""
                  }
                >
                  <button
                    className={`cursor-pointer flex items-center gap-2`}
                  >
                    <FiPlusSquare className="animate-bounce" size={20} />
                    <h1
                      className={`jost`}
                    >
                      Promote with promosphere
                    </h1>
                  </button>
                </NavLink>
                <CopyToClipboard
                  onCopy={() => toast.success("Profile Link Copied")}
                  text={`${api}/profile/user/${token?.user_name}`}
                >
                  <div
                    className={`flex items-center gap-2 duration-200 rounded-md cursor-pointer text-black dark:text-mainTextDark`}
                  >
                    <FaShare size={20} className="" />
                    <p className="text-center">Share Product/Service Link</p>
                  </div>
                </CopyToClipboard>
                <NavLink
                  to={"profileEdit"}
                  className={({ isActive }) =>
                    isActive ? "*:text-purple *:dark:text-lightblue" : ""
                  }
                >
                  <button
                    className={`flex items-center gap-2 duration-200rounded-md cursor-pointer text-black dark:text-mainTextDark`}
                  >
                    <IoIosSettings size={20} className="" />
                    <p className="text-center ">Edit profile</p>
                  </button>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="learn-with-mypromosphere"
                  className={({ isActive }) =>
                    isActive && pathname === "/dashboard/learn-with-mypromosphere" ? "*:text-purple *:dark:text-lightblue" : ""
                  }
                >
                  <button
                    className={`flex items-center gap-2 duration-200 text-black dark:text-mainTextDark`}
                  >
                    <FaBook size={20} />
                    <span className="jost">Learn with MyPromoSphere</span>
                  </button>
                </NavLink>
              </div>
              <div className="flex items-center md:items-start flex-col md:gap-6 gap-4 justify-center gap-x-6">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive && pathname === "/dashboard" ? "*:text-purple *:dark:text-lightblue" : ""
                  }
                >
                  <button
                    className={`flex items-center gap-2 duration-200 text-black dark:text-mainTextDark`}
                  >
                    <MdDynamicFeed size={20} />
                    <span className="jost">My Posts</span>
                  </button>
                </NavLink>
                <NavLink
                  to={"myvideos"}
                  className={({ isActive }) =>
                    isActive ? "*:text-purple *:dark:text-purple" : ""
                  }
                >
                  <button
                    className={`flex items-center gap-2 duration-200 text-black dark:text-mainTextDark`}
                  >
                    <CiChat1 size={20} />
                    <span className="jost">Talk & Tweets</span>
                  </button>
                </NavLink>
              </div>
            </div>
          </article>
          <section className="flex-1">
            <div className="md:px-5 py-5 w-full">
              <AnimatePresence>
                <Outlet />
              </AnimatePresence>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
