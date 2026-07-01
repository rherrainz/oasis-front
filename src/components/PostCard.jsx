import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary-light hover:shadow-lg hover:shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-dark dark:hover:shadow-none">
      <img src={post.cover_image_url} alt={post.title} className="h-56 w-full object-cover" />
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
          <span>{post.author}</span>
          <span>·</span>
          <time>{new Date(post.created_at).toLocaleDateString("es-AR")}</time>
        </div>
        <h2 className="text-xl font-bold text-slate-950 transition group-hover:text-primary-light dark:text-slate-100 dark:group-hover:text-primary-dark">
          {post.title}
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex rounded-md bg-primary-light px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-primary-dark dark:text-slate-950 dark:hover:bg-blue-300"
        >
          Leer post
        </Link>
      </div>
    </article>
  );
}

export default PostCard;
