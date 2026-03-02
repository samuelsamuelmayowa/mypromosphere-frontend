import { TbCurrencyNaira } from "react-icons/tb";
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Map, MapPin, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

const ProductInfo = ({ product, onFeedbackClick }) => {
    if (!product) return null;
    return (
        <div className={`rounded-lg p-6 bg-white dark:bg-DARKBG shadow-sm`}>
            {/* Category & Name */}
            <div className="mb-4">
                <Badge className="mb-2 bg-darkblue dark:text-slate-300 hover:bg-blue-700">{product.categories}</Badge>
                <h1 className="text-2xl md:text-3xl font-bold capitalize tracking-tight mb-2">
                    {product.productName || "Product Name"}
                </h1>
            </div>

            {/* Price */}
            <div className="flex items-center mb-6">
                <TbCurrencyNaira className="text-2xl md:text-3xl" />
                <span className="text-2xl md:text-3xl font-bold">
                    {product.price ? (+product.price).toLocaleString() : "10,000"}
                </span>
            </div>

            {/* Location Information */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-darkblue" />
                    <span>{product.state || "State"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Map className="w-5 h-5 text-darkblue" />
                    <span>{product.local_gov || "Local Government"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-darkblue" />
                    <span>{new Date(product.created_at).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Description */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <div className={`bg-gray-50 dark:bg-BODYDARKBG p-4 rounded-md`}>
                    <p className="whitespace-pre-line font-light">
                        {product.description || "No description provided."}
                    </p>
                </div>
            </div>

            {/* Action Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onFeedbackClick}
                className="w-full py-3 px-4 bg-darkblue text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
                Leave Feedback
            </motion.button>
        </div>
    );
};

ProductInfo.propTypes = {
    product: PropTypes.any,
    onFeedbackClick: PropTypes.any
}

export default ProductInfo;