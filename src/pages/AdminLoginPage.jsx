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
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-3xl font-bold text-ink">Login de administración</h1>
      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-5 grid grid-cols-2 rounded-md bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode("key")}
            className={`rounded-md px-3 py-2 text-sm font-semibold ${mode === "key" ? "bg-white text-oasis shadow-sm" : "text-slate-600"}`}
          >
            Clave inicial
          </button>
          <button
            type="button"
            onClick={() => setMode("user")}
            className={`rounded-md px-3 py-2 text-sm font-semibold ${mode === "user" ? "bg-white text-oasis shadow-sm" : "text-slate-600"}`}
          >
            Usuario
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "key" ? (
            <label className="block text-sm font-medium text-slate-700">
              Clave de administrador
              <input
                type="password"
                name="adminKey"
                value={form.adminKey}
                onChange={updateField}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                required
              />
            </label>
          ) : (
            <>
              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Contraseña
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={updateField}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </label>
            </>
          )}
          {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-oasis px-4 py-2 font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLoginPage;
