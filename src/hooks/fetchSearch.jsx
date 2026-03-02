import axios from "axios";
import { useQuery } from '@tanstack/react-query'
const api_category = import.meta.env.VITE_FULL_SEARCH;

const fetchSearchResults = async (category) => {
  const { data } = await axios.get(`${api_category}${category}`);
  return data;
};

const FetchSearch = (category) => {
  return useQuery({
    queryKey: ["search", category],
    queryFn: ({queryKey})=> fetchSearchResults(queryKey[1]),
    retry: false,
    enabled: !!category
  })
}

export default FetchSearch;