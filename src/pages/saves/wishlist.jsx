import { useEffect } from "react";
import { Link } from 'react-router-dom'
import FetchTrendingAds from "../../hooks/fetchTrendingAds";
import ProductDisplay from '../../components/productDisplay';
import PostsSkeleton from '../../components/postsSkeleton';
import { useWishListContext } from "../../contexts/addToWishListContextProvider";

const Wishlist = () => {
    const { wishList } = useWishListContext();
    const { data, isLoading, error } = FetchTrendingAds();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (error) return <div className='min-h-screen grid place-items-center text-red md:text-xl text-lg'><p>{error?.message}</p></div>
    return (
        <div className="min-h-screen md:px-6 px-2 w-full">
            <p className="text-sm">Find your saved items and get Ready to buy them</p>
            {(!wishList.length && !isLoading) && 
                <div className="text-center">
                    <h1 className={`text-center mt-4 text-darkblue dark:text-mainTextDark`}>No item in your wishlist</h1>
                    <p><Link to="/" className="underline text-purple">Go to Home</Link></p>
                </div>
            }
            <section className="my-4 relative grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-12 md:gap-2 min-h-full">
                {isLoading && <PostsSkeleton posts={12} />}
                {data?.data?.normalads.filter((item) => wishList.includes(item.id)).map((item) => (
                    <ProductDisplay key={item.id} item={item} other_images={data?.data?.other_images} />
                ))}
            </section>
        </div>
    )
}

export default Wishlist;