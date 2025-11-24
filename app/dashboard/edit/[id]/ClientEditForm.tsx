"use client";

import { usePosts } from "@/app/hooks/usePosts";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PostForm from "@/app/components/PostForm";
import { Post } from "@/lib/api";

interface ClientEditFormProps {
  postId: string;
}

export default function ClientEditForm({ postId }: ClientEditFormProps) {
  const router = useRouter();
  const { updatePost } = usePosts();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);


  useEffect(() => {
    try {
      const stored = localStorage.getItem("blog_posts");
      if (stored) {
        const posts = JSON.parse(stored);
        const foundPost = posts.find((p: Post) => p.id === Number(postId));
        if (foundPost) {
          setPost(foundPost);
        }
      }
    } catch (err) {
      console.error("Error loading post:", err);
      setError("Failed to load post");
    } finally {
      setIsLoadingPost(false);
    }
  }, [postId]);

  if (isLoadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-gray-600">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl text-red-600">
        Post not found
      </div>
    );
  }

  const handleSubmit = async (data: { title: string; body: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      await updatePost(Number(postId), data);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post");
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
      <PostForm post={post} onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
