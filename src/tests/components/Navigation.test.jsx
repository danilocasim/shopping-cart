import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import routes from "../../routes.jsx";

describe("Navigation Component", () => {
  it("renders the content correctly", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    expect(
      screen.getByRole("heading", { name: "Shoplifts" })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Checkout" })).toBeInTheDocument();
  });
});
