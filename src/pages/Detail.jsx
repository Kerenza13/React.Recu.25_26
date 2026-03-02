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
<main className="max-w-3xl mx-auto px-6 py-16">
  <article className="bg-white rounded-2xl shadow-md border border-gray-100 p-10">
    <h1 className="text-4xl font-bold text-gray-900 leading-tight">
      {post.title}
    </h1>

    <p className="mt-4 text-sm text-gray-500">
      Por <span className="font-medium text-gray-700">{post.authorName}</span> —{" "}
      {new Date(post.createdAt).toLocaleDateString()}
    </p>

    <div className="mt-8 text-gray-800 leading-relaxed space-y-6">
      <p>{post.content}</p>
    </div>
  </article>
</main>
  );
}
