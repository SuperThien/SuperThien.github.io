// Draw xem chi tiết hóa đơn
import React from "react";
import { Drawer, Space, Typography, Divider, Button, List } from "antd";
import { PrinterOutlined, RollbackOutlined } from "@ant-design/icons";
import type { PaymentMethod } from "./PaymentTag";
import PaymentTag from "./PaymentTag";
import { currency as formatVND } from "../Oders/Oder";

const { Title, Text } = Typography;

export interface SizeAddon {
  name: string;
  price: number;
}
export interface ToppingAddon {
  name: string;
  price: number;
  quantity: number;
}
export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  size?: SizeAddon;
  toppings?: ToppingAddon[];
}

export interface InvoiceDetail {
  id: string;
  time: string;
  table: string;
  cashier: string;
  total: number;
  paymentMethod: PaymentMethod;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
}

const calcItemTotal = (item: InvoiceItem) => {
  let total = item.price;
  if (item.size) total += item.size.price;
  if (item.toppings)
    total += item.toppings.reduce((s, t) => s + t.price * t.quantity, 0);
  return total * item.quantity;
};

const InvoiceDetailDrawer: React.FC<{
  open: boolean;
  detail: InvoiceDetail | null;
  onClose: () => void;
  onPrint?: (id: string) => void;
  onRefund?: (id: string) => void;
  onAskRefundReason?: () => void; // mở ConfirmReasonModal
}> = ({ open, detail, onClose, onPrint, onRefund, onAskRefundReason }) => (
  <Drawer
    placement="right"
    width={480}
    open={open}
    onClose={onClose}
    title={
      <div className="hd-drawer-title">
        <Title level={4} className="hd-title">
          Chi tiết Hóa đơn
        </Title>
        {detail && (
          <Text type="secondary">
            Mã HĐ:{" "}
            <Text strong className="hd-text-primary">
              {detail.id}
            </Text>
          </Text>
        )}
      </div>
    }
    footer={
      <Space className="hd-drawer-footer">
        <div />
        <Space>
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={() => detail && onPrint?.(detail.id)}
          >
            In lại hóa đơn
          </Button>
          <Button icon={<RollbackOutlined />} onClick={onAskRefundReason}>
            Hoàn tiền
          </Button>
        </Space>
      </Space>
    }
  >
    {!detail ? (
      <Text type="secondary">Chọn một hóa đơn để xem chi tiết.</Text>
    ) : (
      <div>
        <div className="hd-meta-grid">
          <Text type="secondary">Ngày tạo:</Text>
          <Text strong>{detail.time}</Text>
          <Text type="secondary">Bàn:</Text>
          <Text strong>{detail.table}</Text>
          <Text type="secondary">Thu ngân:</Text>
          <Text strong>{detail.cashier}</Text>
          <Text type="secondary">Phương thức:</Text>
          <span>
            <PaymentTag method={detail.paymentMethod} />
          </span>
        </div>

        <Divider />
        <Title level={5} className="hd-section-title">
          Danh sách món
        </Title>
        <List
          dataSource={detail.items}
          split
          renderItem={(item) => (
            <List.Item>
              <div className="hd-w-full">
                <div className="hd-item-row">
                  <Text strong>
                    {item.quantity}x {item.name}
                  </Text>
                  <Text strong>{formatVND(calcItemTotal(item))}</Text>
                </div>
                <div className="hd-addons">
                  {item.size && (
                    <div className="hd-between">
                      <Text type="secondary">Size: {item.size.name}</Text>
                      <Text type="secondary">{formatVND(item.size.price)}</Text>
                    </div>
                  )}
                  {item.toppings?.map((t) => (
                    <div key={t.name} className="hd-between">
                      <Text type="secondary">
                        <span className="hd-qty">{t.quantity}x</span>Topping:{" "}
                        {t.name}
                      </Text>
                      <Text type="secondary">
                        {formatVND(t.price * t.quantity)}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </List.Item>
          )}
        />

        <Divider />
        <div className="hd-total-grid">
          <Text type="secondary">Tổng tạm tính</Text>
          <Text strong>{formatVND(detail.subtotal)}</Text>
          <Text type="secondary">Giảm giá</Text>
          <Text strong>{formatVND(detail.discount)}</Text>
          <Text className="hd-total-label">Tổng cộng</Text>
          <Text strong className="hd-total-amount">
            {formatVND(detail.total)}
          </Text>
        </div>
      </div>
    )}
  </Drawer>
);

export default InvoiceDetailDrawer;
