import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layout";
import Dashboard from "../components/pages/dashboard";
import PageUnderConstruction from "../components/pages/pageUnderConstruction";
export const PATHS = {
  DASHBOARD: "/dashboard",
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to={PATHS.DASHBOARD} replace />,
      },
      {
        path: PATHS.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: "*", // Catch-all route for unmatched paths
        element: <PageUnderConstruction />, // Render the "Page Under Construction" component
      },
    ],
  },
]);
