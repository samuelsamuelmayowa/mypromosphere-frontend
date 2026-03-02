import bgLOGO from "../../../assets/icons/icon2.svg";
import anon from "../../../assets/images/anon.png";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FaWhatsapp } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import FetchUser from "../../../hooks/fetchUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XMarkIcon } from "@heroicons/react/24/solid";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
const api_fetch = import.meta.env.VITE_EDIT_PROFILE;
const api_general = import.meta.env.VITE_GENERAL;

const ProfileEdit = () => {
  const queryClient = useQueryClient();
  const { token, darkMode } = useStateContext();
  const [ProfileImageUpload, setProfileImageUpload] = useState(null);
  const [BackgroundImageUpload, setBackgroundImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { data: profile, isLoading } = FetchUser(token);

  const validationSchema = Yup.object({
    aboutMe: Yup.string().notRequired(),
    brandName: Yup.string().notRequired(),
    websiteName: Yup.string().notRequired(),
    user_phone: Yup.string().notRequired(),
    whatapp: Yup.string().notRequired(),
    profile_picture: Yup.mixed().notRequired(),
    background_profile: Yup.mixed().notRequired(),
  });

  const profileMutation = useMutation({
    mutationFn: (data) => FORMSUBMIT(data, data.background_profile),
    onSuccess: () => {
      queryClient.invalidateQueries(["userPost", token?.user_name]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  console.log(profile?.data?.data)

  const { handleChange, handleSubmit, setFieldValue, errors, values, dirty } =
    useFormik({
      initialValues: {
        profile_picture: profile?.data?.data?.profileImage || "",
        background_profile: profile?.data?.data?.backgroundimage || "",
        aboutMe: profile?.data?.data?.aboutMe || "",
        messageCompany: profile?.data?.data?.messageCompany || "",
        brandName: profile?.data?.data?.brandName || "",
        websiteName: profile?.data?.data?.websiteName || "",
        user_phone: profile?.data?.data?.user_phone || "",
        whatapp: profile?.data?.data?.whatapp || "",
        UserName: profile?.data?.data?.name || "",
      },
      validationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        profileMutation.mutate(values);
      },
    });

  const cancelImage = (event, setImageUpload, setFieldValue, fieldName) => {
    event.preventDefault();
    setImageUpload(null);
    setFieldValue(fieldName, null);
  };
  const handleImageChange = (
    event,
    setImageUpload,
    setFieldValue,
    fieldName
  ) => {
    const file = event.currentTarget.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUpload([reader.result]);
      setFieldValue(fieldName, file);
    };
    reader.readAsDataURL(file);
  };

  const FORMSUBMIT = async (data, BG) => {
    setLoading(true); // Start loading spinner
    setProgress(0); // Reset progress
    console.log("this is the data from formsubmut", data);
    try {
      const formData = new FormData();
      formData.append("aboutMe", data.aboutMe || "");
      formData.append("brandName", data.brandName || "");
      formData.append("websiteName", data.websiteName || "");
      formData.append("UserName", data.UserName || "");
      formData.append("whatapp", data.whatapp || "");
      formData.append("user_phone", data.user_phone || "");
      formData.append("messageCompany", "I sell anything good"); // fixed field
      if (data.profile_picture instanceof File) {
        formData.append("profileImage", data.profile_picture || "");
      }
      if (BG instanceof File) {
        formData.append("backgroundimage", BG || "");
      }
      formData.append("_method", "PUT");
      const response = await axios.post(`${api_fetch}/${token?.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progressPercent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressPercent);
        },
      });

      toast.success("Profile updated successfully!");
      return response.data;
    } catch (error) {
      toast.error(
        "Update failed: " + (error?.response?.data?.message || error.message)
      );
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full md:px-0 px-2">
      <Toaster position="top-center" />
      {loading && (
        <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
          <div className="">
            <div
              className={`text-black dark:text-white inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]`}
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
          <div className="md:hidden block w-1/2 bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-blue h-2 rounded-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="md:hidden block text-white mt-2">
            {Math.round(progress)}%
          </p>
        </div>
      )}
      <header>
        <h3 className="font-600 md:text-xl text-xl jost md:text-left text-right">
          Edit Profile
        </h3>
        <p className="font-400 text-sm my-2">
          Set up your presence and hiring needs
        </p>
      </header>
      {isLoading && (
        <div className="min-h-screen grid place-content-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      {!isLoading && (
        <article className="">
          <h1 className="font-medium my-2 text-sm">
            👇Click to changeBackgrond Image
          </h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex items-center gap-4"
          >
            <article className="flex items-center">
              <div>
                {BackgroundImageUpload ? (
                  <div className="relative">
                    <img
                      src={BackgroundImageUpload}
                      alt="Background-photo"
                      className="w-[80px] aspect-square rounded-full object-cover"
                      name="background_profile"
                      id="background_profile"
                    />
                    <div
                      onClick={(e) =>
                        cancelImage(
                          e,
                          setBackgroundImageUpload,
                          setFieldValue,
                          "background_profile"
                        )
                      }
                      className="bg-white absolute w-10 aspect-square flex justify-center items-center rounded-full border right-3 top-4"
                    >
                      <XMarkIcon width={20} />
                    </div>
                  </div>
                ) : (
                  <label htmlFor="background_profile">
                    <img
                      src={profile?.data?.data.backgroundimage ? `${api_general}/${profile?.data?.data.backgroundimage}` : bgLOGO}
                      alt="blankImage"
                      className="w-[80px] aspect-square rounded-full border duration-200 hover:scale-110 cursor-pointer object-cover"
                    />
                  </label>
                )}
                <div className="flex gap-x-[.5rem] items-center">
                  <button className="cursor-pointer">
                    <input
                      type="file"
                      onChange={(e) =>
                        handleImageChange(
                          e,
                          setBackgroundImageUpload,
                          setFieldValue,
                          "background_profile"
                        )
                      }
                      className="cursor-pointer hidden"
                      name="background_profile"
                      id="background_profile"
                    />
                  </button>
                </div>
              </div>
            </article>
            <button
              type="submit"
              className="bg-purple py-3 px-3 md:py-3 md:px-4 text-white rounded-md my-2 text-sm md:text-base"
            >
              Change Backgorund Image
            </button>
          </form>
          <hr className="my-4" />
          <form onSubmit={handleSubmit}>
            <article className="flex items-center">
              <div>
                {ProfileImageUpload ? (
                  <div className="relative">
                    <img
                      src={ProfileImageUpload}
                      alt="profilephoto"
                      className="w-[80px] aspect-square rounded-full object-cover"
                      name="profile_picture"
                      id="profile_picture"
                    />
                    <div
                      onClick={(e) =>
                        cancelImage(
                          e,
                          setProfileImageUpload,
                          setFieldValue,
                          "profile_picture"
                        )
                      }
                      className="bg-white absolute w-10 aspect-square flex justify-center items-center rounded-full border right-3 top-4"
                    >
                      <XMarkIcon width={20} />
                    </div>
                  </div>
                ) : (
                  <label htmlFor="profile_picture" className="relative">
                    <img
                      src={profile?.data?.data.profileImage ? `${api_general}/${profile?.data?.data.profileImage}` : anon}
                      alt="blank-Image"
                      className="w-[80px] aspect-square rounded-full object-cover border duration-200 hover:scale-110 cursor-pointer"
                    />
                  </label>
                )}
                <div className="flex gap-x-[.5rem] items-center">
                  <button className="relative cursor-pointer">
                    <input
                      type="file"
                      className="cursor-pointer hidden"
                      onChange={(e) =>
                        handleImageChange(
                          e,
                          setProfileImageUpload,
                          setFieldValue,
                          "profile_picture"
                        )
                      }
                      name="profile_picture"
                      id="profile_picture"
                    />
                  </button>
                </div>
              </div>
            </article>
            <div className="flex flex-col gap-5 my-4">
              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="About" className="jost font-semibold">
                  </label>
                  <input
                    type="text"
                    value={values.UserName}
                    onChange={handleChange}
                    name="UserName"
                    id="UserName"
                    className={`w-full ${darkMode
                        ? "bg-DARKBG dark:bg-DARKBG dark:placeholder:text-mainTextDark placeholder:text-mainTextDark"
                        : "bg-slate-100 dark:bg-slate-100 placeholder:text-black dark:placeholder:text-black"
                      } focus:outline focus:outline-2 focus:outline-purple w-[100%] focus:outline-none p-3 jost rounded-sm`}
                    placeholder="create your username"
                  />
                  <p className="text-red text-sm">{errors.aboutMe?.message}</p>
                </div>
              </div>

              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="About" className="jost font-semibold">
                    About
                  </label>
                  <textarea
                    type="text"
                    onChange={handleChange}
                    value={values.aboutMe}
                    name="aboutMe"
                    id="aboutMe"
                    className={`w-full resize-none h-32 ${darkMode
                        ? "bg-DARKBG dark:bg-DARKBG dark:placeholder:text-mainTextDark placeholder:text-mainTextDark"
                        : "bg-slate-100 dark:bg-slate-100 placeholder:text-black dark:placeholder:text-black"
                      } focus:outline focus:outline-2 focus:outline-purple  w-[100%] focus:outline-none p-3 jost rounded-sm placeholder:text-black`}
                    placeholder="Tell Us About You"
                  ></textarea>
                  <p className="text-red text-sm">{errors.aboutMe?.message}</p>
                </div>
              </div>
              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="website" className="jost font-semibold">
                    Website
                  </label>
                  <input
                    type="url"
                    value={values.websiteName}
                    onChange={handleChange}
                    name="websiteName"
                    id="websiteName"
                    className={`w-full ${darkMode
                        ? "bg-DARKBG dark:bg-DARKBG dark:placeholder:text-mainTextDark placeholder:text-mainTextDark"
                        : "bg-slate-100 dark:bg-slate-100 placeholder:text-black dark:placeholder:text-black"
                      } focus:outline focus:outline-2 focus:outline-purple w-[100%] focus:outline-none p-3 jost rounded-sm`}
                    placeholder="Add your whatsapp or website link here"
                  />
                  {/* <p className='text-red  text-sm'>{errors.websiteName?.message}</p> */}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="website"
                  className="jost font-semibold flex items-center gap-2"
                >
                  <p>Contact phone Number</p>
                  <div>
                    <FaWhatsapp size={20} color="green" />
                  </div>
                </label>
                <input
                  value={values.user_phone}
                  onChange={handleChange}
                  type="text"
                  name="user_phone"
                  id="user_phone"
                  className={`w-full ${darkMode
                      ? "bg-DARKBG dark:bg-DARKBG dark:placeholder:text-mainTextDark placeholder:text-mainTextDark"
                      : "bg-slate-100 dark:bg-slate-100 placeholder:text-black dark:placeholder:text-black"
                    } focus:outline focus:outline-2 focus:outline-purple dark:placeholder:text-smallTextDark w-full focus:outline-none p-3 jost rounded-sm placeholder:text-black`}
                  placeholder="Enter your Contact number "
                />
                {/* <p className='text-red  text-sm'>{errors.brandName?.message}</p> */}
              </div>

              {/* <div className="flex flex-col gap-2">
                <label htmlFor="website" className="jost font-semibold flex items-center gap-2">
                  <p>Contact Two</p><div><FaWhatsapp size={20} color="green" /></div>
                </label>
                <input
                  value={values.whatapp}
                  onChange={handleChange}
                  type="number"
                  name="whatapp"
                  id="whatsapp"
                  className={`${darkMode ? "bg-DARKBG dark:bg-DARKBG dark:placeholder:text-mainTextDark placeholder:text-mainTextDark" : "bg-slate-100 dark:bg-slate-100 placeholder:text-black dark:placeholder:text-black"} focus:outline focus:outline-2 focus:outline-purple dark:placeholder:text-smallTextDark w-full focus:outline-none p-3 jost rounded-sm placeholder:text-black`}
                  placeholder="Enter Your  Whatapp number" />
              </div> */}
              <div className="flex flex-col gap-2">
                <label htmlFor="website" className="jost font-semibold">
                  Brand Name
                </label>{" "}
                <input
                  value={values.brandName}
                  onChange={handleChange}
                  type="text"
                  name="brandName"
                  id="brandName"
                  className={`w-full ${darkMode
                      ? "bg-DARKBG dark:bg-DARKBG dark:placeholder:text-mainTextDark placeholder:text-mainTextDark"
                      : "bg-slate-100 dark:bg-slate-100 placeholder:text-black dark:placeholder:text-black"
                    } focus:outline focus:outline-2 focus:outline-purple dark:placeholder:text-smallTextDark w-full focus:outline-none p-3 jost rounded-sm placeholder:text-black`}
                  placeholder="Enter Your Brand Name"
                />
                {/* <p className='text-red  text-sm'>{errors.brandName?.message}</p> */}
              </div>
            </div>
            <button
              type="submit"
              disabled={profileMutation.isLoading || !dirty}
              className={`border ${dirty
                  ? "bg-purple border-purple hover:text-purple"
                  : "bg-red border-red hover:text-red cursor-not-allowed"
                } py-2 md:py-4 capitalize w-full text-white rounded-md mt-2 duration-300 hover:bg-transparent`}
            >
              Update
            </button>
          </form>
        </article>
      )}
    </section>
  );
};

export default ProfileEdit;
