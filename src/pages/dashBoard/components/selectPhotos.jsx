import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { toast } from "sonner";
import PropTypes from 'prop-types';

const SelectPhotos = ({ values, imageUpload, setImageUpload, setFieldValue }) => {
    const onChange = (event) => {
        const files = Array.from(event.currentTarget.files);
        const newImagePreviews = [];
        const newImageFiles = [];

        files.forEach((file, _, arr) => {
            if (arr.length === 0){
                console.log('No files selected');
                return; 
            }
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload a valid image file');
                return;
            }
            if (imageUpload.length.length > 5 || files.length > 5) {
                toast.error('maximum of 5 images');
                return;
            }
            newImageFiles.push(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                newImagePreviews.push(reader.result);
                if (newImagePreviews.length === files.length) {
                    setImageUpload((prev) => [...prev, ...newImagePreviews]);
                    setFieldValue('post_images', newImageFiles);
                }
            };
            reader.readAsDataURL(file);
        });
    }

    const removeImage = (e, index) => {
        e.stopPropagation();
        const updatedImageUpload = imageUpload.filter((_, i) => i !== index);
        const updatedImageFiles = values.post_images.filter((_, i) => i !== index);

        setImageUpload(updatedImageUpload);
        setFieldValue('post_images', updatedImageFiles);

        console.log('imageUpload after removing', updatedImageUpload);
        console.log('file after removing', updatedImageFiles);
    };
    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="flex flex-col gap-3">
                <input
                    type="file"
                    multiple
                    onChange={onChange}
                    name="post_images"
                    id="post_images"
                    className="hidden"
                />
                <div className="lg:flex hidden items-center gap-4 justify-around md:flex-nowrap flex-wrap">
                    {imageUpload.map((image, index) => (
                        <div key={index} className="relative flex-1">
                            <img
                                src={image}
                                alt=""
                                className="w-full lg:h-[200px] rounded-md object-cover"
                            />
                            <FaXmark
                                size={25}
                                color="black"
                                onClick={(e) => removeImage(e, index)}
                                className="absolute top-2 right-2"
                            />
                        </div>
                    ))}
                    {5 - imageUpload.length > 0 &&
                        Array.from({ length: 5 - imageUpload.length }).map(
                            (_, index) => (
                                <label
                                    key={index}
                                    htmlFor="post_images"
                                    className="rounded-md object-cover w-full aspect-square flex-1 cursor-pointer duration-300 hover:scale-110"
                                >
                                    <div className={`w-full lg:h-[200px] rounded-md object-cover bg-slate-100 dark:bg-DARKBG flex items-center justify-center`}>
                                        <FaPlus size={25} />
                                    </div>
                                </label>
                            )
                        )
                    }
                </div>
                <div className="lg:hidden block w-full">
                    {imageUpload.length > 0 ?
                        <Splide options={{
                            type: 'slide',
                            gap: "20px",
                            perPage: 1,
                            arrows: false,
                            pagination: true,
                            snap: true,
                            drag: 'free',
                            width: "100%",
                        }} >
                            {
                                imageUpload.map((image, index) => (
                                    <SplideSlide key={index} className="relative">
                                        <img
                                            src={image}
                                            alt=""
                                            className="w-full h-[350px] rounded-md object-cover"
                                        />
                                        <FaXmark
                                            size={25}
                                            color="black"
                                            onClick={(e) => removeImage(e, index)}
                                            className="absolute top-2 right-2"
                                        />
                                    </SplideSlide>
                                ))
                            }
                        </Splide>
                        :
                        <label
                            htmlFor="post_images"
                            className="w-full cursor-pointer duration-300 hover:scale-110"
                        >
                            <div className={`rounded-md w-full h-[300px] bg-slate-100 dark:bg-DARKBG flex items-center justify-center`}>
                                <FaPlus size={25} />
                            </div>
                        </label>
                    }
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

SelectPhotos.propTypes = {
    values: PropTypes.any,
    imageUpload: PropTypes.any,
    setImageUpload: PropTypes.func,
    setFieldValue: PropTypes.any,
}

export default SelectPhotos