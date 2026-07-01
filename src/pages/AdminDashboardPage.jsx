import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

function AdminDashboardPage() {
  const [posts, setPosts] = useState([]);
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadPosts() {
    setLoading(true);
    setError("");

    try {
      const data = await api.listAdminPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function updateUserField(event) {
    setUserForm({ ...userForm, [event.target.name]: event.target.value });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("¿Eliminar este post?");
    if (!confirmed) return;

    try {
      await api.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleCreateUser(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.createUser(userForm);
      setUserForm({ name: "", email: "", password: "" });
      setMessage("Usuario administrador creado.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Panel de administración</h1>
          <p className="mt-2 text-slate-600">Gestioná posts y usuarios administradores.</p>
        </div>
        <Link
          to="/admin/posts/new"
          className="rounded-md bg-oasis px-4 py-2 text-center font-semibold text-white hover:bg-teal-800"
        >
          Crear post
        </Link>
      </div>

      {message && <p className="mb-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
      {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-4">
            <h2 className="text-lg font-bold text-ink">Posts</h2>
          </div>
          {loading ? (
            <p className="p-4 text-slate-600">Cargando posts...</p>
          ) : posts.length === 0 ? (
            <p className="p-4 text-slate-600">No hay posts creados.</p>
          ) : (
            <div className="divide-y divide-slate-200">
              {posts.map((post) => (
                <div key={post.id} className="grid gap-4 p-4 md:grid-cols-[96px_1fr_auto] md:items-center">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="h-20 w-24 rounded-md object-cover"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-ink">{post.title}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${post.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        {post.published ? "Publicado" : "Borrador"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{post.excerpt}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/posts/${post.id}/edit`}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-oasis hover:text-oasis"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleCreateUser} className="h-fit rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-ink">Crear administrador</h2>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Nombre
              <input
                name="name"
                value={userForm.name}
                onChange={updateUserField}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                required
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                name="email"
                value={userForm.email}
                onChange={updateUserField}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                required
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Contraseña
              <input
                type="password"
                name="password"
                value={userForm.password}
                onChange={updateUserField}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                required
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-md bg-coral px-4 py-2 font-semibold text-white hover:bg-orange-700"
            >
              Crear usuario
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
