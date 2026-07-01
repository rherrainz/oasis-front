import { Link } from "react-router-dom";

function CategoryBadge({ category, clickable = true }) {
  if (!category) return null;

  const className =
    "inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary-light transition dark:bg-blue-950/40 dark:text-primary-dark";

  if (!clickable) {
    return <span className={className}>{category.name}</span>;
  }

  return (
    <Link to={`/blog?category=${category.slug}`} className={`${className} hover:bg-blue-100 dark:hover:bg-blue-950`}>
      {category.name}
    </Link>
  );
}

export default CategoryBadge;
