import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import PostCard from "./PostCard";

const post = {
  id: 1,
  title: "Post de prueba",
  slug: "post-de-prueba",
  excerpt: "Resumen del post",
  cover_image_url: "https://example.com/cover.jpg",
  created_at: "2026-07-01T12:00:00Z",
  author: { name: "Rodrigo Herrainz" },
  category: { id: 1, name: "Backend", slug: "backend" },
  tags: [{ id: 1, name: "API", slug: "api" }]
};

describe("PostCard", () => {
  it("renders post metadata, category and tags", () => {
    render(
      <MemoryRouter>
        <PostCard post={post} />
      </MemoryRouter>
    );

    expect(screen.getByText("Post de prueba")).toBeInTheDocument();
    expect(screen.getByText("Resumen del post")).toBeInTheDocument();
    expect(screen.getByText("Rodrigo Herrainz")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("#API")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /leer post/i })).toHaveAttribute(
      "href",
      "/blog/post-de-prueba"
    );
  });
});
