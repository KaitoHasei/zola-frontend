import { ProtectAuthRoutes } from "#/components/ProtectRoute";
import AppLayout from "#/components/Layouts";
import App from "#/pages/App";
import Contact from "#/pages/Contact";
import Login from "#/pages/Login";
import Register from "#/pages/Register";
import NotFound from "#/pages/404";
import RegisterNotify from "#/pages/Register/NotifyRegister";

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
      {
        path: "/contact",
        element: <Contact />,
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
  {
    path: "/register-notify",
    element: (
      <ProtectAuthRoutes redirectPath="/">
        <RegisterNotify />
      </ProtectAuthRoutes>
    ),
  },
];
