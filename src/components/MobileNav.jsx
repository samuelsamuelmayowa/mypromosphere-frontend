import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useStateContext } from "../contexts/ContextProvider";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import anon from "../assets/images/anon.png";
import FetchAds from "../hooks/otherUsersPosts";
import FetchProfileUser from "../hooks/fetchUserProfile";

const api_general = import.meta.env.VITE_GENERAL;

function MobileNav() {
  const { pathname } = useLocation();
  const { token } = useStateContext();
  const { data: ads } = FetchAds(token?.user_name);
  const { data } = FetchProfileUser(token?.user_name);

  const profileSrc = data?.data?.data?.profileImage
    ? `${api_general}/${data?.data?.data?.profileImage}`
    : anon;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 0 env(safe-area-inset-bottom)",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "0.5px solid rgba(0,0,0,0.08)",
      }}
    >
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "8px 16px 10px",
          margin: 0,
          listStyle: "none",
        }}
      >
        {/* Home */}
        <NavLink to="/" style={{ flex: 1, textDecoration: "none" }}>
          {({ isActive }) => (
            <motion.div
              whileTap={{ scale: 0.88 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: isActive ? "#EEF3FF" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
              >
                <BiSolidCategoryAlt
                  size={22}
                  color={isActive ? "#3B6FE8" : "#9CA3AF"}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  color: isActive ? "#3B6FE8" : "#9CA3AF",
                  fontFamily: "inherit",
                }}
              >
                Home
              </span>
            </motion.div>
          )}
        </NavLink>

        {/* Talk */}
        <NavLink to="/mypromotalk" style={{ flex: 1, textDecoration: "none" }}>
          {({ isActive }) => (
            <motion.div
              whileTap={{ scale: 0.88 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: isActive ? "#EEF3FF" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
              >
                <CiChat1
                  size={22}
                  color={isActive ? "#3B6FE8" : "#9CA3AF"}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  color: isActive ? "#3B6FE8" : "#9CA3AF",
                }}
              >
                Talk
              </span>
            </motion.div>
          )}
        </NavLink>

        {/* Center CTA — Plus Button */}
        {token ? (
          <NavLink
            to="/dashboard"
            style={{ flex: 1, textDecoration: "none" }}
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: -20,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background: "linear-gradient(135deg, #4F7EF7 0%, #3B6FE8 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(59, 111, 232, 0.4)",
                }}
              >
                <FaPlus size={22} color="#fff" />
              </div>
            </motion.div>
          </NavLink>
        ) : (
          /* Placeholder space when logged out so layout stays balanced */
          <div style={{ flex: 1 }} />
        )}

        {/* Profile or Login */}
        {token ? (
          <NavLink
            to={
              ads?.data.ads
                ? `profile/user/${token?.user_name}`
                : `/profile/user/${token?.user_name}/videos`
            }
            style={{ flex: 1, textDecoration: "none" }}
          >
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.88 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: isActive ? "#EEF3FF" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                  }}
                >
                  <img
                    src={profileSrc}
                    alt="dp"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: isActive ? "2px solid #3B6FE8" : "2px solid transparent",
                      transition: "border 0.2s",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    color: isActive ? "#3B6FE8" : "#9CA3AF",
                  }}
                >
                  You
                </span>
              </motion.div>
            )}
          </NavLink>
        ) : (
          <NavLink to="/login" style={{ flex: 1, textDecoration: "none" }}>
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.88 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: isActive ? "#EEF3FF" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MdLogin size={22} color={isActive ? "#3B6FE8" : "#9CA3AF"} />
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    color: isActive ? "#3B6FE8" : "#9CA3AF",
                  }}
                >
                  {pathname === "/" && "Sell"}
                  {pathname === "/mypromotweet" && "Tweet"}
                  {pathname === "/mypromotalk" && "Talk"}
                  {!["/", "/mypromotweet", "/mypromotalk"].includes(pathname) && "Login"}
                </span>
              </motion.div>
            )}
          </NavLink>
        )}

        {!token && <div style={{ flex: 1 }} />}
      </ul>
    </div>
  );
}

export default MobileNav;