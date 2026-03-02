import { createContext, useContext, useState, useEffect } from "react";
import { Toaster, toast } from 'sonner';
import PropTypes from 'prop-types';
import logout from "../assets/audio/logout.mp3"

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => { },
  setToken: () => { },
  FullScreen: false,
  LogOut: () => { },
  handleClick: () => { },
  darkMode: false,
  handleDarkMode: () => { },
});

export const ContextProvider = ({ children }) => {
  const LOGOUT = new Audio(logout)
  const [user, setUser] = useState()
  const [FullScreen, setFullScreen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [token, setToken] = useState(() => JSON.parse(localStorage.getItem("user-details")) || null)
  const handleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   const handleChange = (event) => {
  //     const prefersDarkMode = event.matches;
  //     setDarkMode(prefersDarkMode);
  //     localStorage.setItem("darkMode", prefersDarkMode);
  //   };
  //   mediaQuery.addEventListener('change', handleChange);
  //   return () => {
  //     mediaQuery.removeEventListener('change', handleChange);
  //   };
  // }, []);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldUseDark = storedMode !== null ? JSON.parse(storedMode) : prefersDark;

    setDarkMode(shouldUseDark);

    if (shouldUseDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      const prefersDarkMode = event.matches;
      setDarkMode(prefersDarkMode);
      localStorage.setItem("darkMode", prefersDarkMode);
      if (prefersDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);


  const handleClick = () => {
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    const handleResize = () => {
      const size = window.innerWidth;
      size > 1026 ? setFullScreen(true) : setFullScreen(false)
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const LogOut = () => {
    LOGOUT.play()
    setToken(null)
    setUser(null)
    localStorage.removeItem("user-details")
    toast.success("Successfull Logged Out")
  }
  return (
    <StateContext.Provider value={{
      user,
      token,
      setUser,
      setToken,
      FullScreen,
      LogOut,
      handleClick,
      darkMode,
      handleDarkMode,
    }}>
      <div className={`text-black bg-white dark:text-mainTextDark dark:bg-BODYDARKBG`}>
        {children}
      </div>
      <Toaster className="z-[999999999999999999999999999999]" position="top-center" />
    </StateContext.Provider>
  )
}

ContextProvider.propTypes = {
  children: PropTypes.any,
}

export const useStateContext = () => useContext(StateContext)