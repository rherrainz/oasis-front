import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.16),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.12),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-129px)] max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="max-w-2xl space-y-7">
          <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Blog universitario · Sistemas Multiplataformas
          </div>
          <div className="space-y-4">
            <p className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="text-primary-light dark:text-primary-dark">Oasis</span>
              <span className="text-secondary-light dark:text-secondary-dark">JS</span>
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-slate-100">
              Blogger moderno con panel de administración.
            </h1>
          </div>
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
            Una aplicación web responsive para publicar artículos, administrar contenido y presentar
            una arquitectura clara con React, Express, PostgreSQL, Prisma y Cloudinary.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/blog"
              className="inline-flex justify-center rounded-md bg-primary-light px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 dark:bg-primary-dark dark:text-slate-950 dark:hover:bg-blue-300"
            >
              Ingresar al blog
            </Link>
            <Link
              to="/about"
              className="inline-flex justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary-dark dark:hover:text-primary-dark"
            >
              Acerca del proyecto
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
            alt="Mesa de trabajo para escribir artículos"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
          <div className="grid gap-3 pt-4 sm:grid-cols-3">
            {["React", "Express", "PostgreSQL"].map((item) => (
              <div
                key={item}
                className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
