require("dotenv").config();
const connection = require("./config/db");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRouter = require("./routes/cartRouter");
const app = express();
const port = 3002;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api/cart", cartRouter);
app.use("/api", orderRoutes);
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
app.get("/test-db", (req, res) => {
  connection.query("SELECT 1 AS result", (err, results) => {
    if (err) {
      console.error("❌ Test DB failed:", err.message);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, data: results[0] });
  });
});
