import axios from "axios";
import { useEffect, useState } from "react";
interface Danhsach {
  MaKH: string;
  HoTen: string;
  SDTOrEmail: string;
}
const DanhSachKhachHang = () => {
  const [khachHang, setKhachHang] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/khach-hang")
      .then((res) => setKhachHang(res.data))
      .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
  }, []);

  return (
    <div>
      <h2>Danh sách khách hàng</h2>
      <ul>
        {khachHang.map((kh) => (
          <li key={kh.MaKH}>
            {kh.HoTen} - {kh.SDTOrEmail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DanhSachKhachHang;
