//Xử lý cập nhật đơn hàng
import { useCallback } from "react";
import { message } from "antd";

import { STATUS_LABEL, type Order, type OrderStatus } from "./Oder";

export function useOrderActions(
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
) {
  const updateStatus = useCallback(
    (orderId: string, next: OrderStatus) => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.id !== orderId) return o;
          const updated = { ...o, status: next };
          if (next === "confirmed")
            updated.confirmingEmployeeName = "Trần Hoàng An";
          if (next === "inprogress")
            updated.preparingEmployeeName = "Lê Thị Bích Phượng";
          return updated;
        })
      );
      message.success(
        `Đã cập nhật trạng thái đơn ${orderId} → ${STATUS_LABEL[next]}`
      );
    },
    [setOrders]
  );

  const cancelOrder = useCallback(
    (orderId: string, reason: string) => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status: "cancelled",
                confirmingEmployeeName: "Hệ thống",
                cancelReason: reason,
              }
            : o
        )
      );
      message.warning(`Đơn ${orderId} đã chuyển sang trạng thái Đã hủy`);
    },
    [setOrders]
  );

  return { updateStatus, cancelOrder };
}
