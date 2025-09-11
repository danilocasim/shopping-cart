import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import routes from "../../routes.jsx";
import userEvent from "@testing-library/user-event";

describe("Product page component", () => {
  it.only("should render correctly", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    await waitForElementToBeRemoved(screen.queryByText("Loading..."), {
      timeout: 5000,
    });

    expect(screen.getAllByRole("img").length).toBe(20);
    expect(screen.getAllByRole("button", { name: "Add to Cart" }).length).toBe(
      20
    );
  });

  it("should click add to cart to add the product in Checkout", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    await waitFor(
      () => expect(screen.queryByText("Loading...")).not.toBeInTheDocument(),
      {
        timeout: 3000,
      }
    );

    const addToCartBtn = screen.getByTestId(/Mens Cotton Jacket/);

    await user.click(addToCartBtn);

    const checkoutLink = screen.getByRole("link", { name: "Checkout" });

    await user.click(checkoutLink);

    expect(screen.getByText(/Mens Cotton Jacket/)).toBeInTheDocument();
  });

  it("should increase the quantity when the product already exist in checkout", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    await waitFor(
      () => expect(screen.queryByText("Loading...")).not.toBeInTheDocument(),
      {
        timeout: 3000,
      }
    );

    const addToCartBtn = screen.getByTestId(/Mens Cotton Jacket/);

    await user.click(addToCartBtn);

    await user.click(addToCartBtn);

    const checkoutLink = screen.getByRole("link", { name: "Checkout" });

    await user.click(checkoutLink);

    expect(screen.getByText(2)).toBeInTheDocument();
  });

  it("should display quantity default value 1", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    await waitFor(
      () => expect(screen.queryByText("Loading...")).not.toBeInTheDocument(),
      {
        timeout: 3000,
      }
    );

    const quantity = screen.getByTestId("3-quantity");

    expect(quantity.value).toBe("1");
  });

  it("should be able to increment and decrement the button", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    await waitForElementToBeRemoved(
      () => expect(screen.queryByText("Loading...")),
      {
        timeout: 3000,
      }
    );

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

    await waitForElementToBeRemoved(screen.queryByText("Loading..."), {
      timeout: 3000,
    });

    const increment = screen.getByTestId("3-increment");

    await user.click(increment);
    await user.click(increment);

    const addToCartBtn = screen.getByTestId("Mens Cotton Jacket");

    await user.click(addToCartBtn);

    const checkoutLink = screen.getByRole("link", { name: "Checkout" });

    await user.click(checkoutLink);

    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
