import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { useSaveTweetAndTalkContext } from "../contexts/saveTalkAndTweetContext";
import PropTypes from 'prop-types';

const SaveTweet = ({item}) => {
    const { tweets, saveTweets } = useSaveTweetAndTalkContext()
    return (
        <div className="cursor-pointer z-[9999999999999999999]" onClick={(e) => saveTweets(e, item.id)}>
            {tweets.includes(item.id) ? <FaBookmark size={15} /> : <MdOutlineBookmarkAdd size={20} />}
        </div>
    )
}

SaveTweet.propTypes = {
    item: PropTypes.any,
}

export default SaveTweet