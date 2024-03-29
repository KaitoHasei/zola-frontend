import { ProtectAuthRoutes } from "#/components/ProtectRoute";
import AppLayout from "#/components/Layouts";
import App from "#/pages/App";
import Login from "#/pages/Login";
import Register from "#/pages/Register";
import NotFound from "#/pages/404";

export const routes = [
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <App />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectAuthRoutes redirectPath="/">
        <Login />
      </ProtectAuthRoutes>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectAuthRoutes redirectPath="/">
        <Register />
      </ProtectAuthRoutes>
    ),
  },
];
