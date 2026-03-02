import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";

const Header = () => {
  const { token } = useStateContext();
  return (
    <>
      <header className="bg-white dark:bg-DARKBG dark:border-l dark:border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800 md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="text-black dark:text-white font-bold text-xl">codewith MypromoSphere</div>
            </div>
            <div className="flex items-center gap-3">
              <Link to={token ? "/dashboard/learn-with-mypromosphere" : "/login"}>
                <Button variant="ghost" size="icon" className="text-black dark:text-white hover:text-white hover:bg-blue">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="jost text-black dark:text-white text-2xl md:text-3xl font-bold">
              Build Real-World Skills
            </h1>
          </div>
          
          <p className="text-gray-500 dark:text-gray-300 mt-2 mb-6">
            Master software development with structured courses designed to make you job-ready.
          </p>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search" 
              className="pl-10 bg-offwhiteBg dark:bg-gray-800 border-gray-700 text-black dark:text-white placeholder-gray-400 focus:border-purple-500"
            />
          </div>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Header