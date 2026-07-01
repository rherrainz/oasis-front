import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import PostForm from "./PostForm";

function EditPostPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .listAdminPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const post = useMemo(() => posts.find((item) => item.id === Number(id)), [posts, id]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
        Editar post
      </h1>
      {loading && <p className="text-slate-600 dark:text-slate-300">Cargando post...</p>}
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}
      {!loading && !error && !post && (
        <p className="rounded-md border border-slate-200 bg-white p-4 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Post no encontrado.
        </p>
      )}
      {post && <PostForm mode="edit" post={post} />}
    </section>
  );
}

export default EditPostPage;
