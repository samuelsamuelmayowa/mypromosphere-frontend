import { useQuery } from '@tanstack/react-query'
import axios from "axios";
const api_fetch_user = import.meta.env.VITE_PROFILE_FETCHING;


const FetchProfileUser = (username) => {
  return useQuery({
    queryKey: ["userPost", username],
    queryFn: ({queryKey})=> axios.get(`${api_fetch_user}/${queryKey[1]}`, {
      headers: {
        Accept: "application/json",
      }
    }),
    enabled: !!username,
  });
}

export default FetchProfileUser;