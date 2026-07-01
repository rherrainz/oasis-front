import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../services/api";

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-blue-50 text-primary-light dark:bg-slate-800 dark:text-primary-dark"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
  }`;

function Logo() {
  return (
    <span className="text-2xl font-bold tracking-tight">
      <span className="text-primary-light dark:text-primary-dark">Oasis</span>
      <span className="text-secondary-light dark:text-secondary-dark">JS</span>
    </span>
  );
}

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(getToken());
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("oasisjs_theme", theme);
  }, [theme]);

  function handleLogout() {
    clearToken();
    setMenuOpen(false);
    navigate("/admin/login");
  }

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link to="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <nav className="flex items-center gap-1">
              <NavLink to="/" className={navLinkClass}>
                Inicio
              </NavLink>
              <NavLink to="/blog" className={navLinkClass}>
                Blog
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                Acerca
              </NavLink>
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-700 dark:text-slate-300 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                >
                  Salir
                </button>
              ) : (
                <NavLink to="/admin/login" className={navLinkClass}>
                  Login
                </NavLink>
              )}
            </nav>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary-dark dark:hover:text-primary-dark"
              aria-label="Alternar modo claro y oscuro"
            >
              {theme === "dark" ? "Claro" : "Oscuro"}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-label="Alternar modo claro y oscuro"
            >
              {theme === "dark" ? "Claro" : "Oscuro"}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-expanded={menuOpen}
              aria-label="Abrir menú"
            >
              Menú
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="grid gap-1 border-t border-slate-200 py-3 md:hidden dark:border-slate-800">
            <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Inicio
            </NavLink>
            <NavLink to="/blog" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Blog
            </NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Acerca
            </NavLink>
            <NavLink to="/admin" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Admin
            </NavLink>
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-left text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-700 dark:text-slate-300 dark:hover:bg-red-950/40 dark:hover:text-red-300"
              >
                Salir
              </button>
            ) : (
              <NavLink
                to="/admin/login"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
