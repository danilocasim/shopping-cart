import App from "./App";
import Checkout from "./pages/Checkout/Checkout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Homepage from "./pages/Homepage/Homepage";
import Products from "./pages/Products/Products";

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

export default routes;
