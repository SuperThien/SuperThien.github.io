const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();
router.post("/register", (req, res) => {
  let { Ho, Ten, SDTOrEmail, NgaySinh, MatKhau, GioiTinh, DiaChi } = req.body;

  // Trim đơn giản
  Ho = (Ho || "").trim();
  Ten = (Ten || "").trim();
  SDTOrEmail = (SDTOrEmail || "").trim();
  GioiTinh = (GioiTinh || "").trim();
  DiaChi = (DiaChi || "").trim();

  if (!Ho || !Ten || !SDTOrEmail || !MatKhau || !GioiTinh || !NgaySinh || !DiaChi ) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  bcrypt.hash(MatKhau, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Lỗi mã hóa mật khẩu." });

    const sql = `
      INSERT INTO KhachHang (Ho, Ten, SDTOrEmail, NgaySinh, MatKhau, GioiTinh, DiaChi)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [Ho, Ten, SDTOrEmail, NgaySinh, hashedPassword, GioiTinh, DiaChi || null],
      (err, result) => {
        if (err) {
          // Bắt lỗi trùng email/sđt (nếu có unique index)
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Email/SĐT đã được sử dụng." });
          }
          return res.status(500).json({ error: "Lỗi đăng ký, vui lòng thử lại." });
        }
        res.status(201).json({ message: "Đăng ký thành công!", MaKH: result.insertId });
      }
    );
  });
});

// API đăng nhập
router.post("/login", (req, res) => {
  const { SDTOrEmail, MatKhau } = req.body;

  if (!SDTOrEmail || !MatKhau) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  const sql = "SELECT * FROM KhachHang WHERE SDTOrEmail = ?";
  db.query(sql, [SDTOrEmail], (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi hệ thống." });

    if (result.length === 0) {
      return res.status(404).json({ error: "Người dùng không tồn tại." });
    }

    bcrypt.compare(MatKhau, result[0].MatKhau, (err, isMatch) => {
      if (err) return res.status(500).json({ error: "Lỗi kiểm tra mật khẩu." });

      if (!isMatch) {
        return res.status(401).json({ error: "Mật khẩu không đúng." });
      }

      const token = jwt.sign(
        { id: result[0].MaKH, username: result[0].SDTOrEmail },
        "secret_key",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Đăng nhập thành công!",
        token,
        MaKH: result[0].MaKH,
      });
    });
  });
});
// Lấy thông tin khách theo MaKH (để autofill giỏ hàng)
router.get("/customers/:MaKH", (req, res) => {
  const { MaKH } = req.params;
  const sql = "SELECT Ho, Ten, SDTOrEmail, DiaChi FROM KhachHang WHERE MaKH = ?";
  db.query(sql, [MaKH], (err, rows) => {
    if (err) return res.status(500).json({ error: "Lỗi hệ thống." });
    if (rows.length === 0) return res.status(404).json({ error: "Không tìm thấy khách." });

    const { Ho, Ten, SDTOrEmail, DiaChi } = rows[0];
    // tách SDT/email từ cột SDTOrEmail (tùy bạn lưu)
    const isEmail = SDTOrEmail && SDTOrEmail.includes("@");
    const Email = isEmail ? SDTOrEmail : "";
    const SoDienThoai = !isEmail ? SDTOrEmail : "";

    res.json({
      HoTen: `${Ho} ${Ten}`.trim(),
      Email,
      SoDienThoai,
      DiaChiMacDinh: DiaChi || "",
    });
  });
});

module.exports = router;
