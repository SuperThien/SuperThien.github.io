// routes/cartRouter.js

const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/:MaKH", async (req, res) => {
  const maKH = req.params.MaKH;

  try {
    // Thêm .promise() trước .query
    const [donHangRows] = await pool
      .promise()
      .query("SELECT * FROM DonHang WHERE MaKH = ? ORDER BY ngay_dat DESC", [
        maKH,
      ]);

    const donHangWithDetails = await Promise.all(
      donHangRows.map(async (donHang) => {
        const [chiTietRows] = await pool
          .promise()
          .query("SELECT * FROM ChiTietDonHang WHERE MaDH = ?", [donHang.MaDH]);
        return { ...donHang, chiTiet: chiTietRows };
      })
    );

    res.json(donHangWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});
module.exports = router;
