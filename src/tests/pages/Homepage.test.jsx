import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import routes from "../../routes.jsx";
import { userEvent } from "@testing-library/user-event";

describe("Homepage component", () => {
  it("should render correctly", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    expect(screen.getByTestId("heroImage")).toBeInTheDocument();
    expect(screen.getByTestId("homepageDescription")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Shop Now!/ })).toBeInTheDocument();
  });

  it("should navigate to the products page once clicked the Shop Now link", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router}></RouterProvider>);

    const shopNowLink = screen.getByRole("link", { name: /Shop Now!/ });

    await user.click(shopNowLink);

    expect(
      screen.getByRole("heading", { name: "Products" })
    ).toBeInTheDocument();
  });
});
