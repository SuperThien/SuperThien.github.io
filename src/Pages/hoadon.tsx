import { useState } from "react";
import { Layout, Button, DatePicker, Space, Typography } from "antd";
import { CalendarOutlined, DownloadOutlined } from "@ant-design/icons";
import type { InvoiceDetail } from "../components/Invoices/InvoiceDetailDrawer";
import type { InvoiceRow } from "../components/Invoices/InvoiceTable";
import InvoiceTable from "../components/Invoices/InvoiceTable";
import InvoiceDetailDrawer from "../components/Invoices/InvoiceDetailDrawer";
import ConfirmReasonModal from "../components/Oders/ConfirmReasonModal";

const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

// ========================= Mock Data ========================= //
const detailData: Record<string, InvoiceDetail> = {
  "#HD1256": {
    id: "#HD1256",
    time: "18:15 - 28/07/2025",
    table: "Bàn 05",
    cashier: "Nguyễn Văn A",
    paymentMethod: "Tiền mặt",
    items: [
      {
        name: "Trà sữa trân châu",
        quantity: 2,
        price: 40000,
        size: { name: "Lớn", price: 5000 },
        toppings: [{ name: "Trân châu đen", price: 5000, quantity: 2 }],
      },
      { name: "Hamburger Bò", quantity: 1, price: 55000 },
    ],
    subtotal: 165000,
    discount: 0,
    total: 165000,
  },
  "#HD1254": {
    id: "#HD1254",
    time: "17:40 - 28/07/2025",
    table: "Bàn 02",
    cashier: "Trần Thị B",
    paymentMethod: "Thẻ tín dụng",
    items: [
      {
        name: "Pizza Hải sản",
        quantity: 1,
        price: 150000,
        size: { name: "Đế dày", price: 20000 },
      },
      { name: "Coca-cola", quantity: 4, price: 15000 },
    ],
    subtotal: 230000,
    discount: 0,
    total: 230000,
  },
  "#HD1253": {
    id: "#HD1253",
    time: "17:30 - 28/07/2025",
    table: "Bàn 07",
    cashier: "Nguyễn Văn A",
    paymentMethod: "Đã hủy",
    items: [
      { name: "Bún chả", quantity: 1, price: 45000 },
      { name: "Trà đá", quantity: 1, price: 5000 },
    ],
    subtotal: 50000,
    discount: 0,
    total: 50000,
  },
};

const rows: InvoiceRow[] = Object.values(detailData).map((d) => ({
  id: d.id,
  time: d.time,
  table: d.table,
  cashier: d.cashier,
  total: d.total,
  paymentMethod: d.paymentMethod,
}));

export default function Hoadon() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refundOpen, setRefundOpen] = useState(false);

  const selected = selectedId ? detailData[selectedId] : null;

  return (
    <Layout className="hd-layout">
      <Content className="hd-content">
        <div className="hd-header">
          <div>
            <Title level={2} className="hd-title">
              Lịch sử Giao dịch
            </Title>
            <Text type="secondary">
              Tra cứu và quản lý tất cả các hóa đơn đã phát hành.
            </Text>
          </div>
          <Space>
            <RangePicker
              allowClear
              suffixIcon={<CalendarOutlined />}
              placeholder={["Từ ngày", "Đến ngày"]}
              className="hd-range-picker"
              onChange={(range) => {}}
            />
            <Button icon={<DownloadOutlined />} onClick={() => {}}>
              Xuất file
            </Button>
          </Space>
        </div>

        <InvoiceTable
          rows={rows}
          onRowClick={(row) => {
            setSelectedId(row.id);
            setOpen(true);
          }}
        />
      </Content>

      <InvoiceDetailDrawer
        open={open}
        detail={selected}
        onClose={() => setOpen(false)}
        onPrint={(id) => {
          console.log("print invoice", id);
        }}
        onRefund={(id) => {
          console.log("refund invoice", id);
        }}
        onAskRefundReason={() => setRefundOpen(true)}
      />

      <ConfirmReasonModal
        open={refundOpen}
        title="Lý do hoàn tiền"
        okText="Xác nhận hoàn"
        cancelText="Bỏ qua"
        onOk={(reason) => {
          console.log("refund reason:", reason, "for", selectedId);
          setRefundOpen(false);
        }}
        onCancel={() => setRefundOpen(false)}
      />
    </Layout>
  );
}
