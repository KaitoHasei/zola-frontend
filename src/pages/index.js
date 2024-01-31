import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import App from "./App";
import NotFound from "./404";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <h1>This is register page</h1>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Router = () => {
  return (
    <Box height="100vh">
      <RouterProvider router={router} />
    </Box>
  );
};

export default Router;
