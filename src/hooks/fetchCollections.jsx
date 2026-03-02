import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import axios from "axios";
const api_fetch_collection = import.meta.env.VITE_COLLECTION;

const FetchCollection = () => {
  return useInfiniteQuery({
    queryKey: ["collection"],
    queryFn: async()=> {
      const res = await axios.get(`${api_fetch_collection}`)
      return res
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParams) => lastPage?.nextPage,
  })
}

export default FetchCollection