import React, { useMemo, useState, useEffect } from "react";
import CartItem from "./GioHangs/CartItem";
import OrderSummary from "./GioHangs/OderSummary";
import CustomerForm from "./GioHangs/CustomerForm";
import { useCart } from "./GioHangs/CartContext";
import "../style.css";
import axios from "axios";
import { Pagination } from "antd";

const GioHang: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, updateNote } = useCart();

  const [formData, setFormData] = useState({
    hoTen: "",
    dienThoai: "",
    email: "",
    diaChiMacDinh: "",
    diaChiGiaoHang: "",
    ghiChu: "",
  });

  // 🔹 Lấy thông tin khách theo MaKH (điền sẵn và khóa các ô)
  useEffect(() => {
    const MaKH = localStorage.getItem("MaKH");
    if (!MaKH) return;

    axios
      .get(`http://localhost:3002/customers/${MaKH}`)
      .then((res) => {
        const { HoTen, Email, SoDienThoai, DiaChiMacDinh } = res.data || {};
        setFormData((prev) => ({
          ...prev,
          hoTen: HoTen || "",
          email: Email || "",
          dienThoai: SoDienThoai || "",
          diaChiMacDinh: DiaChiMacDinh || "",
          diaChiGiaoHang: DiaChiMacDinh || "", // mặc định = địa chỉ mặc định, user có thể sửa
        }));
      })
      .catch((err) => {
        console.error("Lỗi lấy thông tin khách:", err.response?.data || err.message);
      });
  }, []);

  const parsePrice = (s: string) => parseInt(s.replace(/\D/g, ""), 10) || 0;
  const formatPrice = (n: number) => n.toLocaleString("vi-VN") + "đ";
  const sizeExtraMap = { Nhỏ: 0, Vừa: 6000, Lớn: 10000 };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const base = parsePrice(item.product.price);
      const sizeExtra = sizeExtraMap[item.size];
      const toppingExtra = item.toppings.reduce((t, x) => t + parsePrice(x), 0);
      return sum + (base + sizeExtra + toppingExtra) * item.quantity;
    }, 0);
  }, [cart]);

  const grandTotal = total + 20000;

  if (cart.length === 0) {
    return <p style={{ padding: 20 }}>Không có sản phẩm trong giỏ hàng.</p>;
  }

  const handleSubmit = async () => {
    // Ưu tiên địa chỉ giao hàng do user nhập, nếu trống thì dùng địa chỉ mặc định
    const diaChiDayDu =
      (formData.diaChiGiaoHang || "").trim() ||
      (formData.diaChiMacDinh || "").trim();

    const chi_tietDH = cart.map((item) => {
      const base = parsePrice(item.product.price);
      const sizeExtra = sizeExtraMap[item.size];
      const toppingExtra = item.toppings.reduce(
        (sum, t) => sum + parsePrice(t),
        0
      );
      const thanhTien = (base + sizeExtra + toppingExtra) * item.quantity;

      return {
        tenSanPham: item.product.name,
        size: item.size,
        toppings: item.toppings,
        donGia: base + sizeExtra + toppingExtra,
        soLuong: item.quantity,
        thanhTien: thanhTien,
        ghiChu: item.note || "",
      };
    });

    const tongThanhToan = chi_tietDH.reduce(
      (sum, item) => sum + item.thanhTien,
      0
    );

    const chi_tietHD = chi_tietDH.map((item) => ({
      ten_san_pham: item.tenSanPham,
      size: item.size,
      toppings: item.toppings,
      don_gia: item.donGia,
      so_luong: item.soLuong,
      thanh_tien: item.thanhTien,
    }));

    try {
      await axios.post("http://localhost:3002/api/Shopping", {
        ho_va_ten: formData.hoTen,
        so_dien_thoai: formData.dienThoai,
        email: formData.email,
        dia_chi_day_du: diaChiDayDu, // ✅ gửi đúng địa chỉ hiển thị
        ghi_chu: formData.ghiChu,
        tong_thanh_toan: tongThanhToan,
        chi_tietDH: chi_tietDH,
        chi_tietHD: chi_tietHD,
      });
      alert("Đặt hàng thành công!");
    } catch (error) {
      alert("Lỗi khi gửi đơn hàng.");
      console.error(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = cart.slice(startIndex, endIndex);

  return (
    <>
      <div className="order">
        <ul>
          <li>Sản phẩm</li>
          <li style={{ marginLeft: "100px" }}>Tình trạng</li>
          <li>Đơn giá</li>
          <li>Số lượng</li>
          <li>Thành tiền</li>
          <li>Ghi chú</li>
        </ul>
      </div>

    {currentItems.map((item, index) => {
  const absoluteIndex = startIndex + index; // 👈 chỉ số tuyệt đối trong cart
  const base = parsePrice(item.product.price);
  const sizeExtra = sizeExtraMap[item.size];
  const toppingExtra = item.toppings.reduce((sum, t) => sum + parsePrice(t), 0);
  const lineTotal = (base + sizeExtra + toppingExtra) * item.quantity;

  return (
    <CartItem
      key={`${item.product.id}-${absoluteIndex}`}
      note={item.note}
      product={item.product}
      size={item.size}
      toppings={item.toppings}
      sizeExtra={sizeExtra}
      quantity={item.quantity}
      total={lineTotal}
      formatPrice={formatPrice}
      onNoteChange={(newNote) => updateNote(absoluteIndex, newNote)}
      onQuantityChange={(newQty) => updateQuantity(absoluteIndex, newQty)}
      onDelete={() => removeFromCart(absoluteIndex)}
    />
  );
})}

      {/* Pagination */}
    {/* Pagination – canh giữa, chỉ 1 block */}
<div style={{ display: "flex", justifyContent: "center", margin: "20px 0 0" }}>
  <Pagination
    current={currentPage}
    total={cart.length}
    pageSize={itemsPerPage}
    onChange={(page) => setCurrentPage(page)}
    defaultCurrent={1}
  />
</div>



      {/* Gạch phân tách */}
      <hr className="checkout-sep" />

      {/* Form (trái) | Tóm tắt (phải) */}
      <div
        className="login_one"
        style={{
          width: "80%",
          margin: "30px auto 60px",
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "40px",
          alignItems: "start",
        }}
      >
        <CustomerForm formData={formData} setFormData={setFormData} />
        <OrderSummary
          total={total}
          grandTotal={grandTotal}
          formatPrice={formatPrice}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default GioHang;
