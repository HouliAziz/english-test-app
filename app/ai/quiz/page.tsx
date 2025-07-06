export default function QuizPage() {
    return (
        <main className="min-h-screen bg-white px-6 py-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">AI Quiz: Colors</h1>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Your Knowledge</h2>
                <div className="space-y-6">
                    <div>
                        <p className="text-gray-700 mb-2">What color is the sky?</p>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input type="radio" name="q1" className="mr-2" />
                                <span className="text-gray-700">Red</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="q1" className="mr-2" />
                                <span className="text-gray-700">Blue</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="q1" className="mr-2" />
                                <span className="text-gray-700">Green</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-700 mb-2">What color is an apple?</p>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input type="radio" name="q2" className="mr-2" />
                                <span className="text-gray-700">Yellow</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="q2" className="mr-2" />
                                <span className="text-gray-700">Red</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="q2" className="mr-2" />
                                <span className="text-gray-700">Blue</span>
                            </label>
                        </div>
                    </div>
                </div>
                <button className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Submit Quiz
                </button>
            </div>
        </main>
    );
}