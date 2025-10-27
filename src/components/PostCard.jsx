export default function PostCard({ post }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500">
        Por {post.authorName} — {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="mt-2 text-gray-700">{post.excerpt}</p>
    </div>
  );
}
