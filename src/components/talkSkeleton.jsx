import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useStateContext } from '../contexts/ContextProvider';

const TalkSkeleton = ({posts}) => {
    const { darkMode, FullScreen } = useStateContext();
    return Array.from({ length: posts }).map((_, index) => (
        <div key={index} className={``}>
            <div>
                <Skeleton baseColor={(darkMode) && "#27272c"} highlightColor={(darkMode) && "#444"}  width={`100%`} height={FullScreen ? 160 : 220} />
            </div>
        </div>
    ))
}

export default TalkSkeleton