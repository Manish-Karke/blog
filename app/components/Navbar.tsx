"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { isAuthenticated } = useAuth(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link
            href={isAuthenticated() ? "/dashboard" : "/"}
            className="flex items-center"
          >
            <span className="text-2xl font-bold text-indigo-600">BlogApp</span>
          </Link>

          
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated() ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition ${
                    pathname.startsWith("/dashboard")
                      ? "text-indigo-600 dark:text-indigo-400"
                      : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/create"
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  + New Post
                </Link>

             
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? (
                    <Moon size={20} className="text-gray-800" />
                  ) : (
                    <Sun size={20} className="text-yellow-400" />
                  )}
                </button>

                <div className="flex items-center gap-3 border-l dark:border-gray-700 pl-6">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Hi, {user?.username}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Register
                </Link>

                
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? (
                    <Moon size={20} className="text-gray-800" />
                  ) : (
                    <Sun size={20} className="text-yellow-400" />
                  )}
                </button>
              </>
            )}
          </div>


          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {theme === "light" ? (
                <Moon size={20} className="text-gray-800" />
              ) : (
                <Sun size={20} className="text-yellow-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
