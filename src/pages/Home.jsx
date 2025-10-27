import { useEffect, useState } from "react";
import PostList from "../components/PostList";

const API_URL = import.meta.env.VITE_API_URL

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/posts?_sort=createdAt&_order=desc`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error cargando posts:", err));
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Últimos Posts</h1>
      <PostList posts={posts} />
    </main>
  );
}