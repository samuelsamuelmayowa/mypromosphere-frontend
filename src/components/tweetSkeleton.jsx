import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useStateContext } from '../contexts/ContextProvider';

const TweetSkeleton = ({posts}) => {
    const { darkMode } = useStateContext();
    return Array.from({ length: posts }).map((_, index) => (
        <div key={index}>
            <div className='p-1 flex flex-col gap-2'>
                <div className='flex items-center gap-4'>
                    <Skeleton circle baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"} width={40} height={40}  />
                    <div>
                        <Skeleton baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"} width={150} />
                        <Skeleton baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"} width={100} />
                    </div>
                </div>
                <Skeleton baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"}  width={`100%`} height={304} />
                
            </div>
        </div>
    ))
}

export default TweetSkeleton