import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import icon2 from "../assets/icons/icon2.svg";
import icon4 from "../assets/icons/icon4.svg";

const SideNav = () => {
  const { token, darkMode, handleDarkMode } = useStateContext();

  const navLinks = [
    { to: "/", icon: icon2, label: "Home", isImg: true },
    { to: "/mypromotalk", icon: icon4, label: "Talk", isImg: true },
    ...(token
      ? [{ to: "/dashboard", icon: null, label: "You", isImg: false }]
      : []),
  ];

  return (
    <aside className="
      hidden lg:flex flex-col items-center
      sticky top-0 left-0 z-50
      h-screen w-[72px]
      bg-white dark:bg-DARKBG
      border-r border-border
      py-5 px-2
      transition-colors duration-300">
      {/* Logo mark */}
      <NavLink to="/" className="mb-8 shrink-0">
        <motion.div
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.08 }}
          className="
            w-10 h-10 rounded-xl
            bg-blue flex items-center justify-center
            shadow-[0_4px_14px_rgba(36,76,180,0.35)]
            cursor-pointer
          "
        >
          <LazyLoadImage
            visibleByDefault
            effect="opacity"
            src={icon2}
            className="w-5 brightness-[10]"
            alt="logo"
          />
        </motion.div>
      </NavLink>

      {/* Main nav */}
      <nav className="flex flex-col items-center gap-5 flex-1 w-full">
        {navLinks.map(({ to, icon, label, isImg }) => (
          <NavLink key={to} to={to} className="w-full flex justify-center">
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.06 }}
                className={`
                  w-12 h-12 rounded-2xl
                  flex flex-col items-center justify-center gap-1
                  cursor-pointer transition-colors duration-200
                  ${isActive
                    ? "bg-blue/10 text-blue"
                    : "text-sideNavLink hover:bg-muted hover:text-foreground"
                  }
                `}
              >
                {isImg ? (
                  <LazyLoadImage
                    visibleByDefault
                    effect="opacity"
                    src={icon}
                    className={`w-5 transition-all duration-200 ${isActive ? "opacity-100" : "opacity-50"}`}
                    alt={label}
                  />
                ) : (
                  <FaUser
                    size={16}
                    className={isActive ? "text-blue" : "text-sideNavLink"}
                  />
                )}
                <span
                  className={`
                    text-[10px] font-medium leading-none
                    font-sans tracking-wide
                    ${isActive ? "text-blue" : "text-sideNavLink"}
                  `}
                >
                  {label}
                </span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom controls */}
      <div className="flex flex-col items-center gap-3 mt-auto pt-4 border-t border-border w-full">
        {/* Dark mode toggle */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.08 }}
          onClick={handleDarkMode}
          className="
            w-9 h-9 rounded-xl
            bg-muted hover:bg-accent
            flex items-center justify-center
            cursor-pointer transition-colors duration-200
            border border-border
          "
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <IoIosSunny size={16} className="text-amber-400" />
          ) : (
            <FaMoon size={14} className="text-sideNavLink" />
          )}
        </motion.button>

        {/* Sphere verified badge */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="
            w-9 h-9 rounded-xl
            bg-muted flex items-center justify-center
            border border-border
            cursor-default
          "
          title="Not Sphere Verified"
        >
          <IoShieldCheckmark size={16} className="text-sideNavLink" />
        </motion.div>
      </div>
    </aside>
  );
};

export default SideNav;