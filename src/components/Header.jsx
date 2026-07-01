import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../services/api";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive ? "text-oasis" : "text-slate-700 hover:text-oasis"}`;

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(getToken());

  function handleLogout() {
    clearToken();
    navigate("/admin/login");
  }

  return (
    <header className="border-b border-slate-200 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="text-xl font-bold tracking-normal text-ink">
          OasisJS Blogger
        </Link>
        <nav className="flex flex-wrap items-center gap-4">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/blog" className={linkClass}>
            Blog
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            Acerca
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-coral hover:text-coral"
            >
              Salir
            </button>
          ) : (
            <NavLink to="/admin/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
