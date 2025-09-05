import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router";

import { render, screen } from "@testing-library/react";
import App from "../../App.jsx";
import ErrorPage from "../../pages/ErrorPage.jsx";
import Products from "../../pages/Products.jsx";
import Checkout from "../../pages/Checkout.jsx";
import Homepage from "../../pages/Homepage.jsx";

describe("Navigation Component", () => {
  it("renders the content correctly", () => {
    const routes = [
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Homepage /> },
          { path: "products", element: <Products /> },
          { path: "checkout", element: <Checkout /> },
        ],
      },
    ];
    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router}></RouterProvider>);

    expect(
      screen.getByRole("heading", { name: "Shoplifts" })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Checkout" })).toBeInTheDocument();
  });
});
