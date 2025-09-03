import App from "./App";
import Checkout from "./pages/Checkout";
import ErrorPage from "./pages/ErrorPage";
import Products from "./pages/Products";

const routes = [
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  { path: "products", element: <Products /> },
  { path: "checkout", element: <Checkout /> },
];

export default routes;
