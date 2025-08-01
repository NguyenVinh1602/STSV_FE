"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react"; 
import { Eye, EyeOff } from "lucide-react"; 
import Link from "next/link";
import { useRouter } from 'next/navigation';

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
// import { cn } from "@/lib/utils"; 

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Tên người dùng phải có ít nhất 2 ký tự.",
  }),
  email: z.string().email({
    message: "Địa chỉ email không hợp lệ.",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Xác nhận mật khẩu phải có ít nhất 6 ký tự.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp.",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: SignUpFormValues) {
    console.log("Signup data:", values);
    toast.success("Đăng ký thành công!", {
      description: "Tài khoản của bạn đã được tạo thành công.",
      duration: 3000,
    });
    // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    router.push('/login');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Username Field */}
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
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ví dụ: ban@email.com" type="email" {...field} className="text-white bg-neutral-700 border-neutral-600 focus:ring-indigo-500 focus:border-indigo-500" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Mật khẩu của bạn"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="pr-10 text-white bg-neutral-700 border-neutral-600 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Nhập lại mật khẩu của bạn"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    className="pr-10 text-white bg-neutral-700 border-neutral-600 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white"
                    aria-label={showConfirmPassword ? "Ẩn xác nhận mật khẩu" : "Hiện xác nhận mật khẩu"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg">Đăng ký</Button>
         <p className="mt-4 text-center text-sm text-neutral-400">
                    Bạn đã có tài khoản?{' '}
                    <Link href="login" className="font-medium text-indigo-400 hover:text-indigo-300">
                        Đăng nhập
                    </Link>
                </p>
      </form>
    </Form>
  );
}
