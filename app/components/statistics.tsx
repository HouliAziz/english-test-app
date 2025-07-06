export default function StatisticsPage() {
    return (
        <main className="min-h-screen bg-white px-6 py-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Your Learning Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-900">Lessons Completed</h2>
                    <p className="text-3xl font-bold text-red-600 mt-2">12</p>
                    <p className="text-gray-600 text-sm mt-1">Out of 20 available lessons</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-900">Average Quiz Score</h2>
                    <p className="text-3xl font-bold text-red-600 mt-2">85%</p>
                    <p className="text-gray-600 text-sm mt-1">Based on 10 quizzes taken</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-900">Time Spent</h2>
                    <p className="text-3xl font-bold text-red-600 mt-2">15h 30m</p>
                    <p className="text-gray-600 text-sm mt-1">Total learning time this month</p>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h2>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <p className="text-gray-600">
                        You’re making great progress! Complete more lessons and quizzes to unlock advanced topics and improve your skills.
                    </p>
                </div>
            </div>
        </main>
    );
}