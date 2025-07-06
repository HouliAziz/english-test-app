"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
    return (
        <nav className="w-full bg-gray-300 shadow-md sticky top-0 z-50">
            <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-gray-900">
                    EnglishTest App
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-gray-700 hover:text-red-600">
                        Home
                    </Link>
                    <Link href="/statistics" className="text-gray-700 hover:text-red-600">
                        Statistics
                    </Link>
                    <Link href="/profile" className="text-gray-700 hover:text-red-600">
                        Profile
                    </Link>

                    {/* ✅ AI Section Dropdown with asChild */}
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-gray-700 hover:text-red-600">
                                    AI Section
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-white shadow-lg rounded-md p-2 w-48">
                                    <ul className="flex flex-col gap-1">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/ai/lesson"
                                                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded"
                                                >
                                                    AI Lesson
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/ai/quiz"
                                                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded"
                                                >
                                                    AI Quiz
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* CTA Button */}
                    <Link
                        href="/join"
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Join Our Course
                    </Link>
                </div>
            </div>
        </nav>
    );
}
