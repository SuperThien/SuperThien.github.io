const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "QUANLYCAFFE",
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối MySQL:", err.stack);
    return;
  }
  console.log("Đã kết nối với MySQL");
});

module.exports = db;
