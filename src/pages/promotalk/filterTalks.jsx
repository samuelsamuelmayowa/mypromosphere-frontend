import { useStateContext } from "../../contexts/ContextProvider";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { TalkCategories } from "../../json/talkAndTweetCategories";
import { Button } from "@/components/ui/button";
import "@splidejs/react-splide/css";
import PropTypes from "prop-types";

const FilterTalks = ({ Category, setSearchParams }) => {
  const { darkMode } = useStateContext();
  const handleCategories = (e, CATEGORY) => {
    e.preventDefault();
    if (CATEGORY !== "All") {
      setSearchParams({ CATEGORY });
    } else {
      setSearchParams({ CATEGORY: "All" });
    }
  };

  return (
    <div
      className={`w-full bg-white dark:bg-DARKBG rounded-md md:rounded-[20px] p-4`}
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
            onClick={(e) => handleCategories(e, "All")}
            className={`text-xs border-none 
              dark:hover:bg-darkblue dark:hover:dark:bg-darkblue
              hover:bg-lightblue hover:dark:bg-lightblue
              ${
              Category === "All" ? "text-white dark:text-white dark:bg-darkblue bg-lightblue" : "bg-offwhiteBg text-black dark:bg-darkBg dark:text-white"}`}
          >
            All
          </Button>
        </SplideSlide>
        {TalkCategories.map((category, index) => (
          <SplideSlide key={index}>
            <Button
              onClick={(e) => handleCategories(e, category)}
              className={`text-xs border-none ${
                darkMode
                  ? "hover:bg-darkblue hover:dark:bg-darkblue"
                  : "hover:bg-lightblue hover:dark:bg-lightblue"
              } hover:text-white ${
                Category === category? "text-white dark:text-white dark:bg-darkblue bg-lightblue" : "bg-offwhiteBg text-black dark:bg-darkBg dark:text-white"}`}
            >
              {category}
            </Button>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

FilterTalks.propTypes = {
  Category: PropTypes.any,
  setSearchParams: PropTypes.any,
};

export default FilterTalks;
