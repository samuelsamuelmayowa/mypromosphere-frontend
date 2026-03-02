import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from "axios";

const api_fetch_trendingAds = import.meta.env.VITE_TRENDING_ADS;

const PAGE_SIZE = 12;

// const FetchTrendingAds = () => {
//   return useInfiniteQuery({
//     queryKey: ["trendingAds"],
//     queryFn: async ({ pageParam = 0 }) => {
//       const res = await axios.get(api_fetch_trendingAds);
//       const allAds = res.data?.normalads || [];
//       const paginatedAds = allAds.slice(pageParam);
//       return {
//         ads: paginatedAds,
//         allAds: res?.data?.normalads,
//         total: allAds.length,
//         other_images: res.data?.other_images,
//         nextCursor: pageParam + PAGE_SIZE < allAds.length ? pageParam + PAGE_SIZE : null,
//       }
//     },
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//   });
// };

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
