const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const TOKEN_KEY = "oasisjs_blogger_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getSession() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    return null;
  }
}

async function request(path, options = {}) {
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...options.headers
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "No se pudo completar la operación.");
  }

  return data;
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function toQueryString(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export const api = {
  listPublishedPosts: (params) => request(`/posts${toQueryString(params)}`),
  getPostBySlug: (slug) => request(`/posts/${slug}`),
  listCategories: () => request("/categories"),
  listTags: () => request("/tags"),
  listAuthors: () => request("/authors"),
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  createUser: (payload) =>
    request("/users", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload)
    }),
  listAdminPosts: (params) => request(`/admin/posts${toQueryString(params)}`, { headers: authHeaders() }),
  listAdminCategories: () => request("/admin/categories", { headers: authHeaders() }),
  createCategory: (payload) =>
    request("/admin/categories", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload)
    }),
  updateCategory: (id, payload) =>
    request(`/admin/categories/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(payload)
    }),
  deleteCategory: (id) =>
    request(`/admin/categories/${id}`, {
      method: "DELETE",
      headers: authHeaders()
    }),
  listAdminTags: () => request("/admin/tags", { headers: authHeaders() }),
  listAdminAuthors: () => request("/admin/authors", { headers: authHeaders() }),
  createPost: (payload) =>
    request("/admin/posts", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload)
    }),
  updatePost: (id, payload) =>
    request(`/admin/posts/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(payload)
    }),
  deletePost: (id) =>
    request(`/admin/posts/${id}`, {
      method: "DELETE",
      headers: authHeaders()
    }),
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return request("/admin/upload", {
      method: "POST",
      headers: authHeaders(),
      body: formData
    });
  }
};
