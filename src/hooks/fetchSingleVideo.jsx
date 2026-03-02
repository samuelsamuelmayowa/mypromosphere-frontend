import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const api_fetch_trendingVideos = import.meta.env.VITE_VIDEO;

const FetchSingleVideoseller = (id, description) => {
  return useQuery({
    queryKey: ["single-seller-video", id, description],
    queryFn: async ({ queryKey }) => {
      const encodedDescription = encodeURIComponent(queryKey[2]);
      const res = await axios.get(`${api_fetch_trendingVideos}/sellerstories/${queryKey[1]}/${encodedDescription}`);
      return res.data.normalads;
    },
    enabled: !!id && !!description,
     retry: false,
  });
};
export default FetchSingleVideoseller;
