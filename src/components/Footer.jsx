function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
        <p className="font-semibold text-slate-900 dark:text-slate-100">OasisJS Blogger</p>
        <p className="max-w-2xl sm:text-right">
          © {new Date().getFullYear()} Rodrigo Herrainz - Universidad Kennedy - Materia Sistemas
          Multiplataformas
        </p>
      </div>
    </footer>
  );
}

export default Footer;
