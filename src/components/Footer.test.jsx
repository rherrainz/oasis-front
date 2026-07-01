import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders project copyright information", () => {
    render(<Footer />);

    expect(screen.getByText("OasisJS Blogger")).toBeInTheDocument();
    expect(screen.getByText(/Rodrigo Herrainz/)).toBeInTheDocument();
    expect(screen.getByText(/Universidad Kennedy/)).toBeInTheDocument();
  });
});
