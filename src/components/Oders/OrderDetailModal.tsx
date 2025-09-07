// Dùng để xem chi tiết đơn hàng
import React from "react";
import { Modal, List, Typography, Divider, Space } from "antd";
import { currency, type Order } from "./Oder";

const { Title, Text } = Typography;

type Props = { order?: Order | null; open: boolean; onClose: () => void };

const InfoRow: React.FC<{
  label: string;
  value?: React.ReactNode;
  danger?: boolean;
}> = ({ label, value, danger }) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <Text type="secondary">{label}:</Text>
    <Text strong type={danger ? "danger" : undefined}>
      {value}
    </Text>
  </div>
);

const OrderDetailModal: React.FC<Props> = ({ order, open, onClose }) => (
  <Modal
    open={open}
    onCancel={onClose}
    footer={null}
    width={520}
    title={
      <Space direction="vertical" size={0}>
        <Title level={4} style={{ margin: 0 }}>
          Chi tiết Hóa đơn
        </Title>
        <Text>
          Mã ĐH:{" "}
          <Text strong type="secondary">
            {order?.id}
          </Text>
        </Text>
      </Space>
    }
  >
    {!order ? null : (
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <div>
          <InfoRow label="Thời gian" value={order.time} />
          <InfoRow label="Bàn" value={order.table} />
          {order.status === "new" ? (
            <>
              <InfoRow label="Khách hàng" value={order.customerName} />
              <InfoRow label="SĐT Khách" value={order.customerPhone} />
            </>
          ) : (
            <>
              {order.confirmingEmployeeName && (
                <InfoRow
                  label="NV xác nhận"
                  value={order.confirmingEmployeeName}
                />
              )}
              {order.preparingEmployeeName && (
                <InfoRow label="NV bếp" value={order.preparingEmployeeName} />
              )}
            </>
          )}
          {order.status === "cancelled" && order.cancelReason && (
            <InfoRow label="Lý do hủy" value={order.cancelReason} danger />
          )}
        </div>

        <div>
          <Title level={5} style={{ marginTop: 0 }}>
            Danh sách món
          </Title>
          <List
            dataSource={order.items}
            renderItem={(it) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Text strong>
                      {it.qty}x {it.name}
                    </Text>
                  }
                  description={
                    <>
                      {it.size && (
                        <Text type="secondary" style={{ display: "block" }}>
                          - Size: {it.size}
                        </Text>
                      )}
                      {it.toppings && (
                        <Text type="secondary" style={{ display: "block" }}>
                          - Topping: {it.toppings}
                        </Text>
                      )}
                      {it.note && (
                        <Text
                          type="secondary"
                          italic
                          style={{ display: "block" }}
                        >
                          - Ghi chú: {it.note}
                        </Text>
                      )}
                    </>
                  }
                />
                <Text strong>{currency(it.qty * it.price)}</Text>
              </List.Item>
            )}
          />
        </div>

        <Divider style={{ margin: "8px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Tổng cộng
          </Title>
          <Title level={4} style={{ margin: 0 }}>
            {currency(order.total)}
          </Title>
        </div>
      </Space>
    )}
  </Modal>
);

export default OrderDetailModal;
