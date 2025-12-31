import React, { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  user: any;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  const storedUser = user || JSON.parse(localStorage.getItem("user") || "null");
  const location = useLocation();
  const alerted = useRef(false);

  useEffect(() => {
    if (!storedUser && !alerted.current) {
      alert(`You must log in to access "${location.pathname}"`);
      alerted.current = true;
    }
  }, [storedUser, location.pathname]);

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
