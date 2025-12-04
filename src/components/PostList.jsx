import PostCard from "./PostCard";

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) return <p>No hay posts aún.</p>;

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
