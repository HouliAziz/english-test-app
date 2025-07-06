export default function LessonPage() {
    return (
        <main className="min-h-screen bg-white px-6 py-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">AI Lesson: Colors</h1>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Learn About Colors</h2>
                <p className="text-gray-700 mb-4">
                    Colors are an essential part of English vocabulary. Let’s explore some basic colors with examples:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Red - The apple is red.</li>
                    <li>Blue - The sky is blue.</li>
                    <li>Green - The grass is green.</li>
                    <li>Yellow - The sun is yellow.</li>
                </ul>
                <p className="text-gray-600 mt-4">
                    Try using these words in sentences! The AI can suggest more examples if you need help.
                </p>
                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Get AI Help
                </button>
            </div>
        </main>
    );
}