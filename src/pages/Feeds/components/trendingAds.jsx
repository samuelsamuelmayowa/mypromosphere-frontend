import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import FetchTrendingAds from "../../../hooks/fetchTrendingAds";
import PostsSkeleton from "../../../components/postsSkeleton";
import "../../../utils/trends.css";
import { Helmet } from "react-helmet";
import "@splidejs/react-splide/css";
import FilterTrendingAds from "./filterTrendingAds";
// import MainCollection from "../Collections/MainCollection";
// import LaptopsCollection from "../Collections/LaptopsCollection";

import VideoCarousel from "./StoryCarousel";
import logo from "../../../assets/icons/icon2.svg"
import AllAds from "./allAds";

const TrendingAds = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const adsCategory = searchParams.get("adsCategory") || "All";
  const [gridOrFlex, setGridOrFlex] = useState(false);

  const { data, isLoading, error } = FetchTrendingAds();

  // const allAds = data?.pages.flatMap((page) => page.allAds) || [];
  // const paginatedAds = data?.pages.flatMap((page) => page.ads) || [];
  // const paginatedOtherImages = data?.pages.flatMap((page) => page.other_images) || [];

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center text-red md:text-xl text-lg">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <motion.div className="min-h-screen md:px-6 px-2 w-full">
      <Helmet>
        <title>
          Discover MyPromoSphere – Nigeria&apos;s premier online marketplace
        </title>
        <meta
          name="description"
          content={
            "Promote your business effectively in Nigeria with MyPromoSphere. Leverage MyPromoTweet, MyPromoTalk, for growth. ."
          }
        />
        <meta
          property="og:description"
          content={
            "Promote your business effectively in Nigeria with MyPromoSphere. Leverage MyPromoTweet, MyPromoTalk, for growth. ."
          }
        />
        <meta
          name="description"
          content="Discover MyPromoSphere – Nigeria’s top marketplace to grow your business, shop discounts, and network with entrepreneurs. Join now to connect, promote, and thrive!"
        />
      </Helmet>
      <div className="md:hidden block">
        <section>
          <>
            <FilterTrendingAds
              adsCategory={adsCategory}
              setSearchParams={setSearchParams}
              gridOrFlex={gridOrFlex}
              setGridOrFlex={setGridOrFlex}
            />
            <VideoCarousel />
          </>
          <>
            <div>
              <div className="my-3">
                <h1 className="	text-sm font-semibold">Mypromosphere Ads</h1>
              </div>
              {isLoading ? (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2 md:gap-2 md:gap-y-4">
                  <PostsSkeleton posts={4} />
                </div>
              ) :
                <AllAds gridOrFlex={gridOrFlex} adsCategory={adsCategory} all={data?.data?.normalads} other_images={data?.data?.other_images} />
              }
            </div>
          </>
        </section>
      </div>
      <div className="md:block hidden">
        <FilterTrendingAds
          adsCategory={adsCategory}
          setSearchParams={setSearchParams}
          gridOrFlex={gridOrFlex}
          setGridOrFlex={setGridOrFlex}
        />
         <VideoCarousel />
        <div>
          <div className="my-4 flex items-center gap-2">
            <img src={logo} className="w-10 animate-spin" alt="logo" />
            <h1 className="text-2xl font-semibold">Explore Products and Collections</h1>
          </div>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-2 md:gap-2 md:gap-y-4">
              <PostsSkeleton posts={12} />
            </div>
          )
            :
            <AllAds gridOrFlex={gridOrFlex} adsCategory={adsCategory} isLoading={isLoading} all={data?.data?.normalads} other_images={data?.data?.other_images} />
          }
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingAds;
