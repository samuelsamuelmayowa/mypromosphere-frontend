import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
// import {
//   MdDashboard,
//   MdOutlineHelp,
//   MdEmail,
// } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoShieldCheckmark } from "react-icons/io5";
import { useStateContext } from "../contexts/ContextProvider";
// import icon1 from "../assets/icons/icon1.svg";
import icon2 from "../assets/icons/icon2.svg";
import icon3 from "../assets/icons/icon3.svg";
import icon4 from "../assets/icons/icon4.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const SideNav = () => {
  const { token } = useStateContext();
  return (
    <div className={`lg:flex lg:justify-between hidden flex-col p-6 w-fit bg-white dark:bg-DARKBG sticky z-50 top-0 right-0 min-h-screen`}>
      <div className="flex-1 text-center">
        <ul
          className={`flex flex-col items-center gap-6 text-sideNavNavLink text-black dark:text-white font-medium text-base`}
        >
          <NavLink to="/">
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              className="aspect-square flex justify-center items-center tooltip tooltip-right"
              data-tip="Home"
            >
              <LazyLoadImage visibleByDefault={true} effect='opacity' src={icon2} className="w-6" alt="" />
            </motion.div>
            <div className="w-full mt-1 text-sm jost">Home</div>
          </NavLink>
          <NavLink
            to={"/learning"}>
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              className="aspect-square flex justify-center items-center tooltip tooltip-right"
              data-tip="Online school">
              <LazyLoadImage visibleByDefault={true} effect='opacity' src={icon3} className="w-6" alt="" />
            </motion.div>
            <div className="w-full mt-2 text-sm jost">Learning</div>
          </NavLink>
         
          <NavLink to={"/mypromotalk"}>
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              className="aspect-square flex justify-center items-center tooltip tooltip-right"
              data-tip="MyPromoTalk">
              <LazyLoadImage visibleByDefault={true} effect='opacity' src={icon4} className="w-6" alt="" />
            </motion.div>
            <div className="w-full mt-3 text-sm jost">Talk</div>
          </NavLink>
        </ul>
      </div>
      <div className={`flex-1 flex items-center justify-end gap-10 text-xs border-t flex-col py-4 text-sideNavLink dark:text-DARKTEXT`}>
        {token && (
          <>
            <NavLink
              to={'/dashboard'}
              className={({ isActive }) =>
                isActive ? "text-blue rounded-md dark:text-white " : "text-black dark:text-white"
              }>
              <motion.div
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.1 }}
                className="w-10 aspect-square flex justify-center items-center tooltip tooltip-right"
                data-tip="Dashboard"
              >
                <FaUser size={20} />
              </motion.div>
              <div className="text-center">You</div>
            </NavLink>
          </>
        )}
        <div className="flex justify-center items-center tooltip tooltip-right" data-tip="Not Sphere verified">
          <IoShieldCheckmark size={20} />
        </div>
        {/* <MdOutlineHelp size={20} />
        <MdEmail size={20} /> */}
      </div>
    </div>
  );
};

export default SideNav;
