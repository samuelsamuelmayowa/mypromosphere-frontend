import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Footer from "../../components/Footer";
import SideNav from "../../components/sideNav";
import ProfileHover from "../../components/profileHover";
import MobileNav from "../../components/MobileNav";
import SearchInput from "../../components/SearchInput"
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingBag, FaBookmark } from "react-icons/fa";
import { useMobileNavScroll } from "./mobileNavScroll";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";

const mobileNavVariant = {
  initial: {
    y: "200%",
  },
  animate: {
    y: 0,
    transition: {
      type: "spring",
      duration: 0.2,
    },
  },
};

const FeedsHome = () => {
  const { pathname } = useLocation();
  const { token, darkMode, handleDarkMode } = useStateContext();
  const { hidden } = useMobileNavScroll();
  return (
    <>
      <div className="flex lg:items-start lg:flex-row flex-col">
        <SideNav />
        <div className={`flex-1 w-full bg-BODYBG dark:bg-BODYDARKBG`}>
          <AnimatePresence>
            {(pathname === "/" || pathname === "/mypromotalk" || pathname === "/mypromotweet" || pathname === "/wishlist" || pathname === "/tweetBookmark" || pathname === "/talkBookmark" ) &&
              <motion.div className='md:px-6 md:py-2 p-2 flex justify-between gap-5 lg:gap-10 items-center'>
                { pathname === "/" && <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}} className={`font-semibold text-xl lg:text-2xl text-black dark:text-white`}>MyPromoSphere</motion.h1>}
                { pathname === "/mypromotalk" && <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}} className={`font-semibold text-xl lg:text-2xl text-black dark:text-white`}>MyPromoTalk</motion.h1>}
                { pathname === "/mypromotweet" && <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}} className={`font-semibold text-xl lg:text-2xl text-black dark:text-white`}>MyPromoTweet</motion.h1>}
                { pathname === "/wishlist" && <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}} className={`font-semibold text-xl lg:text-2xl text-black dark:text-white`}>WishList</motion.h1>}
                { pathname === "/tweetBookmark" && <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}} className={`font-semibold text-xl lg:text-2xl text-black dark:text-white`}>Saved Tweets</motion.h1>}
                { pathname === "/talkBookmark" && <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}} className={`font-semibold text-xl lg:text-2xl text-black dark:text-white`}>Saved Talks</motion.h1>}
                
                <div className="flex-1 lg:block hidden">
                  <SearchInput />
                </div>
                
                <div className={`flex items-center md:gap-10 gap-8 ${darkMode ? "text-DARKTEXT" : "text-black"}`}>
                  {token &&
                  <Button className="bg-blue/80 hover:bg-blue h-10 flex items-center gap-2 rounded-3xl">
                    <GoPlus size={20} color="white" />
                      <Link to="/dashboard/market">
                    <p className="font-light text-xs text-white">start selling</p></Link>
                  </Button>}
                  {darkMode ?
                    <IoIosSunny onClick={handleDarkMode} size={20} color="gold" className="cursor-pointer" />
                    :
                    <FaMoon onClick={handleDarkMode} size={20} className="cursor-pointer" />
                  }
                  {(pathname === "/" || pathname === "/wishlist") && 
                    <Link to="/wishlist">
                      <FaShoppingBag />
                    </Link>
                  }
                  {(pathname === "/mypromotweet" || pathname === "/tweetBookmark") && 
                    <Link to="/tweetBookmark">
                      <FaBookmark />
                    </Link>
                  }
                  {(pathname === "/mypromotalk" || pathname === "/talkBookmark") && 
                    <Link to="/talkBookmark">
                      <FaBookmark />
                    </Link>
                  }
                  {token && <ProfileHover />}
                  <div className="md:block hidden">
                    {!token && (
                      pathname === "/" && <Link to="/login"><Button className={`md:block hidden border-none btn btn-md bg-lightblue dark:bg-darkblue text-white hover:text-white font-medium rounded-3xl`}>Start Selling</Button></Link> ||
                      pathname === "/mypromotweet" && <Link to="/login"><Button className={`md:block hidden border-none btn btn-md bg-lightblue dark:bg-darkblue text-white hover:text-white font-medium rounded-3xl`}>Start Tweet</Button></Link> ||
                      pathname === "/mypromotalk" && <Link to="/login"><Button className={`md:block hidden border-none btn btn-md bg-lightblue dark:bg-darkblue text-white hover:text-white font-medium rounded-3xl`}>Start Talk</Button></Link>
                    )}
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
          <Outlet />
        </div>
        <motion.div variants={mobileNavVariant} animate={hidden ? "animate" : "initial"} className={`bg-white dark:bg-DARKBG fixed w-full right-0 left-0 bottom-0 lg:hidden block z-40`}>
          <MobileNav />
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default FeedsHome;
