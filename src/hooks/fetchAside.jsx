import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const api_fetch_talk_side = import.meta.env.VITE_TALKSIDE;

const FetchTalkAside = () => {
  return useQuery({
    queryKey: ["asidepromotalk-fetcher"],
    queryFn: () => axios.get(`${api_fetch_talk_side}`)
  })
};

export default FetchTalkAside;
