import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function ThemeToggleWrapper() {
  return (
    <div className="absolute top-4 right-4">
     
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <ThemeToggleWrapper />
      <div className="min-h-screen bg-linear-to-br from-purple-600 via-indigo-600 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">BlogApp</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Share your ideas, stories, and knowledge with the world. Create
            beautiful blog posts with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/register">
              <button className="bg-white text-indigo-700 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition shadow-2xl">
                click for register
              </button>
            </Link>
            <Link href="/login">
              <button className="border-2 border-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-indigo-700 transition">
                Login
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white/10 dark:bg-black/30 backdrop-blur-lg py-20">
          <div className="container mx-auto px-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Open Source</h2>
            <a
              href="https://github.com/Manish-Karke/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-900 dark:hover:bg-gray-200 transition transform hover:scale-110 shadow-2xl"
            >
              <Github size={24} />
              View on GitHub
            </a>
            <p className="mt-6 text-base opacity-75 max-w-2xl">
              Check out our source code
            </p>
          </div>
        </div>

        <div className="text-center py-16">
          <p className="text-lg opacity-90 mb-6">
            Ready to start your blogging journey?
          </p>
          <Link href="/register">
            <button className="bg-yellow-400 dark:bg-yellow-300 text-indigo-900 px-12 py-5 rounded-full text-xl font-bold hover:bg-yellow-300 dark:hover:bg-yellow-200 transform hover:scale-110 transition shadow-2xl">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
