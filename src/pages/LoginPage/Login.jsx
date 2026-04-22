import { useState, useEffect } from "react";
import google from "../../assets/images/icon_google.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { useStateContext } from "../../contexts/ContextProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import icon2 from "../../assets/icons/icon2.svg";
import 'react-lazy-load-image-component/src/effects/opacity.css';
import LOGIN from "../../assets/audio/login.mp3";
import PropTypes from "prop-types";

const api = import.meta.env.VITE_API_LOGIN;
const api_server_auth = import.meta.env.VITE_SERVER_AUTH;

/* ── Icons ─────────────────────────────────────────────────── */
const UserIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const ArrowRight = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ── Stat pill ──────────────────────────────────────────────── */
const Stat = ({ value, label }) => (
  <div>
    <p className="font-['Fraunces'] text-[1.75rem] font-extrabold text-white leading-none mb-1">
      {value}
    </p>
    <p className="text-[11px] text-white/50 font-normal">{label}</p>
  </div>
);

Stat.propTypes = { value: PropTypes.any, label: PropTypes.any };

/* ── Component ──────────────────────────────────────────────── */
const Login = () => {
  const loginAudio = new Audio(LOGIN);
  const navigate = useNavigate();
  const { setToken, setUser, darkMode, handleDarkMode } = useStateContext();
  const [pwVisible, setPwVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loginUrl, setLoginUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((e) => toast.error(e.message));
    }
  }, [errors]);

  useEffect(() => {
    fetch(api_server_auth, {
      headers: { "Content-Type": "application/json", Accept: "application/vnd.api+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setLoginUrl(d.url))
      .catch(() => { });
  }, []);

  const formSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await axios.post(api, { email: data.email, password: data.password });
      if (res.status === 200) {
        setToken(res.data);
        setUser(res.data);
        localStorage.setItem("user-details", JSON.stringify(res.data));
        loginAudio.play().catch(() => { });
        toast.success("Logged in successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      if (err?.response?.status === 422) {
        toast.error(err.response.data.message);
      } else if (err?.message === "Network Error") {
        toast.error("Network error — check your internet connection");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login — MyPromoSphere</title>
        <meta name="description" content="MyPromoSphere is the premier online marketplace for Nigerian entrepreneurs." />
        <link rel="canonical" href="https://www.mypromosphere.com/login" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Helmet>

      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen font-['DM_Sans'] bg-white dark:bg-BODYDARKBG">

        <div className="hidden lg:block relative overflow-hidden bg-[#0d2b14]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxeY3mIS5OEgR8ucKVXmgIV1Av0GWs2IoLIUGB7zbNVyF7YkMIapb9k_Up0K_qZNzD2DECgiux6CNAkSxwlB8gdYkW6uQuFJvZrO0md2brLwHtViiUiUeN9tgX7OAKImperXzDX8B9AGat3EkT3vYtYhhdEvRlwVuirf1vfCzdfEhrOj7A5wMY0xKOrT3xwSw3gtahQQCaiqSCdTGGDeYdMlgKlcBAxvS1BncCSXaDLbNth5YLKvQ4u_r0MtrjBSvPQ6JBqa9kwvo"
            alt="Nigerian Marketplace"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(13,43,20,0.1)] via-[rgba(13,43,20,0.3)] to-[rgba(13,43,20,0.88)]" />

          <div className="relative z-10 h-full flex flex-col justify-end p-12">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5 w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-[#3D217A]" />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white">
                Established 2024
              </span>
            </div>

            <h1 className="font-['Fraunces'] text-[clamp(2.2rem,4vw,3.2rem)] font-black text-white leading-[1.1] tracking-tight mb-4">
              Nigeria&apos;s Premier<br />Marketplace<br />for Growth
            </h1>

            <p className="text-[15px] text-white/70 leading-relaxed max-w-[380px] mb-10">
              Join over 50,000 Nigerian entrepreneurs collaborating to scale
              their businesses and connect with a global audience.
            </p>

            <div className="flex gap-10 pt-7 border-t border-white/15">
              <Stat value="50k+" label="Active Sellers" />
              <Stat value="₦2.4B" label="Annual Trade" />
              <Stat value="99.8%" label="Uptime" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-white dark:bg-BODYDARKBG px-6 py-8 md:px-12 overflow-y-auto">

          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center gap-2.5">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <LazyLoadImage visibleByDefault={true} effect='opacity' src={icon2} className="w-10" alt="" />
              </div>
              <span className="font-['Fraunces'] text-lg font-black text-[#3D217A] tracking-tight">
                MyPromoSphere
              </span>
            </div>

            <button
              onClick={handleDarkMode}
              className="ml-auto p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {darkMode
                ? <IoIosSunny size={22} className="text-yellow-400" />
                : <FaMoon size={20} className="text-gray-600 dark:text-white/70" />
              }
            </button>
          </div>

          {/* ── Mobile brand ── */}
          <div className="md:hidden text-center mt-6 mb-2">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <div className="w-12 h-12 flex items-center justify-center">
                <LazyLoadImage visibleByDefault={true} effect='opacity' src={icon2} className="w-10" alt="" />
              </div>
              <span className="text-3xl font-black text-[#3D217A] tracking-tight">
                MyPromoSphere
              </span>
            </div>
            <p className="text-sm text-gray-400 dark:text-white/40">
              Growth &amp; Connection for the Spirit
            </p>
          </div>

          {/* ── Form section ── */}
          <div className="flex-1 flex flex-col justify-center w-full max-w-[440px] mx-auto py-8">
            <h2 className="text-[2.2rem] font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-2">
              Welcome back
            </h2>
            <p className="jost text-sm text-gray-400 dark:text-white/40 leading-relaxed mb-7">
              Enter your credentials to manage your marketplace presence.
            </p>

            {/* Card wrapper (white on mobile, transparent on desktop dark) */}
            <div className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-0 md:bg-transparent md:dark:bg-transparent shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:shadow-none">

              <form onSubmit={handleSubmit(formSubmit)} noValidate className="space-y-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium text-gray-600 dark:text-white/60">
                    Email or Username
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-gray-400 dark:text-white/30 pointer-events-none">
                      <UserIcon />
                    </span>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="e.g. adamu_ventures@email.com"
                      autoComplete="email"
                      className={`w-full h-[50px] pl-10 pr-4 rounded-xl border bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none
                        ${errors.email
                          ? "border-red-400 dark:border-red-400"
                          : "border-gray-200 dark:border-white/10 focus:border-[#3D217A] dark:focus:border-[#3D217A] focus:bg-white dark:focus:bg-white/10"
                        }
                        focus:ring-2 focus:ring-[#3D217A]/10`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-medium text-gray-600 dark:text-white/60">
                      Password
                    </label>
                    <Link to="/forgot-password"
                      className="text-[13px] font-medium text-[#3D217A] dark:text-[#a98bda] hover:opacity-70">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-gray-400 dark:text-white/30 pointer-events-none">
                      <LockIcon />
                    </span>
                    <input
                      {...register("password")}
                      type={pwVisible ? "text" : "password"}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      className={`w-full h-[50px] pl-10 pr-11 rounded-xl border bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none
                        ${errors.password
                          ? "border-red-400 dark:border-red-400"
                          : "border-gray-200 dark:border-white/10 focus:border-[#3D217A] dark:focus:border-[#3D217A] focus:bg-white dark:focus:bg-white/10"
                        }
                        focus:ring-2 focus:ring-[#3D217A]/10`}
                    />
                    <button
                      type="button"
                      onClick={() => setPwVisible((v) => !v)}
                      className="absolute right-3.5 text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 p-1"
                    >
                      {pwVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex items-center gap-2.5 cursor-pointer w-fit">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <div className="w-[17px] h-[17px] rounded-[5px] border-[1.5px] border-gray-300 dark:border-white/20 peer-checked:bg-[#3D217A] peer-checked:border-[#3D217A] flex items-center justify-center">
                      {remember && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-[13px] text-gray-500 dark:text-white/50 select-none">
                    Keep me logged in for 30 days
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-[52px] mt-1 rounded-xl bg-[#3D217A] hover:bg-[#3D217A]/80 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white jost text-[16px] font-bold tracking-tight flex items-center justify-center gap-2.5 duration-200"
                >
                  {submitting ? (
                    <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Login to MyPromoSphere <ArrowRight /></>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 dark:text-white/25 whitespace-nowrap">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={loginUrl ?? "#"}
                  className="h-12 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-sm font-medium text-gray-700 dark:text-white/70 flex items-center justify-center gap-2  no-underline"
                >
                  <img src={google} alt="Google" className="w-5 h-5" />
                  Google
                </a>
                <button
                  type="button"
                  className="h-12 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-sm font-medium text-gray-700 dark:text-white/70 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FacebookIcon />
                  Facebook
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-white/40 mt-6">
              Don&apos;t have an account?
              <Link
                to="/signup"
                className="ml-1 text-[#3D217A] dark:text-[#a98bda] font-semibold inline-flex items-center gap-1 hover:opacity-75 no-underline"
              >
                Create an account
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </Link>
            </p>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-2 pt-5 border-t border-gray-100 dark:border-white/10">
            <p className="text-xs text-gray-400 dark:text-white/25">
              © 2024 MyPromo Family. Built for the Nigerian Spirit.
            </p>
            <div className="flex gap-5">
              {[["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["Contact Support", "/support"]].map(([label, to]) => (
                <Link key={to} to={to}
                  className="text-xs text-gray-500 dark:text-white/35 hover:text-[#3D217A] dark:hover:text-[#a98bda] no-underline">
                  {label}
                </Link>
              ))}
            </div>
          </footer>
        </div>
      </section>
    </>
  );
};

export default Login;