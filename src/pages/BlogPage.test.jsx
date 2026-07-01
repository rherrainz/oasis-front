import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BlogPage from "./BlogPage";
import { api } from "../services/api";

vi.mock("../services/api", () => ({
  api: {
    listCategories: vi.fn(),
    listTags: vi.fn(),
    listAuthors: vi.fn(),
    listPublishedPosts: vi.fn()
  }
}));

function renderBlog(initialEntry = "/blog") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("BlogPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.listCategories.mockResolvedValue([{ id: 1, name: "Backend", slug: "backend" }]);
    api.listTags.mockResolvedValue([{ id: 1, name: "API", slug: "api" }]);
    api.listAuthors.mockResolvedValue([{ id: 1, name: "Rodrigo", role: "admin" }]);
    api.listPublishedPosts.mockResolvedValue([]);
  });

  it("loads filters from query params and requests filtered posts", async () => {
    renderBlog("/blog?search=node&category=backend&tag=api&author=Rodrigo");

    await waitFor(() => {
      expect(api.listPublishedPosts).toHaveBeenLastCalledWith({
        search: "node",
        category: "backend",
        tag: "api",
        author: "Rodrigo"
      });
    });
  });

  it("submits text search and updates the post request", async () => {
    renderBlog();

    fireEvent.change(screen.getByPlaceholderText(/buscar por texto/i), {
      target: { value: "react" }
    });
    fireEvent.click(screen.getByRole("button", { name: /^buscar$/i }));

    await waitFor(() => {
      expect(api.listPublishedPosts).toHaveBeenLastCalledWith(
        expect.objectContaining({ search: "react" })
      );
    });
  });
});
