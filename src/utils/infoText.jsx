import React from "react";

const InfoText = ({ label, value, classes }) => {
  return (
    <h4 className={`${classes ? classes : "text-lg mt-2"}`}>
      {label} : <span className=" font-semibold">{value}</span>
    </h4>
  );
};

export default InfoText;
