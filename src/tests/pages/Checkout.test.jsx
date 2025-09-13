import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
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

describe("Checkout page component", () => {
  it("should render the total of an item", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const addToCartBtn = screen.getByTestId(/Mens Cotton Jacket/);

    await user.click(addToCartBtn);
    await user.click(addToCartBtn);
    await user.click(addToCartBtn);

    const checkoutLink = screen.getByTestId(/checkoutLink/);

    await user.click(checkoutLink);

    expect(screen.getByTestId("allProductsTotalPrice")).toHaveTextContent(
      "$167.97"
    );
  });

  it("should change the total price of product and quantity when changing the quantity", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const addToCartBtn = screen.getByTestId(/Mens Cotton Jacket/);

    await user.click(addToCartBtn);
    await user.click(addToCartBtn);
    await user.click(addToCartBtn);

    const checkoutLink = screen.getByTestId(/checkoutLink/);

    await user.click(checkoutLink);

    const decrement = screen.getByTestId("3-decrement-checkout");
    const increment = screen.getByTestId("3-increment-checkout");

    await user.click(decrement);

    expect(screen.getByTestId("allProductsTotalPrice")).toHaveTextContent(
      "$111.98"
    );

    await user.click(increment);
    await user.click(increment);

    expect(screen.getByTestId("allProductsTotalPrice")).toHaveTextContent(
      "$223.96"
    );
  });

  it("should delete the product when reach 0 quantity", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const addToCartBtn = screen.getByTestId(/Mens Cotton Jacket/);

    await user.click(addToCartBtn);
    await user.click(addToCartBtn);

    const checkoutLink = screen.getByTestId(/checkoutLink/);

    await user.click(checkoutLink);

    const decrement = screen.getByTestId("3-decrement-checkout");

    await user.click(decrement);
    await user.click(decrement);

    await waitFor(() =>
      expect(
        screen.queryByAltText(/Mens Cotton Jacket/)
      ).not.toBeInTheDocument()
    );

    expect(screen.queryByAltText(/Mens Cotton Jacket/)).not.toBeInTheDocument();
  });
  it("should delete the product when delete button was clicked", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const addToCartBtn = screen.getByTestId(/Mens Cotton Jacket/);

    await user.click(addToCartBtn);
    await user.click(addToCartBtn);

    const checkoutLink = screen.getByTestId(/checkoutLink/);

    await user.click(checkoutLink);

    const deleteBtn = screen.getByTestId("3-delete-product");

    await user.click(deleteBtn);

    await waitFor(() =>
      expect(
        screen.queryByAltText(/Mens Cotton Jacket/)
      ).not.toBeInTheDocument()
    );

    expect(screen.queryByAltText(/Mens Cotton Jacket/)).not.toBeInTheDocument();
  });

  it("should render the total price of all products", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const jacketAddToCartBtn = screen.getByTestId(/Mens Cotton Jacket/);
    const shirtAddToCartBtn = screen.getByTestId(
      /Mens Casual Premium Slim Fit T-Shirts/
    );

    await user.click(jacketAddToCartBtn);
    await user.click(jacketAddToCartBtn);
    await user.click(shirtAddToCartBtn);

    const checkoutLink = screen.getByTestId(/checkoutLink/);

    await user.click(checkoutLink);

    expect(screen.getByTestId("allProductsTotalPrice")).toHaveTextContent(
      "$134.28"
    );
  });

  it("should checkout then remove all products in checkout then navigate to receipt page", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const addToCartBtn = screen.getByTestId(/Mens Cotton Jacket/);

    await user.click(addToCartBtn);
    await user.click(addToCartBtn);

    const checkoutLink = screen.getByTestId(/checkoutLink/);

    await user.click(checkoutLink);

    const checkout = screen.getByTestId("checkout");

    await user.click(checkout);

    expect(router.state.location.pathname).toBe("/receipt");

    await user.click(checkoutLink);

    expect(screen.queryAllByRole("img").length).toBe(0);
  });
});
