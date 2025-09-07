import React, { useState, useEffect } from "react";
import "../style.css";
import bn6 from "../img/bnn6.webp";
import bn1 from "../img/bn1.webp";
import bn3 from "../img/bn3.webp";
import bn4 from "../img/bn4.webp";
import bnn5 from "../img/bnn5.webp";
import banner1 from "../img/banner-1.webp";
import banner2 from "../img/banner-2.webp";
import banner3 from "../img/banner-3.webp";
import banner4 from "../img/banner-4.webp";
import banne1 from "../img/banne-1.webp";
import spp3 from "../img/spp3.webp";
import spp11 from "../img/spp11.webp";
import sp13 from "../img/sp13.webp";
import gt2 from "../img/gt2.png";
import gtt1 from "../img/gtt-1.webp";
import gt4 from "../img/gt4.jpg";
import gt5 from "../img/gt5.jpg";
import gt6 from "../img/gt6.jpg";
import gt7 from "../img/gt7.jpg";
import gt8 from "../img/gt8.jpg";
import gt9 from "../img/gt9.jpg";
import gt10 from "../img/gt10.jpg";
import gt11 from "../img/gt11.jpg";
import gt12 from "../img/gt12.jpg";
import sp9 from "../img/sp9.webp";
import sp4 from "../img/sp4.webp";
import { Link } from "react-router-dom";
import ThucDon, { MenuItem } from "./ThucDon";

const HomePage: React.FC = () => {
  const sanpham: MenuItem[] = [
    {
      id: 1,
      src: sp13,
      alt: "Trà Xanh Latte",
      name: "Trà Xanh Latte",
      price: "59.000₫",
    },
    {
      id: 2,
      src: sp9,
      alt: "Trà Đào Cam Sả - Đá",
      name: "Trà Đào Cam Sả - Đá",
      price: "39.000₫",
    },
    {
      id: 3,
      src: spp3,
      alt: "Mochi Kem Chocolate",
      name: "Mochi Kem Chocolate",
      price: "23.000₫",
    },
    {
      id: 4,
      src: sp4,
      alt: "Cà Phê Sữa Đá",
      name: "Cà Phê Sữa Đá",
      price: "29.000đ",
    },
    {
      id: 5,
      src: spp11,
      alt: "Mochi Kem Trà Sữa Trân Châu",
      name: "Mochi Kem Trà Sữa Trân Châu",
      price: "19.000đ",
    },
  ];
  const related = sanpham.slice(0, 2);
  const featured = sanpham.slice(2);
  const firstImages = [bn1, bn3, bn4, bnn5];
  const [firstSrc, setFirstSrc] = useState(bn6);
  const [indexOne, setIndexOne] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFirstSrc(firstImages[indexOne]);
      setIndexOne((prev) => {
        const next = prev + 1;
        return next === 4 ? 0 : next;
      });
    }, 1300);
    return () => clearInterval(interval);
  }, [firstImages, indexOne]);

  const secondImages = [banner2, banner3, banner4];
  const [secondSrc, setSecondSrc] = useState(banner1);
  const [indexTwo, setIndexTwo] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondSrc(secondImages[indexTwo]);
      setIndexTwo((prev) => {
        const next = prev + 1;
        return next === 3 ? 0 : next;
      });
    }, 1300);
    return () => clearInterval(interval);
  }, [secondImages, indexTwo]);

  return (
    <>
      <section className="section_one">
        <img id="hinh" src={firstSrc} alt="" style={{ width: "100%" }} />
      </section>

      <section className="section_two">
        <div className="section_two-one">
          <a style={{ left: "50px" }} href="">
            <img
              style={{
                width: "600px",
                borderRadius: "10px",
                margin: "0 50px",
                boxShadow: "10px -10px 10px rgb(221, 218, 218)",
              }}
              src={banne1}
              alt=""
            />
          </a>
          {related.map((prod) => (
            <ThucDon
              key={prod.id}
              product={prod}
              styler={{
                width: "380px",
                borderRadius: "10px",
                boxShadow: "10px -10px 10px rgb(221, 218, 218)",
              }}
            />
          ))}
        </div>

        <h2>Sản Phẩm Nổi Bật</h2>
        <div className="products_two">
          {featured.map((prod) => (
            <ThucDon
              key={prod.id}
              product={prod}
              styler={{
                width: "400px",
                borderRadius: "10px",
                boxShadow: "10px -10px 10px rgb(221, 218, 218)",
              }}
            />
          ))}
        </div>
      </section>

      <section className="section_three">
        <img src={gt2} alt="" />
        <div className="section_three-img">
          <div className="text">
            <p>
              <img src={gtt1} alt="" />
              Được trồng trọt và chăm chút kỹ lưỡng, nuôi dưỡng từ thổ nhưỡng
              phì nhiêu, nguồn nước mát lành, bao bọc bởi mây và sương cùng nền
              nhiệt độ mát mẻ quanh năm, những búp trà ở Tây Bắc mập mạp và xanh
              mướt, hội tụ đầy đủ dưỡng chất, sinh khí, và tinh hoa đất
              trời.Chính khí hậu đặc trưng cùng phương pháp canh tác của đồng
              bào dân tộc nơi đây đã tạo ra Trà Xanh vị mộc dễ uống, dễ yêu,
              không thể trộn lẫn với bất kỳ vùng miền nào khác.
            </p>
            <button>Thử Ngay</button>
          </div>
        </div>
      </section>

      <section className="section_four">
        <div className="section_four-kh">
          <h1>
            SIGNATURE <br /> By The Coffee House
          </h1>
          <p>
            Nơi cuộc hẹn tròn đầy với cà phê đặc sản, món <br /> ăn đa bản sắc
            và không gian cảm hứng.
          </p>
          <button>Tìm hiểu thêm</button>
        </div>
        <img style={{ width: "900px" }} id="hinh1" src={secondSrc} alt="" />
      </section>

      <section className="section_five">
        <h1>Chuyện nhà</h1>
        <p>
          <b style={{ color: "orangered" }}> |</b> Coffeeholic
        </p>
        <div className="section_five-div">
          <div className="section_five-div1">
            <img style={{ width: "400px" }} src={gt4} alt="" />
            <h3>
              <Link to="/oder/:id">BẮT GẶP SÀI GÒN XƯA TRONG MÓN UỐNG</Link>
            </h3>
            <p style={{ height: "120px", width: "330px", margin: "5px 0" }}>
              Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại
              những dấu ấn thăng trầm của một Sài Gòn xưa cũ. Trên những góc
              phố,...
            </p>
          </div>

          <div className="section_five-div1">
            <img style={{ width: "400px" }} src={gt5} alt="" />
            <p>30/10/2023</p>
            <h3>
              <Link to="/oder/:id">CHỈ CHỌN CÀ PHÊ MỖI SÁNG NHƯNG CŨN</Link>
            </h3>
            <p style={{ height: "120px", width: "330px" }}>
              Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại
              những dấu ấn thăng trầm của một Sài Gòn xưa cũ. Trên những góc phố
            </p>
          </div>

          <div className="section_five-div1">
            <img style={{ width: "400px" }} src={gt6} alt="" />
            <p>21/12/2023</p>
            <h3>
              <Link to="/oder/:id">BẮT GẶP SÀI GÒN XƯA TRONG MÓN UỐNG</Link>
            </h3>
            <p style={{ height: "120px", width: "330px" }}>
              Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại
              những dấu ấn thăng trầm của một Sài Gòn xưa cũ. Trên những góc phố
            </p>
          </div>
        </div>

        <p>
          <b style={{ color: "orangered" }}> |</b> Teaholic
        </p>
        <div className="section_five-div">
          <div className="section_five-div1">
            <img style={{ width: "400px" }} src={gt7} alt="" />
            <p>09/02/2023</p>
            <h3>
              <Link to="/oder/:id">DỪNG CHÚT THÔI THƯỞNG CHÚT TRÔI</Link>
            </h3>
            <p style={{ height: "120px", width: "330px" }}>
              Bạn có từng nghe: “Trung thu thôi mà, có gì đâu mà chơi”, hay
              “Trung thu càng ngày càng chán”...? Sự bận rộn đến mức “điên rồ”
              đã khiến chúng
            </p>
          </div>

          <div className="section_five-div1">
            <img style={{ width: "400px" }} src={gt8} alt="" />
            <p>10/03/2023</p>
            <h3>
              <Link to="/oder/:id">BỘ SƯU TẬP CẦU TOÀN KÈO THƠM:</Link>
            </h3>
            <p style={{ height: "120px", width: "330px" }}>
              Tết nay vẫn giống Tết xưa, không hề mai một nét văn hoá truyền
              thống mà còn thêm vào những hoạt động “xin vía” hiện đại, trẻ
              trung
            </p>
          </div>

          <div className="section_five-div1">
            <img style={{ width: "400px" }} src={gt9} alt="" />
            <p>05/05/2023</p>
            <h3>
              <Link to="/oder/:id">“KHUẤY ĐỂ THẤY TRĂNG"</Link>
            </h3>
            <p style={{ height: "120px", width: "330px" }}>
              Năm 2022 là năm đề cao sức khỏe tinh thần nên giới trẻ muốn tận
              hưởng một Trung thu với nhiều trải nghiệm mới mẻ, rôm rả cùng bạn
              bè
            </p>
          </div>
        </div>

        <p>
          <b style={{ color: "orangered" }}> |.</b> Blog
        </p>
        <div className="section_five-div">
          <div className="section_five-div1">
            <img style={{ width: "400px" }} src={gt10} alt="" />
            <p>02/11/2023</p>
            <h3>
              <Link to="/oder/:id">LY CÀ PHÊ SỮA ĐÁ VIỆT NAM</Link>
            </h3>
            <p style={{ height: "120px", width: "330px" }}>
              Ấn tượng và tự hào, hình ảnh Việt Nam tiếp tục được lên sóng tại
              Quảng trường Thời Đại (New York) với ly cà phê sữa đá quen thuộc,
              đi cùng thương hiệu The Coffee House.
            </p>
          </div>

          <div className="section_five-div1">
            <img style={{ width: "400px" }} src={gt11} alt="" />
            <p>19/10/2023</p>
            <h3>
              <Link to="/oder/:id">NGƯỢC LÊN TÂY BẮC GÓI VỊ MỘC VỀ XUÔI</Link>
            </h3>
            <p style={{ height: "120px", width: "330px" }}>
              Những dải ruộng bậc thang, các cô gái Thái với điệu múa xòe hoa,
              muôn cung đường ngợp mùa hoa… đó là rẻo cao Tây Bắc
            </p>
          </div>

          <div className="section_five-div1">
            <img style={{ width: "400px" }} src={gt12} alt="" />
            <p>04/04/2023</p>
            <h3>
              <Link to="/oder/:id">ĐI "VAY LẠNH" - TỪ VỰNG HẸN HÒ MỚI NỔI</Link>
            </h3>
            <p style={{ height: "120px", width: "330px" }}>
              Đi “vay lạnh” - từ vựng hẹn hò mới nổi, cập nhật ngay kẻo lỗi thời
              Nếu “đi trà sữa”, “đi đu đưa”... đã trở thành những lời rủ rê quen
              thuộc mỗi khi hẹn hò của giới trẻ
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
