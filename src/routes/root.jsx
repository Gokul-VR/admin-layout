import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layout";
import Dashboard from "../components/pages/dashboard";
import PageUnderConstruction from "../components/pages/pageUnderConstruction";
import AuthPage from "../components/pages/authPage";
import ModalsPage from "../components/pages/modals";
import ButtonsPage from "../components/pages/buttons";
export const PATHS = {
  DASHBOARD: "/dashboard",
  AUTH: "/authPage",
  MODALS: "/components/modals",
  BUTTONS: "/components/buttons",
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
        path: PATHS.MODALS,
        element: <ModalsPage />,
      },
      {
        path: PATHS.BUTTONS,
        element: <ButtonsPage />,
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
