import { Link } from "react-router-dom";

function TagBadge({ tag, clickable = true }) {
  if (!tag) return null;

  const className =
    "inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-secondary-light transition dark:bg-teal-950/40 dark:text-secondary-dark";

  if (!clickable) {
    return <span className={className}>#{tag.name}</span>;
  }

  return (
    <Link to={`/blog?tag=${tag.slug}`} className={`${className} hover:bg-teal-100 dark:hover:bg-teal-950`}>
      #{tag.name}
    </Link>
  );
}

export default TagBadge;
