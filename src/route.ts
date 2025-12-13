import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Piers from "./pages/piers/Piers";
import BoatTypes from "./pages/boat-types/BoatTypes";
import Boats from "./pages/boats/Boats";
import Products from "./pages/products/Products";
import CreatePier from "./pages/piers/CreatePier";

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
          }
        ],
      },
      {
        path: "/boat-types",
        Component: BoatTypes
      },
      {
        path: "/boats",
        Component: Boats
      },
      {
        path: "/products",
        Component: Products
      }
    ],
  },
  {
    path: "*",
    Component: NotFound,
  }
]);
