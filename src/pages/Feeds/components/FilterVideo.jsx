import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaList } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Categories } from '../../../json/categories';
import { useStateContext } from '../../../contexts/ContextProvider';
import SearchInput from '../../../components/SearchInput';



const FilterVideo =()=>{
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
        <>
        
        </>
    )
}

export default FilterVideo;