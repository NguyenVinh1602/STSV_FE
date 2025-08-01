"use client";

import React, { useState } from 'react'; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; 
import Link from 'next/link';
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
  username: z.string().min(2, "Tên người dùng phải có ít nhất 2 ký tự."),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
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
      toast.success("Đăng nhập thành công!", {
        description: "Bạn đã đăng nhập thành công vào hệ thống.",
        duration: 3000,
      });
      router.push("/chat");
    } else {
      toast.error("Đăng nhập thất bại.", {
        description: "Tên người dùng hoặc mật khẩu không chính xác.",
        duration: 3000,
      });
      form.setError("password", { message: "Mật khẩu không chính xác." });
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
              <FormLabel>Tên người dùng</FormLabel>
              <FormControl>
                <Input placeholder="Tên người dùng của bạn" {...field} className="text-white bg-neutral-700 border-neutral-600 focus:ring-indigo-500 focus:border-indigo-500" />
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
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <div className="relative"> 
                  <Input
                    type={showPassword ? "text" : "password"} 
                    placeholder="Nhập mật khẩu của bạn"
                    {...field}
                    className="pr-10 text-white bg-neutral-700 border-neutral-600 focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                  <Button
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3 text-neutral-400 hover:text-white"
                    onClick={() => setShowPassword((prev) => !prev)} 
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg">
          Đăng nhập
        </Button>
        <p className="mt-4 text-center text-sm text-neutral-400">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
              Đăng ký ngay
            </Link>
        </p>
      </form>
    </Form>
  );
}
