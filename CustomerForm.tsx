// ./GioHangs/CustomerForm.tsx
import React from "react";

type Props = {
  formData: {
    hoTen: string;
    dienThoai: string;
    email: string;
    diaChiMacDinh?: string;   // nếu bạn đang set từ API hãy thêm vào state ở GioHang.tsx
    diaChiGiaoHang?: string;
    ghiChu: string;
  };
  setFormData: React.Dispatch<any>;
};

const CustomerForm: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <div>
      {/* Họ và tên */}
      <label className="login-label">Họ và tên</label>
      <input
        className="login-input"
        type="text"
        value={formData.hoTen}
        readOnly
        disabled
      />

      {/* Điện thoại */}
      <label className="login-label">Điện thoại</label>
      <input
        className="login-input"
        type="text"
        value={formData.dienThoai}
        readOnly
        disabled
      />

      {/* Email */}
      <label className="login-label">Email</label>
      <input
        className="login-input"
        type="text"
        value={formData.email}
        readOnly
        disabled
      />

      {/* Địa chỉ mặc định */}
      <label className="login-label">Địa chỉ mặc định</label>
      <input
        className="login-input"
        type="text"
        value={formData.diaChiMacDinh || ""}
        readOnly
        disabled
      />

      {/* Địa chỉ giao hàng (cho phép sửa) */}
      <label className="login-label">Địa chỉ giao hàng</label>
      <input
        className="login-input"
        type="text"
        placeholder="Nhập địa chỉ giao hàng khác (nếu muốn đổi)"
        value={formData.diaChiGiaoHang || ""}
        onChange={(e) =>
          setFormData((prev: any) => ({ ...prev, diaChiGiaoHang: e.target.value }))
        }
      />

      {/* Ghi chú to và dài hơn */}
      <label className="login-label">Quý khách có yêu cầu gì thêm?</label>
      <textarea
        className="login-input"
        rows={5}
        style={{ minHeight: 120 }}
        placeholder="Ví dụ: không đá, ít đường…"
        value={formData.ghiChu}
        onChange={(e) => setFormData((prev: any) => ({ ...prev, ghiChu: e.target.value }))}
      />
    </div>
  );
};

export default CustomerForm;
