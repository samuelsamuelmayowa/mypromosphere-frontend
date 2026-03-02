import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const ProductGallery = ({ images = [], currentIndex = 0, setCurrentIndex }) => {
    const [zoomed, setZoomed] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const toggleZoom = () => {
        setZoomed(!zoomed);
    };

    if (!images.length) {
        return (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center h-[400px]">
                <p className="text-gray-500 dark:text-gray-400">No images available</p>
            </div>
        );
    }

    return (
        <div className={`relative rounded-lg bg-white dark:bg-DARKBG`}>
            <div className="relative overflow-hidden rounded-lg bg-white dark:bg-DARKBG shadow-sm">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative aspect-square"
                        onClick={toggleZoom}
                    >
                        <LazyLoadImage
                            src={images[currentIndex]}
                            alt={`Product image ${currentIndex + 1}`}
                            effect="blur"
                            className={`w-full h-full object-contain transition-transform duration-300 ${zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                                }`}
                            wrapperClassName="w-full h-full"
                        />
                    </motion.div>
                </AnimatePresence>
                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-black/70 transition-colors z-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-black/70 transition-colors z-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                    {images.map((img, idx) => (
                        <motion.button
                            key={`thumb-${idx}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentIndex(idx)}
                            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${idx === currentIndex
                                    ? 'border-darkblue dark:border-blue-400'
                                    : 'border-transparent'
                                }`}
                        >
                            <LazyLoadImage
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                effect="blur"
                                visibleByDefault={true}
                                className="w-full h-full object-cover"
                            />
                        </motion.button>
                    ))}
                </div>
            )}
        </div>
    );
};

ProductGallery.propTypes = {
    images: PropTypes.array,
    currentIndex: PropTypes.any,
    setCurrentIndex: PropTypes.any,
}

export default ProductGallery;