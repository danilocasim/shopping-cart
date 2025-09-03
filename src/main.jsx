import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes.jsx";

const router = createBrowserRouter(routes);

createRoot(document.querySelector("main")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
