function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>OasisJS Blogger</p>
        <p>
          © {new Date().getFullYear()} Rodrigo Herrainz - Universidad Kennedy - Materia Sistemas
          Multiplataformas
        </p>
      </div>
    </footer>
  );
}

export default Footer;
