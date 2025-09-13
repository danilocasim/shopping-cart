import App from "./App";
import Checkout from "./pages/Checkout/Checkout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Homepage from "./pages/Homepage/Homepage";
import Products from "./pages/Products/Products";
import CheckoutResponse from "./pages/CheckoutResponse/CheckoutResponse";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "products", element: <Products /> },
      { path: "checkout", element: <Checkout /> },
      { path: "receipt", element: <CheckoutResponse /> },
    ],
  },
];

export default routes;
