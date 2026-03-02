import { useNavigate } from "react-router-dom";
import "../utils/trends.css";
import img from "../assets/images/anon.png";
import PropTypes from "prop-types";
const api_gerenal = import.meta.env.VITE_GENERAL;
import TimeEdit from "../utils/timeEdit";
import { CiTimer } from "react-icons/ci";
import SaveTalk from "./saveTalk";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TalkDisplay = ({ talks }) => {
  const navigate = useNavigate();
    function slugify(title) {
  return title
    .toString()
    .normalize("NFD") // handle accented characters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
  .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except spaces and dashes
    .replace(/\s+/g, "-")         // replace spaces with dash
    .replace(/-+/g, "-");         // collapse multiple dashes
}

  return (
    <div 
      onClick={() => navigate(`/mypromotalk/${talks.id}/${slugify(talks.description)}`)}
      key={talks.id}
      className="cursor-pointer flex md:flex-row-reverse flex-col md:items-start gap-2 md:gap-10 md:p-4 bg-tweetblue rounded-md md:rounded-lg text-white overflow-hidden"
    >
      <div className="relative">
        <img
          loading="lazy"
          src={
            talks?.titleImageurl
              ? `${api_gerenal}/${talks?.titleImageurl}`
              : img
          }
          className="md:w-32 md:h-32 w-full h-[120px] md:aspect-square object-cover rounded-sm"
          alt=""
        />
        <div className="absolute top-0 right-0 w-fit md:w-[150px] bg-white bg-opacity-60 text-darkblue md:hidden flex flex-col gap-1 text-center md:py-4 py-2 md:px-6 px-2 rounded-md">
          <h2 className="text-xs md:text-base">
            {monthNames[new Date(talks.created_at).getMonth()]}
          </h2>
          <p className="font-medium text-[10px] md:text-sm">
            {new Date(talks.created_at).getDate()}
          </p>
        </div>
      </div>
      <div className="flex-1 flex gap-2 md:items-start md:p-0 p-2">
        <div className="flex-1 flex flex-col justify-between gap-2 md:gap-6">
          <div className="flex flex-col md:flex-col-reverse gap-1">
            {/* <h1 className="font-light md:font-medium text-[10px] md:text-xl capitalize">{talks.description.length > 50 ? talks.description.slice(0, 50).concat("...") : talks.description}</h1> */}
            <h1 className="font-light md:font-medium text-[10px] md:text-xl capitalize line-clamp-2">
              {talks.description}
            </h1>
            <p className="text-[11px] font-light md:text-xs lg:block hidden">
              <span className="font-bold capitalize">{talks?.categories}</span>{" "}
              post by {talks?.user_name || "unknown"}
            </p>
            <p className="text-[11px] font-light md:font-normal md:text-sm lg:hidden block">
              by {talks?.user_name || "unknown"}
            </p>
          </div>
          <div className="lg:hidden block">
            {talks?.categories && (
              <div className="flex items-center gap-4">
                <button className="text-xs md:text-base bg-white text-tweetblue border py-2 md:px-6 px-2 rounded-md w-fit md:w-[180px]">
                  {talks?.categories}
                </button>
                
              </div>
            )}
          </div>
          <div className="lg:flex items-center hidden gap-10">
            <div className="w-[150px] flex items-center gap-2">
              <CiTimer />
              <p className="text-sm">{TimeEdit(talks.created_at)}</p>
            </div>


            <div className="w-[150px] flex items-center gap-2">
              <CiTimer />
              <p className="text-sm font-semibold">Total Replies {talks.comment_count}</p>
            </div>
            <SaveTalk size={20} item={talks} />
          </div>
        </div>
      </div>
    </div>
  );
};

TalkDisplay.propTypes = {
  talks: PropTypes.any,
};

export default TalkDisplay;
