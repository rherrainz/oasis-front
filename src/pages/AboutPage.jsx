function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-100">
        Acerca del sitio
      </h1>
      <div className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-white p-6 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p>
          OasisJS Blogger es una aplicación web creada para un trabajo universitario. El objetivo es
          demostrar una arquitectura clara con frontend React y backend Express separados.
        </p>
        <p>
          El sitio permite publicar artículos, administrar posts con autenticación JWT y guardar
          imágenes principales en Cloudinary.
        </p>
      </div>
    </section>
  );
}

export default AboutPage;
