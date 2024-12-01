import React from "react";
import useCurrentUser from "../hook/useCurrentuser";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../shared/loader";
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, loading } = useCurrentUser();
  if (loading) {
    return <Spinner />;
  }

  if (!role || role !== "USER") {
    navigate("/signin", { replace: true, state: { from: location.pathname } });
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
