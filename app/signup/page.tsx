import Link from "next/link";

export default function SignInPage() {
    return (
        <main className="min-h-screen bg-white flex items-center justify-center px-6 py-8 max-w-6xl mx-auto">
            <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Sign Up</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-gray-600 text-sm mt-4 text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-red-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
}