import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import MainLayout from "../Layout/mainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;
