import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoSendOutline } from "react-icons/io5";
import { useStateContext } from "../contexts/ContextProvider";
import { HotLinks } from "../json/hotLinks";
import icon2 from "../assets/icons/icon2.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const footerCols = [
  {
    heading: "Marketplace",
    items: [
      { label: "Rentals & Shortlets", to: "/?adsCategory=Shortlets & Rentals" },
      { label: "Laptops & Gadgets", to: "/?adsCategory=Laptops" },
      { label: "Fashion & Lifestyle", to: "/?adsCategory=Fashion" },
      { label: "Verified Sellers", to: "/verified-sellers" },
    ],
  },
  {
    heading: "Community",
    items: [
      { label: "Trending Talk", to: "/mypromotalk" },
      { label: "Verified Gists", to: "/mypromotweet" },
      { label: "Rules & Conduct", to: "/termsAndCondition" },
      { label: "Help Center", to: "/help" },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "My Wishlist", to: "/wishlist" },
      { label: "Dashboard", to: "/dashboard" },
      { label: "Privacy Policy", to: "/PrivacyPolicy" },
      { label: "Terms & Conditions", to: "/termsAndCondition" },
    ],
  },
];

export default function Footer() {
  const { token, LogOut } = useStateContext();
  const categoriesLinks = HotLinks;
  const [, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // hook up to your newsletter API here
    setEmail("");
  };

  return (
    <footer className="bg-white dark:bg-DARKBG border-t border-border transition-colors duration-300">

      {/* Main grid */}
      <div className="px-6 md:px-14 py-12 grid grid-cols-1 md:grid-cols-2 bigLg:grid-cols-[2fr_1fr_1fr_1fr_1.4fr] gap-10">

        {/* Brand + tagline */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <LazyLoadImage
              visibleByDefault
              effect="opacity"
              src={icon2}
              className="w-8"
              alt="MyPromoSphere logo"
            />
            <span className="text-xl font-extrabold text-blue font-sans">
              MyPromoSphere
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
            The ultimate community-driven marketplace for the best deals and the hottest conversations.
          </p>
          {/* Auth links */}
          <div className="text-sm text-muted-foreground">
            {token ? (
              <button
                onClick={LogOut}
                className="text-red hover:underline font-medium transition-colors"
              >
                Log Out
              </button>
            ) : (
              <span>
                <Link to="/login" className="text-blue hover:underline font-medium">Login</Link>
                {" / "}
                <Link to="/signup" className="text-blue hover:underline font-medium">Register</Link>
              </span>
            )}
          </div>
        </div>

        {/* Link columns */}
        {footerCols.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-foreground tracking-wide">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2">
              {col.items.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-muted-foreground hover:text-blue transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold text-foreground tracking-wide">
            Newsletter
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Get the best promos and hottest gists weekly.
          </p>
          <form onSubmit={handleSubscribe} className="flex rounded-full overflow-hidden border border-border">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="
                flex-1 px-4 py-2.5 text-sm
                bg-BODYBG dark:bg-inputDark
                text-foreground placeholder:text-muted-foreground
                outline-none border-none
              "
            />
            <button
              type="submit"
              className="
                bg-blue hover:bg-blue/90
                text-white px-4
                transition-colors duration-200
                flex items-center justify-center
              "
              aria-label="Subscribe"
            >
              <IoSendOutline size={16} />
            </button>
          </form>

          {/* Support contacts */}
          <div className="mt-2 flex flex-col gap-1">
            <a
              href="mailto:mypromosphere@gmail.com"
              className="text-xs text-muted-foreground hover:text-blue transition-colors"
            >
              mypromosphere@gmail.com
            </a>
            <a
              href="tel:+2348160587687"
              className="text-xs text-muted-foreground hover:text-blue transition-colors"
            >
              +234-816-058-7687
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 md:px-14 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} MyPromoSphere Ecosystem. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Professional Reliability &amp; Community Trust.
        </p>
      </div>
    </footer>
  );
}