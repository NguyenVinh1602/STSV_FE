"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react"; 
import { Eye, EyeOff } from "lucide-react"; 
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { register } from '@/services/authService';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    setIsSubmitting(true);

    const result = await register({
        username: values.username,
        email: values.email,
        password: values.password
    });

    if (result.success) {
      setRegisteredEmail(values.email);
      setShowSuccessModal(true);
    } else {
      toast.error("Đăng ký thất bại.", {
        description: result.message,
        duration: 3000,
      });
    }
    setIsSubmitting(false);
  }

  const handleNavigateToVerification = () => {
    router.push(`/verify-email?email=${registeredEmail}`);
  };

  return (
    <div className="relative">
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
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </Button>
          <p className="mt-4 text-center text-sm text-neutral-400">
            Bạn đã có tài khoản?{' '}
            <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Đăng nhập
            </Link>
          </p>
        </form>
      </Form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-neutral-800 p-8 rounded-xl shadow-2xl max-w-md mx-4 text-center border border-neutral-700 transform transition-all duration-300 scale-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">Đăng ký thành công!</h2>
            <p className="text-neutral-400 mb-6">
              Chúng tôi đã gửi một mã xác nhận đến email của bạn: <span className="font-semibold text-white">{registeredEmail}</span>.
              Vui lòng kiểm tra hộp thư đến để kích hoạt tài khoản.
            </p>
            <Button
              onClick={handleNavigateToVerification}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg"
            >
              Đến trang xác nhận
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
