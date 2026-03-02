import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useStateContext } from "../contexts/ContextProvider";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineRssFeed, MdLogin } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import anon from "../assets/images/anon.png";
import FetchAds from "../hooks/otherUsersPosts";
import { FaPlus } from "react-icons/fa6";
import FetchProfileUser from "../hooks/fetchUserProfile";

const api_general = import.meta.env.VITE_GENERAL;

function MobileNav() {
  const { pathname } = useLocation();
  const { token } = useStateContext();
  const { data: ads } = FetchAds(token?.user_name);
  const { data } = FetchProfileUser(token?.user_name);


  return (
    <div className="py-3">
      <ul
        className={`flex justify-evenly items-center text-sideNavNavLink dark:text-DARKTEXT text-black font-medium text-base`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-blue flex-1" : "flex-1")}
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
            className="flex flex-col items-center gap-1"
          >
            <BiSolidCategoryAlt size={15} />
            <p className="jost text-xs">Home</p>
          </motion.div>
        </NavLink>
        <NavLink
          to={"/learning"}
          className={({ isActive }) => (isActive ? "text-blue flex-1" : "flex-1")}
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
            className="flex flex-col items-center gap-1"
          >
            <MdOutlineRssFeed size={15} />
            <p className="jost text-xs">Learning</p>
          </motion.div>
        </NavLink>

        {token ? (
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) => (isActive ? "text-blue flex-1" : "flex-1")}
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.2 }}
              className="flex flex-col items-center gap-1"
            >
              <FaPlus size={20} />
            </motion.div>
          </NavLink>
        ) : null}

        <NavLink
          to={"/mypromotalk"}
          className={({ isActive }) => (isActive ? "text-blue flex-1" : "flex-1")}
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
            className="flex flex-col items-center gap-1">
            <CiChat1 size={15} />
            <p className="jost text-xs">MyPromotalk</p>
          </motion.div>
        </NavLink>
        {token ? (
          <NavLink
            to={
              ads?.data.ads
                ? `profile/user/${token?.user_name}`
                : `/profile/user/${token?.user_name}/videos`
            }
            className={({ isActive }) => (isActive ? "text-blue flex-1" : "flex-1")}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.2 }}
              className="flex flex-col items-center gap-1">
              {data?.data?.data?.profileImage ? (
                <img
                src={`${api_general}/${data?.data?.data?.profileImage}`}
                alt="dp"
                className="w-8 aspect-square rounded-full object-cover"
              />
              ):
              (
                <img
                  src={anon}
                  alt="dp"
                  className="w-3 aspect-square rounded-full object-cover"
              />
              )}
              
              <p className="jost text-xs">You</p>
            </motion.div>
          </NavLink>
        ) :
          (
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive ? "text-white rounded-md flex-1" : "flex-1"
              }
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.2 }}
                className="flex flex-col items-center gap-1"
              >
                <MdLogin size={15} />
                <p className="jost text-xs font-bold">
                  {
                    pathname === "/" && "Start Selling" ||
                    pathname === "/mypromotweet" && "Start Tweet" ||
                    pathname === "/mypromotalk" && "Start Talk"
                  }
                </p>
              </motion.div>
            </NavLink>
          )}
      </ul>
    </div>
  );
}

export default MobileNav;
