"use client";
import PostForm from "./../../components/PostForm";
import { usePosts } from "@/app/hooks/usePosts";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const { addPost } = usePosts();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { title: string; body: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      await addPost({ ...data, userId: 1 });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="max-w-3xl mx-auto p-6 mb-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}
      <PostForm onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
