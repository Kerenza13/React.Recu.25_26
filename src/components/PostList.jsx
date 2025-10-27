import PostCard from "./PostCard";

export default function PostList({ posts }) {
  if (!posts || posts.length === 0)
    return <p className="text-center text-gray-500">No hay posts aún.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
