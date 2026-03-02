// import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import VideoControls from "./videoControls";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious
// } from '@/components/ui/carousel';
// import { Card } from '@/components/ui/card';

// const VideoDisplay = () => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [api, setApi] = useState();
//     const [isPaused, setIsPaused] = useState(true);
//     const videoRefs = useRef([]);
//     return (
//         <div>
//             <CarouselItem
//                 key={`${video.id}-${index}`}
//                 className="h-full md:basis-1/2 lg:basis-1/4 items-center"
//             >
//                 <Card className="border-none bg-transparent m-0 p-0 shadow-none h-[calc(100vh-10rem)] md:h-[500px]">
//                     <motion.div
//                         initial={{ opacity: 0.7, scale: 0.95 }}
//                         animate={{
//                             opacity: activeIndex === index ? 1 : 0.7,
//                             scale: activeIndex === index ? 1 : 0.95,
//                         }}
//                         transition={{ duration: 0.3 }}
//                         className={`relative h-full rounded-md overflow-hidden cursor-pointer ${activeIndex !== index ? "after:absolute after:inset-0 after:bg-black/20 after:blur-sm" : ""
//                             }`}
//                         onClick={() => handleVideoClick(index)}
//                     >
//                         <video
//                             ref={(el) => (videoRefs.current[index] = el)}
//                             src={video?.titlevideourl}
//                             className="w-full h-full object-cover"
//                             loop
//                             // muted
//                             playsInline
//                             style={{ objectFit: "cover" }}
//                         />
//                         <AnimatePresence>
//                             {activeIndex === index && (
//                                 <motion.div
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ duration: 0.4 }}
//                                     className="z-10 absolute top-0 left-0 right-0 h-fit p-2 bg-gradient-to-b from-black/80 to-transparent text-white"
//                                 >
//                                     <div className="px-2 flex items-center gap-3 mb-2">
//                                         <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
//                                             {video.user_image ? (
//                                                 <img
//                                                     src={video.user_image}
//                                                     alt="avatar"
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                             ) : (
//                                                 <div className="w-full h-full bg-blue flex items-center justify-center text-white font-bold">
//                                                     {video.user_name.charAt(0).toUpperCase()}
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div>
//                                             <Link to={`/profile/user/${video.user_name}/videos`}>
//                                                 <h3 className="font-medium jost">{video.user_name}</h3>
//                                             </Link>
//                                             <Link to={`/sellervideos/${video.id}/${slugify(video.description)}`}>
//                                                 <p className="text-sm text-gray-300 hover:text-blue duration-200">
//                                                     view more
//                                                 </p>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                     <div className="p-3">
//                                         <p className="jost text-sm md:text-base line-clamp-2">{video.description}</p>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {activeIndex === index && (
//                             <VideoControls
//                                 video={video}
//                                 isPaused={isPaused}
//                                 onPlayPause={handlePlayPause}
//                                 isActive={true}
//                             />
//                         )}
//                     </motion.div>
//                 </Card>
//             </CarouselItem>
//         </div>
//     )
// }

// export default VideoDisplay;