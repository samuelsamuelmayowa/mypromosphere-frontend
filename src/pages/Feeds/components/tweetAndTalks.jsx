import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import anon from "../../../assets/images/anon.png";
import noData from "../../../assets/images/nodata.png";
import { Link } from "react-router-dom";
import FetchVideos from "../../../hooks/fetchVideos";
import ReactPlayer from "react-player";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FaRegCirclePlay } from "react-icons/fa6";
import VideoSkeleton from "../../../components/videoSkeleton";

const api_thumbnails = import.meta.env.VITE_thumbnails;
const TopVideos = () => {
  const { token } = useStateContext();
  const { data, isLoading, error } = FetchVideos();

  if (error)
    return (
      <div className="min-h-screen grid place-items-center text-red md:text-xl text-lg">
        <p>{error?.message}</p>
      </div>
    );

  return (
    <>
      <section className="relative grid md:gap-4 md:grid-cols-2 lg:grid-cols-3 exl:grid-cols-4 gap-10 py-4">
        {data?.data?.videos.length === 0 && 
          <div className="min-h-screen grid place-items-center md:col-span-2 lg:col-span-4 exl:col-span-4">
            <div className='flex flex-col gap-2 text-center'>
              <LazyLoadImage src={noData} className="w-full md:w-[300px]" alt="not-found" />
              <h1 className="text-semibold text-base md:text-xl">No Video Yet!!!</h1>
              <Link to={`/dashboard/postVideo`} className="text-purple underline font-medium">Be the First to Showcase Your Product</Link>
            </div>
          </div>
        }
        {isLoading && (
          <VideoSkeleton posts={8} />
        )}
        {data?.data?.videos.map((video) => (
          <div key={video.id} className="flex flex-col gap-4">
            <div className="w-full aspect-ratio-box rounded-lg overflow-hidden">
              <ReactPlayer
                width={`100%`}
                playsinline={false}
                playbackRate={1}
                height={300}
                url={video?.titlevideourl}
                controls={true}
                playing={false}
                light={
                  video.id % 2 === 0
                    ? `${api_thumbnails}/public/storage/${video.thumbnails.slice(
                        7
                      )}`
                    : `${api_thumbnails}/public/storage/${video.thumbnails.slice(
                        7
                      )}`
                }
                muted={true}
                playIcon={<FaRegCirclePlay size={50} color="#fff" />}
                className="hover:outline hover:scale-105 duration-300"
              />
            </div>
            <Link to={`/profile/user/${video.user_name}`} className="w-fit">
              <div className="flex items-center gap-2">
                <img
                  src={video.user_image === null ? anon : video.user_image}
                  alt="user-profile-image"
                  className="rounded-full w-8 md:w-10 aspect-square"
                />
                {token && (
                  <p className="text-sm font-medium">
                    {video.user_id === token.id ? "me" : video.user_name}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default TopVideos;
