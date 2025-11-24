import Link from "next/link";

interface PostCardProps {
  post: { id: number; title: string; body: string };
  onDelete: (id: number) => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {post.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {post.body}
      </p>
      <div className="flex gap-3">
        <Link
          href={`/dashboard/edit/${post.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(post.id)}
          className="text-red-600 dark:text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
