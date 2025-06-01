import { LoginForm } from "./_components/formLogin";

export default function LoginPage() {
    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-800" 
        >
            <div className="relative z-10 w-full max-w-md p-8 bg-white dark:bg-neutral-700 rounded-xl shadow-2xl mx-4"> 
                <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-50 mb-4"> 
                    Welcome Back!
                </h1>
                <p className="text-center text-gray-900 dark:text-white mb-8">
                    Sign in to continue to your account.
                </p>
                <LoginForm />
            </div>
        </div>
    );
}