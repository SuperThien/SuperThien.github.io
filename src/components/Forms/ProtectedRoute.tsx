import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function getCurrentUser() {
  const raw = localStorage.getItem("auth_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const hasToken = !!localStorage.getItem("access_token");

  if (!hasToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  // Đã đăng nhập -> render các route con
  return <Outlet />;
};
export default ProtectedRoute;
