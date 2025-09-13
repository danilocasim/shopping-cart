import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import routes from "../../routes.jsx";
import userEvent from "@testing-library/user-event";
import { products } from "../products.js";
import { vi } from "vitest";

vi.mock("../../components/hooks/useStoreAPI.jsx", () => {
  return {
    useStoreAPI: vi.fn(() => {
      return [products, false, false];
    }),
  };
});

describe("Product page component", () => {
  it("should render correctly", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    expect(screen.getAllByRole("img").length).toBe(3);
    expect(screen.getAllByRole("button", { name: "Add to Cart" }).length).toBe(
      3
    );
  });

  it("should click add to cart to add the product in Checkout", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const addToCartBtn = screen.getByTestId(/Mens Cotton Jacket/);

    await user.click(addToCartBtn);

    const checkoutLink = screen.getByTestId(/checkoutLink/);

    await user.click(checkoutLink);

    expect(screen.getByAltText(/Mens Cotton Jacket/)).toBeInTheDocument();
  });

  it("should increase the quantity when the product already exist in checkout", async () => {
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

    expect(screen.getByDisplayValue(2)).toBeInTheDocument();
  });

  it("should display quantity default value 1", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const quantity = screen.getByTestId("3-quantity");

    expect(quantity.value).toBe("1");
  });

  it("should be able to increment and decrement the button", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const increment = screen.getByTestId("3-increment");
    const decrement = screen.getByTestId("3-decrement");
    const quantity = screen.getByTestId("3-quantity");

    await user.click(increment);

    expect(quantity.value).toBe("2");

    await user.click(decrement);

    expect(quantity.value).toBe("1");
  });

  it("should be able to add a multiple product to cart", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const increment = screen.getByTestId("3-increment");

    await user.click(increment);
    await user.click(increment);

    const addToCartBtn = screen.getByTestId("Mens Cotton Jacket");

    await user.click(addToCartBtn);

    const checkoutLink = screen.getByTestId(/checkoutLink/);

    await user.click(checkoutLink);

    expect(screen.getByDisplayValue("3")).toBeInTheDocument();
  });
});
