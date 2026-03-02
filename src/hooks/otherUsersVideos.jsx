import { useQuery } from '@tanstack/react-query'
import axios from "axios";
const api_fetch_other_user_videos = import.meta.env.VITE_OTHER_USER_VIDEOS;

const OtherUsersVideos = (username) => {
    return useQuery({
        queryKey: ["other-users-videos", username],
        queryFn: ({ queryKey }) => axios.get(`${api_fetch_other_user_videos}${queryKey[1]}`),
        retry: false,
        enabled: !!username,
    });
}

export default OtherUsersVideos;