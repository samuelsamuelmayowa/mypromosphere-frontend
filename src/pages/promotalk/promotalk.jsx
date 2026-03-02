import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStateContext } from "../../contexts/ContextProvider";
import anon from "../../assets/images/anon.png";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { IoIosWarning } from "react-icons/io";
import { AiFillPicture } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import FetchTalks from "../../hooks/fetchTalks";
import FetchTalkAside from "../../hooks/fetchAside";
import { TalkCategories } from "../../json/talkAndTweetCategories";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Loader from "../../loader";
import TalkSkeleton from "../../components/talkSkeleton";
import TalkDisplay from "../../components/talkDisplay";
import { Helmet } from "react-helmet";
import FilterTalks from "./filterTalks";
import FetchProfileUser from "../../hooks/fetchUserProfile";

const api_general = import.meta.env.VITE_GENERAL;

import talkAudio from "../../assets/audio/talk.wav";
import GoogleAd from "../../Goggs/GoogleAd";

const Promotalk = () => {
  const talk = new Audio(talkAudio);
  const [searchParams, setSearchParams] = useSearchParams();
  const Category = searchParams.get("CATEGORY") || "All";
  const { data, isLoading } = FetchTalks(Category);
  const { data: aside, isLoading: asideLoading } = FetchTalkAside();
  const queryClient = useQueryClient();
  const { token } = useStateContext();
  const { data: profile } = FetchProfileUser(token?.user_name);
  const [imageUpload, setImageUpload] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [uploadImageContainer, setUploadImageContainer] = useState(false);
  function slugify(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")  // remove punctuation
      .replace(/\s+/g, "-")      // replace spaces with -
      .replace(/--+/g, "-")      // replace multiple dashes with single one
      .replace(/^-+/, "");       // remove leading dashes
  }
  const validationSchema = yup.object({
    gossip_image: yup.mixed().required("An image is required"),
    talk: yup.string().required("You didn't type any gist/gossip"),
  });
  const handleGossip = useMutation({
    mutationFn: (data) =>
      axios.post(`${api_general}/api/promotalks`, data, {
        headers: {
          // 'Accept': 'application/json',
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${token?.token}`,
        },
      }),
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
      gossip_image: null,
      user_name: token?.user_name,
      category: "",
      talk: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("user_name", values.user_name);
      formData.append("description", values.talk.trim());
      formData.append("categories", values.category);
      formData.append("titleImageurl", values.gossip_image);
      handleGossip.mutate(formData, {
        onSuccess: () => {
          toast.success("Promotalk created successfully", {
            duration: 3000,
          });
          setImageUpload("");
          setFieldValue("gossip_image", null);
          setUploadImageContainer(false);
          setIsFocused(false);
          resetForm();
          queryClient.invalidateQueries(["promotalks", Category]);
          talk.play();
        },
        onError: (error) => {
          // console.log(error);
          toast.error(error.message, {
            duration: 3000,
          });
        },
      });
    },
  });
  const onChange = (event) => {
    const maxSizeInMB = 10;
    const file = event.currentTarget.files[0];
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (values.category === "") {
      toast.error("Please select a category");
      return;
    }
    if (file.size > maxSizeInBytes) {
      toast.error(`File size should not exceed ${maxSizeInMB}MB`);
      return;
    }
    setFieldValue("gossip_image", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUpload(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const cancelImage = (e) => {
    e.stopPropagation();
    if ( imageUpload || null    ) {
      setImageUpload("");
      setFieldValue("gossip_image", null);
      setUploadImageContainer(false);
    } else {
      setUploadImageContainer(false);
      setFieldValue("gossip_image", null);
    }
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
      {handleGossip.isPending && (
        <div className="min-h-screen z-[9999999999999999999] fixed inset-0 bg-black bg-opacity-60">
          <Loader />
        </div>
      )}
      <div className="md:px-6 px-2">
        <GoogleAd />
        <Helmet>
          <title>
            MyPromoTalk -Exchange ideas, seek answers, and join uncensored discussions! No signup required—share your thoughts freely
          </title>
          <meta content="Join MyPromoTalk to share ideas, ask questions, and connect with experts to promote your business in Nigeria."></meta>
        </Helmet>
        <GoogleAd />
        <section className="grid grid-cols-12 items-start gap-4">
          <div className="bigLg:col-span-8 col-span-12">
            <div className="">
              <div className="text-center my-2">
                <h2 className="font-normal md:font-bold text-sm md:text-base">
             Exchange ideas, seek answers, and join uncensored discussions! No signup required—share your thoughts freely
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <div className={`bg-white dark:bg-DARKBG rounded-md md:rounded-[20px] flex items-center md:gap-4 gap-2 md:p-7 p-4`}>
                  <div>
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
                  </div>
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
                      disabled={isFocused}
                      placeholder="What’s on your mind?"
                      className={`bg-offwhiteBg dark:bg-DARKBG border-2 border-black pl-2 md:pl-6 h-10 md:h-12 rounded-md md:rounded-3xl w-full`}
                    />
                    <motion.div
                      className={`${isFocused &&
                        "flex justify-center items-center min-h-screen z-40 fixed inset-0 bg-black md:bg-opacity-60 bg-opacity-80"
                        }`}
                    >
                      {isFocused && (
                        <motion.div
                          layout="position"
                          className={`md:w-[650px] w-full bg-white dark:bg-BODYDARKBG relative py-3 rounded-sm`}
                        >
                          <form
                            onSubmit={(e) =>
                              token ? handleFormSubmit(e) : notLoggedIn(e)
                            }
                          >
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFocused(false);
                                cancelImage(e);
                              }}
                              className="absolute right-3 top-4"
                            >
                              <XMarkIcon width={30} />
                            </div>
                            <h1 className="py-2 text-center md:text-2xl text-lg md:font-semibold jost">
                              {/* Time to Gossip */}  Talk without limits
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
                                <div className="flex flex-col gap-1">
                                  <p className="text-sm">
                                    {token && token["user_name"]}
                                  </p>
                                </div>
                              </div>
                              <label className="flex-1 form-control w-full max-w-xs">
                                <div className="label">
                                  <span className="label-text text-mainTextDark">
                                    Pick your gist category
                                  </span>
                                </div>
                                <select
                                  onChange={handleChange}
                                  value={values.category}
                                  className="select select-bordered select-slate-100 bg-transparent"
                                  name="category"
                                  id="category"
                                >
                                  <option value="">Select a category</option>
                                  {TalkCategories.map((category, index) => (
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
                                  value={values.talk}
                                  onBlur={handleBlur}
                                  placeholder="What's the buzz?"
                                  className="jost text-base resize-none md:text-xl placeholder:md:text-xl focus:outline-none w-full h-[150px] p-4 bg-transparent border-none"
                                  name="talk"
                                  id="talk"
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
                                      name="gossip_image"
                                      id="gossip_image"
                                      className="hidden"
                                    />
                                    <div
                                      onClick={(e) => cancelImage(e)}
                                      className="bg-white absolute w-10 aspect-square flex justify-center items-center rounded-full border right-3 top-4"
                                    >
                                      <XMarkIcon width={20} color="black" />
                                    </div>
                                    <label htmlFor="gossip_image">
                                      <div
                                        className={`bg-slate-100 dark:bg-transparent h-[140px] overflow-hidden flex justify-center items-center border rounded-lg`}
                                      >
                                        {imageUpload ? (
                                          <img
                                            src={imageUpload}
                                            className="w-full h-[150px] object-cover"
                                            alt=""
                                          />
                                        ) : (
                                          <div className="w-fit text-center">
                                            <MdAddAPhoto
                                              size={40}
                                              className="mx-auto"
                                            />
                                            <p>Add Photo</p>
                                          </div>
                                        )}
                                      </div>
                                    </label>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <div className="flex flex-col gap-2 px-2">
                              <div className="cursor-pointer flex items-center p-2 justify-between border-2 rounded-md">
                                <p className="jost text-base">
                                  Add to your Post
                                </p>
                                <AiFillPicture
                                  onClick={() => setUploadImageContainer(true)}
                                  size={30}
                                  color="green"
                                />
                              </div>
                              <button
                                disabled={handleGossip.isPending}
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
                <FilterTalks
                  Category={Category}
                  setSearchParams={setSearchParams}
                />
              </div>
            </div>
            <h2 className="text-lg md:text-2xl font-normal md:font-semibold mt-2">
              Discussions
            </h2>
            <div className="my-3 grid md:grid-cols-1 grid-cols-2 md:gap-4 gap-2">
              {isLoading && <TalkSkeleton posts={4} />}
              {data?.data?.data.map((talks, index) => (
                <TalkDisplay talks={talks} key={index} />
              ))}
              {Category !== "All" && !data?.data?.data.length && !isLoading && (
                <div className="min-h-screen flex justify-center items-center">
                  <h1 className="jost md:text-2xl md:font-medium">
                    No data in this category
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-4 p-4 bg-tweetblue text-white rounded-xl bigLg:block hidden">
            <div
              className={`flex justify-between items-center text-mainTextDark dark:text-white`}
            >
              {/* <p className="font-medium">Trending Topic </p> */}
              <p className="font-light">View All</p>
            </div>
            <div className="my-4 divide-y divide-[#F2F2F2]">
              {asideLoading && <Loader />}
              {aside?.data?.data?.map((talk, index) => (
                <Link
                  to={`/mypromotalk/${talk.id}/${slugify(talk.description)}`}
                  key={index}
                  className="flex items-start gap-4 py-5"
                >
                  <div className="">
                    <img
                      src={`${api_general}/${talk?.titleImageurl}`}

                      className="w-20 aspect-square object-cover rounded-lg"
                      alt="No image"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <h1 className="text-base">
                      {talk.description.length > 30
                        ? talk.description.slice(0, 50).concat("...")
                        : talk.description}
                    </h1>
                    <p className="text-sm text-[#B5B5BE]">
                      By {talk.user_name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Promotalk;
