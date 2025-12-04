import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <Link
        to={`/detail/${post.id}`}
        className="text-xl font-bold text-blue-700 hover:underline"
      >
        {post.title}
      </Link>

      <p className="text-sm text-gray-500 mt-1">
        Por {post.authorName} — {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <p className="mt-3 text-gray-700">
        {post.excerpt}
      </p>
    </div>
  );
}
