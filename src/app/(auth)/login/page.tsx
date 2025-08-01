'use client';

import { LoginForm } from "@/components/auth/formLogin";
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white font-inter" 
        >
            {/* Header with Logo */}
            <header className="absolute top-0 left-0 w-full p-6 z-20">
                <Link href="/" className="text-3xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                    STSV
                </Link>
            </header>

            <div className="relative z-10 w-full max-w-md p-8 bg-neutral-800 rounded-xl shadow-2xl mx-4 border border-neutral-700"> 
                <h1 className="text-3xl font-extrabold text-center text-white mb-4"> 
                    Chào mừng trở lại!
                </h1>
                <p className="text-center text-neutral-400 mb-8">
                    Đăng nhập để tiếp tục vào tài khoản của bạn.
                </p>
                <LoginForm />
            </div>
        </div>
    );
}
