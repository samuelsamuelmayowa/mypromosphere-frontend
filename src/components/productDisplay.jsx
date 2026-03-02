// import { motion } from 'framer-motion';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import { Link } from "react-router-dom";
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css';
// import "../utils/trends.css";
// import { TbCurrencyNaira } from "react-icons/tb";
// import { useStateContext } from '../contexts/ContextProvider';
// import AddToWishListButton from "./addToWishListButton";
// import { Helmet } from "react-helmet";
// import PropTypes from 'prop-types';

// const api_general = import.meta.env.VITE_GENERAL;

// const ProductDisplay = ({ flex, item, index, other_images }) => {
//      function slugify(title) {
//         return title
//           .toLowerCase()
//           .trim()
//           .replace(/[^\w\s-]/g, "") // remove punctuation
//           .replace(/\s+/g, "-") // replace spaces with -
//           .replace(/--+/g, "-"); // replace multiple dashes with single one
//       }
//     const { FullScreen } = useStateContext();

//     const imageHeight = FullScreen ? (flex ? 300 : 150) : (flex ? 300 : 150);

//     return (
//         <>
//             <Helmet>
//                 <link
//                     rel="preload"
//                     as="image"
//                     href={`${api_general}/${item.titleImageurl}`}
//                 />
//                 <link rel="preconnect" href={api_general} />
//             </Helmet>

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                 className="group product-display flex gap-1 flex-col justify-between rounded-md bg-white dark:bg-DARKBG"
//             >
//                 <div className="relative pt-2 px-2">
//                     <div>
//                         <AddToWishListButton item={item} />
//                     </div>

//                     {other_images && other_images.filter(img => img.itemfree_ads_id === item.id).length > 0 ? (
//                         <Splide
//                             options={{
//                                 type: 'slide',
//                                 gap: "20px",
//                                 lazyLoad: 'sequential',
//                                 perPage: 1,
//                                 arrows: false,
//                                 pagination: true,
//                                 snap: true,
//                                 drag: 'free',
//                                 width: "100%",
//                                 height: `${imageHeight}px`,
//                             }}
//                         >
//                             <SplideSlide className="rounded-md">
//                                 <Link to={`/feed/${item.id}/${slugify(item.productName)}`}>
//                                     <LazyLoadImage
//                                         visibleByDefault={true}
//                                         width="100%"
//                                         height={imageHeight}
//                                         effect="blur"
//                                         delayTime={0}
//                                         threshold={20}
//                                         src={`${api_general}/${item?.titleImageurl}`}
//                                         alt=""
//                                         style={{
//                                             width: "100%",
//                                             height: `${imageHeight}px`,
//                                             objectFit: "cover",
//                                         }}
//                                         className="product-image"
//                                     />
//                                 </Link>
//                             </SplideSlide>
//                             {other_images
//                                 .filter(img => img.itemfree_ads_id === item.id)
//                                 .map((img) => (
//                                     <SplideSlide
//                                         key={`${img.id}-${img.itemadsimagesurls}`}
//                                         className="rounded-md"
//                                     >
//                                         <Link to={`/feed/${item.id}`}>
//                                             <LazyLoadImage
//                                                 width="100%"
//                                                 visibleByDefault={true}
//                                                 height={imageHeight}
//                                                 effect="blur"
//                                                 delayTime={0}
//                                                 src={img.itemadsimagesurls}
//                                                 alt=""
//                                                 style={{
//                                                     width: "100%",
//                                                     height: `${imageHeight}px`,
//                                                     objectFit: "cover",
//                                                 }}
//                                                 className="product-image"
//                                             />
//                                         </Link>
//                                     </SplideSlide>
//                                 ))}
//                         </Splide>
//                     ) : (
//                         <div>
//                             <Link to={`/feed/${item.id}`}>
//                                 <LazyLoadImage
//                                     visibleByDefault={true}
//                                     width="100%"
//                                     height={imageHeight}
//                                     effect="blur"
//                                     threshold={20}
//                                     src={`${api_general}/${item?.titleImageurl}`}
//                                     alt=""
//                                     style={{
//                                         width: "100%",
//                                         height: `${imageHeight}px`,
//                                         objectFit: "cover",
//                                     }}
//                                     className="product-image"
//                                 />
//                             </Link>
//                         </div>
//                     )}
//                 </div>

//                 <div className="divide-y-2 md:divide-y-4 divide-offwhite dark:divide-BODYDARKBG">
//                     <div className="flex flex-col lg:gap-2 px-2 lg:pb-1">
//                         <div className="flex items-center justify-between text-mainTextDark dark:text-white lg:my-2">
//                             <h1 className="text-darkblue dark:text-mainTextDark font-semibold lg:font-bold text-sm lg:text-lg jost line-clamp-1">
//                                 {item.productName}
//                             </h1>
//                         </div>
//                         <div className="flex items-center justify-normal lg:justify-between h-[30px] lg:h-fit">
//                             <Link to={`/profile/user/${item?.user_name}`} className="flex-1 lg:flex-auto">
//                                 <div className="inter text-[9px] lg:text-xs tracking-wide text-darkblue dark:text-mainTextDark">
//                                     by {item?.user_name}
//                                 </div>
//                             </Link>
//                             <div className="flex items-center jost">
//                                 <TbCurrencyNaira size={15} className="text-darkblue dark:text-mainTextDark" />
//                                 <p className="text-darkblue dark:text-mainTextDark text-[10px] lg:text-lg font-bold tracking-tight">
//                                     {(+item.price).toLocaleString()}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="md:p-2 p-1 flex items-center justify-end">
//                         <Link to={`/feed/${item.id}/${slugify(item.productName)}`} aria-label="See more details about this product">
//                             <button className="rounded-md lg:rounded-[48px] border-2 bg-darkblue text-white border-darkblue hover:bg-transparent hover:text-darkblue dark:border-none dark:bg-darkblue dark:text-mainTextDark dark:hover:bg-lightblue dark:hover:text-white text-[10px] lg:text-base py-2 px-2 lg:py-2 lg:px-4 duration-300">
//                                 Buy Now
//                             </button>
//                         </Link>
//                     </div>
//                 </div>
//             </motion.div>
//         </>
//     );
// };

// ProductDisplay.propTypes = {
//     isActive: PropTypes.bool,
//     flex: PropTypes.bool,
//     item: PropTypes.any,
//     other_images: PropTypes.array,
//     category: PropTypes.string,
//     index: PropTypes.number,
// };

// export default ProductDisplay;








import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { ShoppingCart, Eye, User } from 'lucide-react';
import AddToWishListButton from "./addToWishListButton";
import PropTypes from 'prop-types';
import ImageViewer from "./productImageViewer"
import { useState } from 'react';

const ProductDisplay = ({ flex, item, index, other_images }) => {
    const [showImageViewer, setShowImageViewer] = useState(false);
     function slugify(title) {
  return title
    .toString()
    .normalize("NFD") // handle accented characters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except spaces and dashes
    .replace(/\s+/g, "-")         // replace spaces with dash
    .replace(/-+/g, "-");         // collapse multiple dashes
}

    const imageHeight = flex ? 320 : 280;
    const handleViewImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowImageViewer(true);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="group flex flex-col justify-between relative bg-white dark:bg-DARKBG rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* Product Image Section */}
                <div className="relative overflow-hidden group">
                    {/* Wishlist Button */}
                    <AddToWishListButton item={item} />
                    {/* Quick Actions Overlay */}
                    <motion.div
                        className="absolute opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 inset-x-4 bottom-4 z-10 flex gap- duration-300"
                    >
                        <Link to={`/profile/user/${item?.user_name}`} className='flex-1 block w-fit'>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-black/80 backdrop-blur-sm text-white py-2.5 px-4 rounded-xl font-medium text-sm hover:bg-black transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={16} />
                                Visit Sellers Products
                            </motion.button>
                        </Link>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleViewImage}
                            className="bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 rounded-xl hover:bg-white transition-all duration-300"
                        >
                            <Eye size={16} />
                        </motion.button>
                    </motion.div>
                    {/* Image Carousel or Single Image */}
                    <Link to={`/feed/${item.id}/${slugify(item.productName)}`}>
                        {other_images && other_images.filter(img => img.itemfree_ads_id === item.id).length > 0 ? (
                            <Splide
                                options={{
                                    type: 'slide',
                                    gap: "0px",
                                    lazyLoad: 'sequential',
                                    perPage: 1,
                                    arrows: false,
                                    pagination: true,
                                    snap: true,
                                    drag: 'free',
                                    width: "100%",
                                    height: `${imageHeight}px`,
                                    classes: {
                                        pagination: 'splide__pagination custom-pagination',
                                        page: 'splide__pagination__page custom-page',
                                    }
                                }}
                            >
                                <SplideSlide>
                                    <div className="group-hover:scale-105 transition-transform duration-700">
                                        <LazyLoadImage
                                            visibleByDefault={true}
                                            width="100%"
                                            height={imageHeight}
                                            effect="blur"
                                            delayTime={0}
                                            threshold={20}
                                            src={`${import.meta.env.VITE_GENERAL}/${item?.titleImageurl}`}
                                            alt={item.productName}
                                            style={{
                                                width: "100%",
                                                height: `${imageHeight}px`,
                                                objectFit: "cover",
                                            }}
                                            className="transition-all duration-700"
                                        />
                                    </div>
                                </SplideSlide>
                                {other_images
                                    .filter(img => img.itemfree_ads_id === item.id)
                                    .map((img) => (
                                        <SplideSlide key={`${img.id}-${img.itemadsimagesurls}`}>
                                            <div className="group-hover:scale-105 transition-transform duration-700">
                                                <LazyLoadImage
                                                    width="100%"
                                                    visibleByDefault={true}
                                                    height={imageHeight}
                                                    effect="blur"
                                                    delayTime={0}
                                                    src={img.itemadsimagesurls}
                                                    alt={item.productName}
                                                    style={{
                                                        width: "100%",
                                                        height: `${imageHeight}px`,
                                                        objectFit: "cover",
                                                    }}
                                                    className="transition-all duration-700"
                                                />
                                            </div>
                                        </SplideSlide>
                                    ))}
                            </Splide>
                        ) : (
                            <div className="overflow-hidden">
                                <div className="group-hover:scale-105 transition-transform duration-700">
                                    <LazyLoadImage
                                        visibleByDefault={true}
                                        width="100%"
                                        height={imageHeight}
                                        effect="blur"
                                        threshold={20}
                                        src={`${import.meta.env.VITE_GENERAL}/${item?.titleImageurl}`}
                                        alt={item.productName}
                                        style={{
                                            width: "100%",
                                            height: `${imageHeight}px`,
                                            objectFit: "cover",
                                        }}
                                        className="transition-all duration-700"
                                    />
                                </div>
                            </div>
                        )}
                    </Link>
                </div>
                {/* Product Info Section */}
                <div className="p-5 space-y-4">
                    {/* Product Title */}
                    <div>
                        <Link to={`/feed/${item.id}/${slugify(item.productName)}`}>
                            <h3 className="font-semibold jost text-lg text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors duration-300 leading-tight">
                                {item.productName}
                            </h3>
                        </Link>
                    </div>
                    {/* Seller Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="bg-gray-100 rounded-full p-1">
                            <User size={12} />
                        </div>
                        <Link
                            to={`/profile/user/${item?.user_name}`}
                            className="hover:text-blue-600 transition-colors duration-300 font-medium"
                        >
                            {item?.user_name}
                        </Link>
                    </div>
                    {/* Price and Buy Button */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-1">₦</span>
                            <span className="text-lg lg:text-xl font-bold text-darkblue dark:text-mainTextDark">
                                {(+item.price).toLocaleString()}
                            </span>
                        </div>
                        <Link to={`/feed/${item.id}/${slugify(item.productName)}`}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-blue to-purple text-white dark:text-white px-6 py-2.5 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple hover:to-blue">
                                Reach Out
                            </motion.button>
                        </Link>
                    </div>
                </div>
                <motion.div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl pointer-events-none"/>
            </motion.div>

            <ImageViewer
                isOpen={showImageViewer}
                onClose={() => setShowImageViewer(false)}
                imageSrc={`${import.meta.env.VITE_GENERAL}/${item?.titleImageurl}`}
                alt={item.productName}
            />
        </>
    );
};

ProductDisplay.propTypes = {
    isActive: PropTypes.bool,
    flex: PropTypes.bool,
    item: PropTypes.any,
    other_images: PropTypes.array,
    category: PropTypes.string,
    index: PropTypes.number,
};

export default ProductDisplay;