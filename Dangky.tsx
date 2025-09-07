import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dangky.css";
import { Select } from "antd";
import axios from "axios";

const { Option } = Select;

interface RegisterFormData {
  Ho: string;
  Ten: string;
  Emailvasdt: string;
  password: string;
  confirmPassword: string;
  ngaysinh: string;
  gioitinh: string;
  DiaChi: string;              // <-- NEW
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    Ho: "",
    Ten: "",
    Emailvasdt: "",
    password: "",
    confirmPassword: "",
    ngaysinh: "",
    gioitinh: "",
    DiaChi: "",                 // <-- NEW
  });

  const [ngay, setNgay] = useState<string>("");
  const [thang, setThang] = useState<string>("");
  const [nam, setNam] = useState<string>("");

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNgaySinhChange = (
    type: "ngay" | "thang" | "nam",
    value: string
  ) => {
    const updatedNgay = type === "ngay" ? value : ngay;
    const updatedThang = type === "thang" ? value : thang;
    const updatedNam = type === "nam" ? value : nam;

    if (type === "ngay") setNgay(value);
    if (type === "thang") setThang(value);
    if (type === "nam") setNam(value);

    if (updatedNgay && updatedThang && updatedNam) {
      const fullNgaySinh = `${updatedNam}-${updatedThang.padStart(
        2,
        "0"
      )}-${updatedNgay.padStart(2, "0")}`;
      setFormData((prev) => ({
        ...prev,
        ngaysinh: fullNgaySinh,
      }));
    }
  };

  const handleGioiTinhChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      gioitinh: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.Ho === "" ||
      formData.Ten === "" ||
      formData.Emailvasdt === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.ngaysinh === "" ||
      formData.gioitinh === "" ||
      formData.DiaChi === ""             // <-- NEW
    ) {
      setError("Vui lòng điền đầy đủ thông tin");
    } else if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp");
    } else {
      setError("");
      axios
        .post("http://localhost:3002/register", {
          Ho: formData.Ho,
          Ten: formData.Ten,
          SDTOrEmail: formData.Emailvasdt,
          MatKhau: formData.password,
          NgaySinh: formData.ngaysinh,
          GioiTinh: formData.gioitinh,
          DiaChi: formData.DiaChi,       // <-- NEW (gửi lên backend)
        })
        .then((res) => {
          console.log("Phản hồi từ server:", res);
          alert("Đăng ký thành công!");
          navigate("/login");
        })
        .catch((err) => {
          console.error("Lỗi đăng ký:", err.response?.data || err.message);
          setError(err.response?.data?.error || "Có lỗi xảy ra!");
        });
    }
  };

  return (
    <div className="register-container">
      <div style={{ padding: "20px" }}>
        <h1 className="register-title">Đăng ký</h1>
        <h3 className="register-subtitle">Nhanh chóng và dễ dàng.</h3>
      </div>
      <hr />
      <div style={{ padding: "30px" }}>
        {error && <div className="register-error">{error}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <div
            className="register-form-group"
            style={{ display: "flex", gap: "10px" }}
          >
            <label style={{ display: "block" }} className="register-label">
              Nhập Họ Tên
            </label>
            <input
              type="text"
              name="Ho"
              value={formData.Ho}
              onChange={handleChange}
              className="register-input half-width"
              placeholder="Họ"
            />
            <input
              type="text"
              name="Ten"
              value={formData.Ten}
              onChange={handleChange}
              className="register-input half-width"
              placeholder="Tên"
            />
          </div>

          <div className="register-form-group">
            <label className="register-label">Email hoặc số điện thoại</label>
            <input
              type="text"
              name="Emailvasdt"
              value={formData.Emailvasdt}
              onChange={handleChange}
              className="register-input full-width"
              placeholder="Nhập Email hoặc số điện thoại"
            />
          </div>

          {/* NEW: Địa chỉ */}
          <div className="register-form-group">
            <label className="register-label">Địa chỉ</label>
            <input
              type="text"
              name="DiaChi"
              value={formData.DiaChi}
              onChange={handleChange}
              className="register-input full-width"
              placeholder="Nhập địa chỉ"
            />
          </div>

          <div className="register-form-group">
            <label className="register-label">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="register-input full-width"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div className="register-form-group">
            <label className="register-label">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="register-input full-width"
              placeholder="Xác nhận mật khẩu"
            />
          </div>

          <div className="register-form-group">
            <label className="register-label">Ngày sinh</label>
            <div className="register-birthday-selects">
              <Select
                placeholder="Ngày"
                value={ngay || undefined}
                onChange={(value) => handleNgaySinhChange("ngay", value)}
                className="register-select"
              >
                {[...Array(31)].map((_, i) => (
                  <Option key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Tháng"
                value={thang || undefined}
                onChange={(value) => handleNgaySinhChange("thang", value)}
                className="register-select"
              >
                {[...Array(12)].map((_, i) => (
                  <Option key={i + 1} value={(i + 1).toString()}>
                    Tháng {i + 1}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Năm"
                value={nam || undefined}
                onChange={(value) => handleNgaySinhChange("nam", value)}
                className="register-select"
              >
                {Array.from({ length: 40 }, (_, i) => 2024 - i).map((year) => (
                  <Option key={year} value={year.toString()}>
                    Năm {year}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="register-form-group">
            <label className="register-label">Giới tính</label>
            <div className="register-form-row">
              <label className="gender-box">
                <input
                  type="radio"
                  name="gioitinh"
                  value="Nữ"
                  checked={formData.gioitinh === "Nữ"}
                  onChange={handleGioiTinhChange}
                />
                Nữ
              </label>
              <label className="gender-box">
                <input
                  type="radio"
                  name="gioitinh"
                  value="Nam"
                  checked={formData.gioitinh === "Nam"}
                  onChange={handleGioiTinhChange}
                />
                Nam
              </label>
            </div>
          </div>

          <div className="register-note">
            <p>
              Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin
              liên hệ của bạn lên The Coffee.
              <br /> Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản,
              Chính sách quyền riêng tư và Chính sách cookie của chúng tôi. Bạn
              có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất
              kỳ lúc nào.
            </p>
          </div>

          <button className="register-button" type="submit">
            Đăng ký
          </button>
          <a href="/login" className="register-link">
            Bạn đã có tài khoản?
          </a>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
