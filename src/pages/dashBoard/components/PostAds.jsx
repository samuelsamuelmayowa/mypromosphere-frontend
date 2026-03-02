import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { Toaster, toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../loader.jsx";

// MY CUSTOM HOOK
import { useMultiStepForm } from "../hooks/useMultiStepForm.js";
import ProductCategory from "./productCategory.jsx";
import OtherDetails from "./otherDetails.jsx";
import SelectPhotos from "./selectPhotos.jsx";

const api_freeads = import.meta.env.VITE_ADS_FREEADS;
const api_fetch = import.meta.env.VITE_EDIT_PROFILE;

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_IMAGE_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_ADS_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const Post = () => {
  const queryClient = useQueryClient();
  const { token, darkMode } = useStateContext();
  const [imageUpload, setImageUpload] = useState([]);

  const { data: profile } = useQuery({
    queryKey: ["fetch"],
    queryFn: () =>
      axios.get(`${api_fetch}/${token?.id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token?.token}`,
        },
      }),
  });

  const validationSchema = Yup.object({
    post_images: Yup.mixed().required("Please select at least one image"),
    category: Yup.string().required("Category is required"),
    productName: Yup.string().required(
      "Product Name or Service Name is required"
    ),
    description: Yup.string().required("Description is required"),
    price_range: Yup.string().required("Price is required"),
    state: Yup.string().required("State is required"),
    discount: Yup.string().required("Discount is required"),
    local_gov: Yup.string().required("Local Government is required"),

    location: Yup.string(),
    landMark: Yup.string(),
    vehicleBrand: Yup.string(),
    partToPip: Yup.string(),
    typeOfProperty: Yup.string(),
    propertyAddress: Yup.string(),
    propertyBedroom: Yup.string(),
    propertyLandmark: Yup.string(),
  });

  const uploadImageToCloudinary = async (files) => {
    const cloudinaryUploads = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
        formData.append("folder", "mypromosphere/ads");
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

  const uploadPostMutation = useMutation({
    mutationFn: async(payload) => {
      try {
        // Step 1: Upload all images to Cloudinary
        const imageUrls = await uploadImageToCloudinary(formik?.values.post_images);
        console.log("Uploaded Cloudinary URLs:", imageUrls);

        // Step 2: Create the initial post
        const response = await axios.post(api_freeads, payload, {
          headers: {
            Authorization: `Bearer ${token?.token}`,
          },
        });

        // Step 3: Upload each image URL with the item reference
        for (const img of imageUrls) {
          const second_payload = {
            itemadsimagesurls: img,
            id: token?.token.id,
          }
          try {
            const responseTwo = await axios.post(
              `${api_freeads}/${response.data.item}/${response.data.type}`,
              second_payload,
              {
                headers: {
                  Accept: "application/vnd.api+json",
                  Authorization: `Bearer ${token?.token}`,
                },
              }
            );

            if (responseTwo.status === 200) {
              console.log("CLOUDINARY SCORE SUCCESS");
            } else {
              console.warn("Image URL upload issue:", responseTwo.status);
            }
          } catch (error) {
            console.error("Second API error:", error?.response?.data || error.message);
          }
        }
      } catch (error) {
        console.error("Main uploadPostMutation error:", error?.response?.data || error.message);
        throw error;
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      post_images: null,
      category: "",
      productName: "",
      description: "",
      price_range: "",
      state: "",
      discount: "",
      local_gov: "",
      location: "",
      landMark: "",
      vehicleBrand: "",
      partToPip: "",
      typeOfProperty: "",
      propertyAddress: "",
      propertyBedroom: "",
      propertyLandmark: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      values.post_images?.forEach((image, index) => {
        if (index === 0) {
          formData.append(`titleImageurl`, image);
        }
      });
      formData.append("user_id", token?.id);
      formData.append("user_name", token?.user_name);
      formData.append("aboutMe", profile?.data?.data[0]?.aboutMe);
      formData.append("whatapp", profile?.data?.data[0]?.whatapp);
      formData.append("user_phone", profile?.data?.data[0]?.user_phone);
      formData.append("categories", values.category);
      if (values.category === "Apartment") {
        formData.append("location", values.location);
        formData.append("landMark", values.landMark);
      }
      if (values.category === "Vehicles Upgrade") {
        formData.append("vehicleBrand", values.vehicleBrand);
        formData.append("partToPip", values.partToPip);
      }
      if (values.category === "Property") {
        formData.append("typeOfProperty", values.typeOfProperty);
        formData.append("propertyLandmark", values.propertyLandmark);
        formData.append("propertyAddress", values.propertyAddress);
        formData.append("propertyBedroom", values.propertyBedroom);
      }
      formData.append("description", values.description.trim());
      formData.append("price", values.price_range.toString());
      formData.append("state", values.state);
      formData.append("local_gov", values.local_gov);
      formData.append("discount", values.discount);
      formData.append("user_image", token?.profileImage);
      formData.append("productName", values.productName.trim());

      if (!values.post_images.length) {
        toast.error("Please select at least one image");
        return;
      }

      uploadPostMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["trendingAds"] });
          queryClient.invalidateQueries({ queryKey: ["userPost"] });

          formik.setFieldValue("post_images", null);
          setImageUpload([]);
          formik.resetForm();
          setCurrentStepIndex(0);
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

  const {
    currentStepIndex,
    step,
    steps,
    isFirstStep,
    back,
    next,
    isLastStep,
    setCurrentStepIndex,
  } = useMultiStepForm([
    <ProductCategory key={1} {...formik} />,
    <OtherDetails key={2} {...formik} />,
    <SelectPhotos
      key={3}
      {...formik}
      imageUpload={imageUpload}
      setImageUpload={setImageUpload}
    />,
  ]);

  const stepFields = [
    ["category", "productName"], // Fields for ProductCategory
    ["price_range", "state", "discount", "local_gov", "description"], // Fields for OtherDetails
    ["post_images"], // Fields for SelectPhotos
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = await formik.validateForm();
    const currentStepFields = stepFields[currentStepIndex];
    const stepErrors = Object.keys(errors).filter((key) =>
      currentStepFields.includes(key)
    );
    if (stepErrors.length > 0) {
      stepErrors.forEach((key) => toast.error(errors[key]));
    } else {
      isLastStep ? formik.handleSubmit() : next();
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      {uploadPostMutation.isPending && (
        <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
          <Loader />
        </div>
      )}
      <div className="mb-4 px-2 md:px-0">
        <div className=" flex flex-col items-center justify-center bg-white dark:bg-darkBg text-black dark:text-white p-6 rounded-lg shadow-sm transition">
          <h2 className="text-xl font-bold mb-2">Promote with Images</h2>
          <p className="text-center">
            Highlight your products with eye-catching image ads and attract more
            customers.
          </p>
        </div>
      </div>
      <ul className="hidden bigLg:flex mx-auto timeline w-fit">
        <li>
          <div
            className={`timeline-start timeline-box text-black bg-white border-none dark:text-white dark:bg-BODYDARKBG dark:border-none`}
          >
            Select Your Category
          </div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={currentStepIndex > 0 ? "currentColor" : ""}
              className="text-primary h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <hr
            className={
              currentStepIndex > 0
                ? "bg-primary"
                : darkMode
                  ? "bg-DARKBG dark:bg-DARKBG"
                  : "bg-white dark:bg-white"
            }
          />
        </li>
        <li>
          <hr
            className={
              currentStepIndex > 0
                ? "bg-primary"
                : darkMode
                  ? "bg-DARKBG dark:bg-DARKBG"
                  : "bg-white dark:bg-white"
            }
          />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={currentStepIndex > 1 ? "currentColor" : ""}
              className={`${"text-primary"} h-5 w-5`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            className={`timeline-end timeline-box text-black bg-white border-none dark:text-white dark:bg-BODYDARKBG dark:border-none`}
          >
            Product Information
          </div>
          <hr
            className={
              currentStepIndex > 1
                ? "bg-primary"
                : darkMode
                  ? "bg-DARKBG dark:bg-DARKBG"
                  : "bg-white dark:bg-white"
            }
          />
        </li>
        <li>
          <hr
            className={
              isLastStep
                ? "bg-primary"
                : darkMode
                  ? "bg-DARKBG dark:bg-DARKBG"
                  : "bg-white dark:bg-white"
            }
          />
          <div
            className={`timeline-start timeline-box text-black bg-white border-none dark:text-white dark:bg-BODYDARKBG dark:border-none`}
          >
            Select Your Images
          </div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={isLastStep ? "currentColor" : ""}
              className={`text-primary h-5 w-5`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </li>
      </ul>
      <div className="jost flex bigLg:hidden justify-end p-5 font-semibold">
        <span>
          {currentStepIndex + 1}/{steps.length}
        </span>
      </div>
      <form onSubmit={handleFormSubmit}>
        <section className="px-2 py-10 min-h-screen">
          {step}
          <div className="py-4 flex justify-center items-center gap-2 ">
            {!isFirstStep && (
              <button
                type="button"
                onClick={back}
                className="flex-1 w-full btn btn-primary button"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 w-full btn btn-primary button"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </section>
      </form>
    </>
  );
};

export default Post;
