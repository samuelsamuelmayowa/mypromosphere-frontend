import { useStateContext } from "../../../../contexts/ContextProvider";
import * as yup from "yup"
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import popAudio from "../../../../assets/audio/pop.mp3"
import Loader from '../../../../loader';
import { Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PropTypes from 'prop-types';

const api_comment_on_product = import.meta.env.VITE_NORMAL_ADS_COMMENT;

const FeedBack = ({ isOpen, onClose, setComment, postId }) => {

    const queryClient = useQueryClient();
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
                    setComment(false);
                    resetForm();
                    pop.play();
                    queryClient.invalidateQueries(["comments", postId])
                },
                onError: (error) => {
                    console.log(error);
                    toast.error("Error Adding Comment");
                }
            })
        },
    })
    const commentMutation = useMutation({
        mutationFn: (data) => axios.post(`${api_comment_on_product}/${postId}`, data)
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
    const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            handleFormSubmit(e);
        }
    };
    return (
        <>
            {commentMutation.isPending &&
                <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
                    <Loader />
                </div>
            }
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className={`sm:max-w-[500px] rounded-lg border bg-white dark:bg-gray-800 dark:text-gray-100`}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                            <span>Share Your Feedback</span>
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid gap-4 py-4">
                            {!token && <div className="grid grid-cols-4 items-center gap-4">
                                <Input
                                    type="text"
                                    name='name'
                                    id='name'
                                    onChange={handleChange}
                                    value={values.name}
                                    placeholder='Enter Your Name'
                                    className="col-span-4"
                                />
                            </div>}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Textarea
                                    defaultValue=""
                                    onKeyDown={handleKeyDown}
                                    name="comment"
                                    id="comment"
                                    onChange={handleChange}
                                    value={values.comment}
                                    placeholder='Enter Your Comment'
                                    className="col-span-4 min-h-[120px] resize-none"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                className="w-full mt-4 gap-2"
                                disabled={commentMutation.isPending}
                            >
                                <Send className="h-4 w-4" />
                                Submit Feedback
                            </Button>
                        </DialogFooter>
                    </form>
                    {token && (
                        <div className="flex items-center gap-3 mb-4 p-3 rounded-md bg-secondary/40">
                            <Avatar className="w-10 h-10 ring-2 ring-transparent hover:ring-blue-500 transition-all duration-200">
                                <AvatarImage
                                    src={token.profileImage}
                                    alt={token?.user_image || "User"}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-blue text-white font-semibold">
                                    {(token?.user_name || token?.user_name || "U").charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{token?.user_name}</span>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

FeedBack.propTypes = {
    setComment: PropTypes.func,
    postId: PropTypes.any,
    isOpen: PropTypes.any,
    onClose: PropTypes.any,
}

export default FeedBack;