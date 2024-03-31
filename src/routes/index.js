import { ProtectAuthRoutes } from "#/components/ProtectRoute";
import AppLayout from "#/components/Layouts";
import App from "#/pages/App";
import Login from "#/pages/Login";
import Register from "#/pages/Register";
import NotFound from "#/pages/404";
import Contact from "#/pages/Contact";
import Setting from "#/pages/Setting";
import UpdateAccountUser from "#/pages/UpdateAccountUser";

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
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/account",
        element: <UpdateAccountUser />
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
