import { PlayIcon, PauseIcon, HeartIcon, MessageSquareIcon, ShareIcon } from 'lucide-react';
import PropTypes from 'prop-types';

const VideoControls = ({ isPaused, onPlayPause, isActive }) => {
    if (!isActive) return null;

    // const formatCount = (count) => {
    //     if (count >= 1000000) {
    //         return `${(count / 1000000).toFixed(1)}M`;
    //     } else if (count >= 1000) {
    //         return `${(count / 1000).toFixed(1)}K`;
    //     }
    //     return count.toString();
    // };

    return (
        <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6">
            <button
                onClick={onPlayPause}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            >
                {isPaused ?
                    <PlayIcon className="h-6 w-6" /> :
                    <PauseIcon className="h-6 w-6" />
                }
            </button>

            {/* <div className="flex flex-col items-center">
                <button className="w-10 h-10 rounded-full bg-gray-100/10 backdrop-blur-sm flex items-center justify-center">
                    <HeartIcon className="h-5 w-5 text-white" />
                </button>
                <span className="text-white text-xs mt-1">0</span>
                <span className="text-white text-xs mt-1">{formatCount(video.likes)}</span>
            </div>

            <div className="flex flex-col items-center">
                <button className="w-10 h-10 rounded-full bg-gray-100/10 backdrop-blur-sm flex items-center justify-center">
                    <MessageSquareIcon className="h-5 w-5 text-white" />
                </button>
                <span className="text-white text-xs mt-1">0</span>
                <span className="text-white text-xs mt-1">{formatCount(video.comments)}</span>
            </div> */}

            <div className="flex flex-col items-center">
                <button className="w-10 h-10 rounded-full bg-gray-100/10 backdrop-blur-sm flex items-center justify-center">
                    <ShareIcon className="h-5 w-5 text-white" />
                </button>
                <span className="text-white text-xs mt-1">0</span>
                {/* <span className="text-white text-xs mt-1">{formatCount(video.shares)}</span> */}
            </div>
        </div>
    );
};

VideoControls.propTypes = {
    isPaused: PropTypes.bool, 
    onPlayPause: PropTypes.any, 
    isActive: PropTypes.any
}

export default VideoControls;