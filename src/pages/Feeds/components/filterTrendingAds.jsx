import { motion, AnimatePresence } from 'framer-motion';
import { FaList } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Categories } from '../../../json/categories';
import { useStateContext } from '../../../contexts/ContextProvider';
import PropTypes from 'prop-types';

const FilterTrendingAds = ({ adsCategory, setSearchParams, gridOrFlex, setGridOrFlex }) => {
    const { darkMode } = useStateContext();
    const handleCategories = (category) => {
        if (category !== "All") {
            setSearchParams({ adsCategory: category });
        }
        else {
            setSearchParams({ adsCategory: "All" });
        }
    }
    return (
        <div className="w-full grid grid-cols-12">
            <div className='col-span-12'>
                <div className='grid grid-cols-12 w-full'>
                    <div className='lg:col-span-1 col-span-3 flex items-center gap-2'>
                        <AnimatePresence mode='popLayout'>
                            { adsCategory === "All" &&
                                <motion.div initial={{ opacity: 0, rotate: 30 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 30 }} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} onClick={() => setGridOrFlex(true)} className={`${gridOrFlex && "bg-lightblue dark:bg-lightblue *:text-white *:dark:text-white"} p-2 rounded-md cursor-pointer`}>
                                    <FaList className={`text-black dark:text-white`} size={15} />
                                </motion.div>
                            }
                        </AnimatePresence>
                        <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} onClick={() => setGridOrFlex(false)} className={`${!gridOrFlex && "bg-lightblue dark:bg-lightblue text-white"} p-2 rounded-md cursor-pointer`}>
                            <FaTableCells size={15} />
                        </motion.div>
                    </div>
                    <div className='lg:col-span-11 col-span-9 filter my-2'>
                        <Splide options={{
                            type: 'slide',
                            autoWidth: true,
                            gap: "10px",
                            interval: 3000,
                            speed: 2000,
                            arrows: false,
                            pagination: false,
                            snap: true,
                            drag: 'free',
                            wheel: true,
                            waitForTransition: true,
                            releaseWheel: true,
                            perMove: 4,
                            breakpoints: {
                                640: {
                                    perPage: 2,
                                    perMove: 2,
                                },
                            }
                        }}
                        >
                            <SplideSlide>
                                <motion.div whileTap={{ scale: 0.95 }} onClick={() => handleCategories("All")} className={adsCategory === "All" ? `text-white dark:text-white bg-lightblue dark:bg-lightblue rounded-md` : `text-darkblue ${darkMode ? "dark:bg-DARKBG bg-DARKBG text-offwhite" : "bg-white dark:bg-white"} rounded-md cursor-pointer`}>
                                    <div className="py-2 px-3 text-xs font-semibold jost">
                                        All
                                    </div>
                                </motion.div>
                            </SplideSlide>
                            {Categories?.map((item, index) => (
                                <SplideSlide key={`${item.id}-${index}`}>
                                    <motion.div whileTap={{ scale: 0.95 }} onClick={() => handleCategories(item.name)} className={adsCategory === item.name ? `text-white dark:text-white bg-lightblue dark:bg-lightblue rounded-md` : `text-darkblue ${darkMode ? "dark:bg-DARKBG bg-DARKBG text-offwhite" : "bg-white dark:bg-white"} rounded-md cursor-pointer`}>
                                        <div className="py-2 px-3 text-xs font-semibold jost">
                                            {item.name}
                                        </div>
                                    </motion.div>
                                </SplideSlide>
                            ))}
                        </Splide>
                    </div>
                </div>
            </div>
        </div>
    )
}

FilterTrendingAds.propTypes = {
    adsCategory: PropTypes.any,
    setSearchParams: PropTypes.any,
    gridOrFlex: PropTypes.any,
    setGridOrFlex: PropTypes.any,
}

export default FilterTrendingAds