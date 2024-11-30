import React, { useEffect, useState } from "react";
import useCurrentUser from "../hook/useCurrentuser";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../shared/loader";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, loading } = useCurrentUser();
  console.log("role", role);
  if (loading) {
    return <Spinner />;
  }

  if (!role || role !== "ADMIN") {
    navigate("/signin", { replace: true, state: { from: location } });
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
