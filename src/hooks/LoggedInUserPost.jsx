import { useQuery } from '@tanstack/react-query'
import axios from "axios";
const api_load_v2 = import.meta.env.VITE_POSTS_UPLOADS;


const FetchUserposts = (token) => {
  return useQuery({
    queryKey: ["userposts", token],
    queryFn: ({ queryKey }) =>
      axios.get(`${api_load_v2}${queryKey[1]?.id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${queryKey[1]?.token}`,
        },
      }),
      retry: false,
      enabled: !!token,
  });
}

export default FetchUserposts