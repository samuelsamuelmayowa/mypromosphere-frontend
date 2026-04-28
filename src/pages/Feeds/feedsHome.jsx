import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Footer from "../../components/Footer";
import SideNav from "../../components/sideNav";
import ProfileHover from "../../components/profileHover";
import MobileNav from "../../components/MobileNav";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingBag, FaBookmark } from "react-icons/fa";
import { useMobileNavScroll } from "./mobileNavScroll";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";

const mobileNavVariant = {
  initial: { y: "200%" },
  animate: {
    y: 0,
    transition: { type: "spring", duration: 0.2 },
  },
};

const pageTitles = {
  "/": "MyPromoSphere",
  "/mypromotalk": "MyPromoTalk",
  "/mypromotweet": "MyPromoTweet",
  "/wishlist": "WishList",
  "/tweetBookmark": "Saved Tweets",
  "/talkBookmark": "Saved Talks",
};

const topNavPaths = ["/", "/mypromotalk", "/mypromotweet", "/wishlist", "/tweetBookmark", "/talkBookmark"];

const FeedsHome = () => {
  const { pathname } = useLocation();
  const { token, darkMode, handleDarkMode } = useStateContext();
  const { hidden } = useMobileNavScroll();
  const [searchVal, setSearchVal] = useState("");

  const showTopNav = topNavPaths.includes(pathname);
  const pageTitle = pageTitles[pathname];

  return (
    <>
      <div className="flex lg:items-start lg:flex-row flex-col">
        <SideNav />

        <div className="flex-1 w-full min-w-0 bg-BODYBG dark:bg-BODYDARKBG">
          <AnimatePresence>
            {showTopNav && (
              <motion.header
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="
                  sticky top-0 z-40
                  flex items-center gap-4
                  px-5 md:px-7 py-3
                  bg-white dark:bg-DARKBG
                  border-b border-border
                  transition-colors duration-300
                "
              >
                {/* Page title */}
                <motion.h1
                  key={pathname}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-bold text-lg lg:text-xl text-foreground whitespace-nowrap font-sans shrink-0"
                >
                  {pageTitle}
                </motion.h1>

                {/* Search — desktop only */}
                <div className="flex-1 hidden lg:flex items-center gap-3 max-w-md mx-4">
                  <div className="
                    flex-1 flex items-center gap-2
                    bg-BODYBG dark:bg-inputDark
                    rounded-full border border-border
                    px-4 py-2
                  ">
                    <span className="text-muted-foreground text-sm">🔍</span>
                    <input
                      value={searchVal}
                      onChange={e => setSearchVal(e.target.value)}
                      placeholder="Search products, gists, or rentals..."
                      className="
                        flex-1 bg-transparent border-none outline-none
                        text-sm text-foreground placeholder:text-muted-foreground
                        font-sans
                      "
                    />
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-6 ml-auto">
                  {/* Start Selling — only when logged in */}
                  {token && (
                    <Link to="/dashboard/market">
                      <Button className="
                        bg-blue hover:bg-blue/90
                        text-white rounded-full
                        h-9 px-4 gap-1.5
                        text-xs font-semibold
                        shadow-[0_4px_14px_rgba(36,76,180,0.3)]
                        transition-all duration-200
                      ">
                        <GoPlus size={16} />
                        Start Selling
                      </Button>
                    </Link>
                  )}

                  {/* Not logged in CTA */}
                  {!token && (pathname === "/" || pathname === "/mypromotalk") && (
                    <Link to="/login">
                      <Button className="
                        hidden md:flex
                        bg-lightblue dark:bg-darkblue
                        text-white rounded-full
                        h-9 px-4 text-xs font-semibold
                      ">
                        {pathname === "/" ? "Start Selling" : "Start Talk"}
                      </Button>
                    </Link>
                  )}

                  {/* Dark mode toggle */}
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={handleDarkMode}
                    className="
                      w-9 h-9 rounded-xl flex items-center justify-center
                      bg-muted hover:bg-accent border border-border
                      transition-colors duration-200 cursor-pointer
                    "
                    aria-label="Toggle dark mode"
                  >
                    {darkMode
                      ? <IoIosSunny size={16} className="text-amber-400" />
                      : <FaMoon size={14} className="text-muted-foreground" />
                    }
                  </motion.button>

                  {/* Context icon: wishlist/bookmark */}
                  {(pathname === "/" || pathname === "/wishlist") && (
                    <Link to="/wishlist" className="text-muted-foreground hover:text-foreground transition-colors">
                      <FaShoppingBag size={17} />
                    </Link>
                  )}
                  {(pathname === "/mypromotweet" || pathname === "/tweetBookmark") && (
                    <Link to="/tweetBookmark" className="text-muted-foreground hover:text-foreground transition-colors">
                      <FaBookmark size={16} />
                    </Link>
                  )}
                  {(pathname === "/mypromotalk" || pathname === "/talkBookmark") && (
                    <Link to="/talkBookmark" className="text-muted-foreground hover:text-foreground transition-colors">
                      <FaBookmark size={16} />
                    </Link>
                  )}

                  {/* Profile */}
                  {token && <ProfileHover />}
                </div>
              </motion.header>
            )}
          </AnimatePresence>

          <Outlet />
        </div>

        {/* Mobile bottom nav */}
        <motion.div
          variants={mobileNavVariant}
          animate={hidden ? "animate" : "initial"}
          className="bg-white dark:bg-DARKBG fixed w-full right-0 left-0 bottom-0 lg:hidden block z-40"
        >
          <MobileNav />
        </motion.div>
      </div>


      <Footer />
    </>
  );
};

export default FeedsHome;