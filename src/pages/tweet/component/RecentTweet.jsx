import React from "react";
import FetchTweet from "../../../hooks/fetchTweet";

const RecentTweet = () => {
  const { data, isLoading, error } = FetchTweet("All");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error ocuured...</div>;
  }
  return (
    
    <div className="flex flex-col gap-5 mt-4 my-3">
      <div className="flex gap-4">
        <div>
          <img src={noimagestate} />
        </div>
        <div className="flex flex-col">
          <h6 className="text-[0.75rem] text-[#676872] font-500">
            January 15, 2024
          </h6>
          <p className="text-black text-[0.9rem] dark:text-white">
            There are many variations of business consulting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentTweet;
