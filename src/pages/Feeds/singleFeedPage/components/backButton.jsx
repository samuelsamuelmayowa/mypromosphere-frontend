import { ChevronLeft } from 'lucide-react';
import PropTypes from 'prop-types';

const BackButton = ({ onClick }) => {

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors shadow-sm`}
            aria-label="Go back"
        >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
        </button>
    );
};

BackButton.propTypes = {
    onClick: PropTypes.any
}

export default BackButton;