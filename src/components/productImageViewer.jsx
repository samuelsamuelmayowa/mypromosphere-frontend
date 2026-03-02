import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';

const ImageViewer = ({ isOpen, onClose, imageSrc, alt }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <button onClick={onClose} className="absolute right-2 top-2 text-white hover:text-gray-300 transition-colors duration-200">
            <X size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <LazyLoadImage
              src={imageSrc}
              alt={alt}
              className="w-[90%] lg:w-[500px] object-contain rounded-lg shadow-2xl"
              effect="blur"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ImageViewer.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.bool,
    imageSrc: PropTypes.any,
    alt: PropTypes.any,
}

export default ImageViewer;