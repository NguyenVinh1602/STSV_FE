import { LoginForm } from "./_components/formLogin";

export default function LoginPage() {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                // Using a placeholder background image. You can replace it with your own image URL.
                backgroundImage: `url('https://placehold.co/1920x1080/E0E0E0/333333?text=Abstract+Background')`,
                fontFamily: 'Inter, sans-serif' // Apply Inter font
            }}
        >
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl mx-4">
                <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
                    Welcome Back!
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Sign in to continue to your account.
                </p>
                {/* Using your LoginForm */}
                <LoginForm />
            </div>
        </div>
    );
}
