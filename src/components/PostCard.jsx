import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100">
      <Link
        to={`/detail/${post.id}`}
        className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition"
      >
        {post.title}
      </Link>

      <p className="text-sm text-gray-500 mt-2">
        Por <span className="font-medium">{post.authorName}</span> —{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <p className="text-gray-700 mt-4 leading-relaxed">
        {post.excerpt}
      </p>
    </div>
  );
}