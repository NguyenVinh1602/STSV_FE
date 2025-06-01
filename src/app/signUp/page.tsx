import { SignUpForm } from  "./_components/formSignUp";
import { Toaster } from "sonner"; 

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-neutral-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-neutral-700">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create New Account
        </h1>
        <SignUpForm />
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}