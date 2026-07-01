import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, beforeEach } from "vitest";
import Header from "./Header";

describe("Header", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders the OasisJS logo and navigation", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Oasis")).toBeInTheDocument();
    expect(screen.getByText("JS")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /blog/i })).toBeInTheDocument();
  });

  it("toggles dark mode and persists the selected theme", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole("button", { name: /alternar modo/i })[0]);

    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("oasisjs_theme")).toBe("dark");
  });
});
