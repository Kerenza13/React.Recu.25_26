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
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Panel de administración</h1>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditingPost(null);
            setShowForm(true);
          }}
        >
          Crear nuevo post
        </button>
      </div>

      {showForm && (
        <div className="mt-4 border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-3">
            {editingPost ? "Editar post" : "Nuevo post"}
          </h2>

          <PostForm
            name={username}
            initialData={editingPost}
            onSubmit={editingPost ? updatePost : createPost}
          />
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {posts.map((p) => (
          <li
            key={p.id}
            className="border p-3 rounded flex justify-between items-center bg-white"
          >
            <Link
              to={`/detail/${p.id}`}
              className="font-semibold text-blue-700 hover:underline"
            >
              {p.title}
            </Link>

            <div className="space-x-3">
              <button
                className="text-blue-600"
                onClick={() => {
                  setEditingPost(p);
                  setShowForm(true);
                }}
              >
                Editar
              </button>

              <button className="text-red-600" onClick={() => deletePost(p.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
