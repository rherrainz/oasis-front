import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminLoginPage from "./AdminLoginPage";
import { api } from "../services/api";

vi.mock("../services/api", async () => {
  const actual = await vi.importActual("../services/api");
  return {
    ...actual,
    api: {
      login: vi.fn()
    },
    setToken: vi.fn()
  };
});

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

describe("AdminLoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders and submits admin key login", async () => {
    api.login.mockResolvedValue({ token: "jwt-token" });

    render(
      <MemoryRouter>
        <AdminLoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/clave de administrador/i), {
      target: { value: "secret" }
    });
    fireEvent.click(screen.getByRole("button", { name: /^ingresar$/i }));

    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith({ adminKey: "secret" });
      expect(navigateMock).toHaveBeenCalledWith("/admin");
    });
  });
});
