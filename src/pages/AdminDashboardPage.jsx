import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import CategoryBadge from "../components/CategoryBadge";
import TagBadge from "../components/TagBadge";

function AdminDashboardPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filters, setFilters] = useState({ status: "", category: "", tag: "", author: "" });
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", role: "author" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadPosts() {
    setLoading(true);
    setError("");

    try {
      const data = await api.listAdminPosts(filters);
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
    Promise.all([api.listAdminCategories(), api.listAdminTags(), api.listAdminAuthors()])
      .then(([categoryData, tagData, authorData]) => {
        setCategories(categoryData);
        setTags(tagData);
        setAuthors(authorData);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    loadPosts();
  }, [filters]);

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
      setUserForm({ name: "", email: "", password: "", role: "author" });
      setMessage("Usuario administrador creado.");
    } catch (err) {
      setError(err.message);
    }
  }

  function updateFilter(event) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
            Panel de administración
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Gestioná posts y usuarios administradores.
          </p>
        </div>
        <Link
          to="/admin/posts/new"
          className="rounded-md bg-primary-light px-4 py-2 text-center font-semibold text-white transition hover:bg-blue-700 dark:bg-primary-dark dark:text-slate-950 dark:hover:bg-blue-300"
        >
          Crear post
        </Link>
        <Link
          to="/admin/categories"
          className="rounded-md border border-slate-300 px-4 py-2 text-center font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary-dark dark:hover:text-primary-dark"
        >
          Categorías
        </Link>
        <Link
          to="/admin/audit-logs"
          className="rounded-md border border-slate-300 px-4 py-2 text-center font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary-dark dark:hover:text-primary-dark"
        >
          Auditoría
        </Link>
      </div>

      {message && (
        <p className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100">Posts</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <select
                name="status"
                value={filters.status}
                onChange={updateFilter}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">Todos los estados</option>
                <option value="published">Publicados</option>
                <option value="draft">Borradores</option>
              </select>
              <select
                name="category"
                value={filters.category}
                onChange={updateFilter}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                name="tag"
                value={filters.tag}
                onChange={updateFilter}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">Todos los tags</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.slug}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <select
                name="author"
                value={filters.author}
                onChange={updateFilter}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">Todos los autores</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {loading ? (
            <p className="p-4 text-slate-600 dark:text-slate-300">Cargando posts...</p>
          ) : posts.length === 0 ? (
            <p className="p-4 text-slate-600 dark:text-slate-300">No hay posts creados.</p>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {posts.map((post) => (
                <div key={post.id} className="grid gap-4 p-4 md:grid-cols-[96px_1fr_auto] md:items-center">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="h-20 w-24 rounded-md object-cover"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-950 dark:text-slate-100">{post.title}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${post.published ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}
                      >
                        {post.published ? "Publicado" : "Borrador"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {post.author?.name || "Autor sin definir"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <CategoryBadge category={post.category} clickable={false} />
                      {post.tags?.slice(0, 4).map((tag) => (
                        <TagBadge key={tag.id} tag={tag} clickable={false} />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/admin/posts/${post.id}/edit`}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary-dark dark:hover:text-primary-dark"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={handleCreateUser}
          className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100">Crear administrador</h2>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Nombre
              <input
                name="name"
                value={userForm.name}
                onChange={updateUserField}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                required
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
              <input
                type="email"
                name="email"
                value={userForm.email}
                onChange={updateUserField}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                required
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Contraseña
              <input
                type="password"
                name="password"
                value={userForm.password}
                onChange={updateUserField}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                required
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Rol
              <select
                name="role"
                value={userForm.role}
                onChange={updateUserField}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="author">Autor</option>
                <option value="admin">Administrador</option>
              </select>
            </label>
            <button
              type="submit"
              className="w-full rounded-md bg-secondary-light px-4 py-2 font-semibold text-white transition hover:bg-teal-600 dark:bg-secondary-dark dark:text-slate-950 dark:hover:bg-teal-300"
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
