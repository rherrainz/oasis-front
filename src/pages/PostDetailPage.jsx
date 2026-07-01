import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import CategoryBadge from "../components/CategoryBadge";
import TagBadge from "../components/TagBadge";

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
    return (
      <p className="mx-auto max-w-4xl px-4 py-10 text-slate-600 dark:text-slate-300">
        Cargando post...
      </p>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10">
        <p className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <Link
        to="/blog"
        className="text-sm font-semibold text-primary-light transition hover:text-blue-700 dark:text-primary-dark dark:hover:text-blue-300"
      >
        Volver al blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-slate-100">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Link
          to={`/blog?author=${encodeURIComponent(post.author?.name || "")}`}
          className="font-semibold hover:text-primary-light dark:hover:text-primary-dark"
        >
          {post.author?.name || "Autor"}
        </Link>
        <span>·</span>
        <time>{new Date(post.created_at).toLocaleDateString("es-AR")}</time>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <CategoryBadge category={post.category} />
        {post.tags?.map((tag) => (
          <TagBadge key={tag.id} tag={tag} />
        ))}
      </div>
      <img
        src={post.cover_image_url}
        alt={post.title}
        className="mt-8 aspect-[16/9] w-full rounded-lg border border-slate-200 object-cover dark:border-slate-800"
      />
      <div className="prose-content mt-8 whitespace-pre-line text-lg leading-8 text-slate-700 dark:text-slate-300">
        {post.content}
      </div>
    </article>
  );
}

export default PostDetailPage;
