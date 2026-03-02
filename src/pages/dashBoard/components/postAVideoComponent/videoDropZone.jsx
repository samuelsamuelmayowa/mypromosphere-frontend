import { Upload } from 'lucide-react';
import PropTypes from 'prop-types';

const VideoDropZone = ({
  isDragOver,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleVideoSelection,
}) => {
  return (
    <div
      className={`bg-offwhite dark:bg-DARKBG relative border border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
        isDragOver 
          ? 'border-blue-500 bg-blue-50 scale-105' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Upload className="h-8 w-8 text-white" />
        </div>
        
        <div>
          <p className="text-xl font-semibold text-gray-700 dark:text-slate-200 mb-2">
            Drop your video here, or
          </p>
          <label className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              browse to upload
            </span>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => e.target.files && handleVideoSelection(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
        
        <p className="text-sm text-gray-500">
          MP4, MOV, AVI up to 50MB
        </p>
      </div>
    </div>
  );
};

VideoDropZone.propTypes = {
  isDragOver: PropTypes.any,
  handleDrop: PropTypes.any,
  handleDragOver: PropTypes.any,
  handleDragLeave: PropTypes.any,
  handleVideoSelection: PropTypes.any,
}

export default VideoDropZone;