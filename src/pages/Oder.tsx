import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../style.css";

import sp14 from "../img/sp14.webp";
import sp16 from "../img/sp16.webp";
import sp15 from "../img/sp15.webp";
import { SanPhamLienQuan } from "./SanPhamLienQuan";
import { useCart } from "./GioHangs/CartContext";

const Oder: React.FC = () => {
  const [size, setSize] = useState<"Nhỏ" | "Vừa" | "Lớn">("Nhỏ");
  const [toppings, setToppings] = useState<string[]>([]);

  const toggleTopping = (t: string) => {
    setToppings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const product = location.state?.product;

  if (!product) return <p>Không có sản phẩm.</p>;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const options = [
    "Shot Espresso + 10.000đ",
    "Trân châu trắng + 10.000đ",
    "Sốt Caremel + 10.000đ",
    "Trân Châu Đen + 10.000đ",
  ];
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({
      product,
      size,
      toppings,
      quantity: 1,
    });
    alert("Đã thêm vào giỏ hàng!");
  };
  return (
    <div className="detail-page">
      <div className="details_one">
        <Link to="/" className="breadcrumb-link">
          <b>Menu</b>
        </Link>
        <p className="breadcrumb-separator">
          <b>/</b>
        </p>
        <Link to="/item" className="breadcrumb-link">
          <b>Sản phẩm hot trang chủ</b>
        </Link>
      </div>

      <div className="details_img">
        <img
          id={product.id}
          src={product.src}
          alt={product.alt}
          style={{
            boxShadow: "10px -10px 10px rgb(221, 218, 218)",
            borderRadius: "10px",
          }}
        />
        <div className="details_text">
          <h1 style={{ marginTop: "40px" }}>{product.name}</h1>
          <h1 style={{ color: "orange" }}>{product.price}</h1>

          <h3
            style={{ color: "black", marginTop: "50px", marginBottom: "15px" }}
          >
            Chọn size (bắt buộc)
          </h3>
          <div className="details_button-one">
            {["Nhỏ + 0đ", "Vừa + 6.000đ", "Lớn + 10.000đ"].map((label, idx) => {
              const sz = ["Nhỏ", "Vừa", "Lớn"][idx] as "Nhỏ" | "Vừa" | "Lớn";
              return (
                <button
                  style={{ marginLeft: "20px" }}
                  key={label}
                  className={`size-button ${size === sz ? "active" : ""}`}
                  onClick={() => setSize(sz)}
                >
                  <i
                    style={{ marginRight: "10px" }}
                    className={`fa-solid fa-glass-water fa-${
                      ["", "lg", "xl"][idx]
                    }`}
                  />
                  {label}
                </button>
              );
            })}
          </div>

          <h3
            style={{ color: "black", marginTop: "20px", marginBottom: "15px" }}
          >
            Topping
          </h3>
          <div className="details_button-two">
            {options.map((t) => (
              <button
                key={t}
                className={`topping-button ${
                  toppings.includes(t) ? "active" : ""
                }`}
                onClick={() => toggleTopping(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "20px", marginTop: "120px" }}>
            <button
              onClick={handleAddToCart}
              style={{
                width: "280px",
                marginTop: "20px",
                border: "1px solid orange",
                backgroundColor: "orange",
                color: "white",
                padding: "7px 20px",
                borderRadius: "10px",
                fontSize: "20px",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/shopping"
                state={{
                  product,
                  size,
                  toppings,
                }}
                className="cart-link"
              >
                Thêm vào giỏ hàng
              </Link>
            </button>
            <button
              style={{
                width: "280px",
                marginTop: "20px",
                backgroundColor: "orange",
              }}
              className="order-now"
            >
              <i
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  color: "white",
                }}
                className="fa-solid fa-truck-fast"
              ></i>
              Đặt giao tận nơi
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "10%" }}>
        {[sp14, sp16, sp15].map((src, idx) => (
          <img
            style={{
              width: "100px",
              marginTop: "10px",
              marginLeft: "10px",
              borderRadius: "10px",
              border: "1px solid orange",
            }}
            key={idx}
            src={src}
            alt="thumb"
            className="thumb"
          />
        ))}
      </div>

      <div className="text_mota">
        <h3 className="section-title">Mô tả sản phẩm</h3>
        <p>
          Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút
          ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân
          nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng
          quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết
          nấc.
        </p>
      </div>
      <SanPhamLienQuan />
    </div>
  );
};

export default Oder;
