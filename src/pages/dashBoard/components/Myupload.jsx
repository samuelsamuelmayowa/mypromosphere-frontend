import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import LoggedInUser from "../../../hooks/LoggedInUserPost";
import UploadSkeleton from "../../../components/uploadSkeleton";
import noData from "../../../assets/images/nodata.png";
import { IoIosArrowRoundForward } from "react-icons/io";
const api_gerenal = import.meta.env.VITE_GENERAL;

const Myuploads = () => {
  const { token } = useStateContext();
  const { data, isLoading, error } = LoggedInUser(token);
  return (
    <div className="md:px-0 px-2">
      <section className="relative grid grid-cols-1 gap-2">
        <Link to={"/dashboard/market"}>
          <div className="flex items-center justify-center">
            <button className="btn mt-4 bg-purple text-white p-2 px-8 rounded-md">
              <p>Start Selling</p>
            </button>
          </div>
        </Link>
        {error?.response?.status === 404 && !isLoading && (
          <div className="text-center col-span-1 my-2 py-10">
            <LazyLoadImage
              effect="opacity"
              src={noData}
              className="w-[200px] mx-auto"
              alt="not-found"
            />
            
            <div className="text-center flex flex-col gap-2">
              <h1 className="">No post Yet!!</h1>
              <Link
                to={"/dashboard/postAd"}
                className="jost text-lightblue font-semibold underline"
              >
                Make Your First Post
              </Link>
            </div>
          </div>
        )}


        {isLoading && <UploadSkeleton posts={8} />}
        {data?.data.posts &&
          !isLoading &&
          data?.data.posts.map((item, index) => (
            <div key={index} className="">
              <div className="overflow-hidden group relative after:absolute after:duration-300 after:inset-0 after:bg-black after:bg-opacity-40 after:opacity-0 hover:after:opacity-100">
                {item.titleImageurl ? (
                  <LazyLoadImage
                    style={{ height: `400px` }}
                    src={`${api_gerenal}/${item.titleImageurl}`}
                    alt={item.categories}
                    className={`w-full object-cover`}
                  />
                ) : (
                  "NOTHING TO SHOW "
                )}
                <div className="z-10 flex items-center gap-4 absolute left-0 right-0 -bottom-20 group-hover:bottom-0 p-3 duration-300">
                  <button className="btn btn-sm flex-1 bg-green-600 border-none text-white">
                    Edit
                  </button>
                  <button className="btn btn-sm flex-1 bg-red border-none text-white">
                    Delete
                  </button>
                </div>
              </div>
              <div className="py-5 flex items-end justify-between">
                <div className="flex-1 flex flex-col gap-2">
                  <p
                    className={`md:text-2xl text-lg font-semibold text-black dark:text-white`}
                  >
                    {item.productName}
                  </p>
                  <p
                    className={`jost text-sm whitespace-pre-line text-black dark:text-mainTextDark`}
                  >
                    {item.description}
                  </p>
                </div>
                <Link to={`/feed/${item.id}`}>
                  <IoIosArrowRoundForward
                    size={30}
                    className={`cursor-pointer text-black dark:text-white`}
                  />
                </Link>
              </div>
            </div>
          ))}
      </section>
    </div>
  )
};

export default Myuploads;
