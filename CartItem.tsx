import React from "react";

type Props = {
  product: {
    id: number | string;
    name: string;
    price: string;   // ví dụ: "29.000đ"
    src?: string;
    alt?: string;
  };
  size: "Nhỏ" | "Vừa" | "Lớn";
  toppings: string[];
  sizeExtra: number;
  quantity: number;
  total: number;
  note?: string;
  formatPrice: (n: number) => string;
  onNoteChange: (v: string) => void;
  onQuantityChange: (q: number) => void;
  onDelete: () => void;
};

const CartItem: React.FC<Props> = ({
  product,
  size,
  toppings,
  quantity,
  total,
  note = "",
  formatPrice,
  onNoteChange,
  onQuantityChange,
  onDelete,
}) => {
  const inc = () => onQuantityChange(quantity + 1);
  const dec = () => onQuantityChange(Math.max(1, quantity - 1));

  // đơn giá 1 ly để hiển thị ở cột “Đơn giá”
  const unitPrice = Math.round(total / Math.max(1, quantity));

  return (
    <div
      className="cart-item"
      style={{
        position: "relative",
        width: "80%",
        margin: "0 auto 28px",
      }}
    >
      {/* 6 cột: Sản phẩm | Tình trạng | Đơn giá | Số lượng | Thành tiền | Ghi chú */}
      <div
        className="cart-item__row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 120px 120px 120px 140px 160px",
          gap: 16,
          alignItems: "center",
        }}
      >
        {/* Cột 1: Sản phẩm */}
        <div
          className="cart-item__product"
          style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
        >
          {product.src && (
            <img
              src={product.src}
              alt={product.alt || product.name}
              style={{
                width: 140,
                height: 140,
                objectFit: "cover",
                borderRadius: 10,
                border: "1px solid #eee",
              }}
            />
          )}
          <div>
            <div style={{ fontWeight: 600 }}>{product.name}</div>
            <div style={{ marginTop: 6 }}>
              <span>Size: {size}</span>
            </div>
            {toppings?.length > 0 && (
              <div style={{ marginTop: 6 }}>
                <div style={{ fontWeight: 600 }}>Toppings:</div>
                <div>
                  {toppings.map((t, i) => (
                    <span key={i}>
                      {t}
                      {i < toppings.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cột 2: Tình trạng (canh phải, bạn có thể chỉnh paddingRight px tùy ý) */}
        <div style={{ color: "orange", fontWeight: 600, textAlign: "right", paddingRight: 8 }}>
          Hàng order
        </div>

        {/* Cột 3: Đơn giá (canh phải) */}
        <div style={{ textAlign: "right", paddingRight: 8 }}>
          {formatPrice(unitPrice)}
        </div>

        {/* Cột 4: Số lượng */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            aria-label="Giảm số lượng"
            onClick={dec}
            className="qty-btn"
            style={{
              background: "transparent",
              border: "none",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ‹
          </button>
          <div
            className="qty-box"
            style={{
              border: "1px solid #1890ff",
              borderRadius: 8,
              width: 40,
              height: 40,
              display: "grid",
              placeItems: "center",
              fontWeight: 600,
              userSelect: "none",
            }}
          >
            {quantity}
          </div>
          <button
            type="button"
            aria-label="Tăng số lượng"
            onClick={inc}
            className="qty-btn"
            style={{
              background: "transparent",
              border: "none",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ›
          </button>
        </div>

        {/* Cột 5: Thành tiền */}
        <div style={{ fontWeight: 600, textAlign: "right", paddingRight: 8 }}>
          {formatPrice(total)}
        </div>

        {/* Cột 6: Ghi chú + nút Xóa nhỏ bên dưới, sát phải */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <textarea
            className="note-input"
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Ghi chú"
            rows={2}
            style={{
              width: "100%",
              minHeight: 48,
              padding: 8,
              border: "1px solid #000",
              borderRadius: 6,
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault(); // nếu component nằm trong form, tránh submit
                onDelete();
              }}
              title="Xóa sản phẩm này"
              style={{
                height: 22,
                padding: "0 8px",
                background: "#ff4d4f",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
