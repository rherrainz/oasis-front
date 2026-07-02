import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminAuditLogsPage from "./AdminAuditLogsPage";
import { api, getSession } from "../services/api";

vi.mock("../services/api", async () => {
  const actual = await vi.importActual("../services/api");
  return {
    ...actual,
    getSession: vi.fn(),
    api: {
      listAuditLogs: vi.fn()
    }
  };
});

describe("AdminAuditLogsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("blocks non-admin users", () => {
    getSession.mockReturnValue({ role: "author" });

    render(<AdminAuditLogsPage />);

    expect(screen.getByText(/solo los administradores/i)).toBeInTheDocument();
    expect(api.listAuditLogs).not.toHaveBeenCalled();
  });

  it("renders audit logs for admin users and applies filters", async () => {
    getSession.mockReturnValue({ role: "admin" });
    api.listAuditLogs
      .mockResolvedValueOnce([
        {
          id: 1,
          userEmail: "admin@example.com",
          action: "POST_CREATED",
          entity: "Post",
          entityId: 12,
          detail: "Post creado: Node y React",
          createdAt: "2026-07-01T20:00:00.000Z"
        }
      ])
      .mockResolvedValueOnce([]);

    render(<AdminAuditLogsPage />);

    expect(await screen.findByText("POST_CREATED")).toBeInTheDocument();
    expect(screen.getByText("Post #12")).toBeInTheDocument();
    expect(screen.getByText("Post creado: Node y React")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/acción/i), {
      target: { value: "LOGIN_FAILED" }
    });
    fireEvent.click(screen.getByRole("button", { name: /filtrar/i }));

    await waitFor(() => {
      expect(api.listAuditLogs).toHaveBeenLastCalledWith(
        expect.objectContaining({ action: "LOGIN_FAILED" })
      );
    });
  });
});
