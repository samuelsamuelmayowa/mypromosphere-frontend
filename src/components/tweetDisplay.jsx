import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import "../utils/trends.css";
import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";
import { ShareSocial } from 'react-share-social'
import PropTypes from 'prop-types';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import timeEdit from "../utils/timeEdit"
import SaveTweet from './saveTweet';

import FetchProfileUser from '../hooks/fetchUserProfile';

import FetchSingleTweet from '../hooks/fetchSingleTweet';

const api_general = import.meta.env.VITE_GENERAL;
const HOME = import.meta.env.VITE_HOME;

const TweetDisplay = ({ tweet, other_tweet_images }) => {
    const navigate = useNavigate();
    const [showShare, setShowShare] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { data } = FetchSingleTweet(tweet.id);
    const { data: profile } = FetchProfileUser(tweet?.user_name);

    console.log(tweet?.user_name)
    console.log(profile?.data?.data)

    const handleCardClick = (e) => {
        if ((e.target).closest('button') || (e.target).closest('a') || (e.target).closest('.share-container')) {
            return;
        }
        navigate(`/mypromotweet/${tweet.id}`);
    };
    
    return (
        <Card className="tweet-display bg-white dark:bg-DARKBG border-none shadow-none rounded-xl hover:shadow-lg cursor-pointer group">
            <div onClick={handleCardClick} className="md:p-6 p-2">
                <div className="flex items-start gap-3 mb-4">
                    <Link
                        to={`/profile/user/${profile?.data?.data?.user_name}`}
                        className="flex-shrink-0 group-hover:scale-105 transition-transform"
                        onClick={(e) => e.stopPropagation()}>
                        <Avatar className="size-10 lg:size-12 ring-2 ring-transparent hover:ring-blue-500 transition-all">
                            <AvatarImage
                                src={`${api_general}/${profile?.data?.data?.profileImage}`}
                                alt={profile?.data?.data?.profileImage || "User"}
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-blue text-white font-semibold">
                                {(tweet?.user_name || "U").charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </Link>

                    <div className="flex-1 min-w-0">
                        <Link
                            to={`/profile/user/${tweet?.user_name}`}
                            className="block hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="font-semibold text-gray-900 dark:text-white text-base truncate">
                                {tweet?.user_name || "Unknown User"}
                            </h3>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {timeEdit(tweet?.created_at)}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base line-clamp-1">
                        {tweet.description}
                    </p>
                </div>

                {/* Image Gallery */}
                <div className="mb-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Splide
                        className="single-tweet"
                        options={{
                            type: 'slide',
                            gap: '8px',
                            perPage: 1,
                            arrows: true,
                            pagination: true,
                            snap: true,
                            drag: 'free',
                            height: '400px',
                            cover: true,
                            breakpoints: {
                                768: {
                                    height: '300px'
                                }
                            }
                        }}>
                        <SplideSlide>
                            <LazyLoadImage
                                src={tweet?.titleImageurl ? `${api_general}/${tweet?.titleImageurl}` : '/placeholder-image.jpg'}
                                alt="Post image"
                                effect="blur"
                                className="w-screen h-screen object-cover object-center"
                            />
                        </SplideSlide>

                        {other_tweet_images?.filter((img) => img.promo_tweet_id === tweet.id).map((img) => (
                            <SplideSlide key={img.id}>
                                <LazyLoadImage
                                    src={img.itemadsimagesurls}
                                    alt="Additional image"
                                    effect="blur"
                                    className="w-screen h-screen object-cover"
                                />
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-6">
                        {/* Comments */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaRegComment size={16} />
                            <span className="text-sm font-medium">{data?.data?.comments.length}</span>
                        </Button>

                        {/* Like */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`flex items-center gap-2 transition-colors duration-200 ${isLiked
                                    ? 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                                    : 'text-gray-600 hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20'
                                }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLiked(!isLiked);
                            }}
                        >
                            <FaHeart size={16} className={isLiked ? 'text-red-500' : ''} />
                            <span className="text-sm font-medium">0</span>
                        </Button>

                        {/* Save */}
                        <div onClick={(e) => e.stopPropagation()}>
                            <SaveTweet item={tweet} />
                        </div>
                    </div>

                    {/* Share */}
                    <div className="relative share-container">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 transition-colors duration-200"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowShare(!showShare);
                            }}
                        >
                            <FaShare size={16} />
                        </Button>

                        <AnimatePresence mode='sync'>
                            {showShare && (
                                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="absolute -top-10 -left-48 mt-2 z-50">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
                                        <ShareSocial
                                            url={`${HOME}/mypromotweet/${tweet.id}`}
                                            socialTypes={['facebook', 'twitter', 'whatsapp']}
                                            style={{
                                                root: {
                                                    background: 'transparent',
                                                    border: 0,
                                                    padding: 0,
                                                    minWidth: 'initial',
                                                },
                                                copyContainer: {
                                                    display: 'none'
                                                },
                                                iconContainer: {
                                                    padding: '4px',
                                                    margin: '0 2px',
                                                    borderRadius: '8px',
                                                    transition: 'all 0.2s ease'
                                                }
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Card>
    )
}

TweetDisplay.propTypes = {
    tweet: PropTypes.any,
    index: PropTypes.any,
    other_tweet_images: PropTypes.array
}

export default TweetDisplay