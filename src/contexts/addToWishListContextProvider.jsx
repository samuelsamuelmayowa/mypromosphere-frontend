import { createContext, useContext, useState } from "react";
import POP from "../assets/audio/pop.mp3"
import { toast } from 'sonner';
import PropTypes from 'prop-types';


const WishListContext = createContext({})

export function AddToWishListProvider({ children }) {
    const pop = new Audio(POP)
    const [wishList, setWishList] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || [])
    const addToWishList = (e, id) => {
        e.stopPropagation()
        const currentIndex = wishList.indexOf(id);
        if (currentIndex === -1) {
            toast.success('Added to wishlist')
            pop.play()
            setWishList(prev => {
                const updatedWishList = [...prev, id];
                localStorage.setItem('wishlist', JSON.stringify(updatedWishList));
                return updatedWishList;
            });
        } else {
            toast.success('Removed to wishlist')
            pop.play()
            setWishList(prev => {
                const updatedWishList = prev.filter(itemId => itemId !== id);
                localStorage.setItem('wishlist', JSON.stringify(updatedWishList));
                return updatedWishList;
            });
        }
    }
    return (
        <WishListContext.Provider value={{
            wishList,
            addToWishList
        }}>
            {children}
        </WishListContext.Provider>
    )
}

AddToWishListProvider.propTypes = {
    children: PropTypes.any,
}

export const useWishListContext = () => useContext(WishListContext)