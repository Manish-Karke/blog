"use client";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { ThemeToggleWrapper } from "../components/ThemeToggleWrapper";

export default function Dashboard() {
  const { posts, loading, error, deletePost } = usePosts();
  useAuth();

  if (loading)
    return (
      <p className="text-center py-10 text-gray-600 dark:text-gray-400">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 dark:text-red-400 text-center">{error}</p>
    );

  return (
    <>
      <ThemeToggleWrapper />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Blog Posts
            </h1>
            <Link
              href="/dashboard/create"
              className="bg-green-600 dark:bg-green-500 text-white px-5 py-3 rounded hover:bg-green-700 dark:hover:bg-green-600 transition"
            >
              + New Post
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={deletePost} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
