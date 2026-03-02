import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import PropTypes from "prop-types";
import { toast } from "sonner";
import Loader from "../../loader";

const api_learn = import.meta.env.VITE_GENERAL_LEARN;

const CourseEnrollementForm = ({ children, courseTitle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    coursetype: courseTitle,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      courseTitle,
    };
    try {
      setIsLoading(true);
      const response = await fetch(`${api_learn}`, {
        method: "POST", //means am letting a user create an infomation on the server 
        headers: {
          "Content-Type": "application/vnd.api+json",   // what the header mean is what type of format does the server want
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to submit enrollment");
      }
      const result = await response.json();
      console.log("Enrollment successful:", result);
      toast.success("Enrollment successful!");
      form.reset();
      setOpen(false);
      setIsLoading(false);
    } catch (error) {
        console.log(error)
      console.error("Error submitting enrollment:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {isLoading && (
          <div className="min-h-screen z-50 fixed inset-0 bg-black bg-opacity-60">
            <Loader />
          </div>
        )}
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 bg-offwhiteBg border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">
              Enroll in {courseTitle}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-300 text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="dark:bg-gray-700 bg-white border-gray-600  placeholder:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-300 text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="dark:bg-gray-700 bg-white border-gray-600  placeholder:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-300 text-gray-700">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        type="tel"
                        className="dark:bg-gray-700 bg-white border-gray-600 placeholder:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue/50 hover:bg-blue text-white"
              >
                {isLoading ? "Enrolling..." : "Enroll Now"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

CourseEnrollementForm.propTypes = {
  children: PropTypes.any,
  courseTitle: PropTypes.any,
};

export default CourseEnrollementForm;
