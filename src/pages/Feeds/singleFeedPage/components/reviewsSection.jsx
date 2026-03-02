import timeEdit from "../../../../utils/timeEdit";
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ReviewCard = ({ review, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`bg-white dark:bg-BODYDARKBG p-4 rounded-lg shadow-sm mb-4`}
        >
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                        src={review.profile_image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                        alt={review.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium">{review.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {timeEdit(review.updated_at)}
                        </span>
                    </div>
                    <p className="text-sm">{review.message}</p>
                </div>
            </div>
        </motion.div>
    );
};

const ReviewsSection = ({ comments = [] }) => {
    return (
        <div className={`bg-white dark:bg-DARKBG rounded-lg shadow-sm p-6`}>
            <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-darkblue" />
                <h2 className="text-xl font-semibold">Reviews & Feedback</h2>
            </div>

            {comments.length === 0 ? (
                <div className="text-center py-8">
                    <div className="mb-4 text-gray-400">
                        <MessageSquare className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No Reviews Yet</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Be the first to leave feedback for this product
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment, index) => (
                        <ReviewCard
                            key={`review-${index}`}
                            review={comment}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

ReviewCard.propTypes = {
    review: PropTypes.any,
    index: PropTypes.any
}
ReviewsSection.propTypes = {
    comments: PropTypes.array,
}

export default ReviewsSection;