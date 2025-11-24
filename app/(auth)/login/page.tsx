"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authAPI } from "@/lib/api";
import { ThemeToggleWrapper } from "@/app/components/ThemeToggleWrapper";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user, token } = await authAPI.login(email, password);
      login(user, token);
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <ThemeToggleWrapper />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Login
          </h2>
          {error && (
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border dark:border-gray-600 rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border dark:border-gray-600 rounded mb-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
