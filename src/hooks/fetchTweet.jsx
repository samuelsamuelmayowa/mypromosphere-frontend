import { useQuery } from '@tanstack/react-query'
import axios from "axios";
const api_fetch_tweet = import.meta.env.VITE_TWEET;

const FetchTweet = (category) => {
  return useQuery({
    queryKey: ["promotweet", category],
    queryFn: async({queryKey})=> {
      const [, category] = queryKey;
      if (category !== "All") {
        const response = await axios.get(`${api_fetch_tweet}/${category}`);
        return response;
      }
      const response = await axios.get(`${api_fetch_tweet}`);
      return response;
    },
    retry: false,
    enabled: !!category,
  })
}

export default FetchTweet;