import { motion, AnimatePresence } from "framer-motion";
import { Categories } from "../../../json/categories.jsx";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import PropTypes from 'prop-types';


const ProductCategory = ({ handleChange, values }) => {
    const { darkMode } = useStateContext()
    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}>
                <div className="flex-1">
                    <input
                        className={`jost w-full focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 ${darkMode ? "bg-DARKBG dark:bg-DARKBG dark:placeholder:text-mainTextDark placeholder:text-mainTextDark" : "bg-slate-100 dark:bg-slate-100 dark:placeholder:text-black placeholder:text-black"} appearance-none rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none`}
                        id="productName"
                        name="productName"
                        type="text"
                        onChange={handleChange}
                        value={values.productName}
                        placeholder="Product Name or Service Name"
                    />
                </div>
                <select
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    id="category"
                    className={`jost w-full focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 ${darkMode ? "bg-DARKBG dark:bg-DARKBG dark:text-mainTextDark text-mainTextDark" : "text-black dark:text-black bg-slate-100 dark:bg-slate-100"}  dark:placeholder:text-smallTextDark appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                >
                    <option className="text-black" value="">--Select a Category--</option>
                    {Categories.map((option, index) => {
                        return (
                            <option key={index} value={option.name} className={darkMode ? "dark:text-mainTextDark text-mainTextDark" : "text-black dark:text-black"}>
                                {option.name}
                            </option>
                        );
                    })}
                </select>
                <AnimatePresence mode={"popLayout"}>
                    {values.category === "Apartment" &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex md:items-center md:gap-4 md:flex-row flex-col">
                            <div className="flex-1">
                                <input
                                    className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 dark:placeholder:text-smallTextDark ${darkMode ? "bg-DARKBG dark:bg-DARKBG" : "bg-slate-100 dark:bg-slate-100"} appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                                    id="location"
                                    name="location"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.location}
                                    placeholder="Location"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 dark:placeholder:text-smallTextDark ${darkMode ? "bg-DARKBG dark:bg-DARKBG" : "bg-slate-100 dark:bg-slate-100"} appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                                    id="landMark"
                                    name="landMark"
                                    onChange={handleChange}
                                    value={values.landMark}
                                    type="text"
                                    placeholder="LandMarks"
                                />
                            </div>
                        </motion.div>
                    }
                    {values.category === "Vehicles Upgrade" &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex md:items-center md:gap-4 md:flex-row flex-col">
                            <div className="flex-1">
                                <input
                                    className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 dark:placeholder:text-smallTextDark ${darkMode ? "bg-DARKBG dark:bg-DARKBG" : "bg-slate-100 dark:bg-slate-100"} appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                                    id="vehicleBrand"
                                    name="vehicleBrand"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.vehicleBrand}
                                    placeholder="Vehicle Brand"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 dark:placeholder:text-smallTextDark ${darkMode ? "bg-DARKBG dark:bg-DARKBG" : "bg-slate-100 dark:bg-slate-100"} appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                                    id="partToPip"
                                    name="partToPip"
                                    onChange={handleChange}
                                    value={values.partToPip}
                                    type="text"
                                    placeholder="Part to Upgrade"
                                />
                            </div>
                        </motion.div>
                    }
                    {values.category === "Property" &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex md:items-center md:gap-4 md:flex-row flex-col">
                                <div className="flex-1">
                                    <input
                                        className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 dark:placeholder:text-smallTextDark ${darkMode ? "bg-DARKBG dark:bg-DARKBG" : "bg-slate-100 dark:bg-slate-100"} appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                                        id="typeOfProperty"
                                        name="typeOfProperty"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.typeOfProperty}
                                        placeholder="Type of property"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 dark:placeholder:text-smallTextDark ${darkMode ? "bg-DARKBG dark:bg-DARKBG" : "bg-slate-100 dark:bg-slate-100"} appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                                        id="propertyAddress"
                                        name="propertyAddress"
                                        onChange={handleChange}
                                        value={values.propertyAddress}
                                        type="text"
                                        placeholder="Address"
                                    />
                                </div>
                            </div>
                            <div className="flex md:gap-4 md:flex-row flex-col">
                                <div className="flex-1">
                                    <input
                                        className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 dark:placeholder:text-smallTextDark ${darkMode ? "bg-DARKBG dark:bg-DARKBG" : "bg-slate-100 dark:bg-slate-100"} appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                                        id="propertyBedroom"
                                        name="propertyBedroom"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.propertyBedroom}
                                        placeholder="Bedrooms"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 dark:placeholder:text-smallTextDark ${darkMode ? "bg-DARKBG dark:bg-DARKBG" : "bg-slate-100 dark:bg-slate-100"} appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                                        id="propertyLandmark"
                                        name="propertyLandmark"
                                        onChange={handleChange}
                                        value={values.propertyLandmark}
                                        type="text"
                                        placeholder="Landmark and Places around"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    )
}

ProductCategory.propTypes = {
    handleChange: PropTypes.any,
    values: PropTypes.any,
}

export default ProductCategory