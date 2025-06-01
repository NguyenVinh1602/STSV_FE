"use client";

import React, { useState } from 'react'; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; 


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
import { EyeIcon, EyeOffIcon } from 'lucide-react';

// Define form validation schema
const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Login data:", values);

    if (values.username === "user" && values.password === "password123") {
      toast.success("Login successful!", {
        description: "You have successfully logged into the system.",
        duration: 3000,
      });
      router.push("/chat");
    } else {
      toast.error("Login failed.", {
        description: "Incorrect username or password.",
        duration: 3000,
      });
      form.setError("password", { message: "Incorrect password." });
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
                <div className="relative"> 
                  <Input
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password"
                    {...field}
                    className="pr-10 text-gray-900" 
                  />
                  <Button
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3"
                    onClick={() => setShowPassword((prev) => !prev)} 
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
        <p className="mt-4 text-center text-sm text-gray-900 dark:text-white">
            Don&#39;t have an account?{' '}
            <a href="#" className="font-medium text-blue-300 hover:text-blue-500">
                Sign Up
            </a>
        </p>
      </form>
    </Form>
  );
}
