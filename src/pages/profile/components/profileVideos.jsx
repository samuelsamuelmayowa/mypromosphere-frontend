import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link } from 'react-router-dom';
import FetchOtherUserVideos from '../../../hooks/otherUsersVideos';
import noData from "../../../assets/images/nodata.png"
import VideoSkeleton from "../../../components/videoSkeleton"
import VideoControls from "../../Feeds/components/videoControls";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';


const ProfileVideos = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState();
  const [isPaused, setIsPaused] = useState(true);
  const videoRefs = useRef([]);
  const user_name = useOutletContext()
  const { token } = useStateContext();
  const { data, isLoading, isPending, error } = FetchOtherUserVideos(user_name);
  function slugify(title) {
    return title
      .slice(0, 100)               // ✅ mimic Laravel's limit
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')    // remove punctuation
      .replace(/\s+/g, '-')        // replace spaces with -
      .replace(/--+/g, '-')        // remove multiple dashes
      .replace(/^-+/, '');         // remove leading dashes
  }

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const currentIndex = api.selectedScrollSnap();
      setActiveIndex(currentIndex);
      setIsPaused(false);
    });
  }, [api]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          if (!isPaused) {
            video.currentTime = 0;
            video.play().catch(e => console.log('Autoplay prevented:', e));
          } else {
            video.pause();
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex, isPaused]);

  const handlePlayPause = () => setIsPaused(!isPaused);

  const handleVideoClick = (index) => {
    if (index === activeIndex) {
      setIsPaused(!isPaused);
    } else {
      setActiveIndex(index);
      setIsPaused(false);
      api?.scrollTo(index);
    }
  };

  return (
    <section className="relative">
      {(!isLoading && error?.response?.status === 404) &&
        <div className='text-center col-span-1 md:col-span-2 lg:col-span-4 my-2 py-10'>
          <img src={noData} className="w-[200px] mx-auto" alt="no post" />
          <h1 className="jost">{token?.user_name == user_name ? "You have" : "This User has"} not posted any Talk/Tweet!</h1>
        </div>
      }
      {(isLoading || isPending) && 
      <div className="px-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        <VideoSkeleton posts={4} />
      </div>}
      <div className="relative px-5">
        <Carousel
          setApi={setApi}
          className="w-full h-full"
          opts={{
            loop: true,
            dragFree: false,
            containScroll: "keepSnaps",
            slidesToScroll: 1,
            align: "start",
          }}
        >
          {(data?.data?.videos && !isLoading) && (
            <CarouselContent className="h-full">
              {data?.data?.videos.map((video, index) => (
                <CarouselItem
                  key={`${video.id}-${index}`}
                  className="h-full md:basis-1/2 lg:basis-1/3 items-center"
                >
                  <Card className="border-none bg-transparent m-0 p-0 shadow-none h-[calc(100vh-10rem)] md:h-[550px]">
                    <motion.div
                      initial={{ opacity: 0.7, scale: 0.95 }}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0.7,
                        scale: activeIndex === index ? 1 : 0.95,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`relative h-full rounded-md overflow-hidden cursor-pointer ${activeIndex !== index ? "after:absolute after:inset-0 after:bg-black/20 after:blur-sm" : ""
                        }`}
                      onClick={() => handleVideoClick(index)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={video?.titlevideourl}
                        className="w-full h-full object-cover"
                        loop
                        playsInline
                        style={{ objectFit: "cover" }}
                      />
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="z-10 absolute top-0 left-0 right-0 h-fit p-2 bg-gradient-to-b from-black/80 to-transparent text-white"
                          >
                            <Link to={`/sellervideos/${video.id}/${slugify(video.description)}`}>
                              <div className="p-3">
                                <p className="jost text-sm md:text-base line-clamp-2">{video.description}</p>
                              </div>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {activeIndex === index && (
                        <VideoControls
                          video={video}
                          isPaused={isPaused}
                          onPlayPause={handlePlayPause}
                          isActive={true}
                        />
                      )}
                    </motion.div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
          {data?.data?.videos &&
          <>
            <CarouselPrevious className="z-40 absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white border-none" />
            <CarouselNext className="z-40 absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white border-none" />
          </>
          }
          </Carousel>

      </div>
    </section>
  )
}

export default ProfileVideos;