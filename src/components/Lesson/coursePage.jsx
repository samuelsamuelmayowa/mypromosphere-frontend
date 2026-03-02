import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, DollarSign, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COURSES } from "./courses"
import CourseEnrollementForm from "./courseEnrollementForm";
import { useStateContext } from "../../contexts/ContextProvider";

const CoursePage = () => {
    const { courseId } = useParams();
    const { token } = useStateContext();
    
    const course = COURSES.find(c => c.id === courseId);
    
    if (!course) {
        return (
            <div className="min-h-screen bg-BODYDARKBG dark:bg-BODYDARKBG flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Course Not Found</h1>
                    <Link to="/learning">
                        <Button variant="outline" className="bg-BODYDARKBG border-gray-700 text-white hover:bg-gray-700">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Courses
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:bg-BODYDARKBG">
            {/* Header */}
            <div className="bg-bodyBg border-b dark:border-gray-700 border-black">
                <div className="container mx-auto px-4 py-6">
                    <Link to={token ? "/dashboard/learn-with-mypromosphere" : "/learning"}>
                        <Button variant="ghost" className="text-white hover:text-white hover:bg-blue bg-blue/50 mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Courses
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Course Header */}
                        <div className={`${course.gradient} bg-white rounded-xl p-8 mb-8`}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-6xl">{course.icon}</div>
                                <div>
                                    {course.level && (
                                        <Badge className="bg-white text-gray-900 hover:bg-gray-100 mb-2">
                                            {course.level}
                                        </Badge>
                                    )}
                                    <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-blue">
                                        {course.title}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Course Description */}
                        <div className="dark:bg-DARKBG bg-white rounded-xl p-6 mb-8">
                            <h2 className="text-xl font-semibold dark:text-white mb-4">About This Course</h2>
                            <p className="jost dark:text-gray-300 text-gray-500 leading-relaxed">
                                {course.fullDescription}
                            </p>
                        </div>

                        {/* Course Modules */}
                        <div className="dark:bg-DARKBG bg-white rounded-xl p-6">
                            <h2 className="text-xl font-semibold dark:text-white text-black mb-4">Course Modules</h2>
                            <div className="space-y-3">
                                {course.modules?.map((module, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 dark:bg-BODYDARKBG bg-blue/20 rounded-lg">
                                        <div className="bg-purple-600 dark:text-white text-blue rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                                            {index + 1}
                                        </div>
                                        <span className="dark:text-gray-300 ">{module}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="dark:bg-DARKBG bg-white rounded-xl p-6 sticky top-8">
                            <h3 className="text-lg font-semibold dark:text-white mb-4">Course Details</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-blue" />
                                    <span className="dark:text-gray-300 text-gray-700">{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="h-5 w-5 text-blue" />
                                    <span className="dark:text-gray-300 text-gray-700">{course.price}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BookOpen className="h-5 w-5 text-blue" />
                                    <span className="dark:text-gray-300 text-gray-700">{course.modules?.length || 0} Modules</span>
                                </div>
                            </div>

                            {course.progress !== undefined && (
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="dark:text-gray-400 text-gray-700">Progress</span>
                                        <span className="dark:text-white">{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-blue/50 rounded-full h-3">
                                        <div 
                                            className="bg-blue h-3 rounded-full transition-all duration-300" 
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {course.progress !== undefined ? (
                                <Button className="w-full bg-blue/50 hover:bg-blue dark:text-white text-white">
                                    Continue Learning
                                </Button>
                            ) : (
                                <CourseEnrollementForm courseTitle={course.title}>
                                    <Button className="w-full bg-blue/50 hover:bg-blue dark:text-white text-white">
                                        Start Course
                                    </Button>
                                </CourseEnrollementForm>
                            )}
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    );
}

export default CoursePage