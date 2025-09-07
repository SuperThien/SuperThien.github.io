// src/routes/RequireRole.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

function getRoles(): string[] {
  try {
    const u = JSON.parse(localStorage.getItem("auth_user") || "null");
    return Array.isArray(u?.roles) ? u.roles : [];
  } catch {
    return [];
  }
}

type Props = { allow: string[]; to?: string; children: React.ReactNode };

const RequireRole: React.FC<Props> = ({ allow, to = "/donhang", children }) => {
  const roles = getRoles();
  const ok = allow.length === 0 || allow.some((r) => roles.includes(r));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!ok) {
      message.error("Bạn không có quyền truy cập trang này.");
      const id = setTimeout(() => {
        navigate(to, { replace: true, state: { from: location } });
      }, 200);
      return () => clearTimeout(id);
    }
  }, [ok, navigate, to, location]);

  if (!ok) return null;
  return <>{children}</>;
};

export default RequireRole;
