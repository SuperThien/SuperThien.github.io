// POST /api/Shopping
app.post("/api/Shopping", async (req, res) => {
  const { ho_va_ten, so_dien_thoai, chi_tiet, tong_tien } = req.body;

  try {
    const [hoaDonResult] = await connection.execute(
      "INSERT INTO HoaDon (ho_va_ten, so_dien_thoai, tong_tien) VALUES (?, ?, ?)",
      [ho_va_ten, so_dien_thoai, tong_tien]
    );
    const hoa_don_id = hoaDonResult.insertId;

    for (const item of chi_tiet) {
      await connection.execute(
        "INSERT INTO ChiTietHoaDon (hoa_don_id, ten_san_pham, size, toppings, don_gia, so_luong, thanh_tien) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          hoa_don_id,
          item.tenSanPham,
          item.size,
          JSON.stringify(item.toppings),
          item.donGia,
          item.soLuong,
          item.thanhTien,
        ]
      );
    }

    res.status(200).send("Đặt hàng thành công!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi lưu hóa đơn.");
  }
});
