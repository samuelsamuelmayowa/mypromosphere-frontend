import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import "react-lazy-load-image-component/src/effects/blur.css";
import anon from "../../assets/images/anon.png";
import banner from "../../assets/images/ban2.jpg";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdExplore } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { MdAddAPhoto } from "react-icons/md";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AiFillPicture } from "react-icons/ai";
import { FaCamera } from "react-icons/fa6";
import { TweetCategories } from "../../json/talkAndTweetCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FetchTweet from "../../hooks/fetchTweet";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";
import Loader from "../../loader";
import TweetSkeleton from "../../components/tweetSkeleton";
import TweetDisplay from "../../components/tweetDisplay";
import tweetAudio from "../../assets/audio/tweet.wav";
import { Helmet } from "react-helmet";

import FetchProfileUser from "../../hooks/fetchUserProfile";

import FilterTweets from "./filterTweets";
import GoogleAd from "../../Goggs/GoogleAd";

const api_general = import.meta.env.VITE_GENERAL;
const api_freeads = import.meta.env.VITE_TWEET;

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_IMAGE_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_ADS_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const TweetHome = () => {
  const tweet = new Audio(tweetAudio);
  const [searchParams, setSearchParams] = useSearchParams();
  const tweetCategory = searchParams.get("tweetCategory") || "All";
  const { data, isLoading } = FetchTweet(tweetCategory);
  const queryClient = useQueryClient();
  const { token, FullScreen } = useStateContext();
  const { data: profile } = FetchProfileUser(token?.user_name);
  const [imageUpload, setImageUpload] = useState([]);
  const [, setImageFiles] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [uploadImageContainer, setUploadImageContainer] = useState(false);

  const validationSchema = yup.object({
    // tweet_image: yup.mixed().required("Select an image"),
    tweet: yup.string().required("Enter your Tweet"),
  });

  const uploadImageToCloudinary = async (files) => {
    const cloudinaryUploads = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
        formData.append("folder", "mypromosphere/promotweet");
        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }
        const data = await response.json();
        return data.secure_url;
      })
    );
    return cloudinaryUploads;
  };

  const handleTweet = useMutation({
    mutationFn: async (data) => {
      const imageUrls = await uploadImageToCloudinary(values.tweet_image);
      try {
        const response = await axios.post(
          `${api_general}/api/promotweet`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token?.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        for (const img of imageUrls) {
          const second_payload = {
            itemadsimagesurls: img,
            id: token?.token.id,
          };
          try {
            const responseTwo = await axios.post(`${api_freeads}/${response.data.item}`, second_payload, {
              headers: {
                Accept: "application/vnd.api+json",
                Authorization: `Bearer ${token?.token}`,
              },
            })
            console.log(responseTwo)
            if (responseTwo.status === 200) {
              console.log("CLOUDINARY SCORE SUCCESS");
            } else {
              console.warn("Image URL upload issue:", responseTwo.status);
            }
          } catch (error) {
            console.log(error)
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
    values,
    validateForm,
  } = useFormik({
    initialValues: {
      tweet_image: null,
      user_name: token?.user_name,
      category: "",
      tweet: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      values.tweet_image.forEach((image, index) => {
        if (index === 0) {
          formData.append(`titleImageurl`, image);
        }
      });
      formData.append("user_name", values.user_name);
      formData.append("user_image", token?.profileImage);
      formData.append("description", values.tweet);
      formData.append("categories", values.category);
      const firstSentence = values.tweet.split(".")[0] + ".";
      formData.append("title", firstSentence);
      handleTweet.mutate(formData, {
        onSuccess: () => {
          setUploadImageContainer(false);
          setIsFocused(false);
          toast.success("Promotweet created successfully", {
            duration: 3000,
          });
          setFieldValue("tweet_image", null);
          queryClient.invalidateQueries(["promotweet", tweetCategory]);
          setImageUpload([]);
          setImageFiles([]);
          resetForm();
          tweet.play();
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.message, {
            duration: 3000,
          });
        },
      });
    },
  });

  const onChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    const newImagePreviews = [];
    const newImageFiles = [];

    files.forEach((file, _, arr) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      if (arr.length > 5) {
        toast.error("You must upload at least 5 images");
        return;
      }
      const maxSizeInMB = 10;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        toast.error(`File size should not exceed ${maxSizeInMB}MB`);
        return;
      }
      newImageFiles.push(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        if (newImagePreviews.length === files.length) {
          setImageUpload((prev) => [...prev, ...newImagePreviews]);
          setImageFiles((prev) => [...prev, ...newImageFiles]);
          setFieldValue("tweet_image", newImageFiles);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const cancelImage = (e) => {
    e.stopPropagation();
    if (imageUpload) {
      setImageUpload([]);
      setImageFiles([]);
      setFieldValue("tweet_image", null);
      setUploadImageContainer(false);
    } else {
      setFieldValue("tweet_image", null);
      setUploadImageContainer(false);
    }
  };
  const removeImage = (e, index) => {
    e.stopPropagation();
    const updatedImageUpload = imageUpload.filter((_, i) => i !== index);
    const updatedImageFiles = values.tweet_image.filter((_, i) => i !== index);

    setImageUpload(updatedImageUpload);
    setImageFiles(updatedImageFiles);
    setFieldValue("tweet_image", updatedImageFiles);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => toast.error(error));
    } else {
      handleSubmit();
    }
  };

  const notLoggedIn = (e) => {
    e.preventDefault();
    toast.error("You are not Logged in", {
      icon: <IoIosWarning color="red" size={25} />,
    });
  };

  return (
    <>
      {(handleTweet.isPending) && (
        <div className="z-[9999999999999999999999999999999999] fixed inset-0 bg-black bg-opacity-60">
          <Loader />
        </div>
      )}
      <div className="md:px-6 px-2 overflow-hidden">
        {/* <Adds /> */}
        <Helmet>
          <title>
            MyPromoTweet - Share and Promote Business Updates in Nigeria
          </title>
          <meta content="Boost your brand with MyPromoTweet. Share updates, trends, and promotions to engage your audience"></meta>
        </Helmet>
        <GoogleAd />
        <div className="">
          <div className="grid grid-cols-12 gap-4">
            <div className="bigLg:col-span-8 col-span-12 flex flex-col gap-4 w-full">
              <div className="text-center">
                <h2 className="font-normal md:font-bold text-sm md:text-base">Share Promotions, Connect, and Grow Your Reach!</h2>
              </div>
              <div className={`bg-white dark:bg-DARKBG rounded-md md:rounded-[20px] flex items-center md:gap-4 gap-2 md:p-7 p-4`}>
                <Avatar className="w-10 h-10 ring-2 ring-transparent hover:ring-blue-500 transition-all duration-200">
                  <AvatarImage
                    src={token ? `${api_general}/${profile?.data?.data?.profileImage}` : anon}
                    alt={profile?.data?.data?.user_image || "User"}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue text-white font-semibold">
                    {(profile?.data?.data?.user_name || token?.user_name || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFocused(true);
                  }}
                  className="w-full"
                >
                  <input
                    type="text"
                    name=""
                    placeholder="write something...?"
                    disabled={isFocused}
                    className={`bg-offwhiteBg dark:bg-DARKBG border-2 border-black pl-2 md:pl-6 h-10 md:h-12 rounded-md md:rounded-3xl w-full`}
                  />
                  <motion.div
                    className={`${isFocused &&
                      "flex justify-center items-center min-h-screen fixed inset-0 z-50 bg-black md:bg-opacity-60 bg-opacity-80"
                      }`}
                  >
                    {isFocused && (
                      <motion.div
                        layout="position"
                        className={`relative z-50 md:w-[650px] w-full bg-white dark:bg-BODYDARKBG py-3 rounded-sm`}
                      >
                        <form
                          onSubmit={(e) =>
                            token ? handleFormSubmit(e) : notLoggedIn(e)
                          }
                        >
                          <div
                            onClick={(e) => {
                              e.stopPropagation(e);
                              setIsFocused(false);
                              cancelImage(e);
                            }}
                            className="absolute right-3 top-4"
                          >
                            <XMarkIcon width={30} />
                          </div>
                          <h1 className="py-2 text-center md:text-2xl text-lg md:font-semibold jost">
                            Tweet
                          </h1>
                          <hr />
                          <div className="flex items-center gap-4 px-3">
                            <div className="flex-1 px-2 group flex items-center gap-2 py-2">
                              <Avatar className="w-10 h-10 ring-2 ring-transparent hover:ring-blue-500 transition-all duration-200">
                                <AvatarImage
                                  src={token ? `${api_general}/${profile?.data?.data?.profileImage}` : anon}
                                  alt={profile?.data?.data?.user_image || "User"}
                                  className="object-cover"
                                />
                                <AvatarFallback className="bg-blue text-white font-semibold">
                                  {(profile?.data?.data?.user_name || token?.user_name || "U").charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="">
                                <p className="text-sm">
                                  {token && token["user_name"]}
                                </p>
                              </div>
                            </div>
                            <label className="flex-1 form-control w-full">
                              <div className="label">
                                <span className="label-text text-mainTextDark">
                                  Pick your tweet category
                                </span>
                              </div>
                              <select
                                onChange={handleChange}
                                value={values.category}
                                className="select select-bordered select-slate-100 bg-transparent"
                                name="category"
                                id="category"
                              >
                                {TweetCategories.map((category, index) => (
                                  <option
                                    key={index}
                                    value={category}
                                    className="text-black"
                                  >
                                    {category}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex-1">
                              <textarea
                                onChange={handleChange}
                                value={values.tweet}
                                onBlur={handleBlur}
                                placeholder={`Tweet about what you have or what you want on ${values.category}`}
                                className="jost text-base resize-none md:text-xl placeholder:md:text-xl focus:outline-none w-full h-[150px] p-4 bg-transparent border-none"
                                name="tweet"
                                id="tweet"
                              ></textarea>
                            </div>
                            <AnimatePresence mode="popLayout">
                              {uploadImageContainer && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ staggerChildren: 0.4 }}
                                  className="flex-[2] w-full p-2 relative"
                                >
                                  <input
                                    required
                                    onChange={onChange}
                                    type="file"
                                    name="tweet_image"
                                    id="tweet_image"
                                    className="hidden"
                                    multiple
                                  />
                                  <div
                                    onClick={(e) => cancelImage(e)}
                                    className="bg-white absolute w-10 aspect-square flex justify-center items-center rounded-full border right-3 top-4"
                                  >
                                    <XMarkIcon width={20} />
                                  </div>
                                  <div
                                    className={`h-[140px] overflow-hidden flex justify-center items-center border bg-slate-100 dark:bg-transparent rounded-lg`}
                                  >
                                    {imageUpload.length > 0 ? (
                                      <div className="flex flex-wrap gap-2">
                                        {imageUpload.map((image, index) => (
                                          <div
                                            key={index}
                                            className="relative w-32 aspect-square"
                                          >
                                            <img
                                              src={image}
                                              alt={`Upload Preview ${index}`}
                                              className="w-full h-full object-cover rounded-lg"
                                            />
                                            <button
                                              onClick={(e) =>
                                                removeImage(e, index)
                                              }
                                              className="absolute top-1 right-1 text-black rounded-full p-1"
                                            >
                                              <XMarkIcon
                                                width={20}
                                                color="black"
                                              />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <label htmlFor="tweet_image">
                                        <div className="w-fit text-center">
                                          <MdAddAPhoto
                                            size={40}
                                            className="mx-auto"
                                          />
                                          <p>Add Photo</p>
                                        </div>
                                      </label>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="flex flex-col gap-2 px-2">
                            <div className="cursor-pointer flex items-center p-2 justify-between border-2 rounded-md">
                              <p className="jost text-base">Add to your Post</p>
                              <div className="flex items-center gap-5">
                                <AiFillPicture
                                  onClick={() => setUploadImageContainer(true)}
                                  size={30}
                                  color="green"
                                />
                                <FaCamera
                                  size={30}
                                  color="blue"
                                  onClick={() => {

                                  }}
                                />
                              </div>
                            </div>
                            <button
                              disabled={handleTweet.isPending}
                              type="submit"
                              className="w-full py-2 btn bg-darkblue text-white border-none"
                            >
                              post
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
              <FilterTweets
                tweetCategory={tweetCategory}
                setSearchParams={setSearchParams}
              />
            </div>
            <div className="col-span-4 bigLg:block hidden">
              <Link to="/learning" rel="noreferrer" target="_blank">
                <img
                  src={banner}
                  className="w-full object-cover rounded-xl"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="py-4 flex flex-col gap-4">
            <div className="flex md:gap-6 gap-3">
              <button
                className={`flex-1 md:flex-none flex items-center gap-2 border border-anothersphereblue  text-white dark:text-white bg-anothersphereblue py-2 px-4 md:rounded-3xl rounded-md`}
              >
                <FaArrowTrendUp size={FullScreen ? 30 : 20} />
                <p className="text-sm">Trending</p>
              </button>
              <button className="flex-1 md:flex-none flex items-center gap-2 border border-slate-500 text-slate-500 bg-transparent md:py-2 md:px-4 p-2 md:rounded-3xl rounded-md">
                <MdExplore size={FullScreen ? 30 : 20} />
                <p className="text-sm">Latest</p>
              </button>
              <button className="flex-1 md:flex-none flex items-center gap-2 border border-slate-500 text-slate-500 bg-transparent md:py-2 md:px-4 p-2 md:rounded-3xl rounded-md">
                <FaMagnifyingGlass size={FullScreen ? 30 : 20} />
                <p className="text-sm">Search</p>
              </button>
            </div>
          </div>
          <div
            className={`rounded-lg md:rounded-[20px] p-4 mb-4 bg-white dark:bg-DARKBG grid md:grid-cols-2 grid-cols-1 gap-x-10 md:gap-x-5 md:gap-y-10 gap-y-5 pb-4`}
          >
            {isLoading && <TweetSkeleton posts={8} />}
            {data?.data?.data.map((tweet, index) => (
              <TweetDisplay
                tweet={tweet}
                other_tweet_images={data?.data?.other_images}
                index={index}
                key={index}
              />
            ))}
            {tweetCategory !== "All" &&
              !data?.data?.data.length &&
              !isLoading && (
                <div className="min-h-screen grid place-items-center lg:col-span-4 md:col-span-2 col-span-1">
                  <h1 className="jost md:text-2xl md:font-medium">
                    No {tweetCategory}
                  </h1>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetHome;
