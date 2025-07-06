import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col px-6 lg:flex-row max-w-6xl mx-auto pt-16">
      {/* Left content - pushed more to the left */}
      <div className="lg:w-1/2 lg:pr-12"> {/* Increased right padding */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Learn English from Home
        </h1>
        <p className="text-gray-600 mb-6 mt-4">
          A fun and interactive app to master English with personalized quizzes, engaging lessons, and real-time progress tracking. Start your journey today!
        </p>
        <div className="space-x-4 mb-8">
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-lg font-medium">
            <Link href='/signup'> Get Started Now </Link>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Quizzes</h3>
            <p className="text-gray-600 text-sm">Test your skills with fun quizzes.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Lessons</h3>
            <p className="text-gray-600 text-sm">Learn at your own pace with guided lessons.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
            <p className="text-gray-600 text-sm">Track your improvement with statistics.</p>
          </div>
        </div>
      </div>

      {/* Right content - pushed more to the right with proper carousel positioning */}
      <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-12 flex justify-end relative"> {/* Increased left padding and added relative */}
        <div className="w-full max-w-sm lg:max-w-md relative"> {/* Added relative container */}
          <Carousel>
            <CarouselContent>
              <CarouselItem className="p-4">
                <div className="flex flex-col items-center justify-center h-72 bg-gray-200 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900">Sport</h3>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    Learn English vocabulary related to sports.
                  </p>
                  <img
                    src="/sport.webp"
                    alt="Sport"
                    className="w-40 h-40 object-cover mt-4 rounded"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="p-4">
                <div className="flex flex-col items-center justify-center h-72 bg-gray-200 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900">Money</h3>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    Master financial English terms and phrases.
                  </p>
                  <img
                    src="/money.png"
                    alt="Money"
                    className="w-40 h-40 object-cover mt-4 rounded"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="p-4">
                <div className="flex flex-col items-center justify-center h-72 bg-gray-200 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900">Food</h3>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    Explore English words for cooking and dining.
                  </p>
                  <img
                    src="/food.jpg"
                    alt="Food"
                    className="w-40 h-40 object-cover mt-4 rounded"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="p-4">
                <div className="flex flex-col items-center justify-center h-72 bg-gray-200 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900">Colors</h3>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    Learn to describe colors in English.
                  </p>
                  <img
                    src="/colors.png"
                    alt="Colors"
                    className="w-40 h-40 object-cover mt-4 rounded"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            {/* Position arrows correctly */}
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </div>
    </main>
  );
}