import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useStateContext } from '../contexts/ContextProvider';
import { TbCurrencyNaira } from "react-icons/tb";

const PostsSkeleton = ({ posts, flex }) => {
    const { FullScreen, darkMode } = useStateContext();
    return Array.from({ length: posts }).map((_, index) => (
        <div key={index} className={`flex flex-col md:gap-2 ${flex ? "w-[350px]" : ""} duration-300`}>
            <div>
                <Skeleton baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"}  width={`100%`} height={FullScreen ? flex ? 320 : 280 : 280} />
            </div>
            <div className='flex items-center gap-2 md:my-2'>
                <Skeleton width={100} baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"}  />
            </div>
            <div className='flex'>
                <Skeleton width={FullScreen ? 100 : 50} baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"}  />
                
            </div>
            <div className='flex items-center justify-between'>
                <div className="flex items-center">
                    <TbCurrencyNaira size={15} />
                    <Skeleton width={50} height={20} baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"}  />
                </div>
                <button className={`rounded-3xl py-2 px-3`}>
                    <Skeleton width={60} baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"}  />
                </button>
            </div>
        </div>
    ))
}

export default PostsSkeleton;