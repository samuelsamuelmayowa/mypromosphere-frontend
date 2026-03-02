import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useStateContext } from "../../../contexts/ContextProvider";
import * as yup from "yup"
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import popAudio from "../../../assets/audio/pop.mp3"
import Loader from '../../../loader';
import PropTypes from 'prop-types';

const api_comment_on_talk = import.meta.env.VITE_TALK_COMMENT;


const TalkComment = ({ talkId }) => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const talkCategory = searchParams.get('category') || "All"
    const pop = new Audio(popAudio)
    const { token } = useStateContext();
    const validationSchema = yup.object({
        name: yup.string().required("Enter Your Name Since You're not Logged In"),
        comment: yup.string().required("Enter your Comment"),
    })
    const { handleChange, handleSubmit, resetForm, values, validateForm } = useFormik({
        initialValues: {
            name: token ? token?.user_name : "",
            comment: "",
        },
        validationSchema,
        onSubmit: values => {
            const formData = new FormData();
            token ? formData.append('name', token?.user_name) : formData.append('name', values.name)
            formData.append('message', values.comment)
            commentMutation.mutate(formData, {
                onSuccess: () => {
                    toast.success("You have made a comment")
                    resetForm();
                    queryClient.invalidateQueries(["promotalks", talkCategory])
                    pop.play()
                },
                onError: (error) => {
                    console.log(error);
                    toast.error("Error Adding Comment");
                }
            })
        },
    })
    const commentMutation = useMutation({
        mutationFn: (data) => axios.post(`${api_comment_on_talk}/${talkId}`, data)
    })
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((error) => toast.error(error));
        } else {
            handleSubmit();
        }
    };
    return (
        <>
            {commentMutation.isPending &&
                <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
                    <Loader />
                </div>
            }
            <motion.form onSubmit={handleFormSubmit} className={`relative flex flex-col gap-6 bg-white dark:bg-BODYDARKBG md:rounded-[32px] rounded-xl`}>
                <div className="basis-[100%] p-2">
                    {!token && <input name='name' id="name" onChange={handleChange} value={values.name} type="text" className={`w-full jost text-black dark:text-mainTextDark p-2 bg-transparent outline-none`} placeholder='Enter Your Name' />}
                    <textarea
                        placeholder="Reply talk"
                        className={`w-full jost text-black dark:text-mainTextDark p-2 bg-transparent outline-none border-none h-[3rem] md:h-[5rem] resize-none`}
                        name="comment" id="comment" onChange={handleChange} value={values.comment}
                    ></textarea>
                </div>
                <div className="md:basis-[100%] basis-[100%] flex items-end justify-end">
                    <button className="font-[600] text-[0.9rem] bg-anothersphereblue cursor-pointer text-white md:rounded-[32px] rounded-xl px-5 py-2">
                        Reply
                    </button>
                </div>
            </motion.form>
        </>
    )
}

TalkComment.propTypes = {
    data: PropTypes.any,
    talkId: PropTypes.any
}

export default TalkComment