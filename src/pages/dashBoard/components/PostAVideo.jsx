import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import VideoDropZone from './postAVideoComponent/videoDropZone.jsx';
import VideoPreview from './postAVideoComponent/videoPreview.jsx';
import CategorySelector from './postAVideoComponent/categorySelector.jsx';
import DescriptionField from './postAVideoComponent/descriptionField.jsx';
import UploadProgress from './postAVideoComponent/uploadProgress.jsx';
import UploadGuidelines from './postAVideoComponent/uploadGuidelines.jsx';
import { useQueryClient } from "@tanstack/react-query";

const api_fetch = import.meta.env.VITE_VIDEO;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_VIDEO_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_ADS_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const PostAVideo = () => {
  const queryClient = useQueryClient();
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useStateContext();
  const [videoPreview, setVideoPreview] = useState();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const validateVideo = (file) => {
    if (file) {
      if (file.size > 300 * 1024 * 1024) {
        toast.error("Video size must be under 50MB.");
        return null;
      }

      if (!file.type.startsWith('video/')) {
        toast.error("Please select a valid video file.");
        return null;
      }
      toast.success("Video selected successfully!");
      return file;
    }
    return null;
  };

  const handleVideoSelection = (file) => {
    const validatedFile = validateVideo(file);
    if (validatedFile) {
      setVideo(validatedFile);
      const url = URL.createObjectURL(validatedFile);
      setVideoPreview(url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleVideoSelection(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeVideo = () => {
    setVideo(null);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
      setVideoPreview(null);
    }
  }

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name",  CLOUDINARY_CLOUD_NAME);
    formData.append("folder", "mypromosphere/videos");

    setIsUploading(true)
    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });
      return response.data.secure_url;
    } catch (error) {
      setIsUploading(false);
      throw new Error("Cloudinary upload failed.");
    }
  };

  const saveVideoMetadata = async (videoUrl) => {
    const payload = {
      titlevideourl: videoUrl,
      user_id: token?.id,
      user_name: token?.user_name,
      categories: category,
      description:description?.trim()
    };

    console.log(payload)

    try {
      const res = await axios.post(`${api_fetch}/videotest`, payload, {
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${token?.token}`,
        },
      });
      if (res.data.status === 200) {
        toast.success("Video uploaded and saved successfully!");
        setIsUploading(false);
        queryClient.invalidateQueries(["sellers-videos"]);
      } else {
        toast.error("Failed to save video metadata.");
      }
    } catch (err) {
      toast.error("Server error saving metadata.");
      console.error(err);
    }
  };

  const handleUpload = async () => {
    console.log("working")
    if (!video || !category || !description) {
      toast.error("All fields are required.");
      return;
    }
    try {
      const videoUrl = await uploadToCloudinary(video);
      console.log(videoUrl);
      await saveVideoMetadata(videoUrl);
      setVideo(null);
      setVideoPreview(null);
      setProgress(0);
      setCategory('');
      setDescription('');
      setIsUploading(false);
    } catch (error) {
      toast.error(error.message || "Upload failed.");
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-2 lg:px-2 py-5">
      <div className="space-y-4">
        {/* Upload Area */}
        <Card className="bg-white dark:bg-BODYDARKBG border border-dashed border-gray-200 hover:border-blue-400 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Upload className="h-6 w-6 text-blue-600" />
              <p>Got a Skit, <span className="font-black">Promo Video</span>, or Funny Clip? Share It Now!</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!video ? (
              <VideoDropZone
                isDragOver={isDragOver}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleVideoSelection={handleVideoSelection}
              />
            ) : (
              <VideoPreview
                video={video}
                videoPreview={videoPreview}
                removeVideo={removeVideo}
              />
            )}
          </CardContent>
        </Card>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <CategorySelector category={category} setCategory={setCategory} />
          <DescriptionField description={description} setDescription={setDescription} />
        </div>

        {/* Upload Progress */}
        {isUploading && <UploadProgress progress={progress} />}

        {/* Upload Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleUpload}
            disabled={!video || !category || !description || isUploading}
            className="bg-lightblue text-white dark:text-white dark:bg-darkblue px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            size="lg"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Uploading... {progress}%
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Upload  
              </>
            )}
          </Button>
        </div>
        <UploadGuidelines />
      </div>
    </div>
  );
};

export default PostAVideo;
