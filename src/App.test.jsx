import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./services/api", async () => {
  const actual = await vi.importActual("./services/api");
  return {
    ...actual,
    getToken: vi.fn(() => null),
    api: {
      listCategories: vi.fn(() => Promise.resolve([])),
      listTags: vi.fn(() => Promise.resolve([])),
      listAuthors: vi.fn(() => Promise.resolve([])),
      listPublishedPosts: vi.fn(() => Promise.resolve([]))
    }
  };
});

describe("App navigation", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders the welcome page at root", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /blogger moderno/i })).toBeInTheDocument();
  });

  it("renders the about page route", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /acerca del sitio/i })).toBeInTheDocument();
  });
});
