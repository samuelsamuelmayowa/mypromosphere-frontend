import { Link } from "react-router-dom"
import { useSaveTweetAndTalkContext } from '../../contexts/saveTalkAndTweetContext';
import FetchTweet from "../../hooks/fetchTweet";
import TweetSkeleton from "../../components/tweetSkeleton";
import TweetDisplay from "../../components/tweetDisplay";

const TweetSave = () => {
  const { data, isLoading } = FetchTweet("All");
  const { tweets } = useSaveTweetAndTalkContext()
  return (
    <div className="min-h-screen md:px-6 px-2 w-full">
      <p className="text-sm">Find your saved tweets here</p>
      {(!tweets.length && !isLoading) &&
        <div className="text-center">
          <h1 className={`text-center mt-4 text-darkblue dark:text-mainTextDark`}>No Saved Tweet</h1>
          <p><Link to="/mypromotalk" className="underline text-purple">Go to Home</Link></p>
        </div>
      }
      <section className="my-4 relative min-h-screen grid place-items-center lg:col-span-4 md:col-span-2 col-span-1">
        {isLoading && <TweetSkeleton posts={12} />}
        {data?.data?.data.filter((item) => tweets.includes(item.id)).map((tweet, index) => (
          <TweetDisplay 
            tweet={tweet}
            other_tweet_images={data?.data?.other_images}
            index={index}
            key={index} 
          />
        ))}
      </section>
    </div>
  )
}

export default TweetSave