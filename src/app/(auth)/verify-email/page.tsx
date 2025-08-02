'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"; 
import { verifyEmail, resendVerificationCode } from '@/services/authService';

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

// Định nghĩa schema validation cho mã xác nhận (6 chữ số)
const verificationSchema = z.object({
  code: z.string().length(6, {
    message: "Mã xác nhận phải có đúng 6 chữ số.",
  }),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

export default function EmailVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const userEmail = searchParams.get('email');
    if (userEmail) {
      setEmail(userEmail);
    } else {
      // Nếu không có email trong URL, chuyển hướng về trang đăng ký hoặc hiển thị thông báo lỗi
      toast.error("Lỗi", { description: "Không tìm thấy email của bạn. Vui lòng đăng ký lại." });
    }
  }, [searchParams]);

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  // Xử lý khi submit form xác nhận
  async function onSubmit(values: VerificationFormValues) {
    if (!email) {
      toast.error("Lỗi", { description: "Email không tồn tại. Vui lòng đăng ký lại." });
      return;
    }

    setIsSubmitting(true);
    const result = await verifyEmail({ email, code: values.code });

    if (result.success) {
      toast.success("Xác nhận thành công!", {
        description: result.message,
      });
      router.push('/login'); // Chuyển hướng đến trang đăng nhập
    } else {
      form.setError("code", { message: result.message });
      toast.error("Xác nhận thất bại.", {
        description: result.message,
      });
    }
    setIsSubmitting(false);
  }

  // Xử lý gửi lại mã
  const handleResendCode = async () => {
    if (!email) {
      toast.error("Lỗi", { description: "Không tìm thấy email. Vui lòng đăng ký lại." });
      return;
    }
    
    toast.info("Đang gửi lại mã...", { duration: 2000 });
    const result = await resendVerificationCode(email);

    if (result.success) {
        toast.success("Đã gửi lại mã!", {
            description: result.message,
        });
    } else {
        toast.error("Gửi lại mã thất bại.", {
            description: result.message,
        });
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white font-inter"
    >
      <header className="absolute top-0 left-0 w-full p-6 z-20">
        <Link href="/" className="text-3xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
          STSV
        </Link>
      </header>

      <div className="relative z-10 w-full max-w-md p-8 bg-neutral-800 rounded-xl shadow-2xl mx-4 border border-neutral-700">
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Xác nhận tài khoản của bạn
        </h1>
        <p className="text-center text-neutral-400 mb-8">
          Chúng tôi đã gửi một mã xác nhận gồm 6 chữ số đến email: <span className="font-bold text-white">{email || "của bạn"}</span>. Vui lòng nhập mã dưới đây để kích hoạt tài khoản.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã xác nhận</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập mã xác nhận (6 chữ số)"
                      type="text"
                      {...field}
                      className="text-white bg-neutral-700 border-neutral-600 focus:ring-indigo-500 focus:border-indigo-500 text-center text-xl tracking-[0.2em]"
                      maxLength={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg" disabled={isSubmitting}>
              {isSubmitting ? "Đang xác nhận..." : "Xác nhận"}
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm text-neutral-400">
          Không nhận được mã?{' '}
          <button
            onClick={handleResendCode}
            className="font-medium text-indigo-400 hover:text-indigo-300 focus:outline-none"
            disabled={isSubmitting}
          >
            Gửi lại mã
          </button>
        </p>
      </div>
    </div>
  );
}
