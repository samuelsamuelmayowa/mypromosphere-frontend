import { createContext, useContext, useState } from "react";
import POP from "../assets/audio/pop.mp3"
import { toast } from 'sonner';
import PropTypes from 'prop-types';

const SaveTweetAndTalkContext = createContext({})

export function SaveTweetAndTalkProvider({ children }) {
    const pop = new Audio(POP)
    const [talks, setTalks] = useState(() => JSON.parse(localStorage.getItem("talks")) || [])
    const [tweets, setTweets] = useState(() => JSON.parse(localStorage.getItem("tweets")) || [])
    const saveTweets = (e, id) => {
        e.stopPropagation()
        const currentIndex = tweets.indexOf(id);
        if (currentIndex === -1) {
            toast.success('Saved')
            pop.play()
            setTweets(prev => {
                const updatedTweets = [...prev, id];
                localStorage.setItem('tweets', JSON.stringify(updatedTweets));
                return updatedTweets;
            });
        } else {
            toast.success('Removed from saved List')
            pop.play()
            setTweets(prev => {
                const updatedTweets = prev.filter(itemId => itemId !== id);
                localStorage.setItem('tweets', JSON.stringify(updatedTweets));
                return updatedTweets;
            });
        }
    }
    const saveTalks = (e, id) => {
        e.stopPropagation()
        const currentIndex = talks.indexOf(id);
        if (currentIndex === -1) {
            toast.success('Saved')
            pop.play()
            setTalks(prev => {
                const updatedTalks = [...prev, id];
                localStorage.setItem('talks', JSON.stringify(updatedTalks));
                return updatedTalks;
            });
        } else {
            toast.success('Removed from saved List')
            pop.play()
            setTalks(prev => {
                const updatedTalks = prev.filter(itemId => itemId !== id);
                localStorage.setItem('talks', JSON.stringify(updatedTalks));
                return updatedTalks;
            });
        }
    }
    return (
        <SaveTweetAndTalkContext.Provider value={{
            tweets,
            talks,
            saveTweets,
            saveTalks
        }}>
            {children}
        </SaveTweetAndTalkContext.Provider>
    )
}

SaveTweetAndTalkProvider.propTypes = {
    children: PropTypes.any,
}

export const useSaveTweetAndTalkContext = () => useContext(SaveTweetAndTalkContext)