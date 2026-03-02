import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../loader";
import LOGIN from '../assets/audio/login.mp3'

const apiCallback = import.meta.env.VITE_SERVER_CALLBACK;
const apiUser = import.meta.env.VITE_SERVER_AUTH_USER;

function GoogleCallback() {
  const login = new Audio(LOGIN)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { setToken, setUser } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    if (!location.search) {
      toast.error("No callback data available.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${apiCallback}${location.search}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const result = await response.json();
        if (result?.data) {
      
          setData(result.data);
          setUser(result.data);
          setToken(result.data)
          login.play();
          localStorage.setItem("user-details", JSON.stringify(result.data));
          toast.success("Successfully Logged In");
          setLoading(false);
          navigate("/dashboard");
        } else {
          setLoading(false)
        }
      } catch (error) {
        toast.error("Login failed. Please try again.");
        setLoading(false)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search, navigate, setToken, setUser]);

  if (loading) {
    return <DisplayLoading />;
  }
  
  return <div> <DisplayData  data={data}></DisplayData></div>;
}

function DisplayLoading() {
  return (
    <div className="min-h-screen place-content-center">
      <Loader />
    </div>
  )
}

function DisplayData({ data }) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>


    </div>
  );
}

export default GoogleCallback;