import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div>
      <Link to={`/detail/${post.id}`}>{post.title}</Link>

      <p>
        Por {post.authorName} — {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <p>{post.excerpt}</p>
    </div>
  );
}
