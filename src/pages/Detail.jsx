import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Detail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <p>Cargando...</p>;

  return (
    <main>
      <h1>{post.title}</h1>

      <p>
        Por {post.authorName} — {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <p>{post.content}</p>
    </main>
  );
}
