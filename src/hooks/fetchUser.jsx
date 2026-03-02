import { useQuery } from '@tanstack/react-query'
import axios from "axios";
const api_general = import.meta.env.VITE_GENERAL;

const FetchUser = (token) => {
  return useQuery({
    queryKey: ["userPost", token],
    queryFn: ({ queryKey }) => axios.get(`${api_general}/api/getuser/${queryKey[1].id}`, {
      headers: {
        "Accept": "application/vnd.api+json",
        Authorization: `Bearer ${queryKey[1]?.token}`,
      },
    }),
    enabled: !!token.id,
  });
}

export default FetchUser;