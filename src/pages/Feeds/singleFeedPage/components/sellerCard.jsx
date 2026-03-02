import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import anon from "../../../../assets/images/anon.png";
import { User, MessageCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FetchProfileUser from '../../../../hooks/fetchUserProfile';

const api_general = import.meta.env.VITE_GENERAL;

const SellerCard = ({ seller }) => {
    const { data: profile } = FetchProfileUser(seller?.user_name);
    if (!seller) return null;

    const sellerImage = `${api_general}/${profile?.data?.data?.profileImage}` && `${api_general}/${profile?.data?.data?.profileImage}` !== "null"
        ? `${api_general}/${profile?.data?.data?.profileImage}`
        : anon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white dark:bg-DARKBG rounded-lg shadow-sm overflow-hidden`}
        >
            {/* Seller header with gradient background */}
            <div className="bg-gradient-to-r from-blue to-darkblue p-6 text-white">
                <h2 className="text-xl font-semibold mb-1">Seller Information</h2>
                <p className="text-sm opacity-80">Contact the seller for more details</p>
            </div>
            {/* Seller profile */}
            <div className="p-6">
                <Link to={`/profile/user/${seller.user_name}`} className="flex items-center gap-4 mb-6">
                    <Avatar className="size-16 ring-2 ring-blue hover:ring-blue-500 transition-all">
                        <AvatarImage
                            src={sellerImage}
                            alt={sellerImage || "User"}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-blue text-white font-semibold">
                            {(seller.user_name || "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-semibold">{seller.user_name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Seller</p>
                    </div>
                </Link>
                {/* Action buttons */}
                <div className="flex flex-col gap-3">
                    <Link
                        to={`/profile/user/${seller.user_name}`}
                        className="w-full py-2.5 px-4 bg-darkblue text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <User className="w-5 h-5" />
                        View Profile
                    </Link>

                    <Link
                        to={`/profile/user/${seller.user_name}`}
                        className="w-full py-2.5 px-4 bg-transparent border border-darkblue text-darkblue dark:text-blue-400 rounded-md font-medium hover:bg-darkblue/10 transition-colors flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Message Seller
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

SellerCard.propTypes = {
    seller: PropTypes.any,
}

export default SellerCard;