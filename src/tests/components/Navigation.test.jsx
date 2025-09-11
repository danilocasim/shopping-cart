import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import routes from "../../routes.jsx";
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";
import { products } from "../products.js";

vi.mock("../../components/hooks/useStoreAPI.jsx", async (importOriginal) => {
  const importedMod = await importOriginal();
  return {
    ...importedMod,
    useStoreAPI: vi.fn(() => {
      return [products, false, false];
    }),
  };
});

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

  it("should be clickable, the links", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const productsLink = screen.getByRole("link", { name: "Products" });
    const checkoutLinks = screen.getByRole("link", { name: "Checkout" });

    await user.click(productsLink);

    expect(screen.getByText("Mens Cotton Jacket")).toBeInTheDocument();

    await user.click(checkoutLinks);

    expect(
      screen.getByRole("heading", { name: "Checkout" })
    ).toBeInTheDocument();
  });
});
