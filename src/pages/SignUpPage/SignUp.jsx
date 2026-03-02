import { useEffect, useState } from 'react'
import google from "../../assets/images/icon_google.png";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny, IoIosArrowRoundBack } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form";
import Loader from '../../loader';
import { useStateContext } from '../../contexts/ContextProvider';
import { Toaster, toast } from 'sonner';
import AnimatedDivs from './animatedDiv.jsx';
import { Helmet } from "react-helmet";
import axios from "axios"

const api = import.meta.env.VITE_API_SIGNUP
const api_server_auth = import.meta.env.VITE_SERVER_AUTH;

const SignUp = () => {
  const navigate = useNavigate()
  const { setToken, darkMode, handleDarkMode } = useStateContext()
  const [selected, setSelected] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const viewPassword = () => {
    setPasswordVisible(prev => !prev)
  }

  const toggler = (e) => {
    const { checked } = e.target
    setSelected(checked)
  };

  const schema = yup.object().shape({
    name: yup.string().required("Your name is required to continue"),
    // b_name: yup.string().required("Your  Business name is required to continue"),
    email: yup.string().email("Invalid email address").required("Enter Your Email"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Please Enter Your Password"),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Please Confirm Your Password"),
  });
  
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const formSubmit = async (data) => {
    const payload = {
      
      "name": data.name,
      "email": data.email,
      "password": data.password,
    }
    if (!selected) {
      toast.error("Agree to the terms and conditions")
      return;
    }
    try {
      const response = await axios.post(api, payload)
      if (response.status === 200) {
        setToken(response.data.token)
        toast.success("You have Successfull created an account")
        navigate("/login")
      }
    } catch (error) {
      toast.error("Error")
      console.log(error)
    }
  }
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
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }   
        throw new Error('Something went wrong!');
      })
      .then((data) => {
        setToken(data.token)
        setLoginUrl(data.url)
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="relative bg-purple min-h-screen flex flex-col md:justify-center md:items-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>SignUp</title>
        <meta name="description" content="Join MyPromoSphere, the leading online marketplace in Nigeria to promote your business, buy and sell discounted products, and connect with local entrepreneurs." />
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
      {isSubmitting &&
        <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
          <Loader />
        </div>
      }
      <Toaster position="top-center" />
      <div className="md:hidden block p-4">
        <Link to="/">
          <IoIosArrowRoundBack size={30} color='black' />
        </Link>
        <div className="flex justify-between items-center jost md:hidden py-4">
          <h3 className={`font-500 text-5xl text-black dark:text-black`}>
            Welcome to{" "}
            <p className="font-500 text-3xl text-blue">
              MyPromoSphere
            </p>
            <p className={`jost text-sm my-2 text-black dark:text-mainTextDark`}>
              Already have an account? <Link className="text-red" to="/login">Login</Link>{" "}
            </p>
          </h3>
          {darkMode ?
            <IoIosSunny onClick={handleDarkMode} size={30} color="gold" className="cursor-pointer" />
            :
            <FaMoon onClick={handleDarkMode} size={30} color={darkMode ? "black" : "black"} className="cursor-pointer" />
          }
        </div>
      </div>
      <section className={`flex md:w-[90%] lg:w-[85%] bigLg:w-[70%] bg-white dark:bg-BODYDARKBG md:rounded-lg`}>
        <div className='flex-1 p-4'>
          <div className=''>
            <div className="md:block hidden">
              <Link to="/">
                <IoIosArrowRoundBack size={30} className={`text-black dark:text-white`} />
              </Link>
              <div className="flex justify-between">
                <h3 className={`font-500 text-base sm:text-[1.3rem] text-black dark:text-white`}>
                  Create{" "}
                  <span className="font-500 text-[1.1rem] sm:text-[1.3rem] text-blue">
                    Account
                  </span>
                </h3>
                {darkMode ?
                  <IoIosSunny onClick={handleDarkMode} size={20} color="gold" className="cursor-pointer" />
                  :
                  <FaMoon onClick={handleDarkMode} size={20} color={darkMode ? "black" : "black"} className="cursor-pointer" />
                }
              </div>
              <p className={`jost text-sm my-2 text-black dark:text-mainTextDark`}>
                Already have an account? <Link className="text-red" to="/login">Login</Link>{" "}
              </p>
            </div>
            <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col gap-4 md:gap-1'>
              <div>
                <label htmlFor="">
                  <p className={`jost font-semibold text-black dark:text-white`}>Name</p>
                  <input {...register("name", { required: true })} placeholder="Full name or Business name" type="text" className={`dark:bg-transparent valid:bg-transparent autofill:bg-transparent w-full border border-black border-t-0 border-r-0 border-l-0 focus:outline-none my-1 h-8 text-black dark:text-mainTextDark`} name="name" id="name" />
                  <small>If you&apos;re a business owner, include your business name!</small>
                </label>
              </div>
              <div>
                <label htmlFor="">
                  <p className={`jost font-semibold text-black dark:text-white`}>Email</p>
                  <input {...register("email", { required: true })} placeholder="example@gmail.com" type="email" className={`dark:bg-transparent valid:bg-transparent autofill:bg-transparent w-full border border-black border-t-0 border-r-0 border-l-0 focus:outline-none my-1 h-8 text-black dark:text-mainTextDark`} name="email" id="email" />
                </label>
              </div>
              <div>
                <label htmlFor="">
                  <p className={`jost font-semibold text-black dark:text-white`}>Password</p>
                  <input {...register("password", { required: true })} type={passwordVisible ? "text" : "password"} placeholder="Enter password" className={`dark:bg-transparent valid:bg-transparent autofill:bg-transparent w-full border border-black border-t-0 border-r-0 border-l-0 focus:outline-none my-1 h-8 text-black dark:text-mainTextDark`} name="password" id="password" />
                </label>
              </div>
              <div className='relative'>
                <label htmlFor="">
                  <p className={`jost font-semibold text-black dark:text-white`}>Confirm Password</p>
                  <input {...register("password_confirmation", { required: true })} placeholder="Confirm password" type={passwordVisible ? "text" : "password"} className={`dark:bg-transparent valid:bg-transparent autofill:bg-transparent w-full border border-black border-t-0 border-r-0 border-l-0 focus:outline-none my-1 h-8 text-black dark:text-mainTextDark`} name="password_confirmation" id="password_confirmation" />
                </label>
                {passwordVisible ? <FaEyeSlash onClick={viewPassword} size={20} className="cursor-pointer absolute right-4 bottom-2" /> : <FaEye onClick={viewPassword} size={20} className="cursor-pointer absolute right-4 bottom-2" />}
              </div>
              <div className="flex sm:flex-row items-center gap-[1rem]">
                <label className="toggle-switch">
                  <input type="checkbox" onChange={toggler} />
                  <div className="toggle-switch-background">
                    <div className="toggle-switch-handle"></div>
                  </div>
                </label>
                <div className="my-2">
                  <p className={`jost text-sm text-black dark:text-mainTextDark`}>
                    I agree to the{" "}
                    <span className="text-blue"> <Link to="/termsAndCondition">Platforms Terms</Link> </span>of
                    service and
                    <span className="text-blue"> privacy policy </span>
                  </p>
                </div>
              </div>
              <div className="">
                <button type='submit' className="bg-purple hover:bg-indigo-900 h-12 py-4 text-white text-lg w-full rounded-md flex justify-center items-center">
                  {isSubmitting ?
                    <p className="smax:text-[1.2rem] flex items-center justify-center">
                      <span className="loading loading-ring loading-md"></span>
                      <span className="loading loading-ring loading-md"></span>
                      <span className="loading loading-ring loading-md"></span>
                    </p>
                    :
                    <p className="text-base">SignUp</p>
                  }
                </button>
              </div>
            </form>
            {/* <p className="text-center my-2">or</p>
            <button className={`shadow-xl hover:shadow-none border bg-white border-black dark:bg-darkBg dark:border-DARKBG py-2 text-dark w-full rounded-full flex justify-center items-center`}>
              <img src={google} alt="" className="px-3 " />
              {loginUrl !== null && (
                <a className={`jost text-base text-black dark:text-mainTextDark`} href={loginUrl}>Continue with Google</a>
              )}
            </button> */}
          </div>
        </div>
        <AnimatedDivs />
      </section>
    </section>
  );
};
export default SignUp;


