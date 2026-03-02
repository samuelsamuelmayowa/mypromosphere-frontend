import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const CourseCard = ({ id, title, description, duration, price, level, gradient, icon, progress }) => {
  return (
    <>
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700"
    >
      <Link to={`/learning/${id}`} className="block" >
        <div className={`h-32 ${gradient} relative flex items-center justify-center`}>
          <div className="text-4xl">{icon}</div>
          {level && (
            <Badge className="absolute top-3 left-3 bg-white text-gray-900 hover:bg-gray-100">
              {level}
            </Badge>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 jost">{description}</p>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{duration}</span>
            <span className="text-white font-medium">NGN {Number(price.replace("NGN", "").trim()).toLocaleString()}</span>
          </div>

          {progress !== undefined && (
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{progress}%</span>
              </div>
              <div className="w-full bg-blue/50 rounded-full h-2">
                <div
                  className="bg-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </Link>

      
    </motion.div>


    </>
  )
}

CourseCard.propTypes = {
  id: PropTypes.any,
  title: PropTypes.any,
  description: PropTypes.any,
  duration: PropTypes.any,
  price: PropTypes.any,
  level: PropTypes.any,
  gradient: PropTypes.any,
  icon: PropTypes.any,
  progress: PropTypes.any,
}

export default CourseCard