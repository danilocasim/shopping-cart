import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/App.css";
import App from "./App.jsx";

createRoot(document.querySelector("main")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
