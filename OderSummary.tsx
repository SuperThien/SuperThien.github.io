interface OrderSummaryProps {
  total: number;
  grandTotal: number;
  formatPrice: (n: number) => string;
  onSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  total,
  grandTotal,
  formatPrice,
  onSubmit,
}) => {
  return (
    <div className="login_one-two">
      <div style={{ display: "flex" }}>
        <p style={{ height: 30, fontSize: 25, fontWeight: 1000, width: 200 }}>
          Tiền hàng:
        </p>
        <p style={{ height: 30, fontSize: 20, color: "orange" }}>
          {formatPrice(total)}
        </p>
      </div>

      <div style={{ display: "flex" }}>
        <p style={{ height: 30, fontSize: 25, fontWeight: 1000, width: 200 }}>
          Phí ship:
        </p>
        <p style={{ height: 30, fontSize: 20 }}>20.000đ</p>
      </div>

      <hr style={{ width: "93%" }} />

      <div style={{ display: "flex" }}>
        <p
          style={{
            height: 30,
            fontSize: 25,
            fontWeight: 1000,
            width: 250,
            marginTop: 20,
          }}
        >
          Số tiền thanh toán:
        </p>
        <p
          style={{
            height: 30,
            fontSize: 20,
            color: "orange",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          {formatPrice(grandTotal)}
        </p>
      </div>

      <button onClick={onSubmit}>Đặt hàng</button>
    </div>
  );
};

export default OrderSummary;
