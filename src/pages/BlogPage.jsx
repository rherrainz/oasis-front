import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { api } from "../services/api";

function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filters = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      tag: searchParams.get("tag") || "",
      author: searchParams.get("author") || ""
    }),
    [searchParams]
  );

  useEffect(() => {
    Promise.all([api.listCategories(), api.listTags(), api.listAuthors()])
      .then(([categoryData, tagData, authorData]) => {
        setCategories(categoryData);
        setTags(tagData);
        setAuthors(authorData);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .listPublishedPosts(filters)
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters]);

  function updateFilter(name, value) {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }
    setSearchParams(nextParams);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateFilter("search", formData.get("search")?.trim() || "");
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-100">
          Blog
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Buscá publicaciones por texto, categoría, tag o autor.
        </p>
      </div>

      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <form onSubmit={handleSearchSubmit} className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <input
            name="search"
            defaultValue={filters.search}
            placeholder="Buscar por texto"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <select
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={filters.tag}
            onChange={(event) => updateFilter("tag", event.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="">Todos los tags</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.slug}>
                {tag.name}
              </option>
            ))}
          </select>
          <select
            value={filters.author}
            onChange={(event) => updateFilter("author", event.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="">Todos los autores</option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md bg-primary-light px-4 py-2 font-semibold text-white transition hover:bg-blue-700 dark:bg-primary-dark dark:text-slate-950 dark:hover:bg-blue-300"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:border-primary-light hover:text-primary-light dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary-dark dark:hover:text-primary-dark"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>

      {loading && <p className="text-slate-600 dark:text-slate-300">Cargando posts...</p>}
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}
      {!loading && !error && posts.length === 0 && (
        <p className="rounded-md border border-slate-200 bg-white p-4 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          No se encontraron publicaciones para esos filtros.
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default BlogPage;
