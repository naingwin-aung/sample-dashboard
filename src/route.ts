import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Piers from "./pages/piers/Piers";
import BoatTypes from "./pages/boat-types/BoatTypes";

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
        Component: Piers
      },
      {
        path: "/boat-types",
        Component: BoatTypes
      }
    ],
  },
  {
    path: "*",
    Component: NotFound,
  }
]);
