import { useQuery } from '@tanstack/react-query'
import axios from "axios";
const api_fetch_video_ad = import.meta.env.VITE_TRENDING_VIDEO_ADS;

const FetchVideos = () => {
  return useQuery({
    queryKey: ["trendingVideos"],
    queryFn: ()=> axios.get(`${api_fetch_video_ad}`)
  })
}

export default FetchVideos