"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { Post } from "@/lib/api";

const schema = yup.object({
  title: yup.string().required("Title is required").min(5, "Title too short"),
  body: yup
    .string()
    .required("Content is required")
    .min(20, "Content too short"),
});

type FormData = {
  title: string;
  body: string;
};

interface PostFormProps {
  post?: Post;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
}

export default function PostForm({
  post,
  onSubmit,
  isLoading = false,
}: PostFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
    },
  });

  const onValidSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
      
    } catch (error) {
      console.error("Form submission error:", error);
     
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          {post ? "Edit Post" : "Create New Post"}
        </h1>

        <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:focus:ring-indigo-400"
              placeholder="Enter an awesome title..."
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              {...register("body")}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:focus:ring-indigo-400 resize-none"
              placeholder="Write your amazing blog post here..."
            />
            {errors.body && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.body.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {isLoading ? "Saving..." : post ? "Update Post" : "Publish Post"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
