import React, { useEffect } from "react";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, message, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
interface Item {
  key: string;
  label: string;
  icon?: React.ReactNode;
}
interface HeaderProps {
  style: any;
  logoSrc?: string;
  showCartIcon?: boolean;
}
const HeaderComponent: React.FC<HeaderProps> = ({
  logoSrc,
  style,
  showCartIcon = true,
}) => {
  const isLoggedIn = !!localStorage.getItem("MaKH");
  useEffect(() => {
    if (isLoggedIn) {
      const canvas = document.getElementById("userCanvas") as HTMLCanvasElement;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const scale = 0.5;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#555";
      ctx.beginPath();
      ctx.arc(50 * scale, 30 * scale, 20 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#777";
      ctx.beginPath();
      ctx.arc(50 * scale, 70 * scale, 30 * scale, Math.PI, 0);
      ctx.fill();
    }
  }, [isLoggedIn]);
  const items: Item[] = [
    {
      key: "home",
      label: "Trang Chủ",
    },
    {
      key: "Item",
      label: "Sản Phẩm",
    },
    {
      key: "Contact",
      label: "Liên hệ",
    },
    {
      key: "News",
      label: "Tin Tức",
    },
    {
      key: "recruitment",
      label: "Tuyển Dụng",
    },
    {
      key: "Shopping",
      label: "Giỏ Hàng",
    },
    ...(!isLoggedIn
      ? [
          { key: "Register", label: "Đăng Ký" },
          { key: "Login", label: "Đăng Nhập" },
        ]
      : []),
    ...(showCartIcon
      ? [{ key: "Shopping", icon: <ShoppingCartOutlined />, label: "" }]
      : []),
  ];
  const navigate = useNavigate();

  const menuProps = {
    items: [
      {
        label: "Đăng Xuất",
        key: "logout",
        icon: <UserOutlined />,
      },
      {
        label: "Xem Thông Tin",
        key: "info",
        icon: <UserOutlined />,
      },
    ],
    onClick: ({ key }: { key: string }) => {
      if (key === "logout") {
        message.success("Đăng xuất thành công.");
        localStorage.removeItem("MaKH");
        navigate("/login");
      }
      if (key === "info") {
        navigate("/profile");
      }
    },
  };

  return (
    <div>
      <header className="header">
        <Image
          style={style}
          className="header_img"
          src={logoSrc}
          alt="Logo"
          preview={false}
        />

        <nav style={{ textAlign: "center" }} className="header_nav">
          <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
            {items.slice(0, 5).map((item) => (
              <li key={item.key}>
                <Link
                  style={{ marginLeft: "30px" }}
                  to={`/${item.key.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
            {items.slice(5, 8).map((item) => (
              <li key={item.key}>
                <Link
                  style={{
                    marginLeft: item.key === "Register" ? "150px" : "30px",
                  }}
                  to={`/${item.key.toLowerCase()}`}
                >
                  {item.icon ? item.icon : item.label}
                </Link>
              </li>
            ))}
            {isLoggedIn && (
              <li style={{ marginLeft: 200 }}>
                <Dropdown menu={menuProps} placement="bottomRight">
                  <canvas id="userCanvas" width="100" height="80"></canvas>
                </Dropdown>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
