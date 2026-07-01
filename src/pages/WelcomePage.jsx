import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <section className="bg-[linear-gradient(rgba(31,41,51,0.58),rgba(31,41,51,0.45)),url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
      <div className="mx-auto flex min-h-[calc(100vh-153px)] max-w-6xl flex-col justify-center px-4 py-20 text-white">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
            Blog universitario
          </p>
          <h1 className="text-4xl font-bold tracking-normal sm:text-6xl">OasisJS Blogger</h1>
          <p className="text-lg leading-8 text-slate-100">
            Un espacio digital para publicar artículos, administrar contenidos y presentar una
            arquitectura web moderna con frontend y backend separados.
          </p>
          <Link
            to="/blog"
            className="inline-flex rounded-md bg-coral px-6 py-3 text-base font-semibold text-white hover:bg-orange-700"
          >
            Ingresar al sitio
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
