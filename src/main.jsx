import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import LoginPage from "./pages/login.jsx";
import CartPage from "./pages/cart.jsx";
import RegisterPage from "./pages/register.jsx";
import ProductDetailPage from "./pages/productDetails.jsx";
import CheckoutPage from "./pages/checkout.jsx";
import OrderDetails from "./pages/orderDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/productDetail/:id", element: <ProductDetailPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/orderDetails", element: <OrderDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
