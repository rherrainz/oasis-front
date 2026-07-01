import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

function PostDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getPostBySlug(slug)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p className="mx-auto max-w-4xl px-4 py-10 text-slate-600">Cargando post...</p>;
  }

  if (error) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10">
        <p className="rounded-md bg-red-50 p-4 text-red-700">{error}</p>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/blog" className="text-sm font-semibold text-oasis hover:text-teal-800">
        Volver al blog
      </Link>
      <h1 className="mt-4 text-4xl font-bold text-ink">{post.title}</h1>
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
        <span>{post.author}</span>
        <span>·</span>
        <time>{new Date(post.created_at).toLocaleDateString("es-AR")}</time>
      </div>
      <img
        src={post.cover_image_url}
        alt={post.title}
        className="mt-8 aspect-[16/9] w-full rounded-lg object-cover"
      />
      <div className="prose-content mt-8 whitespace-pre-line text-lg text-slate-700">
        {post.content}
      </div>
    </article>
  );
}

export default PostDetailPage;
