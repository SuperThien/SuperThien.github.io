import ThucDon from "./ThucDon";
import "../style.css";
import sp1 from "../img/sp1.webp";
import sp2 from "../img/sp2.webp";
import sp3 from "../img/sp3.webp";
import sp4 from "../img/sp4.webp";
import sp5 from "../img/sp5.webp";
export const SanPhamLienQuan = () => {
  const sanpham = [
    {
      id: 1,
      src: sp1,
      alt: "CloudFee Caramel",
      name: "CloudFee Caramel",
      price: "49.000đ",
    },
    {
      id: 2,
      src: sp2,
      alt: "The Coffee House Sữa Đá",
      name: "The Coffee House Sữa Đá",
      price: "39.000đ",
    },
    {
      id: 3,
      src: sp3,
      alt: "Hi-Tea Vải",
      name: "Hi-Tea Vải",
      price: "49.000đ",
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
      src: sp5,
      alt: "Bánh Mì VN Thịt Nguội",
      name: "Bánh Mì VN Thịt Nguội",
      price: "39.000đ",
    },
  ];

  return (
    <div className="san_pham">
      <h3 className="section-title">Sản phẩm liên quan</h3>
      <div className="lien_quan">
        {sanpham.map((prod) => (
          <ThucDon
            key={prod.id}
            product={prod}
            styler={{
              width: "200px",
              borderRadius: "10px",
              boxShadow: "10px -10px 10px rgb(221, 218, 218)",
            }}
          />
        ))}
      </div>
    </div>
  );
};
