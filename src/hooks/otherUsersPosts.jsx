import { useQuery } from '@tanstack/react-query'
import axios from "axios";
const api_fetch_other_user = import.meta.env.VITE_ALL_USER_POST;

const OtherUsersPosts = (username) => {
    return useQuery({
        queryKey: ["user-post-ads", username],
        queryFn: ({ queryKey }) => axios.get(`${api_fetch_other_user}${queryKey[1]}`),
        enabled: !!username,
    });
}

export default OtherUsersPosts