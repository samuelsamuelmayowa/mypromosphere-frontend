import { useState } from "react";
import FetchCollection from "../../../hooks/fetchCollections";
import { motion } from "framer-motion";
import PostsSkeleton from "../../../components/postsSkeleton";
import { Link, useSearchParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import CollectionDisplay from "../../../components/CollectionDisplay";
const MainCollection = () => {
  const [searchParams] = useSearchParams();
  const adsCategory = searchParams.get("adsCategory") || "All";
  const [gridOrFlex] = useState(false);
  const {
    data,
    isLoading,
    error,
  } = FetchCollection();

  if (error)
    return (
      <div className="min-h-screen grid place-items-center text-red md:text-xl text-lg">
        <p>{error?.message}</p>
      </div>
    );
  return (
    <div>
      <div className={`duration-300 mt-5 rounded-md`}>
        {/* Header Section */}
        <header
          className={`mb-2 sticky bg-gray-100 dark:bg-DARKBG top-0 shadow-md z-10 p-4 flex justify-between items-center`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex md:flex-row md:items-center flex-col md:gap-4 gap-2">
              <h1
                className={`text-base md:text-2xl font-semibold text-gray-800 dark:text-white`}
              >
                Elizabeth Akomolafe Collection
                {/* NaijaShoeGirl Collection */}
                {/* So_Pretty_Kids Collection  */}
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                Elizabeth Akomolafe offers health and beauty products, fashion
                accessories.
                {/* Get shoes from NaijaShoeGirl! */}
                {/* Get your kids appearel from So_Pretty_Kids */}
              </p>
            </div>
            <button className="text-gray-600 hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="md:h-6 md:w-6 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v16m0 0h16M4 20l16-16"
                />
              </svg>
            </button>
          </div>
          <Link
            to={`/profile/user/Elizabeth Akomolafe`}
            className="block mt-2 text-blue-500 hover:underline"
          >
           <span className="font-semibold">DM</span>
          </Link>
        </header>
        {gridOrFlex && adsCategory === "All" && (
          <section className="filter mx-auto w-[85vw] my-4">
            <Splide
              options={{
                type: "slide",
                perPage: 3,
                perMove: 1,
                gap: "10px",
                interval: 3000,
                speed: 2000,
                pagination: false,
                snap: true,
                drag: "free",
                breakpoints: {
                  1200: {
                    perPage: 2,
                  },
                  640: {
                    perPage: 1,
                  },
                  300: {
                    perPage: 1,
                  },
                },
              }}
              className=""
            >
              {isLoading && <PostsSkeleton flex={true} posts={4} />}
              {data?.pages[0]?.data?.normalads.map((item, index) => (
                <SplideSlide key={item.id || index}>
                  <CollectionDisplay
                    flex={true}
                    item={item}
                    other_images={data?.pages[0]?.data?.other_images}
                    index={index}
                  />
                </SplideSlide>
              ))}
            </Splide>
          </section>
        )}
        <motion.div>
          {!gridOrFlex && adsCategory === "All" && (
            <section className="mb-2 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-2 gap-2 md:gap-2 md:gap-y-4">
              {isLoading && <PostsSkeleton posts={12} />}
              {data?.pages[0]?.data?.normalads.map((item, index) => (
                <CollectionDisplay
                  key={item.id}
                  item={item}
                  other_images={data?.pages[0]?.data?.other_images}
                  index={index}
                />
              ))}
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MainCollection;
