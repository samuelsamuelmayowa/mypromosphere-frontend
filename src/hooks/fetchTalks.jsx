import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import axios from "axios";
const api_fetch_talk = import.meta.env.VITE_TALK;
const api_fetch_talk_category = import.meta.env.VITE_TALK_CATEGORY;

const FetchTalk = (category) => {
  return useQuery({
    queryKey: ["promotalks", category],
    queryFn: async({queryKey})=> {
      const [, category] = queryKey;
      if (category !== "All") {
        const response = await axios.get(`${api_fetch_talk_category}/${category}`);
        return response;
      }
      const response = await axios.get(`${api_fetch_talk}`)
      return response;
    },
    enabled: !!category,
  })
}

// const FetchTalk = (category) => {
//   return useInfiniteQuery({
//     queryKey: ["promotalks", category],
//     queryFn: async({queryKey, pageParam = 0 })=> {
//       const [, category] = queryKey;
//       if (category !== "All") {
//         const response = await axios.get(`${api_fetch_talk_category}/${category}`, {
//           params: { cursor: pageParam },
//         });
//         return response;
//       }
//       const response = await axios.get(`${api_fetch_talk}`, {
//         params: { cursor: pageParam }
//       });
//       return response;
//     },
//     initialPageParam: 0,
//     getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
//     enabled: !!category,
//   })
// }

export default FetchTalk;