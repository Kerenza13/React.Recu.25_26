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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Título del post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Resumen corto"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />

      <textarea
        placeholder="Contenido completo..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button>Guardar</button>
    </form>
  );
}
