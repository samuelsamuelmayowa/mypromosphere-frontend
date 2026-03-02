import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const VideoPlayer = ({ videoUrl }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef(null);
    const progressRef = useRef(null);
    let hideControlsTimeout;

    useEffect(() => {
        const videoElement = videoRef.current;
        // Event listeners for video properties
        if (videoElement) {
            videoElement.addEventListener('loadedmetadata', () => {
                setDuration(videoElement.duration);
            });

            videoElement.addEventListener('timeupdate', () => {
                setCurrentTime(videoElement.currentTime);
            });
        }

        // Clean up event listeners
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('loadedmetadata', () => { });
                videoElement.removeEventListener('timeupdate', () => { });
            }
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleFullScreen = () => {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
        }
    };

    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10;
        }
    };

    const skipBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10;
        }
    };

    const handleProgressClick = (e) => {
        if (progressRef.current && videoRef.current) {
            const progressRect = progressRef.current.getBoundingClientRect();
            const percent = (e.clientX - progressRect.left) / progressRect.width;
            videoRef.current.currentTime = percent * duration;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Show controls when mouse moves and hide after 3 seconds
    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(hideControlsTimeout);
        hideControlsTimeout = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    return (
        <div
            className="relative w-full h-full bg-black group"
            onMouseMove={handleMouseMove}
            onClick={() => {
                if (!showControls) {
                    setShowControls(true);
                }
            }}
        >
            <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-contain"
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
            />
            <div
                className={cn(
                    "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300",
                    showControls ? "opacity-100" : "opacity-0"
                )}
            >
                {/* Progress bar */}
                <div
                    ref={progressRef}
                    className="h-1 bg-gray-600 rounded-full mb-4 cursor-pointer"
                    onClick={handleProgressClick}
                >
                    <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            className="text-white p-1 rounded-full hover:bg-white/10"
                            onClick={togglePlay}
                        >
                            {isPlaying ?
                                <Pause className="h-5 w-5" /> :
                                <Play className="h-5 w-5" />
                            }
                        </button>

                        <button
                            className="text-white p-1 rounded-full hover:bg-white/10"
                            onClick={skipBackward}
                        >
                            <SkipBack className="h-5 w-5" />
                        </button>

                        <button
                            className="text-white p-1 rounded-full hover:bg-white/10"
                            onClick={skipForward}
                        >
                            <SkipForward className="h-5 w-5" />
                        </button>

                        <button
                            className="text-white p-1 rounded-full hover:bg-white/10"
                            onClick={toggleMute}
                        >
                            {isMuted ?
                                <VolumeX className="h-5 w-5" /> :
                                <Volume2 className="h-5 w-5" />
                            }
                        </button>

                        <span className="text-white text-xs ml-1">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <button
                        className="text-white p-1 rounded-full hover:bg-white/10"
                        onClick={handleFullScreen}
                    >
                        <Maximize className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

VideoPlayer.propTypes = {
    videoUrl: PropTypes.any,
}

export default VideoPlayer;