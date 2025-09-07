// Thẻ Đơn Hàng
import React from "react";
import { Card, Button, Space, Tag, Typography } from "antd";
import {
  EyeOutlined,
  StopOutlined,
  CheckOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  itemsCount,
  STATUS_BG,
  STATUS_BORDER,
  type Order,
  type OrderStatus,
} from "./Oder";

const { Text } = Typography;

type Props = {
  order: Order;
  onView: (order: Order) => void;
  onUpdateStatus: (orderId: string, next: OrderStatus) => void;
  onCancel: (orderId: string) => void;
};

const subtleBtn = (bg: string, color: string) => ({
  background: bg,
  color,
  border: "none",
});

const OrderCard: React.FC<Props> = ({
  order,
  onView,
  onUpdateStatus,
  onCancel,
}) => {
  const totalItems = itemsCount(order.items);

  const actionsByStatus: Partial<Record<OrderStatus, React.ReactNode>> = {
    new: (
      <Space wrap>
        <Button
          size="small"
          shape="round"
          icon={<EyeOutlined />}
          style={subtleBtn("#eaf2ff", "#1d4ed8")}
          onClick={() => onView(order)}
        >
          Xem chi tiết
        </Button>
        <Button
          size="small"
          shape="round"
          style={subtleBtn("#fee2e2", "#b91c1c")}
          icon={<StopOutlined />}
          onClick={() => onCancel(order.id)}
        >
          Hủy
        </Button>
        <Button
          size="small"
          shape="round"
          type="primary"
          icon={<CheckOutlined />}
          onClick={() => onUpdateStatus(order.id, "confirmed")}
        >
          Xác nhận
        </Button>
      </Space>
    ),
    confirmed: (
      <Space wrap>
        <Button
          size="small"
          shape="round"
          icon={<EyeOutlined />}
          style={subtleBtn("#eaf2ff", "#1d4ed8")}
          onClick={() => onView(order)}
        >
          Xem chi tiết
        </Button>
        <Button
          size="small"
          shape="round"
          type="primary"
          icon={<PlayCircleOutlined />}
          onClick={() => onUpdateStatus(order.id, "inprogress")}
        >
          Bắt đầu làm
        </Button>
      </Space>
    ),
    inprogress: (
      <Space wrap>
        <Button
          size="small"
          shape="round"
          icon={<EyeOutlined />}
          style={subtleBtn("#eaf2ff", "#1d4ed8")}
          onClick={() => onView(order)}
        >
          Xem chi tiết
        </Button>
        <Button
          size="small"
          shape="round"
          type="primary"
          icon={<CheckCircleOutlined />}
          onClick={() => onUpdateStatus(order.id, "completed")}
        >
          Hoàn thành
        </Button>
      </Space>
    ),
    completed: (
      <Space wrap>
        <Button
          size="small"
          shape="round"
          icon={<EyeOutlined />}
          style={subtleBtn("#eaf2ff", "#1d4ed8")}
          onClick={() => onView(order)}
        >
          Xem chi tiết
        </Button>
        <Tag color="green" style={{ borderRadius: 999, padding: "2px 10px" }}>
          Đã phục vụ
        </Tag>
      </Space>
    ),
    cancelled: (
      <Space wrap>
        <Button
          size="small"
          shape="round"
          icon={<EyeOutlined />}
          style={subtleBtn("#eaf2ff", "#1d4ed8")}
          onClick={() => onView(order)}
        >
          Xem chi tiết
        </Button>
      </Space>
    ),
  };

  return (
    <Card
      size="small"
      style={{
        background: STATUS_BG[order.status],
        borderColor: STATUS_BORDER[order.status],
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 12,
      }}
      bodyStyle={{ padding: 16 }}
      hoverable
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Text strong style={{ fontSize: 16 }}>
          {order.table}
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {order.time}
        </Text>
      </div>
      <Text type="secondary">Tổng cộng: {totalItems} món</Text>
      <div style={{ marginTop: 12 }}>{actionsByStatus[order.status]}</div>
    </Card>
  );
};

export default OrderCard;
