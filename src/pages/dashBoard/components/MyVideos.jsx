import { useStateContext } from "../../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import anon from "../../../assets/images/anon.png";
import { FaRegCirclePlay } from "react-icons/fa6";
import VideoSkeleton from "../../../components/videoSkeleton";
import LoggedInUserVideo from "../../../hooks/LoggedInUserVideo";
import noData from "../../../assets/images/nodata.png"
const api_thumbnails = import.meta.env.VITE_thumbnails;

const MyVidoes = () => {
  const { token } = useStateContext();
  const { data, isLoading, error } = LoggedInUserVideo(token);
  
  return (
    <section className="relative grid md:gap-4 md:grid-cols-2 lg:grid-cols-3 exl:grid-cols-4 gap-2 md:px-0 px-2">
      {(error?.response?.status === 404 && !isLoading) &&
        <div className="md:col-span-2 lg:col-span-3 exl:col-span-4 min-h-screen">
          <img src={noData} className="w-[200px] mx-auto" alt="not-found" />
          <h1 className='text-center'>No post Yet!!</h1>
        </div>}
      {(isLoading) && (
        <VideoSkeleton posts={4} />
      )}
      {(data?.data.posts && !isLoading) && data?.data.posts.map((video) => (
        <div key={video.id} className="flex flex-col gap-2">
          <div className="w-full aspect-ratio-box rounded-lg overflow-hidden">
            <ReactPlayer
              width={`100%`}
              height={200}
              url={video?.titlevideourl}
              playsinline={true}
              playbackRate={1}
              playing={true}
              light={
                video.id % 2 === 0
                  ? `${api_thumbnails}/public/storage/${video.thumbnails.slice(7)}`
                  : `${api_thumbnails}/public/storage/${video.thumbnails.slice(7)}`
              }
              controls={true}
              muted={true}
              playIcon={<FaRegCirclePlay size={50} color="#fff" />}
              className="w-fit hover:outline hover:scale-105 duration-300"
            />
          </div>
          <Link to={`/profile/user/${video.user_id}`} className="w-fit">
            <div className="flex items-center gap-2">
              <img
                src={video.user_image === null ? anon : video.user_image}
                alt="user-profile-image"
                className="rounded-full w-8 md:w-10 aspect-square"
              />
              {token && (
                <p className="text-sm font-medium">
                  {video.user_id === token.id && "me"}
                </p>
              )}
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default MyVidoes;
