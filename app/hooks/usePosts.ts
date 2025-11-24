
import { useState, useEffect } from "react";
import { postsAPI, Post } from "@/lib/api";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await postsAPI.getPosts();
      setPosts(res.data);
    } catch {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (data: Omit<Post, "id">) => {
    const res = await postsAPI.createPost({ ...data, userId: 1 });
    setPosts((prev) => [res.data, ...prev]);
  };


  const updatePost = async (id: number, data: Partial<Post>) => {
    const res = await postsAPI.updatePost(id.toString(), data);
    setPosts((prev) => prev.map((p) => (p.id === res.data.id ? res.data : p)));
  };

  const deletePost = async (id: number) => {
    await postsAPI.deletePost(id.toString());
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    addPost,
    updatePost, 
    deletePost,
  };
};
