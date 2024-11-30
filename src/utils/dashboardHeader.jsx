import React from "react";

const DashboardHeader = ({ text, classes }) => {
  return (
    <div>
      <h3
        className={`  font-semibold ${
          classes ? classes : "text-xl md:text-2xl lg:text-3xl text-grayColor"
        }`}
      >
        {text}
      </h3>
    </div>
  );
};

export default DashboardHeader;
