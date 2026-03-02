import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Share2, Heart, Bookmark, ArrowLeft } from "lucide-react";
import Loader from "../../../../loader";
import FetchSingleVideoseller from "../../../../hooks/fetchSingleVideo";
import timeEdit from "../../../../utils/timeEdit";
import VideoPlayer from "./videoPlayer";
import RelatedVideos from "./relatedVideos";
import ShareModal from "./shareModal";

const Videosingle = () => {
  const { id, description } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { data, isLoading, error } = FetchSingleVideoseller(id,description);
  const video = data;
   function slugify(title) {
        return title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "") // remove punctuation
          .replace(/\s+/g, "-") // replace spaces with -
          .replace(/--+/g, "-"); // replace multiple dashes with single one
      }

  const shareUrl = window.location.href;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // console.log(video )

  // console.log(error)

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="text-center text-red-500 text-lg min-h-screen pt-5">
        {error}
      </div>
    );
  }
  if (!video) {
    return (
      <div className="text-center text-lg min-h-screen pt-5">
        No video found. {error}
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to videos
          </Button>
        </Link>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="rounded-lg overflow-hidden bg-black aspect-video shadow-lg">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <VideoPlayer videoUrl={video.titlevideourl} />
                // <Skeleton className="h-full w-full" />
              )}
            </div>

            {/* Video Info */}
            <div className="mt-6">
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <div className="flex lg:items-center justify-between gap-4 lg:gap-0 mt-4 lg:flex-row flex-col">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
                    {video.user_image ? (
                      <img
                        src={video.user_image}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue flex items-center justify-center text-white font-bold">
                        {video.user_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <Link
                      to={`/profile/user/${video.user_name}`}
                      className="font-medium hover:underline"
                    >
                      {video.user_name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {timeEdit(video?.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={isLiked ? "secondary" : "outline"}
                    size="sm"
                    className={`flex items-center gap-1 bg-white dark:bg-DARKBG`}
                    // onClick={handleLike}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isLiked ? "fill-current text-rose-500" : ""
                      }`}
                    />
                    <span>{video.likes}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-1 bg-white dark:bg-DARKBG`}
                    onClick={() => setShareModalOpen(true)}
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>

                  <Button
                    variant={isSaved ? "secondary" : "outline"}
                    size="sm"
                    className={`flex items-center gap-1 bg-white dark:bg-DARKBG`}
                    // onClick={handleSave}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                    />
                    Save
                  </Button>
                </div>
              </div>

              {/* Categories */}

              {/* Description */}
              <div className={`mt-6 p-5 rounded-lg border bg-card dark:bg-DARKBG dark:border-none`}>
                <h3 className="font-semibold mb-3">Description</h3>
                <p className={`jost whitespace-pre-line text-sm text-muted-foregroud `}>
                  {video.description}
                </p>
              </div>

              {/* Comments Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">
                    Comments ({video.comments ?? "2"})
                  </h3>
                  <Button variant="ghost" size="sm">
                    Most relevant
                  </Button>
                </div>

                <div className="flex items-start gap-3 mb-6">
                  <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0"></div>
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className={`pl-4 w-full border-b border-input focus:border-primary outline-none py-2 bg-white dark:bg-DARKBG`}
                    />
                  </div>
                </div>

                {/* Sample comments */}
                {/* {[1, 2].map((comment) => ( */}
                  {/* <></> */}
                  {/* <div key={comment} className="flex items-start gap-3 mb-6"> */}
                   {/* <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0"> */}
                     {/* <img */}
                  {/* //       src={`https://i.pravatar.cc/150?img=${comment + 20}`}
                  //       alt="User avatar"
                  //       className="h-full w-full object-cover"
                  //     />
                  //   </div>
                  //   <div>
                  //     <div className="flex items-center gap-2">
                  //       <span className="font-medium text-sm">Timi</span>
                  //       <span className="text-xs text-muted-foreground">
                  //         2 days ago
                  //       </span>
                  //     </div>
                  //     <p className="text-sm mt-1">Working on it</p>
                  //     <div className="flex items-center gap-4 mt-2">
                  //       <button className="text-xs text-muted-foreground flex items-center gap-1">
                  //         <Heart className="h-3 w-3" />
                  //         42
                  //       </button>
                  //       <button className="text-xs text-muted-foreground">
                  //         Reply
                  //       </button>
                  //     </div>
                  //   </div>
                  // </div>
                // ))} */}

                {/* // <Button variant="outline" className="w-full mt-2" size="sm"> */}
                  {/* Load more comments */}
                {/* </Button> */}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {/* <RelatedVideos currentVideoId={id} /> */}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        videoTitle={video.title}
        shareUrl={shareUrl}
      />
    </div>
  );
};

export default Videosingle;
