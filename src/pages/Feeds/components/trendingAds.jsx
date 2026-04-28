import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "@splidejs/react-splide/css";

import FetchTrendingAds from "../../../hooks/fetchTrendingAds";
import PostsSkeleton from "../../../components/postsSkeleton";
import FilterTrendingAds from "./filterTrendingAds";
import VideoCarousel from "./StoryCarousel";
import AllAds from "./allAds";
import "../../../utils/trends.css";

import logo from "../../../assets/icons/icon2.svg";

const TrendingAds = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const adsCategory = searchParams.get("adsCategory") || "All";
  const [gridOrFlex, setGridOrFlex] = useState(false);

  const { data, isLoading, error } = FetchTrendingAds();

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center text-red md:text-xl text-lg">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full md:px-6 px-3 py-4"
    >
      <Helmet>
        <title>Discover MyPromoSphere – Nigeria&apos;s premier online marketplace</title>
        <meta
          name="description"
          content="Discover MyPromoSphere – Nigeria's top marketplace to grow your business, shop discounts, and network with entrepreneurs. Join now to connect, promote, and thrive!"
        />
        <meta
          property="og:description"
          content="Promote your business effectively in Nigeria with MyPromoSphere. Leverage MyPromoTweet, MyPromoTalk, for growth."
        />
      </Helmet>

      <section className="flex flex-col gap-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10"></div>
          <img className="absolute inset-0 w-full h-full object-cover"
            data-alt="luxury modern penthouse apartment interior with large windows showing city skyline at sunset, warm cinematic lighting, professional architectural photography"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS53Igsb69-CpKU7LDwCsz2EmHW2T6_KMpPMsvIj2DTctOr0rMzOJ-wMAM8zrPQcfEUjzt146uVi_ZavANYwL9ReYBDU_nWCQZ7-4n8ut58IJ8p5WkE0GRtU4VQ_CSFrO2NeuPatNuP0VUJqMd2b77ZhKII6xMCgYhpV77kJ4-1vBxOogisthtJwfv_gXgxNr31ya3yWfbq2PDUevUoaajeK6d7VMnZKJfX3vYWlEVRdLYAAKscXh6yxQ1Twl-ohPIDs9bJ8RnixI" />
          <div className="relative z-20 h-full flex flex-col justify-center px-12 max-w-2xl gap-4">
            <span
              className="inline-block px-3 py-1 bg-[#00CCFF] text-white rounded font-label-sm w-fit uppercase tracking-wider">Premium
              Rentals</span>
            <h1 className="font-h1 text-5xl text-white leading-tight">Find Your Perfect Shortlet Escape Today</h1>
            <p className="text-white/90 font-body-lg">Discover exclusive stays, verified hosts, and community-backed
              reviews only on MyPromoSphere.</p>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-blue text-white px-8 py-3 rounded-full font-h3 hover:bg-blue transition-all shadow-lg active:scale-95">Explore
                Stays</button>
              <button
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-h3 hover:bg-white/30 transition-all active:scale-95">Learn
                More</button>
            </div>
          </div>
          <div className="absolute bottom-6 right-12 z-20 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/60 cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/60 cursor-pointer"></div>
          </div>
        </section>
        <VideoCarousel />
      </section>

      {/* Section header */}
      <div className="flex items-center justify-between mt-5 mb-4">
        <div className="flex items-center gap-2">
          <LazyLoadImage
            visibleByDefault
            effect="opacity"
            src={logo}
            className="w-8 animate-spin"
            alt="logo"
          />
          <h2 className="text-lg md:text-xl font-bold text-foreground">
            Explore Products and Collections
          </h2>
        </div>
        <Link
          to="/market"
          className="text-xs font-semibold text-blue hover:underline transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Sell faster banner */}
      <div className="
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-blue to-lightblue
        flex items-center justify-between
        px-7 py-7 mb-6
      ">
        <span className="absolute right-0 bottom-0 text-[120px] opacity-[0.07] select-none leading-none">
          🛍
        </span>
        <div>
          <h3 className="text-white font-extrabold text-xl leading-snug mb-1">
            Sell Faster on<br />MyPromoSphere
          </h3>
          <p className="text-white/70 text-xs">
            Join over 10,000 sellers reaching verified buyers every day.
          </p>
        </div>
        <Link
          to="/dashboard/market"
          className="
            shrink-0 bg-white text-blue
            rounded-full px-5 py-2.5
            text-xs font-bold
            hover:bg-white/90 transition-colors
            whitespace-nowrap
          "
        >
          Create Store Now
        </Link>
      </div>

      <FilterTrendingAds
        adsCategory={adsCategory}
        setSearchParams={setSearchParams}
        gridOrFlex={gridOrFlex}
        setGridOrFlex={setGridOrFlex}
      />

      {/* Ads grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-3">
          <PostsSkeleton posts={12} />
        </div>
      ) : (
        <AllAds
          gridOrFlex={gridOrFlex}
          adsCategory={adsCategory}
          isLoading={isLoading}
          all={data?.data?.normalads}
          other_images={data?.data?.other_images}
        />
      )}

      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-[3]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-h2 text-on-background">Explore Products and Collections</h2>
              <a className="text-blue font-label-sm flex items-center gap-1 hover:underline" href="#">
                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div
                className="bg-white dark:bg-DARKBG rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all group cursor-pointer">
                <div className="h-48 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="modern sleek high-end laptop on a minimalist desk, soft natural morning light, clean corporate aesthetic"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCivB77YVaB6sdyMOzTObRp65voqN78vdP5rzgi8wL5wLzCJJTcrGj4Cr4eg0FS4YDSR8HyLIh_8M8FYKdt8qwB19dnhnR8GkCq8d5uJ2A0F2urSJN8fHyL2FiSzERyDAgYogAbbeV1LDzDBk9ppkl1XAs_D0UqR-MDHxE0sUelEbu-lZ4c2sEM9mUoZSaEK5hEsdvTb9Ra_6QYMKXvpkQwaRoyTHk3cFbqg4xVmS_DdtJ9TK6UHSPpT_CaFgzv5qXQhXOAqoRfVpU" />
                  <span
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-blue">PROMO</span>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="font-label-sm text-slate-400">Electronics</span>
                  <h3 className="font-h3 text-lg leading-tight line-clamp-1">MacBook Pro M3 Max - Space Black
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-h2 text-blue">₦2,450,000</span>
                    <button
                      className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue hover:text-white transition-all">
                      <span className="material-symbols-outlined text-xl">shopping_bag</span>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="bg-white dark:bg-DARKBG rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all group cursor-pointer">
                <div className="h-48 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="luxury sports car parked in a modern architectural driveway, sunset lighting with long shadows, high-end commercial style"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1QbqK_UQq5urR5G8wfmmloDT7WH_YYYEVZyDPvBZqVZZ8O3vqlyD61qQcBabQE4w97zbXMk90BW0n_ktPfKpC-jptGCD_22p3RjJ822XxBk6bPdMLjxqTklKtu0OXeIXo_yoaVm97KNw1ZWTv1CVzjzRMNdZC6lbNKqTHFCyXFsPiBjjy64TD_0sqxtmodLSrTB5Zpm1d-xbBek1r46CVISK4HfyXU9W_RDXRWq3aFVUXqm7CHWYjmmtz_N3MWV023_7L8RNuvac" />
                  <span
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[#00CCFF]">VERIFIED</span>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="font-label-sm text-slate-400">Automobiles</span>
                  <h3 className="font-h3 text-lg leading-tight line-clamp-1">Mercedes Benz G63 AMG 2024</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-h2 text-blue">₦310,000,000</span>
                    <button
                      className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue hover:text-white transition-all">
                      <span className="material-symbols-outlined text-xl">call</span>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="bg-white dark:bg-DARKBG  rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all group cursor-pointer">
                <div className="h-48 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="modern industrial style apartment interior with exposed brick and leather sofa, cozy evening lighting with soft lamps, lifestyle photography"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu9GhX3lNG87Nf9gz1wQFf97-u9owM6ZmGCbBM4OkRBhyxrh9zRZLsegLSMhAtn8ffja66-7D6i3sYli-tVek5uPePGE5uORSiRdwAZOtgg_4vyyPDFj-gAmRDFOonnK4jdTCJbcwaazjJ4AAWzZFOi4Cih325arGyStk7JhyDHstnShNuc5idsfbjowwqFjr2gyajfDExHCPhwLkVYpew0o3ji0KnkLRbk3Sj2yv1thv2jwIXxhMRl02aDLjlJxd_I9qSMYHZReM" />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="font-label-sm text-slate-400">Rentals</span>
                  <h3 className="font-h3 text-lg leading-tight line-clamp-1">Studio Apartment in Victoria
                    Island</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-h2 text-blue">₦85,000/night</span>
                    <button
                      className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue hover:text-white transition-all">
                      <span className="material-symbols-outlined text-xl">event_available</span>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="md:col-span-2 bg-gradient-to-br from-blue to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-center min-h-[280px]">
                <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_mall
                  </span>
                </div>
                <div className="relative z-10 max-w-sm flex flex-col gap-4">
                  <h2 className="font-h1 text-3xl">Sell Faster on MyPromoSphere</h2>
                  <p className="text-white font-body-lg">Join over 10,000 sellers reaching verified buyers
                    every day.</p>
                  <button
                    className="w-fit border-2 border-blue bg-white text-blue hover:border-white hover:text-white px-8 py-3 rounded-full font-h3 hover:bg-blue transition-all active:scale-95">Create
                    Store Now</button>
                </div>
              </div>
              <div
                className="bg-white dark:bg-DARKBG  rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all group cursor-pointer">
                <div className="h-48 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="premium high-top sneakers in white and blue, floating product shot with soft grey shadows, clean commercial look"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtpMO66mG4n9StPub3aiQ87r7l7bpgqgw9S31HXtunLi5Lf1AA-_nNgOUodwz4QD5Gdk_qQm3K8UJCzNkpk0KK4cBbkjmRbqX0Whp_jaOnyWT--D1arqgUwkOOuleLOufOXgaKTlVubiRFaGhr4prmWyZSooV6_Eqx9E9875NHsZ57OWHDY55VaH1LPSMkzbk4l52rhc2WZvgXF-9GJQkKgOroq-aJX2fwApsOyVtnXyyj_aJ9tI9U13brswI9grm7Oy9OEKyPI_g" />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="font-label-sm text-slate-400">Fashion</span>
                  <h3 className="font-h3 text-lg leading-tight line-clamp-1">Jordan 1 Retro High &apos;University
                    Blue&apos;</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-h2 text-blue">₦420,000</span>
                    <button
                      className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue hover:text-white transition-all">
                      <span className="material-symbols-outlined text-xl">shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside className="flex-1">
            <div
              className="bg-white dark:bg-DARKBG rounded-3xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] h-full border border-slate-50 dark:border-none">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    forum
                  </span>
                  <h2 className="font-h3 text-on-background">MyPromoTalk</h2>
                </div>
                <a className="text-blue font-label-sm hover:underline" href="#">View All</a>
              </div>
              <div className="flex flex-col gap-6 custom-scrollbar max-h-[1000px] overflow-y-auto pr-2">
                <div className="flex flex-col gap-3 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue flex-shrink-0">
                      <img className="w-full h-full rounded-full object-cover"
                        data-alt="profile photo of a smiling woman with glasses, colorful urban background, natural outdoor light"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFbRVxoJ2WxujguhbKA51TT9yETdjGV9DIa2lSe3xVVZmYvqRtoNsloBNnFPo-bWNMmdKVTqieZDOiTe--o_W11uAIEFDa0i20udEqCq9NbQvijvT0nF7g0bvbCjYVzuvHFh1UzDMjtVi0WRmNa6VyodSRONtZ2bIA6Poy_uV8h3Wq_Bce3NMej_X54uLPUx9Z90-_3Rlo8d51rBk21OYynBvfx8QHtDb-0Q-6a39O8Th8ZBzlhr7dt8D-kQgSrFM8OiCQUEJ_PbU" />
                    </div>
                    <span className="font-label-sm text-on-surface">@tech_queen</span>
                    <span className="text-slate-400 text-xs">• 2h ago</span>
                  </div>
                  <h4 className="font-h3 text-base leading-snug group-hover:text-blue transition-colors">
                    Is the new MacBook Pro really worth the upgrade from M1? 💻</h4>
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">chat_bubble</span>
                      <span className="text-xs">48 comments</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">favorite</span>
                      <span className="text-xs">124</span>
                    </div>
                  </div>
                  <div className="h-px bg-slate-100 w-full mt-2"></div>
                </div>
                <div className="flex flex-col gap-3 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue flex-shrink-0">
                      <img className="w-full h-full rounded-full object-cover"
                        data-alt="profile avatar of a man with beard, cinematic lighting, dark background, professional style"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8wUsdSXstUJCAefDlPD9WvEsU449ZXa_dFvAKvaUOGzQVmNjKwzwNMBWI8qHUPad2wBdhxg1M9dUCxvcx6F5kX0XYSOb9RYhabC9VRTir1VU3QQBGpu2YS1k6NBiNkk-0jUBvi10KQeiBeBaQ3rj2ScXOUQ-gWbTsUBokb6rijNAMyEkgxNL7oOs6ddhX78bRNLUnEzC078D2XCaTXQNg9Br7ATnj_JPBGtIoGQUEBAyOpJpc7t-dLfpju3hQcc1wjMj7Ra72Kas" />
                    </div>
                    <span className="font-label-sm text-on-surface">@the_landlord</span>
                    <span className="text-slate-400 text-xs">• 5h ago</span>
                  </div>
                  <h4 className="font-h3 text-base leading-snug group-hover:text-blue transition-colors">
                    Best areas in Lagos for tech nomads to rent this 2024? 🏠</h4>
                  <img className="w-full h-32 object-cover rounded-xl"
                    data-alt="aerial view of Lekki-Ikoyi link bridge at night with vibrant city lights, high-angle landscape photography"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsH7hhWpi2DLv1m3Y-YAXjPIoIAl1uxyD3BdaGU4VfHhPePSGFXnHV67fhJDqN1ymFpC4wU3sbL0IggCKyMU2lWLoWEG21shZYvthRdzglTPtH6aZrS34if7nw4LtHbBIqOSswzLvcpVgabzeFFTW2Z7Qz2jxL1QcjYGYcvLkLkQpudtjoL8NcGpSvLsTaeDT-8MRbh6plUZpz8UrL_pzIxuNKbB_uLXyBXrpEZTfUb4FIbf4yn_0HAN0_HAyY6svIeMTuywueJfU" />
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">chat_bubble</span>
                      <span className="text-xs">156 comments</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">favorite</span>
                      <span className="text-xs">89</span>
                    </div>
                  </div>
                  <div className="h-px bg-slate-100 w-full mt-2"></div>
                </div>

                <div className="flex flex-col gap-3 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue flex-shrink-0">
                      <img className="w-full h-full rounded-full object-cover"
                        data-alt="profile picture of a stylish young man, bright daylight, urban fashion background"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeiWzjqM4v4O8qTAdAYvwXK0-9VyRMTGLCN0YrqOohh8ylvasZOqc1CJxIkCrMmjgDBKxz673w3mNeBFipcVxcS7rc_o8fwf4GqV2Ns7KVo5WgePGL5f6RR3d4ErC1HEjWH5h5UG32PPjQh7jOjMIpJ53HQYDbqEVgnCqfVMBQKYnOOpvH3m7Hw45gYfUIAZyBrnteroKN-w0wnKUAygBNQMRKH1yW54zAJMsRcjJI4P469kgrIRpcKno8xyWvN-uvfMYOii2EG2k" />
                    </div>
                    <span className="font-label-sm text-on-surface">@car_gurus</span>
                    <span className="text-slate-400 text-xs">• 12h ago</span>
                  </div>
                  <h4 className="font-h3 text-base leading-snug group-hover:text-blue transition-colors">
                    Alert! New customs regulations for imported vehicles. Thread. 🚗</h4>
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">chat_bubble</span>
                      <span className="text-xs">210 comments</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">favorite</span>
                      <span className="text-xs">432</span>
                    </div>
                  </div>
                  <div className="h-px bg-slate-100 w-full mt-2"></div>
                </div>
                <div
                  className="bg-blue/30 rounded-2xl p-4 border border-blue group cursor-pointer hover:bg-blue transition-colors">
                  <span className="font-label-sm text-blueuppercase tracking-tighter block mb-1">Trending
                    Gossip</span>
                  <h4 className="font-h3 text-sm mb-3">Which celebrity just bought the new mansion in Banana
                    Island? 👀</h4>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300"></div>
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-400"></div>
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white bg-blue flex items-center justify-center text-[10px] text-white">
                      +12</div>
                  </div>
                </div>
              </div>
              <button
                className="w-full mt-6 py-3 border-2 border-blue text-blue font-h3 rounded-full hover:bg-blue hover:text-white transition-all active:scale-95">
                Start a New Talk
              </button>
            </div>
          </aside>
        </div>
      </div>


    </motion.div>
  );
};

export default TrendingAds;