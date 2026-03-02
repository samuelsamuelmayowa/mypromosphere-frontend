import { useOutletContext } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link } from 'react-router-dom';
import FetchOtherUserposts from '../../../hooks/otherUsersPosts';
import UploadSkeleton from "../../../components/uploadSkeleton";
import noData from "../../../assets/images/nodata.png"
import { IoIosArrowRoundForward } from "react-icons/io";
const api_gerenal = import.meta.env.VITE_GENERAL;


const ProfilePost = () => {
  const user_name = useOutletContext()
  const { token } = useStateContext();
  const { data, isLoading, isPending, error } = FetchOtherUserposts(user_name);
  if (error?.response?.status === 404) {
    console.log(error)
  } else {
    <div className='min-h-screen grid place-items-center'><p><h1>{error?.message}</h1></p></div>
  }
  return (
    <div className="px-4 lg:px-10 lg:py-10">
      <section className="profile-post relative grid grid-cols-1">
        {(!data?.data.ads && !isLoading) &&
          <div className="text-center col-span-1 my-2 py-10">
            <LazyLoadImage effect='opacity' src={noData} className="w-[200px] mx-auto" alt="no post" />
            <h1 className='jost'>{token?.user_name == user_name ? "You have" : "This User has"} not made any post Yet!</h1>
          </div>
        }
        {(isLoading || isPending) && <UploadSkeleton posts={4} />}
        {(data?.data.ads && !isLoading) &&
          data?.data.ads.map((item, index) => (
            <div key={index} className={`my-5 border-b border-black dark:border-slate-500`}>
              <Link to={`/feed/${item.id}`} key={item.id} className="">
                <LazyLoadImage src={`${api_gerenal}/${item.titleImageurl}`} alt={item.categories} className={`w-full h-[400px] object-cover`} />
              </Link>
              <div className="py-5 flex items-end justify-between">
                <div className="flex-1 flex flex-col gap-2">
                  <p className={`md:text-2xl text-lg font-semibold text-black dark:text-white`}>{item.productName}</p>
                  <p className={`jost text-sm whitespace-pre-line text-black dark:text-mainTextDark`}>{item.description}</p>
                </div>
                <Link to={`/feed/${item.id}`}>
                  <IoIosArrowRoundForward size={30} className={`cursor-pointer text-black dark:text-white`} />
                </Link>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default ProfilePost;