import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useStateContext } from '../contexts/ContextProvider';

const UploadSkeleton = ({ posts }) => {
    const {darkMode } = useStateContext();
    return Array.from({ length: posts }).map((_, index) => (
        <div key={index} className='my-5'>
            <Skeleton baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"} width={`100%`} height={400} />
            <div className='py-5 flex flex-col gap-2'>
                <Skeleton width={180} baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"}  />
                <Skeleton width={300} baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"}  />
                <Skeleton width={300} baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"}  />
            </div>
        </div>
    ))
}


export default UploadSkeleton;