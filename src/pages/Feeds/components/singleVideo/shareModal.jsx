import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {  Copy } from "lucide-react";
import { FaTwitter, FaWhatsapp } from "react-icons/fa"
import { toast } from "sonner";
import PropTypes from "prop-types";
import { FaFacebookF } from "react-icons/fa6";

const ShareModal = ({ isOpen, onClose, videoTitle, shareUrl }) => {
    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard");
    };

    // Social media share handlers
    const handleFacebookShare = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(videoTitle)}`, '_blank');
    };

    const handleTwitterShare = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(videoTitle)}`, '_blank');
    };

    const handleWhatsAppShare = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${videoTitle} ${shareUrl}`)}`, '_blank');
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share this video</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4 justify-center">
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex flex-col items-center gap-2 h-auto p-4 w-full max-w-[100px]"
                            onClick={handleFacebookShare}
                        >
                            <div className="bg-blue text-2xl text-white p-3 rounded-full">
                                <FaFacebookF />
                            </div>
                            <span className="text-xs">Facebook</span>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="flex flex-col items-center gap-2 h-auto p-4 w-full max-w-[100px]"
                            onClick={handleTwitterShare}
                        >
                            <div className="bg-sky-500 text-white p-3 rounded-full">
                                <FaTwitter />
                            </div>
                            <span className="text-xs">Twitter</span>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="flex flex-col items-center gap-2 h-auto p-4 w-full max-w-[100px]"
                            onClick={handleWhatsAppShare}
                        >
                            <div className="bg-green-600 text-white p-3 rounded-full">
                                {/* <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.6 6.32c1.44 1.44 2.14 3.1 2.14 5.06 0 1.94-.7 3.6-2.14 5.04-1.46 1.44-3.12 2.14-5.05 2.14-1.94 0-3.6-.7-5.05-2.14L2 21l4.5-4.5C4.9 14.97 4.24 13.3 4.24 11.38c0-1.95.7-3.61 2.14-5.06C7.8 4.9 9.46 4.2 11.39 4.2c1.93 0 3.6.7 5.05 2.14h.16zm-1.44 8.6c1.07-1.05 1.6-2.3 1.6-3.76 0-1.44-.54-2.7-1.6-3.76s-2.32-1.6-3.75-1.6c-1.45 0-2.7.54-3.75 1.6s-1.58 2.3-1.58 3.76c0 1.45.53 2.7 1.57 3.76 1.05 1.05 2.3 1.58 3.78 1.58 1.48 0 2.73-.53 3.78-1.58h-.05zm-4.7-1.27c-.5.44-1.07.64-1.68.6l-.25-.02c-.2 0-.4-.05-.6-.15-.5-.23-.9-.62-1.2-1.2L8 12.85c.05.25.12.45.2.6.4.75.95 1.13 1.66 1.13.15 0 .3-.05.47-.06.5-.2.94-.4 1.3-1.08l-.17.2zm-1.7-5.14c-.04-.3-.2-.55-.47-.75-.17-.1-.35-.15-.52-.15h-.3c-.45 0-.83.3-1.13.9l.14-.2c-.07-.15-.12-.32-.12-.5v-.3c0-.2.05-.36.12-.5h.07c.23-.35.52-.5.83-.5.3-.03.55.05.78.25.2.2.3.45.35.75l.04.6c.03.3-.03.56-.15.8-.05.1-.13.2-.25.25-.1.08-.18.12-.28.12h-.3c-.1 0-.2.05-.3.15v.14h.5c.3 0 .6-.13.83-.37.28-.3.4-.65.38-1.05l-.02-.65zm3.38 1.1c-.1-.45-.33-.8-.65-1.07-.33-.22-.7-.33-1.13-.33s-.8.1-1.13.33c-.32.27-.55.62-.65 1.07h.03c-.04.15-.06.33-.06.53s.02.36.06.53v.04c.1.45.33.8.65 1.06.33.23.7.34 1.13.34s.8-.1 1.13-.34c.32-.26.55-.62.65-1.06v-.04c.04-.17.06-.33.06-.53s-.02-.38-.06-.53h-.03zm-.4 1.7c-.2.38-.5.57-.9.57s-.67-.2-.87-.58c-.1-.18-.16-.38-.16-.6 0-.24.05-.45.15-.63.2-.4.5-.6.9-.6s.7.2.87.6c.1.18.15.4.15.63 0 .22-.05.42-.16.6h.02z" />
                                </svg> */}
                                <FaWhatsapp />
                            </div>
                            <span className="text-xs">WhatsApp</span>
                        </Button>
                    </div>

                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 mt-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={shareUrl}
                                readOnly
                                className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                            />
                            <button
                                onClick={copyLinkToClipboard}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <Copy className="h-4 w-4" />
                            </button>
                        </div>
                        <Button onClick={copyLinkToClipboard}>Copy</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

ShareModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.any,
    videoTitle: PropTypes.string,
    shareUrl: PropTypes.any,
}

export default ShareModal;