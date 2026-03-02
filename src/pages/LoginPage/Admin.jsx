import { useState, useEffect } from "react";
import google from "../../assets/images/icon_google.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny, IoIosArrowRoundBack } from "react-icons/io";
import { useStateContext } from "../../contexts/ContextProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import AnimatedDivs from "./animatedDiv";
import Loader from "../../loader";
import { Helmet } from "react-helmet";
import LOGIN from '../../assets/audio/login.mp3'

const api = import.meta.env.VITE_ADMIN;
const api_server_auth = import.meta.env.VITE_ADMIN;

const Admin = () => {
  const login = new Audio(LOGIN)
  const navigate = useNavigate();
  const { setToken, setUser, darkMode, handleDarkMode } = useStateContext();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const viewPassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Please enter your email address"),
    password: yup.string().required("Enter your password"),
  });
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(api, payload);
      if (response.status === 200) {
        setToken(response.data);
        setUser(response.data);
        localStorage.setItem("user-details", JSON.stringify(response.data));
        navigate("/dashboard");
        login.play()
        toast.success("successfully Logged In");
        
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        toast.error(error?.response.data.message);

        return;
      }
      if (error?.message === "Network Error") {
        toast.error(
          `${error?.message} please check your internet connectivity`
        );
      }
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error.message);
      });
    }
  }, [errors]);

  const [loginUrl, setLoginUrl] = useState(null);

  useEffect(() => {
    fetch(api_server_auth, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.api+json",
      },
    })
      .then((response) => {
        if (response.ok) {
        
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => {
        
       
        setLoginUrl(data.url);
      })
      .catch((error) => {
        alert(`This error ${error.message}`);
       
      });
     
  }, []);


  return (
    <section className="relative bg-purple h-screen flex flex-col md:justify-center md:items-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin</title>
        <meta
          name="keywords"
          content="Affordable prices , Buy and sell ,Online shopping,Product listings, Digital marketplace, Fast shipping"
        />
        <link rel="canonical" href="https://www.mypromosphere.com" />
        <meta
          name="description"
          content={
            "Mypromosphere is the premier online marketplace that helps you effectively sell your products and services to customers."
          }
        />
        <meta
          property="og:description"
          content={
            "Mypromosphere is the premier online marketplace that helps you effectively sell your products and services to customers."
          }
        />
      </Helmet>
      {isSubmitting && (
        <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
          <Loader />
        </div>
      )}
      <div className="md:hidden block p-4">
        <Link to="/">
          <IoIosArrowRoundBack size={30} color="black" />
        </Link>
        <div className="md:hidden flex justify-between items-center jost py-4">
          <h3
            className={`font-500 text-5xl text-black dark:text-black`}
          >
            Welcome <p className="font-500 text-3xl text-blue">Back</p>
            <p
              className={`text-sm my-2 jost text-black dark:text-mainTextDark`}
            >
              Don&apos;t have an account?{" "}
              <Link className="text-red" to="/signup">
                Signup
              </Link>{" "}
            </p>
          </h3>
          {darkMode ? (
            <IoIosSunny
              onClick={handleDarkMode}
              size={30}
              color="gold"
              className="cursor-pointer"
            />
          ) : (
            <FaMoon
              onClick={handleDarkMode}
              size={30}
              color={darkMode ? "black" : "black"}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      <section
        className={`flex-1 md:flex-none flex md:w-[90%] lg:w-[85%] bigLg:w-[60%] bg-white dark:bg-BODYDARKBG md:rounded-lg`}>
        <div className="flex-1 p-4">
          <div className="">
            <div className="md:flex hidden flex-col gap-2 my-2">
              <Link to="/">
                <IoIosArrowRoundBack size={30}
                  className={`text-black dark:text-white`}
                />
              </Link>
              <div className="flex justify-between">
                <h3
                  className={`font-500 text-base sm:text-[1.3rem] text-black dark:text-white`}
                >
                  Welcome{" "}
                  <span className="font-500 text-[1.1rem] sm:text-[1.3rem] text-blue">
                    Back
                  </span>
                </h3>
                {darkMode ? (
                  <IoIosSunny
                    onClick={handleDarkMode}
                    size={20}
                    color="gold"
                    className="cursor-pointer"
                  />
                ) : (
                  <FaMoon
                    onClick={handleDarkMode}
                    size={20}
                    color={darkMode ? "black" : "black"}
                    className="cursor-pointer"
                  />
                )}
              </div>
              <p
                className={`text-sm jost text-black dark:text-mainTextDark`}
              >
                Don&apos;t have an account?{" "}
                <Link className="text-red" to="/signup">
                  Signup
                </Link>{" "}
              </p>
            </div>
            <form
              onSubmit={handleSubmit(formSubmit)}
              className="flex flex-col gap-4 md:gap-2"
            >
              <div>
                <label htmlFor="">
                  <p
                    className={`jost font-semibold text-black dark:text-white`}
                  >
                    Email Address
                  </p>
                  <input
                    {...register("email", { required: true })}
                    name="email"
                    placeholder="example@gmail.com"
                    type="email"
                    className={`text-black dark:text-mainTextDark dark:bg-transparent valid:bg-transparent autofill:bg-transparent w-full border border-black border-t-0 border-r-0 border-l-0 focus:outline-none h-8 my-2`}
                  />
                </label>
              </div>


              
              <div className="relative">
                <label htmlFor="">
                  <p
                    className={`jost font-semibold text-black dark:text-white`}
                  >
                    Password
                  </p>
                  <input
                    {...register("password", { required: true })}
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    className={`text-black dark:text-mainTextDark dark:bg-transparent valid:bg-transparent autofill:bg-transparent w-full border border-black border-t-0 border-r-0 border-l-0 focus:outline-none h-8 my-2`}
                  />
                </label>
                {passwordVisible ? (
                  <FaEyeSlash
                    onClick={viewPassword}
                    size={20}
                    className="cursor-pointer absolute right-4 bottom-4"
                  />
                ) : (
                  <FaEye
                    onClick={viewPassword}
                    size={20}
                    className="cursor-pointer absolute right-4 bottom-4"
                  />
                )}
              </div>
              <div className="">
                <button
                  type="submit"
                  className="bg-purple hover:bg-indigo-900 h-12 py-4 text-white text-lg w-full rounded-md flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <p className="smax:text-[1.2rem] flex items-center justify-center">
                      <span className="loading loading-ring loading-md"></span>
                      <span className="loading loading-ring loading-md"></span>
                      <span className="loading loading-ring loading-md"></span>
                    </p>
                  ) : (
                    <p className="text-base">Login as Admin</p>
                  )}
                </button>
              </div>
            </form>
            <p className="text-center my-2">or</p>
            <button
              className={`shadow-xl border hover:shadow-none bg-white border-black dark:bg-darkBg dark:border-DARKBG py-2 text-dark w-full rounded-full flex justify-center items-center`}
            >
              <img src={google} alt="" className="px-3 " />
              {loginUrl != null && (
                <a
                  className={`jost text-base text-black dark:text-mainTextDark`}
                  href={loginUrl}
                >
                  Continue with Google
                </a>
              )}
            </button>
          </div>
        </div>
        <AnimatedDivs />
      </section>
    </section>
  );
};
export default Admin;
