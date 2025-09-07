const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.post("/Shopping", (req, res) => {
  const {
    ho_va_ten,
    so_dien_thoai,
    email,
    dia_chi_day_du,
    ghi_chu,
    tong_thanh_toan,
    chi_tietDH,
    chi_tietHD,
  } = req.body;

  const queryDonHang = `
    INSERT INTO DonHang (ho_va_ten, so_dien_thoai, email, dia_chi_day_du, ghi_chu)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    queryDonHang,
    [ho_va_ten, so_dien_thoai, email, dia_chi_day_du, ghi_chu],
    (err, result) => {
      if (err) {
        console.error("Lỗi khi đặt hàng:", err);
        return res.status(500).json({ error: "Đặt hàng thất bại" });
      }
      const MaDH = result.insertId;
      const chiTietQuery = `
        INSERT INTO ChiTietDonHang (MaDH, ten_san_pham, size, toppings, don_gia, so_luong, thanh_tien, ghi_chu)
        VALUES ?
      `;
      const valuesDonHang = chi_tietDH.map((item) => [
        MaDH,
        item.tenSanPham,
        item.size,
        item.toppings.join(", "),
        item.donGia,
        item.soLuong,
        item.thanhTien,
        item.ghiChu,
      ]);

      db.query(chiTietQuery, [valuesDonHang], (err2) => {
        if (err2) {
          console.error("Lỗi khi lưu chi tiết đơn hàng:", err2);
          return res
            .status(500)
            .json({ error: "Lưu chi tiết đơn hàng thất bại" });
        }

        const insertHoaDon = `
          INSERT INTO HoaDon (ho_va_ten, so_dien_thoai, tong_thanh_toan)
          VALUES (?, ?, ?)
        `;
        db.query(
          insertHoaDon,
          [ho_va_ten, so_dien_thoai, tong_thanh_toan],
          (err3, resultHoaDon) => {
            if (err3) {
              console.error("Lỗi khi lưu hóa đơn:", err3);
              return res.status(500).json({ error: "Lỗi lưu hóa đơn" });
            }
            const MaHD = resultHoaDon.insertId;

            const insertChiTiet = `
              INSERT INTO ChiTietHoaDon (MaHD, ten_san_pham, size, toppings, don_gia, so_luong, thanh_tien)
              VALUES ?
            `;
            const valuesHoaDon = chi_tietHD.map((item) => [
              MaHD,
              item.ten_san_pham,
              item.size,
              item.toppings.join(", "),
              item.don_gia,
              item.so_luong,
              item.thanh_tien,
            ]);

            db.query(insertChiTiet, [valuesHoaDon], (err4) => {
              if (err4) {
                console.error("Lỗi khi lưu chi tiết hóa đơn:", err4);
                return res
                  .status(500)
                  .json({ error: "Lỗi lưu chi tiết hóa đơn" });
              }

              res.status(201).json({
                message: "Đặt hàng và lưu hóa đơn thành công",
                MaDH,
                MaHD,
              });
            });
          }
        );
      });
    }
  );
});

module.exports = router;
