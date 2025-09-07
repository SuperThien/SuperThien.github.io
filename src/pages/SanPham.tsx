import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThucDon from "./ThucDon";
import "../style.css";

// Import các hình ảnh
import sp3 from "../img/sp3.webp";
import sp8 from "../img/sp8.webp";
import sp9 from "../img/sp9.webp";
import sp10 from "../img/sp10.webp";
import sp4 from "../img/sp4.webp";
import sp1 from "../img/sp1.webp";
import sp2 from "../img/sp2.webp";
import sp13 from "../img/sp13.webp";
import sp14 from "../img/sp14.webp";
import sp16 from "../img/sp16.webp";
import sp15 from "../img/sp15.webp";
import sp19 from "../img/sp19.webp";
import sp20 from "../img/sp20.webp";
import sp17 from "../img/sp17.webp";
import sp18 from "../img/sp18.webp";
import sp21 from "../img/sp21.webp";
import sp22 from "../img/sp22.webp";
import sp23 from "../img/sp23.webp";
import sp24 from "../img/sp24.webp";
import sp25 from "../img/sp25.webp";
import sp26 from "../img/sp26.webp";
import sp27 from "../img/sp27.webp";
import sp28 from "../img/sp28.webp";

type MenuItem = {
  id: number;
  src: string;
  alt: string;
  name: string;
  price: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};
const SanPham: React.FC = () => {
  const [list, setlist] = useState<MenuSection[]>([]);
  useEffect(() => {
    const menuData = [
      {
        title: "1. Trà",
        items: [
          {
            id: 1,
            src: sp3,
            alt: "Hi-Tea Vải",
            name: "Hi-Tea Vải",
            price: "49.000₫",
          },
          {
            id: 2,
            src: sp8,
            alt: "Trà Long Nhãn Hạt Sen",
            name: "Trà Long Nhãn Hạt Sen",
            price: "29.000₫",
          },
          {
            id: 3,
            src: sp9,
            alt: "Trà Đào Cam Sả - Đá",
            name: "Trà Đào Cam Sả - Đá",
            price: "39.000₫",
          },
          {
            id: 4,
            src: sp10,
            alt: "Trà Đào Cam Sả - Nóng",
            name: "Trà Đào Cam Sả - Nóng",
            price: "19.000₫",
          },
        ],
      },
      {
        title: "2. Cà phê",
        items: [
          {
            id: 5,
            src: sp4,
            alt: "Cà Phê Sữa Đá",
            name: "Cà Phê Sữa Đá",
            price: "29.000₫",
          },
          {
            id: 6,
            src: sp1,
            alt: "Cà Phê Latte",
            name: "Cà Phê Latte",
            price: "59.000₫",
          },
          {
            id: 7,
            src: sp1,
            alt: "Bạc Xỉu Latte",
            name: "Bạc Xỉu Latte",
            price: "59.000₫",
          },
          {
            id: 8,
            src: sp2,
            alt: "Bạc Xỉu (Nóng)",
            name: "Bạc Xỉu (Nóng)",
            price: "59.000₫",
          },
        ],
      },
      {
        title: "3. Trà xanh",
        items: [
          {
            id: 9,
            src: sp13,
            alt: "Trà Xanh Latte",
            name: "Trà Xanh Latte",
            price: "59.000₫",
          },
          {
            id: 10,
            src: sp14,
            alt: "Trà Xanh Latte (Nóng)",
            name: "Trà Xanh Latte (Nóng)",
            price: "59.000₫",
          },
          {
            id: 11,
            src: sp16,
            alt: "Frosty Trà Xanh",
            name: "Frosty Trà Xanh",
            price: "59.000₫",
          },
          {
            id: 12,
            src: sp15,
            alt: "Trà Xanh Đường Đen",
            name: "Trà Xanh Đường Đen",
            price: "59.000₫",
          },
        ],
      },
      {
        title: "4. Bánh",
        items: [
          {
            id: 13,
            src: sp19,
            alt: "Butter Croissant",
            name: "Butter Croissant",
            price: "39.000₫",
          },
          {
            id: 14,
            src: sp20,
            alt: "Chà Bông Phô Mai",
            name: "Chà Bông Phô Mai",
            price: "39.000₫",
          },
          {
            id: 15,
            src: sp17,
            alt: "Bánh Mì Que Pate",
            name: "Bánh Mì Que Pate",
            price: "19.000₫",
          },
          {
            id: 16,
            src: sp18,
            alt: "Croissant Trứng Muối",
            name: "Croissant Trứng Muối",
            price: "59.000₫",
          },
          {
            id: 17,
            src: sp21,
            alt: "Mít Sấy",
            name: "Mít Sấy",
            price: "19.000₫",
          },
          {
            id: 18,
            src: sp22,
            alt: "Gà Xé Lá Chanh",
            name: "Gà Xé Lá Chanh",
            price: "19.000₫",
          },
          {
            id: 19,
            src: sp23,
            alt: "Pate Chaud",
            name: "Pate Chaud",
            price: "49.000₫",
          },
          {
            id: 20,
            src: sp24,
            alt: "Choco Croffle",
            name: "Choco Croffle",
            price: "49.000₫",
          },
          {
            id: 21,
            src: sp25,
            alt: "Mochi Kem Matcha",
            name: "Mochi Kem Matcha",
            price: "19.000₫",
          },
          {
            id: 22,
            src: sp26,
            alt: "Mochi Kem Xoài",
            name: "Mochi Kem Xoài",
            price: "19.000₫",
          },
          {
            id: 23,
            src: sp27,
            alt: "Mousse Tiramisu",
            name: "Mousse Tiramisu",
            price: "39.000₫",
          },
          {
            id: 24,
            src: sp28,
            alt: "Mousse Gấu Chocolate",
            name: "Mousse Gấu Chocolate",
            price: "39.000₫",
          },
        ],
      },
    ];
    setlist(menuData);
  }, []);
  return (
    <section className="section_two">
      {list.map((section, idx) => {
        const { title, items } = section;
        const marginTop = idx === 0 ? "20px" : "40px";

        const renderItems = (list: typeof items) =>
          list.map((item) => (
            <ThucDon
              key={item.id}
              product={item}
              styler={{
                width: "300px",
                borderRadius: "8px",
                boxShadow: "10px -10px 10px rgb(221, 218, 218)",
              }}
            />
          ));

        if (idx === 3) {
          const rowsCount = 3;
          const size = Math.ceil(items.length / rowsCount);
          const chunked = Array.from({ length: rowsCount }, (_, i) =>
            items.slice(i * size, (i + 1) * size)
          );

          return (
            <div key={title}>
              <h1 style={{ fontSize: "30px", marginLeft: "10%", marginTop }}>
                {title}
              </h1>
              {chunked.map((row, rowIndex) => (
                <div key={rowIndex} className="products_two">
                  {renderItems(row)}
                </div>
              ))}
            </div>
          );
        }

        return (
          <div key={title}>
            <h1 style={{ fontSize: "30px", marginLeft: "10%", marginTop }}>
              {title}
            </h1>
            <div className="products_two">{renderItems(items)}</div>
          </div>
        );
      })}
    </section>
  );
};

export default SanPham;
