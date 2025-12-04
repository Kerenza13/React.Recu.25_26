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

  if (!post) return <p className="text-center mt-10 text-gray-500">Cargando...</p>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-3">{post.title}</h1>

      <p className="text-sm text-gray-500 mb-6">
        Por {post.authorName} — {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <p className="text-lg text-gray-800 whitespace-pre-line">
        {post.content}
      </p>
    </main>
  );
}
