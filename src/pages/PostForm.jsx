import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const initialForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  author: "",
  published: false
};

function PostForm({ mode, post }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image_url: post.cover_image_url,
        author: post.author,
        published: post.published
      });
    }
  }, [post]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleUpload() {
    if (!imageFile) {
      setError("Seleccioná una imagen antes de subir.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const data = await api.uploadImage(imageFile);
      setForm({ ...form, cover_image_url: data.url });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "edit") {
        await api.updatePost(post.id, form);
      } else {
        await api.createPost(form);
      }

      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Título
          <input
            name="title"
            value={form.title}
            onChange={updateField}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            required
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Slug
          <input
            name="slug"
            value={form.slug}
            onChange={updateField}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="se-genera-si-lo-dejas-vacio"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Resumen
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={updateField}
          rows="3"
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          required
        />
      </label>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Contenido
        <textarea
          name="content"
          value={form.content}
          onChange={updateField}
          rows="10"
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          required
        />
      </label>

      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Imagen principal
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:file:bg-slate-800 dark:file:text-slate-200"
          />
        </label>
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="rounded-md border border-primary-light px-4 py-2 font-semibold text-primary-light transition hover:bg-blue-50 disabled:opacity-60 dark:border-primary-dark dark:text-primary-dark dark:hover:bg-blue-950/40"
        >
          {uploading ? "Subiendo..." : "Subir"}
        </button>
      </div>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        URL de imagen
        <input
          name="cover_image_url"
          value={form.cover_image_url}
          onChange={updateField}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          required
        />
      </label>

      {form.cover_image_url && (
        <img
          src={form.cover_image_url}
          alt="Vista previa"
          className="h-56 w-full rounded-lg border border-slate-200 object-cover dark:border-slate-800"
        />
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Autor
          <input
            name="author"
            value={form.author}
            onChange={updateField}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            required
          />
        </label>
        <label className="flex items-center gap-3 self-end rounded-md border border-slate-200 p-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:text-slate-300">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={updateField}
            className="h-4 w-4 accent-primary-light dark:accent-primary-dark"
          />
          Publicado
        </label>
      </div>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-primary-light px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 dark:bg-primary-dark dark:text-slate-950 dark:hover:bg-blue-300"
      >
        {loading ? "Guardando..." : "Guardar post"}
      </button>
    </form>
  );
}

export default PostForm;
