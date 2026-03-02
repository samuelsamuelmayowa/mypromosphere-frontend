import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PostImg1 from "../../../assets/images/post-image1.png"
import PostImg2 from "../../../assets/images/post-image2.png"
import PostImg3 from "../../../assets/images/post-image3.png"
import PostImg4 from "../../../assets/images/post-image4.png"
import { Link } from "react-router-dom"

const PostAPicture = () => {
  return (
    <div className="w-[70%] mx-auto md:mt-0 mt-20">
      <div className="relative">
        <LazyLoadImage
          visibleByDefault={true}
          effect='blur'
          src={PostImg1}
          alt=""
          className="xs:w-[25%] sm:w-[35%] mx-auto z-10 relative"
        />
        <img
          src={PostImg2}
          alt=""
          className="xs:w-[25%] sm:w-[35%] mx-auto absolute large:left-[22.3rem] large:top-[3.5rem] xs:left-[7rem] 390:left-[7.4rem] xsm:left-[7.9rem] xxx:left-[8.5rem] xs:top-[1rem] sm:left-[10rem] smsm:left-[10.8rem] smd:left-[10rem] sms:left-[12rem] smax:left-[13.8rem] md:left-[15.7rem] md:top-[3rem] mdxs:left-[16.8rem] mdsm:left-[18rem] mdsmax:left-[18.7rem] lg:top-[3.5rem] lg:left-[20rem] xlg:left-[20.9rem] bigLg:left-[21rem] fity:left-[21rem] extraLg:left-[21.8rem] sm:top-[2rem] "
        />
        <LazyLoadImage
          visibleByDefault={true}
          src={PostImg3}
          alt=""
          className="w-[30%] mx-auto absolute sm:top-[5rem] sm:left-[2rem] xs:top-[2.6rem] xs:left-[2rem] xxx:top-[2.8rem] smax:top-[6rem] mdxs:top-[7rem] mdsmax:top-[8rem] lg:top-[8.5rem] lg:left-[3.2rem] large:top-[10rem]  "
        />
        <LazyLoadImage
          visibleByDefault={true}
          src={PostImg4}
          alt=""
          className="w-[20%] mx-auto absolute xs:top-[.3rem] xs:left-[3.2rem] 390:left-[3.7rem] xxx:left-[4rem] sm:top-[2rem] sm:left-[4rem] sms:left-[5rem] smax:left-[5.5rem] md:left-[6.2rem] mdxs:left-[6.3rem] mdsmax:left-[8rem]  large:top-[3rem] large:left-[9rem] z-30"
        />
      </div>
      <div className=" mt-6">
        <h2 className="text-center font-500 text-[1.1rem] md:text-[1.8rem]">
          Start Posting Pictures
        </h2>
        <p className="text-sm md:text-base mt-2 max-w-sm mx-auto text-mainTextDark dark:text-mainTextDark jost text-center">
          Update your profile page by creating new prices let others see your
          memories
        </p>
        <Link to={"/dashboard/market"}>
          <div className="flex items-center justify-center">
            <button className="btn mt-4 bg-purple text-white p-2 px-8 rounded-md">
              {/* <p>Start Now</p> */}
              <p>Market your Product</p>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PostAPicture