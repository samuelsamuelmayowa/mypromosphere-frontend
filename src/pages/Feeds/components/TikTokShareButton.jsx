import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";

const TikTokShareButton = ({ shareUrl }) => {
  const handleCopy = () => {
    alert("Link copied to clipboard! Open TikTok and paste the link to share.");
  };

  return (
    <CopyToClipboard text={shareUrl} onCopy={handleCopy}>
      <button className="font-semibold   flex items-center gap-2 bg-pink-500 hover:bg-pink-600 py-2 px-4 rounded-lg shadow-md">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"
          alt="TikTok Logo"
          className="w-6 h-6"
        />
        Share on TikTok
      </button>
    </CopyToClipboard>
  );
};

TikTokShareButton.propTypes = {
  shareUrl: PropTypes.any
}


export default TikTokShareButton