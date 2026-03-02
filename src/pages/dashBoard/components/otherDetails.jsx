import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../../../../state.json";
import { useStateContext } from "../../../contexts/ContextProvider";
import PropTypes from 'prop-types';

const OtherDetails = ({ values, handleChange }) => {
    const { darkMode } = useStateContext()
    const [localGvt, setLocalGvt] = useState();
    const result = Object.entries(data.full);
    useEffect(() => {
        if (values.state) {
            const filterState = result.filter(
                (x) => x[0].toLowerCase() === values?.state.toLowerCase()
            );
            if (filterState.length > 0) {
                setLocalGvt(filterState[0][1]);
            }
        }
    }, [values.state, result]);
    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}>
                <div className="flex md:items-center md:gap-4 md:flex-row flex-col">
                    <div className="flex-1">
                        <select
                            name="state"
                            id="state"
                            className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 dark:placeholder:text-smallTextDark text-black bg-slate-100 dark:bg-DARKBG dark:text-mainTextDark appearance-none rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none`}
                          onChange={handleChange}
                          value={values.state}
                        >
                            <option value="">--Select your State--</option>
                            {data.States.map((state, i) => (
                                <option key={i} value={state.state} className={darkMode ? "dark:text-mainTextDark text-mainTextDark" : "text-black dark:text-black"}>
                                    {state.state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <select
                            id="local_gov"
                            name="local_gov"
                              value={values.local_gov}
                              onChange={handleChange}
                            className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 ${darkMode ? "bg-DARKBG dark:bg-DARKBG dark:text-mainTextDark text-mainTextDark" : "text-black dark:text-black bg-slate-100 dark:bg-slate-100"} appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                        >
                            <option value="">--Select Local Government--</option>
                            {localGvt &&
                                localGvt.map((x, i) => (
                                    <option key={i} value={x.lga} className={darkMode ? "dark:text-mainTextDark text-mainTextDark" : "text-black dark:text-black"}>
                                        {x.lga}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="flex md:items-center md:gap-4 md:flex-row flex-col">
                    <div className="flex-1">
                        <input
                            className={`jost focus:outline focus:outline-2 focus:outline-purple md:h-12 h-10 text-black bg-slate-100 dark:bg-DARKBG dark:text-mainTextDark appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                            id="price_range"
                            name="price_range"
                              onChange={handleChange}
                              value={values.price_range}
                            type="number"
                            placeholder="Price"
                        />
                    </div>
                    <div className="flex-1">
                        <select
                            id="discount"
                            name="discount"
                              onChange={handleChange}
                              value={values.discount}
                            className={`jost focus:outline focus:outline-2 focus:outline-purple dark:placeholder:text-smallTextDark md:h-12 h-10 ${darkMode ? "bg-DARKBG dark:bg-DARKBG text-mainTextDark dark:text-mainTextDark" : "bg-slate-100 dark:bg-slate-100 text-black dark:text-black"} appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none`}
                        >
                            <option value="">Discount</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
                <div>
                    <textarea
                        className={`jost focus:outline focus:outline-2 focus:outline-purple resize-none md:h-20 h-24 text-black bg-slate-100 dark:bg-DARKBG dark:text-mainTextDark appearance-none rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none`}
                        id="description"
                        name="description"
                        onChange={handleChange}
                        value={values.description}
                        type="text"
                        placeholder="Your Product Description, Name of product , price , current state of device or product "
                    />
                </div>

            </motion.div>
        </AnimatePresence>
    )
}

OtherDetails.propTypes = {
    values: PropTypes.any,
    handleChange: PropTypes.any,
}

export default OtherDetails