export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-white px-6 py-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Your Profile</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                    <div className="space-y-2">
                        <p className="text-gray-700">Name: John Doe</p>
                        <p className="text-gray-700">Email: john.doe@example.com</p>
                        <p className="text-gray-700">Joined: June 15, 2025</p>
                    </div>
                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Edit Profile
                    </button>
                </div>
                <div className="lg:col-span-2 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-700">Lessons Completed: <span className="text-red-600 font-bold">12</span></p>
                            <p className="text-gray-700">Total Quizzes: <span className="text-red-600 font-bold">10</span></p>
                        </div>
                        <div>
                            <p className="text-gray-700">Average Score: <span className="text-red-600 font-bold">85%</span></p>
                            <p className="text-gray-700">Time Spent: <span className="text-red-600 font-bold">15h 30m</span></p>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-4">
                        Keep up the great work! Explore more lessons to boost your skills.
                    </p>
                </div>
            </div>
        </main>
    );
}