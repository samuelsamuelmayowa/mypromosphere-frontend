import { useQuery } from '@tanstack/react-query'
import axios from "axios";
const api_fetch_tweet = import.meta.env.VITE_TWEET;

const FetchTweet = (id) => {
  return useQuery({
    queryKey: ["singlepromotweet", id],
    queryFn: ({queryKey})=> axios.get(`${api_fetch_tweet}/${queryKey[1]}`),
    enabled: !!id,
  })
}

export default FetchTweet;