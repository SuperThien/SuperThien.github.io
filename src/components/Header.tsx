// Header.tsx
import React from "react";
import { Layout, Menu, Avatar, Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import { BellOutlined, MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const keyToPath: Record<string, string> = {
  "1": "/donhang",
  "2": "/donhang",
  "3": "/hoadon",
  "4": "/nhanvien",
  "5": "/danhmuc",
  "6": "/ban",
};

const pathToKey = (pathname: string): string => {
  if (pathname.startsWith("/donhang")) return "2";
  if (pathname.startsWith("/hoadon")) return "3";
  if (pathname.startsWith("/nhanvien")) return "4";
  if (pathname.startsWith("/danhmuc")) return "5";
  if (pathname.startsWith("/ban")) return "6";
  return "1";
};

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("auth_user") || "null");
  } catch {
    return null;
  }
}

const HeaderBar: React.FC<{ username?: string; avatarText?: string }> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const u = getUser();

  const displayName = u?.fullName || u?.username || "Tài khoản";
  const avatarText = (() => {
    const name = (displayName || "?").trim();
    const parts = name.split(/\s+/);
    if (parts.length >= 2)
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  })();

  const handleLogout = () => {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("access_token"); // 👈 xoá token
    message.success("Đã đăng xuất");
    navigate("/login", { replace: true });
  };

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    const target = keyToPath[key as string];
    if (!target) return;

    // nếu chưa đăng nhập -> về login
    const auth = localStorage.getItem("access_token");
    if (!auth) {
      message.info("Vui lòng đăng nhập.");
      navigate("/login", { replace: true });
      return;
    }
    navigate(target);
  };

  return (
    <Layout.Header
      style={{
        padding: "0 24px",
        background: "#2563EB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <MenuOutlined
          style={{ color: "white", fontSize: 20, marginRight: 24 }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathToKey(pathname)]}
          style={{
            background: "#2563EB",
            lineHeight: "64px",
            borderBottom: "none",
          }}
          onClick={onMenuClick}
          items={[
            { key: "1", label: "Tổng quan" },
            { key: "2", label: "Đơn Hàng" },
            { key: "3", label: "Hóa đơn" },
            { key: "4", label: "Nhân viên" },
            { key: "5", label: "Danh Mục" },
            { key: "6", label: "Bàn" },
          ]}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", color: "white" }}>
        <BellOutlined style={{ fontSize: 20, marginRight: 24 }} />
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar style={{ backgroundColor: "#f0f2f5", color: "#333" }}>
              {avatarText}
            </Avatar>
            <span style={{ marginLeft: 8 }}>{displayName}</span>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default HeaderBar;
