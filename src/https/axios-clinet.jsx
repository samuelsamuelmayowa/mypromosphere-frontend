import axios from "axios";

// use proxy in dev, env var in prod
const axiosclinet = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Attach token if available
axiosclinet.interceptors.request.use((config) => {
  let token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    try {
      token = JSON.parse(token); // if stored as JSON
      config.headers.Authorization = `Bearer ${token.token || token}`;
    } catch {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle errors globally
axiosclinet.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      // maybe redirect to login?
    }
    return Promise.reject(error); // re-throw so React Query knows
  }
);

export default axiosclinet;




// import axios from "axios";
// const axiox_api = import.meta.env.VITE_baseURL;
// const axiosclinet = axios.create({
//   baseURL: axiox_api,
// });
// axiosclinet.defaults.headers.post["Content-Type"] = "application/vnd.api+json";
// axiosclinet.defaults.headers.post["Accept"] = "application/json";
// axiosclinet.defaults.withCredentials = true;

// axiosclinet.interceptors.request.use((config) => {
//   const token = localStorage.getItem("ACCESS_TOKEN");
//   config.headers.Authorization = token ? `Bearer ${token?.token}` : "";
//   return config;
// });

// axiosclinet.interceptors.response.use(
//   (respone) => {
//     return respone;
//   },
//   (error) => {
//     try {
//       const { response } = error;
//       if (response.status === 401) {
//         localStorage.removeItem("ACCESS_TOKEN");
//       }
//     } catch (err) {
//       // console.log(
//       //   'error from axioz client ', err);
//     }
//     // throw error;
//   }

// );
// export default axiosclinet;