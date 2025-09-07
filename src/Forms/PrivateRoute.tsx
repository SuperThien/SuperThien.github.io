// components/PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { message } from "antd";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("MaKH");
  const location = useLocation();

  if (!isLoggedIn) {
    message.warning("Bạn cần đăng nhập để truy cập trang này!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
