import React from "react";

const ProductRoute = ({ activeRoute, setActiveRoute }) => {
  return (
    <ul className="flex  overflow-x-auto">
      <li
        onClick={() => setActiveRoute("1")}
        className={`px-10 cursor-pointer py-2 rounded transition-all duration-300 ease-in-out ${
          activeRoute === "1"
            ? "bg-primary shadow transform text-white"
            : "bg-white"
        }`}
      >
        All Flights
      </li>
      <li
        onClick={() => setActiveRoute("")}
        className={`px-10 cursor-pointer py-2 rounded transition-all duration-300 ease-in-out ${
          activeRoute === ""
            ? "bg-primary shadow transform text-white"
            : "bg-white"
        }`}
      >
        Available Flights
      </li>
    </ul>
  );
};

export default ProductRoute;
