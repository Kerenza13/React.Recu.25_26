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
    <main>
      <header>
        <h1>Panel de administración</h1>

        <button
          onClick={() => {
            setEditingPost(null);
            setShowForm(true);
          }}
        >
          Crear nuevo post
        </button>
      </header>

      {showForm && (
        <section>
          <h2>{editingPost ? "Editar post" : "Nuevo post"}</h2>

          <PostForm
            name={username}
            initialData={editingPost}
            onSubmit={editingPost ? updatePost : createPost}
          />
        </section>
      )}

      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={`/detail/${p.id}`}>{p.title}</Link>

            <div>
              <button
                onClick={() => {
                  setEditingPost(p);
                  setShowForm(true);
                }}
              >
                Editar
              </button>

              <button onClick={() => deletePost(p.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
