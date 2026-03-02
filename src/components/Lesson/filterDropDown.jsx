import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COURSES } from "./courses";
import PropTypes from "prop-types";

const FilterDropDown = ({ courseCategory, setSearchParams }) => {
  const handleCategories = (category) => {
    setSearchParams({ courseCategory: category === "All Courses" ? "All Courses" : category });
  };
  const categories = Array.from(new Set(COURSES.map(course => course.category)));
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  variant="outline" className="dark:bg-gray-800 bg-offwhiteBg border-gray-700 text-black dark:text-white dark:hover:bg-gray-700">
          {courseCategory === "All" ? "All Courses" : courseCategory}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 border-gray-700" align="start">
        <DropdownMenuItem onSelect={() => handleCategories("All Courses")} className="text-white hover:bg-gray-700">All Courses</DropdownMenuItem>
        {categories.filter(c=> c === c).map((category, index)=> (
          <DropdownMenuItem onSelect={() => handleCategories(category)} key={index} className="text-white hover:bg-gray-700">{category}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

FilterDropDown.propTypes = {
  courseCategory: PropTypes.any,
  setSearchParams: PropTypes.any,
}

export default FilterDropDown