'use client';

import { RegisterForm } from "@/components/auth/formRegister";
import { Toaster } from "sonner"; 
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white font-inter">
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 w-full p-6 z-20">
          <Link href="/" className="text-3xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
              STSV
          </Link>
      </header>
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-800 rounded-xl shadow-2xl mx-4 border border-neutral-700">
        <h1 className="text-2xl font-bold text-center text-white">
          Tạo tài khoản mới
        </h1>
        <RegisterForm />
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
