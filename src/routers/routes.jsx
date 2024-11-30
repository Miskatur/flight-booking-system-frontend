import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import MainLayout from "../Layout/mainLayout";
import Login from "../pages/login";
import Register from "../pages/register";
import AdminLayout from "../Layout/adminLayout";
import Overview from "../pages/admin-dashboard/overview";
import ProtectedRoute from "./protectedRoute";
import ErrorPage from "../pages/errorPage";
import Flights from "../pages/admin-dashboard/flights";
import Bookings from "../pages/admin-dashboard/bookings";

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
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminLayout></AdminLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Overview></Overview>,
      },
      {
        path: "flights",
        element: <Flights></Flights>,
      },
      {
        path: "bookings",
        element: <Bookings></Bookings>,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
