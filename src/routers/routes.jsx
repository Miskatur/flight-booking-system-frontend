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
import AddFlight from "../pages/admin-dashboard/flights/addFlight";
import UpdateFlight from "../pages/admin-dashboard/flights/updateFlight";
import SearchResult from "../pages/searchResult";
import FlightDetails from "../pages/flightDetails";
import PrivateRoute from "./privateRoute";
import MyBookings from "../pages/user-dashboard/myBookings";
import MyProfile from "../pages/user-dashboard/myProfile";
import EditProfile from "../pages/user-dashboard/editProfile";
import ChangePassword from "../pages/user-dashboard/changePassword";

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
      {
        path: "/search",
        element: <SearchResult></SearchResult>,
      },
      {
        path: "/flight/:id",
        element: (
          <PrivateRoute>
            <FlightDetails></FlightDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/user/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/edit/profile",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/edit/password",
        element: (
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        ),
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
      {
        path: "flights/add-flight",
        element: <AddFlight></AddFlight>,
      },
      {
        path: "flights/update-flight/:id",
        element: <UpdateFlight></UpdateFlight>,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
