import { useState } from 'react';
import { Share } from 'lucide-react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from 'prop-types';

const ShareButton = ({ url, title = "Product", onCopySuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  
  const shareOptions = [
    {
      name: 'Copy Link',
      action: 'copy',
      icon: '📋',
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
      icon: '📱',
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      icon: '🐦',
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: '👍',
    }
  ];
  
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors shadow-sm`}
        aria-label="Share"
      >
        <Share className="w-5 h-5" />
        <span>Share</span>
      </button>
      
      {isOpen && (
        <div 
          className={`absolute right-0 mt-2 w-48 z-10 rounded-md shadow-lg overflow-hidden border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        >
          <div className="py-1">
            {shareOptions.map((option) => (
              option.action === 'copy' ? (
                <CopyToClipboard
                  key={option.name}
                  text={url}
                  onCopy={() => {
                    onCopySuccess?.();
                    setIsOpen(false);
                  }}
                >
                  <button 
                    className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span>{option.name}</span>
                  </button>
                </CopyToClipboard>
              ) : (
                <a 
                  key={option.name}
                  href={option.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{option.icon}</span>
                  <span>{option.name}</span>
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ShareButton.propTypes = {
    url: PropTypes.any, 
    title: PropTypes.string, 
    onCopySuccess: PropTypes.any
}

export default ShareButton;