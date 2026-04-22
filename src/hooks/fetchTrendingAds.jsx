import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from "axios";

const api_fetch_trendingAds = import.meta.env.VITE_TRENDING_ADS;

const PAGE_SIZE = 12;


const FetchTrendingAds = ()=> {
  return useQuery({
    queryKey: ["trendingAds"],
    queryFn: async() => {
      const res = await axios.get(api_fetch_trendingAds);
      return res;
    }
  })
}

export default FetchTrendingAds;
