import { Splide, SplideSlide } from "@splidejs/react-splide";
import { TweetCategories } from "../../json/talkAndTweetCategories";
import { Button } from "@/components/ui/button";
import "@splidejs/react-splide/css";

import PropTypes from "prop-types";

const FilterTweets = ({ tweetCategory, setSearchParams }) => {
  const handleCategories = (category) => {
    if (category !== "All") {
      setSearchParams({ tweetCategory: category });
    } else {
      setSearchParams({ tweetCategory: "All" });
    }
  };
  return (
    <div
      className={`bg-white dark:bg-DARKBG rounded-md md:rounded-[20px] p-4`}
    >
      <Splide
        options={{
          type: "slide",
          autoWidth: true,
          gap: "15px",
          start: 1,
          focus: 1,
          arrows: false,
          pagination: false,
          wheel: true,
          waitForTransition: true,
          releaseWheel: true,
          perMove: 4,
        }}
        className=""
      >
        <SplideSlide>
          <Button
            onClick={() => handleCategories("All")}
            className={`text-xs border-none 
              dark:hover:bg-darkblue dark:hover:dark:bg-darkblue
              hover:bg-lightblue hover:dark:bg-lightblue
               ${tweetCategory === "All" ? "text-white dark:text-white dark:bg-darkblue bg-lightblue" : "bg-offwhiteBg text-black dark:bg-darkBg dark:text-white"}
              `}
          >
            All
          </Button>
        </SplideSlide>
        {TweetCategories.map((category, index) => (
          <SplideSlide key={index}>
            <Button
              onClick={() => handleCategories(category)}
              className={`text-xs border-none 
              dark:hover:bg-darkblue dark:hover:dark:bg-darkblue
              hover:bg-lightblue hover:dark:bg-lightblue hover:text-white 
              ${tweetCategory === category ? "text-white dark:text-white dark:bg-darkblue bg-lightblue" : "bg-offwhiteBg text-black dark:bg-darkBg dark:text-white"}
                `}
            >
              {category}
            </Button>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

FilterTweets.propTypes = {
  tweetCategory: PropTypes.any,
  setSearchParams: PropTypes.any,
};

export default FilterTweets;
