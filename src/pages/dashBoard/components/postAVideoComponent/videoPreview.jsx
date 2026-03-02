
import { CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';


const VideoPreview = ({ video, videoPreview, removeVideo }) => {
  return (
    <div className="space-y-4">
      <div className="relative bg-gray-100 dark:bg-darkBg rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-slate-100">{video.name}</p>
              <p className="text-sm text-gray-500">
                {(video.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeVideo}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {videoPreview && (
        <div className="relative rounded-lg overflow-hidden bg-black">
          <video
            src={videoPreview}
            controls
            className="w-full max-h-64 object-contain"
          />
        </div>
      )}
    </div>
  );
};

VideoPreview.propTypes = {
  video: PropTypes.any, 
  videoPreview: PropTypes.any, 
  removeVideo: PropTypes.any
}

export default VideoPreview;