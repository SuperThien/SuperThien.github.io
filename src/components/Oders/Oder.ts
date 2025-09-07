// Các Kiểu Type dùng chung
export type OrderStatus =
  | "new"
  | "confirmed"
  | "inprogress"
  | "completed"
  | "cancelled";

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
  size?: string;
  toppings?: string;
  note?: string;
}

export interface Order {
  id: string;
  table: string;
  time: string;
  total: number;
  items: OrderItem[];
  status: OrderStatus;
  customerName?: string;
  customerPhone?: string;
  confirmingEmployeeName?: string;
  preparingEmployeeName?: string;
  cancelReason?: string;
}
// nhóm màu trạng thái các nút bấm
export const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "Mới",
  confirmed: "Đã xác nhận",
  inprogress: "Đang thực hiện",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export const STATUS_BG: Record<OrderStatus, string> = {
  new: "#f5f7fb",
  confirmed: "#edf5ff",
  inprogress: "#fff7e6",
  completed: "#f6ffed",
  cancelled: "#fff1f0",
};

export const STATUS_BORDER: Record<OrderStatus, string> = {
  new: "#e5e7eb",
  confirmed: "#d6e4ff",
  inprogress: "#ffe7ba",
  completed: "#b7eb8f",
  cancelled: "#ffa39e",
};
//Định dạng tiền VND
export const currency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount
  );
// Đếm tổng số món
export const itemsCount = (items: OrderItem[]) =>
  items.reduce((sum, it) => sum + (it.qty || 0), 0);
