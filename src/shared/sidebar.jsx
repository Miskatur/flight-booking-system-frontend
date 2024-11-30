import { LayoutDashboard, Menu, PlaneIcon, TicketsPlane } from "lucide-react";
import React, { useState } from "react";
import useCurrentUser from "../hook/useCurrentuser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

const adminRoutes = [
  {
    label: "Overview",
    icon: <LayoutDashboard size={16} />,
    to: "/admin/dashboard",
  },
  {
    label: "Flights",
    icon: <PlaneIcon size={16} />,
    to: "/admin/dashboard/flights",
  },
  {
    label: "Bookings",
    icon: <TicketsPlane size={16} />,
    to: "/admin/dashboard/bookings",
  },
];
const Sidebar = () => {
  const { role } = useCurrentUser();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };
  return (
    <>
      {/* Hamburger Button */}
      <div className=" flex justify-between items-center lg:hidden bg-white p-3">
        <button onClick={toggleSidebar} className="  p-2 rounded-md">
          <Menu size={24} />
        </button>
        <div>
          <Link
            to={"/"}
            className="font-semibold text-textColor text-xl flex items-center gap-1"
          >
            Logo
          </Link>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white p-4 flex flex-col gap-8 shadow-lg transition-transform transform z-40 lg:translate-x-0 lg:static",
          {
            "-translate-x-full": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          }
        )}
      >
        {/* Top bar */}
        <div className="w-full bg-background px-4 py-2 border border-border rounded-lg shadow flex items-center justify-between gap-4">
          <Link
            to={"/"}
            className="font-semibold text-textColor text-xl flex items-center gap-1"
          >
            Logo
          </Link>
        </div>

        {/* Routes Links */}
        <div className="w-full grid gap-1">
          {role === "ADMIN" &&
            adminRoutes?.map((item) => (
              <Link
                key={item?.label}
                to={item?.to}
                className={cn(
                  "w-full bg-background px-4 py-2 rounded-md flex items-center justify-between gap-4 text-sm text-textColor font-medium",
                  {
                    "bg-primary shadow text-white":
                      location?.pathname === item?.to,
                  }
                )}
                onClick={() => setIsSidebarOpen(false)} 
              >
                <p>{item.label}</p>
                {item.icon}
              </Link>
            ))}
        </div>

        {/* Logout Button */}
        <div className="w-full mt-auto">
          <button
            onClick={() => {
              handleLogout();
              setIsSidebarOpen(false); 
            }}
            className="w-full px-4 py-1 bg-primary text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
