import { Layout } from "antd";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaLocationDot,
  FaHeadphones,
} from "react-icons/fa6";
import "../style.css";
interface FooterProps {
  style?: any;
}
const { Footer } = Layout;

const FooterComponent: React.FC<FooterProps> = ({ style }) => {
  return (
    <Footer style={style}>
      <div className="footer-display">
        <div className="footer-display-kt">
          <h3>Giới thiệu</h3>
          <p style={{ color: "white" }}>
            Về Chúng Tôi <br />
            Sản phẩm <br />
            Khuyến mãi <br />
            Chuyện cà phê <br />
            Cửa Hàng <br />
            Tuyển dụng
          </p>
        </div>

        <div className="footer-display-kt">
          <h3>Điều khoản</h3>
          <p style={{ color: "white" }}>
            Điều khoản sử dụng <br />
            Chính sách bảo mật thông tin <br />
            Hướng dẫn xuất hóa đơn GTGT <br />
          </p>
        </div>

        <div className="footer-display-kt">
          <h3 style={{ color: "white" }}>
            <FaPhone style={{ marginRight: 15 }} />
            Đặt hàng: 1800 6936 <br /> <br />
            <FaLocationDot style={{ marginRight: 15 }} />
            Liên hệ:{" "}
            <a style={{ marginLeft: 30, color: "white" }} href="#">
              <FaFacebook size={20} />
            </a>
            <a style={{ marginLeft: 10, color: "white" }} href="#">
              <FaInstagram size={22} />
            </a>
          </h3>
          <p style={{ color: "white" }}>
            <br />
            Tầng 3-4 Hub Building <br />
            195/10E Điện Biên Phủ, P.15, <br />
            Q.Bình Thạnh, TP.Hồ Chí Minh <br />
          </p>
        </div>
      </div>

      <div className="footer_het">
        <p style={{ color: "white" }}>
          Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN <br />
          Mã số DN: 0312867172 do sở kế hoạch và đầu tư TP.HCM cấp ngày
          23/07/2014. Người đại diện: NGÔ NGUYÊN KHA <br />
          Địa chỉ: 86-88 Cao Thắng, phường 04, quận 3, TP.HCM. Điện thoại: (028)
          7107 8079 Email: hi@thecoffeehouse.vn <br />© 2014-2022 Công ty cổ
          phần thương mại dịch vụ Trà Cà Phê VN – Mọi quyền bảo lưu
        </p>
      </div>
      <div
        style={{
          position: "fixed",
          right: "3%",
          bottom: "30px",
          width: "65px",
          height: "65px",
          backgroundColor: "orange",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <a href="#">
          <FaHeadphones size={28} color="white" />
        </a>
      </div>
    </Footer>
  );
};

export default FooterComponent;
