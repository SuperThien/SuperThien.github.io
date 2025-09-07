import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
export interface MenuItem {
  id: number;
  src: string;
  alt: string;
  name: string;
  price: string;
}

interface ThucDonProps {
  product: MenuItem;
  styler?: React.CSSProperties;
}
const ThucDon: React.FC<ThucDonProps> = ({ product, styler }) => {
  const content = (
    <div className="products_one">
      <img src={product.src} alt={product.alt} style={styler} />
      <h3>{product.name}</h3>
      <h3>{product.price}</h3>
    </div>
  );
  return (
    <>
      <Link
        to={`/oder/${product.id}`}
        state={{ product }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {content}
      </Link>
    </>
  );
};

export default ThucDon;
