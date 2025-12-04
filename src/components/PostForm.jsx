import { useState, useEffect } from "react";

export default function PostForm({ initialData = null, onSubmit, name }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setExcerpt(initialData.excerpt);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      excerpt,
      content,
      createdAt: Date.now(),
      authorName: name,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border p-2 rounded"
        placeholder="Título del post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Resumen corto"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded h-40"
        placeholder="Contenido completo..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Guardar
      </button>
    </form>
  );
}
