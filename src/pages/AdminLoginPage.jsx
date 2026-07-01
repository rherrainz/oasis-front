import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../services/api";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("key");
  const [form, setForm] = useState({ email: "", password: "", adminKey: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload =
        mode === "key"
          ? { adminKey: form.adminKey }
          : { email: form.email, password: form.password };
      const data = await api.login(payload);
      setToken(data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
        Login de administración
      </h1>
      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 grid grid-cols-2 rounded-md bg-slate-100 p-1 dark:bg-slate-950">
          <button
            type="button"
            onClick={() => setMode("key")}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${mode === "key" ? "bg-white text-primary-light shadow-sm dark:bg-slate-800 dark:text-primary-dark" : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100"}`}
          >
            Clave inicial
          </button>
          <button
            type="button"
            onClick={() => setMode("user")}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${mode === "user" ? "bg-white text-primary-light shadow-sm dark:bg-slate-800 dark:text-primary-dark" : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100"}`}
          >
            Usuario
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "key" ? (
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Clave de administrador
              <input
                type="password"
                name="adminKey"
                value={form.adminKey}
                onChange={updateField}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                required
              />
            </label>
          ) : (
            <>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Contraseña
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={updateField}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  required
                />
              </label>
            </>
          )}
          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary-light px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 dark:bg-primary-dark dark:text-slate-950 dark:hover:bg-blue-300"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLoginPage;
