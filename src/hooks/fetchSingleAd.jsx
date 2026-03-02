import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const api_fetch_single_ad = import.meta.env.VITE_SINGLE_AD;

const FetchSingleAd = (id, productName) => {
  return useQuery({
    queryKey: ["single_trendingAd", id, productName],
    queryFn: async ({ queryKey }) => {
      const encodedDescription = encodeURIComponent(queryKey[2]);
      const response = await axios.get(
        `${api_fetch_single_ad}${queryKey[1]}/${encodedDescription}`
      );
      return response?.data;
    },
    enabled: !!id,
  });
};

export default FetchSingleAd;
