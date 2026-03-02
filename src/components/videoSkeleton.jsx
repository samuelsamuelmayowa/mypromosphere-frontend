import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useStateContext } from '../contexts/ContextProvider';

const VideoSkeleton = ({ posts }) => {
    const { darkMode } = useStateContext();
    return Array.from({ length: posts }).map((_, index) => (
        <div key={index} className='flex flex-col'>
            <Skeleton className='h-[calc(100vh-10rem)] md:h-[450px]' baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"} width={`100%`} borderRadius={8} />
        </div>
    ))
}


export default VideoSkeleton;