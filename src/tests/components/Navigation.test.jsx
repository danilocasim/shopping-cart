import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";
import Navigation from "../../components/Navigation/Navigation.jsx";

describe("Navigation Component", () => {
  it("renders the content correctly", () => {
    render(<Navigation />);

    expect(screen.getByText("heading").textContent).toMatch(/Shoplifts/);
  });
});
