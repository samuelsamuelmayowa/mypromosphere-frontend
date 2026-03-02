import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import "../utils/trends.css";
import { TbCurrencyNaira } from "react-icons/tb";
import { useStateContext } from '../contexts/ContextProvider';
import AddToWishListButton from "./addToWishListButton";
import { Helmet } from "react-helmet";
const api_gerenal = import.meta.env.VITE_GENERAL;
import PropTypes from 'prop-types';

const LaptopDisplay = ({ flex, item, other_images }) => {
    const { FullScreen } = useStateContext();
    return (
        <>
            <Helmet>
                <link
                    rel="preload"
                    as="image"
                    href={`${api_gerenal}/public/storage/${item.titleImageurl.slice(7)}`}
                />
                <link rel="preconnect" href={api_gerenal} />
            </Helmet>
            <div className={`group product-display flex gap-1 flex-col justify-between rounded-md bg-DARKBG dark:bg-white`}>
                <div className={`relative pt-2 px-2`}>
                    <div className="">
                        <AddToWishListButton item={item} />
                    </div>
                    {other_images &&
                        other_images?.filter((img) => img.itemfree_ads_id === item.id).length > 0 ?
                        <Splide options={{
                            type: 'slide',
                            gap: "20px",
                            lazyLoad: 'sequential',
                            perPage: 1,
                            arrows: false,
                            pagination: true,
                            snap: true,
                            drag: 'free',
                            width: "100%",
                            height: FullScreen ? flex ? "300px" : "150px" : flex ? "300px" : "150px",
                        }} className="">
                            <SplideSlide className='rounded-md'>
                                <Link to={`/feed/${item.id}`}>
                                    <LazyLoadImage
                                        visibleByDefault={true} 
                                        width={`100%`} 
                                        height={FullScreen ? flex ? 300 : 150 : flex ? 300 : 150} 
                                        effect='blur' 
                                        delayTime={0}
                                        threshold={20}
                                        src={`${api_gerenal}/public/storage/${item.titleImageurl.slice(7)}`}
                                        alt="" style={{ width: "100%", height: FullScreen ? flex ? 300 : 150 : flex ? 300 : 150, objectFit: "cover" }} 
                                        className="product-image" 
                                    />
                                </Link>
                            </SplideSlide>
                            {other_images &&
                                other_images?.filter((img) => img.itemfree_ads_id === item.id).map((img, index, arr) => arr.length > 0 && (
                                    <SplideSlide key={img.id} className='rounded-md'>
                                        <Link to={`/feed/${item.id}`}>
                                            <LazyLoadImage 
                                                width={`100%`} 
                                                height={FullScreen ? flex ? 300 : 150 : flex ? 300 : 150} 
                                                effect='blur' delayTime={0} src={img.itemadsimagesurls} 
                                                alt="" style={{ width: "100%", height: FullScreen ? flex ? 300 : 150 : flex ? 300 : 150, objectFit: "cover" }} 
                                                className="product-image" 
                                            />
                                        </Link>
                                    </SplideSlide>
                                ))}
                        </Splide> 
                        :
                        <div>
                            <Link to={`/feed/${item.id}`}>
                                <LazyLoadImage
                                    visibleByDefault={true} width={`100%`} height={FullScreen ? flex ? 300 : 150 : flex ? 300 : 150} 
                                    effect='blur' delayTime={0}
                                    threshold={20}
                                    src={`${api_gerenal}/public/storage/${item.titleImageurl.slice(7)}`} alt="" 
                                    style={{ width: "100%", height: FullScreen ? flex ? 300 : 150 : flex ? 300 : 150, objectFit: "cover" }} 
                                    className="product-image" 
                                />
                            </Link>
                        </div>
                    }
                </div>
                <div className={`divide-y-2 md:divide-y-4 divide-offwhite dark:divide-BODYDARKBG`}>
                    <div className="flex flex-col lg:gap-2 px-2 lg:pb-1">
                        <div className={`flex items-center justify-between text-mainTextDark dark:text-white lg:my-2`}>
                            <h1 className={`text-darkblue dark:text-mainTextDark font-semibold lg:font-bold text-sm lg:text-lg jost line-clamp-1`}>{item.productName}</h1>
                        </div>
                        <div className='flex items-center justify-normal lg:justify-between h-[30px] lg:h-fit'>
                            <Link to={`/profile/user/${item?.user_name}`} className="flex-1 lg:flex-auto">
                                <div className={`inter text-[9px] lg:text-xs tracking-wide text-darkblue dark:text-mainTextDark`}>
                                    by {item?.user_name}
                                </div>
                            </Link>
                            <div className="flex items-center jost">
                                <TbCurrencyNaira size={15} className={`text-darkblue dark:text-mainTextDark`} />
                                <p className={`text-darkblue dark:text-mainTextDark text-[10px] lg:text-lg font-bold tracking-tight`}>{(+item.price).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className='md:p-2 p-1 flex items-center justify-end'>
                        <Link to={`/feed/${item.id}`} aria-label={`See more details about this product`}>
                            <button className={`rounded-md lg:rounded-[48px] border-2 bg-darkblue text-white hover:border-darkblue border-darkblue hover:bg-transparent hover:text-darkblue dark:border-none dark:bg-darkblue dark:text-mainTextDark dark:hover:bg-lightblue dark:hover:text-white text-[10px] lg:text-base py-2 px-2 lg:py-2 lg:px-4 duration-300`}>See More</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
LaptopDisplay.propTypes = {
    isActive: PropTypes.bool,
    flex: PropTypes.bool,
    item: PropTypes.any,
    other_images: PropTypes.array,
    category: PropTypes.string,
    index: PropTypes.number
}
export default LaptopDisplay


