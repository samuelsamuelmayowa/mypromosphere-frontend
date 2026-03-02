import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import FetchSingleAd from '../../../hooks/fetchSingleAd';
import FetchAdsComments from '../../../hooks/fetchAdsComments';
import { toast } from "sonner";
import Loader from '../../../loader';
import ProductGallery from './components/productGallery';
import ProductInfo from './components/productInfo';
import SellerCard from './components/sellerCard';
import ReviewsSection from './components/reviewsSection';
import FeedBack from "./components/feedBack";
import BackButton from './components/backButton.jsx';


import ShareButton from './components/shareButton';

const HOME = import.meta.env.VITE_HOME;
const api_general = import.meta.env.VITE_GENERAL;

const SingleFeedPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { id, productName } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error } = FetchSingleAd(id, productName);
    const { data: comments } = FetchAdsComments(id);
    const images = data?.other_data?.map(item => item.itemadsimagesurls) || [];
    const mainImage = data?.data?.titleImageurl ? `${api_general}/${data?.data?.titleImageurl}` : '';
    const allImages = mainImage ? [mainImage, ...images] : images;
    function slugify(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "") // remove punctuation
            .replace(/\s+/g, "-") // replace spaces with -
            .replace(/--+/g, "-"); // replace multiple dashes with single one
    }
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleNavigateBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    if (isLoading) return <Loader />;
    if (error) return (
        <div className="min-h-screen grid place-items-center">
            <div className="text-center">
                <p className="text-xl font-medium mb-4">Failed to load product</p>
                <p className="text-gray-500">{error.message}</p>
                <button
                    onClick={handleNavigateBack}
                    className="mt-4 px-6 py-2 bg-darkblue text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    );

    return (
        <>
            <Helmet>
                <meta property="og:title" content={data?.data?.productName || "Product"} />
                <meta property="og:description" content={data?.data?.description || "Product description"} />
                <meta property="og:image" content={allImages[currentImageIndex] || "default-image-url.jpg"} />
                <meta property="og:url" content={`${HOME}/feed/${id}/${slugify(productName)}`} />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={data?.data?.productName || "Product"} />
                <meta name="twitter:description" content={data?.data?.description || "Product description"} />
                <meta name="twitter:image" content={allImages[currentImageIndex] || "default-image-url.jpg"} />
                <title>{data?.data?.productName || "Product"}</title>
            </Helmet>

            <div className={`min-h-screen py-6 px-4 md:px-5 lg:py-5 bg-BODYBG text-gray-900 dark:bg-BODYDARKBG dark:text-gray-100`}>
                <div className="max-w-7xl mx-auto">
                    {/* Navigation & Action Bar */}
                    <div className="flex items-center justify-between mb-2">
                        <BackButton onClick={handleNavigateBack} />
                        <ShareButton
                            url={`${HOME}/feed/${id}`}
                            title={data?.data?.productName}
                            onCopySuccess={() => toast.success("Product link copied to clipboard")}
                        />
                    </div>

                    {/* Main Product Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Product Gallery */}
                        <ProductGallery
                            images={allImages}
                            currentIndex={currentImageIndex}
                            setCurrentIndex={setCurrentImageIndex}
                        />

                        {/* Product Info */}
                        <ProductInfo
                            product={data?.data}
                            onFeedbackClick={() => setIsOpen(true)}
                        />
                    </div>

                    {/* Seller & Reviews Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <SellerCard seller={data?.data} />
                        </div>
                        <div className="md:col-span-2">
                            <ReviewsSection comments={comments?.data?.data || []} />
                        </div>
                    </div>
                </div>
            </div>
            <FeedBack isOpen={isOpen} setComment={setIsOpen} onClose={() => setIsOpen(false)} postId={id} />
        </>
    );
};

export default SingleFeedPage;
