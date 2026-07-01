import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { api } from "../services/api";

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .listPublishedPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-ink">Blog</h1>
        <p className="mt-3 text-slate-600">Artículos publicados y disponibles para lectura.</p>
      </div>

      {loading && <p className="text-slate-600">Cargando posts...</p>}
      {error && <p className="rounded-md bg-red-50 p-4 text-red-700">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="rounded-md bg-white p-4 text-slate-600">Todavía no hay posts publicados.</p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default BlogPage;
