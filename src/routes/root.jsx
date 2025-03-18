import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layout";
import Dashboard from "../components/pages/dashboard";
import PageUnderConstruction from "../components/pages/pageUnderConstruction";
import AuthPage from "../components/pages/authPage";
export const PATHS = {
  DASHBOARD: "/dashboard",
  AUTH: "/authPage",
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
        path: "*",
        element: <PageUnderConstruction />,
      },
    ],
  },
  {
    path: PATHS.AUTH,
    element: <AuthPage />,
  },
]);
