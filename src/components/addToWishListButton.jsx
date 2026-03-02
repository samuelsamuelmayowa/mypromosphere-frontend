import { motion } from "framer-motion";
import { useWishListContext } from "../contexts/addToWishListContextProvider";
import { Heart } from 'lucide-react';
import PropTypes from 'prop-types';

const AddToWishListButton = ({ item }) => {
  const { wishList, addToWishList } = useWishListContext();
  return (
    <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} onClick={(e) => addToWishList(e, item.id)} className={`absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white group/heart`}>
      <Heart size={20} fill={`${wishList.includes(item.id) ? "#244CB4" : "black"}`} className="text-white transition-colors duration-300" />
    </motion.div>
  )
}

AddToWishListButton.propTypes = {
  item: PropTypes.any,
}

export default AddToWishListButton;