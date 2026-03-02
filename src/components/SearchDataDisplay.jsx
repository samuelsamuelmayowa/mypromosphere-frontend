import { Splide, SplideSlide } from '@splidejs/react-splide';
import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import anon from "../assets/images/anon.png"
import { useStateContext } from "../contexts/ContextProvider";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TbCurrencyNaira } from "react-icons/tb";
import '../utils/trends.css';
import PropTypes from 'prop-types';

const api_gerenal = import.meta.env.VITE_GENERAL;

const containerVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3, delayChildren: 0.2
        }
    },
    exit: {
        opacity: 0,
        transition: {
            when: "afterChildren", delayChildren: 0.2, duration: 0.2
        }
    }
}

const divVariant = {
    initial: {
        opacity: 0,
        y: "-100%",
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring", delayChildren: 0.1, duration: 0.2, stiffness: 250
        }
    },
    exit: {
        opacity: 0,
        y: "100%",
        transition: {
            when: "afterChildren", duration: 0.2,
        }
    }
}

const childVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            type: "spring", duration: 0.3, stiffness: 250
        }
    },
}

const Search = ({ modal, searchResults, removeModal }) => {
    const { token } = useStateContext();
    return (
        <motion.div variants={containerVariant} initial="initial" animate="animate" exit="exit" className="fixed z-[999999] inset-0 flex justify-center items-center bg-black bg-opacity-80 min-h-screen">
            {(modal && searchResults?.data && searchResults.data.length > 0) &&
                <motion.div variants={divVariant} className="relative w-[95%]">
                    <FaXmark size={30} className={`text-white dark:text-white  absolute top-2 right-2 md:-top-8 md:-right-8 z-10`} onClick={(e) => { e.preventDefault(); removeModal() }} />
                    <Splide options={{
                        type: 'slide',
                        perPage: 3,
                        gap: "20px",
                        arrows: searchResults.data.length > 2 ? true : false,
                        pagination: searchResults.data.length > 8 ? false : true,
                        snap: true,
                        breakpoints: {
                            1200: {
                                perPage: 2
                            },
                            640: {
                                perPage: 1, arrows: searchResults.data.length > 1 ? true : false
                            },
                            300: {
                                perPage: 1
                            }
                        },
                    }} className={`search-display bg-white dark:bg-darkBg py-4 px-4 rounded-md`}>

                        {searchResults?.data.map((item) => (
                            <SplideSlide key={item.id}>
                                <motion.div variants={childVariant} key={item.id} className="flex flex-col gap-2 md:gap-4">
                                    <div>
                                        <Link to={`/feed/${item.id}`}>
                                            <LazyLoadImage width={`100%`} effect='blur' src={`${api_gerenal}/public/storage/${item.titleImageurl.slice(7)}`} alt="" style={{ width: "100%", height: 300, objectFit: "cover" }} className="w-full rounded-md object-cover" />
                                        </Link>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <h1 className={`line-clamp-1 font-light dark:text-mainTextDark text-darkblue`}>{item.productName}</h1>
                                        <div className="flex items-center">
                                            <TbCurrencyNaira size={20} />
                                            <p className="text-sm">{(+item.price).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <Link to={`/profile/user/${item.user_name}`} className="">
                                        <div className="flex items-center gap-2">
                                            <img src={item.user_image === "null" ? anon : item.user_image} alt="user-profile-image" className="rounded-full w-8 md:w-10 aspect-square object-cover" />
                                            {token && <p className="text-sm font-medium">{item.user_id === token.id ? "me" : item.user_name}</p>}
                                            {!token && <p className="text-sm font-medium">{item.user_name}</p>}
                                        </div>
                                    </Link>
                                </motion.div>
                            </SplideSlide>
                        ))}
                    </Splide>
                    <p className="text-base py-2 text-center text-white">{searchResults.data.length} {searchResults.data.length > 1 ? "Results" : "Result"} Found</p>
                </motion.div>
            }
            {modal && !searchResults?.data && !searchResults.data.length && 
            <motion.div variants={divVariant} className="relative w-[95%] lg:w-[850px]">
                <h1>No Data</h1>
            </motion.div>
            }
        </motion.div>

    )
}

Search.propTypes = {
    modal: PropTypes.bool,
    searchResults: PropTypes.any,
    result: PropTypes.any,
    removeModal: PropTypes.func,
}

export default Search;