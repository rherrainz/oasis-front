import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img src={post.cover_image_url} alt={post.title} className="h-56 w-full object-cover" />
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase text-slate-500">
          <span>{post.author}</span>
          <span>·</span>
          <time>{new Date(post.created_at).toLocaleDateString("es-AR")}</time>
        </div>
        <h2 className="text-xl font-bold text-ink">{post.title}</h2>
        <p className="text-sm leading-6 text-slate-600">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex rounded-md bg-oasis px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Leer post
        </Link>
      </div>
    </article>
  );
}

export default PostCard;
