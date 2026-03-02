import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import anon from "../assets/images/anon.png"
import { FaPowerOff } from "react-icons/fa6";
import { useStateContext } from '../contexts/ContextProvider';
import { MdOutlineRssFeed } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import PropTypes from 'prop-types';
import FetchProfileUser from '../hooks/fetchUserProfile';

const api_gerenal = import.meta.env.VITE_GENERAL;

const ulVariant = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring", duration: 0.3, staggerChildren: 0.3, when: "beforeChildren"
        }
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            when: "afterChildren", duration: 0.3
        }
    }
}
const liVariant = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
}
const ProfileHover = () => {
    const { token, LogOut } = useStateContext();
    const [profileNav, setProfileNav] = useState(false)
    const { data } = FetchProfileUser(token?.user_name);
    const mouseOver = () => {
        setProfileNav(true)
    }
    const mouseOut = () => {
        setProfileNav(false)
    }
    return (
        <motion.div onMouseEnter={mouseOver} onMouseLeave={mouseOut} className="relative text-black dark:text-darkGray z-[9999999999999999999999999] md:block hidden">
            <div className="avatar flex justify-center items-center">
                <div className="mask mask-circle w-6">
                    {data?.data?.data?.profileImage ? (
                        <motion.img whileHover={{ scale: 0.90 }} src={`${api_gerenal}/${data?.data?.data?.profileImage}`} alt="" className="w-10 aspect-square cursor-pointer object-cover" />
                    ) :
                        (
                            <motion.img whileHover={{ scale: 0.90 }} src={anon} alt="" className="w-10 aspect-square cursor-pointer object-cover" />
                        )}
                </div>
            </div>
            <AnimatePresence>
                <motion.ul variants={ulVariant} animate={profileNav ? "animate" : "initial"} exit="exit" className={`${profileNav ? "visible" : "invisible"} jost flex flex-col gap-2 absolute right-[0px] md:w-[300px] rounded-md p-4 dark:bg-DARKBG bg-white`}>
                    <motion.li variants={liVariant}>
                        <Link to="/dashboard" className={`group flex items-center gap-2 py-2 border-b-2 border-BODYDARKBG dark:border-black`}>
                            {data?.data?.data?.profileImage ? (
                                <motion.img whileHover={{ scale: 0.90 }} src={`${api_gerenal}/${data?.data?.data?.profileImage}`} alt="" className="w-10 aspect-square rounded-full cursor-pointer object-cover" />
                            ) :
                                (
                                    <motion.img whileHover={{ scale: 0.90 }} src={anon} alt="" className="w-10 aspect-square rounded-full cursor-pointer object-cover" />
                                )}
                            <div className='flex flex-col gap-1'>
                                <p className={`text-sm text-black dark:text-white`}>{token && token["user_name"]}</p>
                                <p className='text-xs text-slate-400 jost'>{token?.user}</p>
                            </div>
                        </Link>
                    </motion.li>
                    <motion.li variants={liVariant} className='flex items-center gap-2 cursor-pointer w-fit'>
                        <MdOutlineRssFeed size={20} />
                        <Link to={`/mypromotweet`} className="w-fit cursor-pointer text-base font-medium">MyPromoTweet</Link>
                    </motion.li>
                    <motion.li variants={liVariant} className='flex items-center gap-2 cursor-pointer w-fit'>
                        <CiChat1 size={20} />
                        <Link to={`/mypromotalk`} className="w-fit cursor-pointer text-base font-medium">MyPromoTalk</Link>
                    </motion.li>
                    <motion.div variants={liVariant} className="text-red flex items-center gap-2 cursor-pointer w-fit duration-200 hover:scale-110">
                        <FaPowerOff onClick={() => LogOut()} />
                        <p onClick={() => { LogOut() }}><a className="text-base font-medium">logout</a></p>
                    </motion.div>
                </motion.ul>
            </AnimatePresence>
        </motion.div>
    )
}

ProfileHover.propTypes = {
    LogOut: PropTypes.func
}

export default ProfileHover