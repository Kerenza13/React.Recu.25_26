import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PostForm from "../components/PostForm";

const API_URL = import.meta.env.VITE_API_URL;

export default function DashboardPage() {
  const { user } = useAuth();
  const username = user?.name || "";

  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadPosts = () => {
    fetch(`${API_URL}/posts?_sort=createdAt&_order=desc`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const createPost = async (postData) => {
    await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    loadPosts();
    setShowForm(false);
  };

  const updatePost = async (postData) => {
    await fetch(`${API_URL}/posts/${editingPost.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    loadPosts();
    setEditingPost(null);
    setShowForm(false);
  };

  const deletePost = async (id) => {
    if (!confirm("¿Eliminar este post?")) return;

    await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    });

    loadPosts();
  };

  return (
   <main className="max-w-6xl mx-auto px-6 py-12">
  <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
    <h1 className="text-3xl font-bold text-gray-900">
      Panel de administración
    </h1>

    <button
      onClick={() => {
        setEditingPost(null);
        setShowForm(true);
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
    >
      Crear nuevo post
    </button>
  </header>

  {showForm && (
    <section className="mb-12 bg-gray-50 border border-gray-200 rounded-2xl p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {editingPost ? "Editar post" : "Nuevo post"}
      </h2>

      <PostForm
        name={username}
        initialData={editingPost}
        onSubmit={editingPost ? updatePost : createPost}
      />
    </section>
  )}

  <ul className="space-y-6">
    {posts.map((p) => (
      <li
        key={p.id}
        className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <Link
          to={`/detail/${p.id}`}
          className="text-lg font-medium text-gray-900 hover:text-blue-600 transition"
        >
          {p.title}
        </Link>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditingPost(p);
              setShowForm(true);
            }}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            Editar
          </button>

          <button
            onClick={() => deletePost(p.id)}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition"
          >
            Eliminar
          </button>
        </div>
      </li>
    ))}
  </ul>
</main>
  );
}
