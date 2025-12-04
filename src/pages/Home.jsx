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
    <main>
      <h1>Últimos Posts</h1>

      <PostList posts={posts} />
    </main>
  );
}
