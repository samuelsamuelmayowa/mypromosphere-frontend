import { useQuery } from '@tanstack/react-query'
import axios from "axios";

const api_fetch_ads_comments = import.meta.env.VITE_NORMAL_ADS_COMMENT;


const FetchAdsComments = (id) => {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: ({queryKey}) => axios.get(`${api_fetch_ads_comments}/${queryKey[1]}`),
    enabled: !!id,
  })
}

export default FetchAdsComments;