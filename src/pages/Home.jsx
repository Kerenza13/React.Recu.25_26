import { useEffect, useState } from "react";
import PostList from "../components/PostList";

const API_URL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/posts?_sort=createdAt&_order=desc`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
<main className="max-w-6xl mx-auto px-6 py-16">
  <header className="mb-12 text-center">
    <h1 className="text-4xl font-bold text-gray-900">
      Últimos Posts
    </h1>
    <p className="mt-3 text-gray-500">
      Descubre las publicaciones más recientes
    </p>
  </header>

  <PostList posts={posts} />
</main>
  );
}
