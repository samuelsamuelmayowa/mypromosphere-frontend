import { useQuery } from '@tanstack/react-query'
import axios from "axios";
const api_fetch_trendingVideos = import.meta.env.VITE_VIDEO;

const FetchVideoseller = () => {
  return useQuery({
    queryKey: ["sellers-videos"],
    queryFn: async()=> {
      const res = await axios.get(`${api_fetch_trendingVideos}/sellerstories`)
      return res.data.normalads
    },
  })
}

export default FetchVideoseller