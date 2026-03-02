import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { useSaveTweetAndTalkContext } from "../contexts/saveTalkAndTweetContext";
import PropTypes from 'prop-types';

const SaveTalk = ({ item }) => {
    const { talks, saveTalks } = useSaveTweetAndTalkContext()
    return (
        <div className="cursor-pointer z-[9999999999999999999]" onClick={(e) => saveTalks(e, item.id)}>
            {talks.includes(item.id) ? <FaBookmark size={15} /> : <MdOutlineBookmarkAdd size={20} />}
        </div>
    )
}

SaveTalk.propTypes = {
    item: PropTypes.any,
}

export default SaveTalk