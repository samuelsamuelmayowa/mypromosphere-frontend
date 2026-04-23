import { useEffect, useState } from 'react'
import google from "../../assets/images/icon_google.png";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form";
import Loader from '../../loader';
import { useStateContext } from '../../contexts/ContextProvider';
import { toast } from 'sonner';
import { Helmet } from "react-helmet";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import icon2 from "../../assets/icons/icon2.svg";
import 'react-lazy-load-image-component/src/effects/opacity.css';
import axios from "axios"
import PropTypes from "prop-types";


const api = import.meta.env.VITE_API_SIGNUP
const api_server_auth = import.meta.env.VITE_SERVER_AUTH;

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.82 2.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowRight = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/* ── Feature card ───────────────────────────────────────────── */
const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
    <div className="w-10 h-10 rounded-xl bg-[#3D217A]/80 flex items-center justify-center shrink-0 text-white text-xl">
      {icon}
    </div>
    <div>
      <p className="text-white font-semibold text-sm leading-tight mb-0.5">{title}</p>
      <p className="jost text-white/60 text-xs leading-relaxed">{desc}</p>
    </div>
  </div>
);

/* ── Avatar stack ───────────────────────────────────────────── */
const AvatarStack = () => (
  <div className="flex items-center gap-3 mt-8">
    <div className="flex -space-x-2">
      {["bg-orange-400", "bg-yellow-500", "bg-green-400"].map((c, i) => (
        <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#0d5c2a] flex items-center justify-center text-white text-xs font-bold`}>
          {["A", "B", "C"][i]}
        </div>
      ))}
    </div>
    <p className="text-white/70 text-xs font-medium">Trusted by <span className="text-white font-semibold">5,000+</span> local business owners</p>
  </div>
);

/* ── Main Component ─────────────────────────────────────────── */
const SignUp = () => {
  const navigate = useNavigate();
  const { setToken, darkMode, handleDarkMode } = useStateContext();
  const [selected, setSelected] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginUrl, setLoginUrl] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().required("Your name is required to continue"),
    email: yup.string().email("Invalid email address").required("Enter your email"),
    phone: yup.string().optional(),
    b_name: yup.string().optional(),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Please enter your password"),
  });

  const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    if (!selected) { toast.error("Please agree to the terms and conditions"); return; }
    try {
      const response = await axios.post(api, { name: data.name, email: data.email, password: data.password });
      if (response.status === 200) {
        setToken(response.data.token);
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((e) => toast.error(e.message));
    }
  }, [errors]);

  useEffect(() => {
    fetch(api_server_auth, { headers: { "Content-Type": "application/json", Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setLoginUrl(d.url))
      .catch(() => { });
  }, []);

  /* shared input class */
  const inputCls = (hasErr) =>
    `w-full h-[50px] pl-10 pr-4 rounded-xl border text-sm outline-none
    bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25
    ${hasErr
      ? "border-red-400"
      : "border-gray-200 dark:border-white/10 focus:border-[#3D217A] dark:focus:border-[#3D217A] focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-[#3D217A]/10"
    }`;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up — MyPromoSphere</title>
        <meta name="description" content="Join MyPromoSphere, the leading online marketplace in Nigeria." />
        <link rel="canonical" href="https://www.mypromosphere.com/signup" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Helmet>

      {isSubmitting && (
        <div className="z-[9999999] fixed inset-0 bg-black/60 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] min-h-screen font-['DM_Sans'] bg-white dark:bg-BODYDARKBG">

        {/* ── LEFT PANEL ── */}
        <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-purple p-10">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          {/* Bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-purple/80 to-transparent pointer-events-none" />

          {/* Brand */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-9=12 h-12 flex items-center justify-center shrink-0">
              <LazyLoadImage visibleByDefault={true} effect='opacity' src={icon2} className="w-10" alt="" />
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              MyPromoSphere
            </span>
          </div>

          {/* Hero text */}
          <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
            <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-4 inter">
              For Nigerian Entrepreneurs
            </p>
            <h1 className="font-['Fraunces'] text-[clamp(2rem,3.5vw,2.8rem)] font-black text-white leading-[1.1] tracking-tight mb-4">
              Empowering the<br />Nigerian<br />Entrepreneur.
            </h1>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-[340px] mb-8 jost">
              Join the most vibrant marketplace where growth meets community.
            </p>

            {/* Feature cards */}
            <div className="flex flex-col gap-3 max-w-[400px]">
              <FeatureCard
                icon="👥"
                title="Access 1000+ local buyers"
                desc="Connect directly with ready-to-buy customers in your area."
              />
              <FeatureCard
                icon="📢"
                title="Promote your products for free"
                desc="No hidden listing fees. Start scaling your business today."
              />
            </div>

            <AvatarStack />
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex flex-col justify-between bg-white dark:bg-BODYDARKBG px-6 py-8 md:px-12 overflow-y-auto">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-2">
            {/* Mobile brand */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="w-10 h-10  flex items-center justify-center">
                <LazyLoadImage visibleByDefault={true} effect='opacity' src={icon2} className="w-10" alt="" />
              </div>
              <span className="font-['Fraunces'] text-base font-black text-purple">MyPromoSphere</span>
            </div>
            <div className="hidden lg:block" />

            <button
              onClick={handleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {darkMode
                ? <IoIosSunny size={20} className="text-yellow-400" />
                : <FaMoon size={20} className="text-gray-500 dark:text-white/50" />
              }
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center w-full max-w-[480px] mx-auto py-6">
            <h2 className="text-[2rem] font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-1.5">
              Create your account
            </h2>
            <p className="jost text-sm text-gray-400 dark:text-white/40 leading-relaxed mb-7">
              Step into the future of Nigerian commerce.
            </p>

            <form onSubmit={handleSubmit(formSubmit)} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium text-gray-600 dark:text-white/60">Full Name</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-gray-400 dark:text-white/30 pointer-events-none"><UserIcon /></span>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    className={inputCls(errors.name)}
                  />
                </div>
              </div>

              {/* Business Name */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[13px] font-medium text-gray-600 dark:text-white/60">Business Name</label>
                  <span className="text-[11px] text-gray-400 dark:text-white/25 italic">Optional</span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-gray-400 dark:text-white/30 pointer-events-none"><BuildingIcon /></span>
                  <input
                    {...register("b_name")}
                    type="text"
                    placeholder="e.g. Lagos Craft Hub"
                    className={inputCls(false)}
                  />
                </div>
              </div>

              {/* Email + Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium text-gray-600 dark:text-white/60">Email Address</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-gray-400 dark:text-white/30 pointer-events-none"><MailIcon /></span>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="name@email.com"
                      autoComplete="email"
                      className={inputCls(errors.email)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium text-gray-600 dark:text-white/60">Phone Number</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-gray-400 dark:text-white/30 pointer-events-none"><PhoneIcon /></span>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+234..."
                      autoComplete="tel"
                      className={inputCls(false)}
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium text-gray-600 dark:text-white/60">Password</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-gray-400 dark:text-white/30 pointer-events-none"><LockIcon /></span>
                  <input
                    {...register("password")}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    className={`${inputCls(errors.password)} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(v => !v)}
                    className="absolute right-3.5 text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 p-1"
                  >
                    {passwordVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Terms checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <div className="relative mt-0.5 shrink-0">
                  <input type="checkbox" className="peer sr-only" checked={selected} onChange={(e) => setSelected(e.target.checked)} />
                  <div className="w-[17px] h-[17px] rounded-[5px] border-[1.5px] border-gray-300 dark:border-white/20 peer-checked:bg-[#3D217A] peer-checked:border-[#3D217A] flex items-center justify-center">
                    {selected && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="text-[13px] text-gray-500 dark:text-white/50 leading-relaxed select-none">
                  I agree to the{" "}
                  <Link to="/termsAndCondition" className="text-purple dark:text-[#a98bda] font-medium hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-purple dark:text-[#a98bda] font-medium hover:underline">Privacy Policy</Link>.
                </p>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[52px] mt-1 rounded-xl bg-purple hover:bg-purple/85 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white jost text-[16px] font-bold tracking-tight flex items-center justify-center gap-2.5 duration-200"
              >
                {isSubmitting
                  ? <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <> Create My Account <ArrowRight /></>
                }
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 dark:text-white/25 whitespace-nowrap">
                or join with
              </span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            </div>

            {/* OAuth */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={loginUrl ?? "#"}
                className="h-12 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-sm font-medium text-gray-700 dark:text-white/70 flex items-center justify-center gap-2 no-underline"
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

            {/* Login link */}
            <p className="text-center text-sm text-gray-500 dark:text-white/40 mt-6">
              Already have an account?
              <Link to="/login" className="ml-1 text-[#3D217A] dark:text-[#a98bda] font-semibold hover:opacity-75 no-underline">
                Login instead
              </Link>
            </p>
          </div>

          {/* Footer */}
          <footer className="flex flex-wrap items-center justify-between gap-2 pt-5 border-t border-gray-100 dark:border-white/10">
            <p className="text-xs text-gray-400 dark:text-white/25">
              © 2024 MyPromo Family. Built for the Nigerian Spirit.
            </p>
            <div className="flex gap-5">
              {[["Help Center", "/support"], ["Privacy", "/privacy"], ["Contact", "/contact"]].map(([label, to]) => (
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

FeatureCard.propTypes = {
  icon: PropTypes.any, 
  title: PropTypes.any, 
  desc: PropTypes.any,
}

export default SignUp;