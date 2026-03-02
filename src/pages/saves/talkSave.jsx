import { Link } from "react-router-dom"
import { useSaveTweetAndTalkContext } from '../../contexts/saveTalkAndTweetContext';
import FetchTalks from "../../hooks/fetchTalks";
import TalkSkeleton from "../../components/talkSkeleton";
import TalkDisplay from "../../components/talkDisplay";


const TalkSave = () => {
  const { talks } = useSaveTweetAndTalkContext()
  const { data, isLoading } = FetchTalks("All");
  return (
    <div className="min-h-screen md:px-6 px-2 w-full">
      <p className="text-sm">Find your saved talks here</p>
      {(!talks.length && !isLoading) &&
        <div className="text-center">
          <h1 className={`text-center mt-4 text-darkblue dark:text-mainTextDark`}>No Saved Talk</h1>
          <p><Link to="/mypromotalk" className="underline text-purple">Go to Home</Link></p>
        </div>
      }
      <section className="my-4 relative grid grid-cols-1 gap-4 md:gap-2 min-h-full max-w-4xl mx-auto">
        {isLoading && <TalkSkeleton posts={12} />}
        {data?.data?.data.filter((item) => talks.includes(item.id)).map((item, index) => (
          <TalkDisplay talks={item} key={index} />
        ))}
      </section>
    </div>
  )
}

export default TalkSave