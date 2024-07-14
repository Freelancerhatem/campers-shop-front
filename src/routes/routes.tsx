import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import CartPage from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "products/:id",
        element: <ProductDetailsPage></ProductDetailsPage>,
      },
      {
        path: "products",
        element: <ProductsPage></ProductsPage>,
      },
      {
        path: "about",
        element: <AboutUsPage></AboutUsPage>,
      },
      {
        path: "cart",
        element: <CartPage></CartPage>,
      },
      {
        path: "checkout",
        element: <CheckoutPage></CheckoutPage>,
      },
    ],
  },
]);
