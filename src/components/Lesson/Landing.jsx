import CourseCard from "./courseCard";
import FilterDropdown from "./filterDropDown";
import { COURSES } from "./courses";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


const Landing = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const courseCategory = searchParams.get("courseCategory") || "All Courses";
    const filteredCourses = courseCategory === "All Courses"
        ? COURSES
        : COURSES.filter(course => course.category === courseCategory);
    return (
        <div className="min-h-screen">
            <main className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <FilterDropdown
                        courseCategory={courseCategory}
                        setSearchParams={setSearchParams}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} {...course} />
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-300">
                <p className="text-sm text-gray-800">
                    📞 <span className="font-semibold">Want more info?</span> Reach out on WhatsApp!
                </p>
                <a href="https://wa.link/jupnkb" target="_blank" rel="noreferrer" className="mt-2 inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded transition duration-200">
                    Chat on WhatsApp
                </a>
            </div>

        </div>
    )
}

export default Landing;