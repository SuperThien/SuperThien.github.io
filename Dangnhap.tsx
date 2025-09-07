import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dangnhap.css";
import axios from "axios";

interface LoginFormData {
  SDTOrEmail: string;
  MatKhau: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    SDTOrEmail: "",
    MatKhau: "",
  });

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.SDTOrEmail === "" || formData.MatKhau === "") {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3002/login", {
        SDTOrEmail: formData.SDTOrEmail,
        MatKhau: formData.MatKhau,
      });
      const token = res.data.token;
      const MaKH = res.data.MaKH;

      localStorage.setItem("token", token);
      localStorage.setItem("MaKH", MaKH.toString());
      setError("");
      navigate("/");
    } catch (err: any) {
      const message =
        err.response?.data?.error || "Đăng nhập thất bại. Vui lòng thử lại!";
      setError(message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="login-title">Đăng nhập</h1>
      </div>
      <hr />
      {error && <div className="error">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="SDTOrEmail" className="login-label">
            Tên đăng nhập
          </label>
          <input
            type="text"
            id="SDTOrEmail"
            name="SDTOrEmail"
            value={formData.SDTOrEmail}
            onChange={handleChange}
            className="login-input"
            placeholder="Nhập Email hoặc số điện thoại"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="login-label">
            Mật khẩu
          </label>
          <input
            type="password"
            id="MatKhau"
            name="MatKhau"
            value={formData.MatKhau}
            onChange={handleChange}
            className="login-input"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button type="submit" className="btn-group">
          Đăng nhập
        </button>
      </form>
      <div className="login-forgot">
        <Link to="#">Quên mật khẩu</Link>
      </div>
      <div className="login-register">
        <Link to="/register">
          <button type="submit" className="login-register">
            Tạo Tài Khoản Mới
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
