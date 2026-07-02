import { useEffect, useState } from "react";
import { api, getSession } from "../services/api";

const emptyFilters = {
  action: "",
  entity: "",
  userEmail: "",
  from: "",
  to: ""
};

const actionOptions = [
  "LOGIN_SUCCESS",
  "LOGIN_FAILED",
  "USER_CREATED",
  "POST_CREATED",
  "POST_UPDATED",
  "POST_DELETED",
  "POST_PUBLISHED",
  "POST_UNPUBLISHED",
  "CATEGORY_CREATED",
  "CATEGORY_UPDATED",
  "CATEGORY_DELETED",
  "IMAGE_UPLOADED"
];

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

function AdminAuditLogsPage() {
  const session = getSession();
  const isAdmin = session?.role === "admin";
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadLogs(params = appliedFilters) {
    setLoading(true);
    setError("");

    try {
      const data = await api.listAuditLogs(params);
      setLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAdmin) {
      loadLogs(emptyFilters);
    }
  }, [isAdmin]);

  function updateFilter(event) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAppliedFilters(filters);
    loadLogs(filters);
  }

  function clearFilters() {
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    loadLogs(emptyFilters);
  }

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <p className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          Solo los administradores pueden ver los logs de auditoría.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
          Logs de auditoría
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Eventos administrativos registrados por la aplicación.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="grid gap-3 md:grid-cols-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Acción
            <select
              name="action"
              value={filters.action}
              onChange={updateFilter}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="">Todas</option>
              {actionOptions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Entidad
            <input
              name="entity"
              value={filters.entity}
              onChange={updateFilter}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="Post"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Usuario
            <input
              type="email"
              name="userEmail"
              value={filters.userEmail}
              onChange={updateFilter}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="admin@example.com"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Desde
            <input
              type="date"
              name="from"
              value={filters.from}
              onChange={updateFilter}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Hasta
            <input
              type="date"
              name="to"
              value={filters.to}
              onChange={updateFilter}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="submit"
            className="rounded-md bg-primary-light px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-primary-dark dark:text-slate-950 dark:hover:bg-blue-300"
          >
            Filtrar
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary-dark dark:hover:text-primary-dark"
          >
            Limpiar
          </button>
        </div>
      </form>

      {error && (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <p className="p-4 text-slate-600 dark:text-slate-300">Cargando auditoría...</p>
        ) : logs.length === 0 ? (
          <p className="p-4 text-slate-600 dark:text-slate-300">No hay eventos para los filtros seleccionados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
              <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Fecha</th>
                  <th className="px-4 py-3 font-semibold">Usuario</th>
                  <th className="px-4 py-3 font-semibold">Acción</th>
                  <th className="px-4 py-3 font-semibold">Entidad</th>
                  <th className="px-4 py-3 font-semibold">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {logs.map((log) => (
                  <tr key={log.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600 dark:text-slate-300">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {log.userEmail || (log.userId ? `Usuario #${log.userId}` : "Sistema")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-950 dark:text-slate-100">
                      {log.action}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600 dark:text-slate-300">
                      {log.entity}
                      {log.entityId ? ` #${log.entityId}` : ""}
                    </td>
                    <td className="min-w-64 px-4 py-3 text-slate-600 dark:text-slate-300">
                      {log.detail || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminAuditLogsPage;
