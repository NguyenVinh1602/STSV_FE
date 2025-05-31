"use client"; // Ensures this is a Client Component in Next.js

import React, { useState } from 'react'; // Import useState
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Ensure you have 'sonner' installed and ToastProvider configured

// Import components from shadcn/ui.
// Make sure you have installed and added these components to your project.
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from 'lucide-react'; // Import eye icons from lucide-react

// Define form validation schema
const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// Your LoginForm component, with logic preserved and display refined
export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Function to handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Login data:", values);

    // Simulated login logic
    if (values.username === "user" && values.password === "password123") {
      toast.success("Login successful!", {
        description: "You have successfully logged into the system.",
        duration: 3000,
      });
      router.push("/chat"); // Redirect after successful login
    } else {
      toast.error("Login failed.", {
        description: "Incorrect username or password.",
        duration: 3000,
      });
      form.setError("password", { message: "Incorrect password." }); // Set error for password field
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                {/* Added text-gray-900 to ensure text visibility */}
                <Input placeholder="you@example.com" {...field} className="text-gray-900" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative"> {/* Use a relative container for the input and icon */}
                  <Input
                    type={showPassword ? "text" : "password"} // Toggle input type
                    placeholder="Enter your password"
                    {...field}
                    className="pr-10 text-gray-900" // Added text-gray-900 and padding to the right for the icon
                  />
                  <Button
                    type="button" // Important: Prevent form submission
                    variant="ghost" // Use ghost variant for a subtle button
                    size="sm" // Small size for the icon button
                    className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3"
                    onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign Up
            </a>
        </p>
      </form>
    </Form>
  );
}
