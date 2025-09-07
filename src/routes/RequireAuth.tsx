import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("access_token");
  const location = useLocation();
  if (!token)
    return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
