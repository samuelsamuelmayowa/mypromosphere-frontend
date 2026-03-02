import axios from "axios";
import { motion } from "framer-motion";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useStateContext } from "../../../contexts/ContextProvider";
import { toast } from "sonner";
import popAudio from "../../../assets/audio/pop.mp3";
import PropTypes from "prop-types";

const like = import.meta.env.VITE_LIKE_TALK;
const dislike = import.meta.env.VITE_DISLIKE_TALK;
const total_likes = import.meta.env.VITE_TOTAL_TALK_LIKES;

const LikeTalk = ({ id }) => {
    const queryClient = useQueryClient()
    const pop = new Audio(popAudio)
    const { token } = useStateContext();
    const { data } = useQuery({
        queryKey: ['LIKES'],
        queryFn: () => axios.get(`${total_likes}/${id}`)
    })
    console.log(data)
    const likeMutation = useMutation({
        mutationFn: () => axios.post(`${like}/${id}`, {}, {
            headers: {
                "Authorization": `Bearer ${token?.token}`
            }
        }),
        onMutate: async () => {
            pop.play();

            await queryClient.cancelQueries(["LIKES"]);
            const previousLikes = queryClient.getQueryData(["LIKES"]);

            queryClient.setQueryData(["LIKES"], old => {
                const current = old?.data?.data ?? 0;
                return {
                    ...old,
                    data: { ...old.data, data: current + 1 }
                };
            });

            return { previousLikes };
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(["LIKES"], context.previousLikes);
            toast.error(err?.response?.data?.message || "Error liking.");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["LIKES"]);
        },
        onSuccess: () => {
            pop.play()
            queryClient.invalidateQueries(["LIKES"])
        }
    })
    const disLikeMutation = useMutation({
        mutationFn: () => axios.delete(`${dislike}/${id}`, {
            headers: {
                "Authorization": `Bearer ${token?.token}`
            }
        }),
        onMutate: async () => {
            pop.play();

            await queryClient.cancelQueries(["LIKES"]);
            const previousLikes = queryClient.getQueryData(["LIKES"]);

            queryClient.setQueryData(["LIKES"], old => {
                const current = old?.data?.data ?? 0;
                return {
                    ...old,
                    data: { ...old.data, data: Math.max(current - 1, 0) }
                };
            });

            return { previousLikes };
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(["LIKES"], context.previousLikes);
            toast.error(err?.response?.data?.message || "Error disliking.");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["LIKES"]);
        },
        onSuccess: () => {
            pop.play();
            queryClient.invalidateQueries(["LIKES"]);
        }
    })
    const handleLikeMutation = () => {
        if (token) {
            likeMutation.mutate();
        } else {
            toast.error("You are not logged in");
        }
    }
    const handleDisLikeMutation = () => {
        if (token) {
            disLikeMutation.mutate();
        } else {
            toast.error("You are not logged in");
        }
    }
    return (
        <div className='flex items-center gap-5 md:gap-8'>
            <motion.div whileTap={{ scale: 0.95 }} onClick={handleLikeMutation} className="group cursor-pointer flex gap-2 items-center">
                {/* <p className="text-sm">Likes</p> */}
                <FaThumbsUp fill='#10CBFF' size={20} className="group-hover:scale-105 duration-300" />
            </motion.div>
            <div className="text-white rounded-full size-10 grid place-content-center bg-blue ">
                <p className="jost font-semibold">{data?.data?.data}</p>
            </div>
            <motion.div whileTap={{ scale: 0.95 }} onClick={handleDisLikeMutation} className="group cursor-pointer flex gap-2 items-center">
                {/* <p className="text-sm">Dislikes</p> */}
                <FaThumbsDown size={20} className="group-hover:scale-105 duration-300" fill='red' />
            </motion.div>
        </div>
    )
}

LikeTalk.propTypes = {
    id: PropTypes.any
}

export default LikeTalk;
