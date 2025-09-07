// Vẽ Cột trạng thái sau khi cập nhật trạng thái đơn hàng
import React from "react";
import { Card, Space, Typography } from "antd";
import { STATUS_BG, STATUS_LABEL, type Order, type OrderStatus } from "./Oder";

import OrderCard from "./OderCard";

const { Title, Text } = Typography;

type Props = {
  status: OrderStatus;
  orders: Order[];
  onView: (o: Order) => void;
  onUpdateStatus: (id: string, next: OrderStatus) => void;
  onCancel: (id: string) => void;
};

const StatusColumn: React.FC<Props> = ({
  status,
  orders,
  onView,
  onUpdateStatus,
  onCancel,
}) => (
  <Card
    style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
    headStyle={{
      background: "#ffffff",
      borderBottom: "1px solid #f0f0f0",
      padding: "12px 16px",
    }}
    bodyStyle={{ background: "#f7f8fa", padding: 12 }}
    title={
      <Title level={5} style={{ margin: 0 }}>
        {STATUS_LABEL[status]} ({orders.length})
      </Title>
    }
  >
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onView={onView}
          onUpdateStatus={onUpdateStatus}
          onCancel={onCancel}
        />
      ))}
      {orders.length === 0 && (
        <Card
          size="small"
          style={{ background: STATUS_BG[status], borderRadius: 12 }}
        >
          <Text type="secondary">Không có đơn nào</Text>
        </Card>
      )}
    </Space>
  </Card>
);

export default StatusColumn;
