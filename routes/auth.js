router.get("/khach-hang", (req, res) => {
  const sql = "SELECT * FROM KhachHang";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
    res.json(result);
  });
});
