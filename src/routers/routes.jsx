import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import MainLayout from "../Layout/mainLayout";
import Login from "../pages/login";
import Register from "../pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
