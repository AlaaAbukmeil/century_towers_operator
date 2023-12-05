import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard/dashboard";
import Login from "../components/auth/login";
import ErrorPage from "../common/errorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
