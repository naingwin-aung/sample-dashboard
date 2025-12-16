import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Piers from "./pages/piers/Piers";
import BoatTypes from "./pages/boat-types/BoatTypes";
import Boats from "./pages/boats/Boats";
import Products from "./pages/products/Products";
import CreatePier from "./pages/piers/CreatePier";
import EditPier from "./pages/piers/EditPier";
import CreateBoatType from "./pages/boat-types/CreateBoatType";
import EditBoatType from "./pages/boat-types/EditBoatType";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "/piers",
        children: [
          {
            index: true,
            Component: Piers,
          },
          {
            path: "create",
            Component: CreatePier,
          },
          {
            path: "edit/:id",
            Component: EditPier,
          },
        ],
      },
      {
        path: "/boat-types",
        children: [
          {
            index: true,
            Component: BoatTypes,
          },
          {
            path: "create",
            Component: CreateBoatType,
          },
          {
            path: "edit/:id",
            Component: EditBoatType,
          },
        ]
      },
      {
        path: "/boats",
        Component: Boats
      },
      {
        path: "/products",
        children: [
          {
            index: true,
            Component: Products,
          },
          {
            path: "create",
            Component: CreateProduct,
          },
          {
            path: "edit/:id",
            Component: EditProduct,
          },
        ]
      }
    ],
  },
  {
    path: "*",
    Component: NotFound,
  }
]);
