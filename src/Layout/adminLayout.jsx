import React from "react";
import Sidebar from "../shared/sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex-1 items-start lg:grid lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] bg-gradient-to-tr from-red-50 to-green-50 min-h-screen w-full relative">
      {/* sidebar */}
      <Sidebar />
      {/* outlet */}
      <div className="p-4 overflow-hidden ">{children}</div>
    </div>
  );
};

export default AdminLayout;
