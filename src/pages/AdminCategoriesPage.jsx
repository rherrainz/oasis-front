import { useEffect, useState } from "react";
import { api, getSession } from "../services/api";

const emptyForm = { name: "", slug: "", description: "" };

function AdminCategoriesPage() {
  const session = getSession();
  const isAdmin = session?.role === "admin";
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadCategories() {
    setLoading(true);
    try {
      const data = await api.listAdminCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function startEdit(category) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description || ""
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      if (editingId) {
        await api.updateCategory(editingId, form);
        setMessage("Categoría actualizada.");
      } else {
        await api.createCategory(form);
        setMessage("Categoría creada.");
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadCategories();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Eliminar esta categoría? Los posts quedarán sin categoría.")) return;

    try {
      await api.deleteCategory(id);
      await loadCategories();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <p className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          Solo los administradores pueden gestionar categorías.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
        Categorías
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Administrá las categorías principales usadas para organizar los posts.
      </p>

      {message && (
        <p className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100">
            {editingId ? "Editar categoría" : "Nueva categoría"}
          </h2>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Nombre
              <input
                name="name"
                value={form.name}
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Descripción
              <textarea
                name="description"
                value={form.description}
                onChange={updateField}
                rows="4"
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-md bg-primary-light px-4 py-2 font-semibold text-white transition hover:bg-blue-700 dark:bg-primary-dark dark:text-slate-950 dark:hover:bg-blue-300"
              >
                Guardar
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {loading ? (
            <p className="p-4 text-slate-600 dark:text-slate-300">Cargando categorías...</p>
          ) : categories.length === 0 ? (
            <p className="p-4 text-slate-600 dark:text-slate-300">No hay categorías creadas.</p>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {categories.map((category) => (
                <div key={category.id} className="grid gap-3 p-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h3 className="font-bold text-slate-950 dark:text-slate-100">{category.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{category.slug}</p>
                    {category.description && (
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(category)}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary-dark dark:hover:text-primary-dark"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category.id)}
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
      </div>
    </section>
  );
}

export default AdminCategoriesPage;
