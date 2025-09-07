import { useState } from "react";
import { Layout, Input, Row, Col, Typography, Checkbox, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import FilterSidebar from "../components/Sidebar";
import { useOrderActions } from "../components/Oders/useOrderActions";
import StatusColumn from "../components/Oders/StatusColumn";
import OrderDetailModal from "../components/Oders/OrderDetailModal";
import ConfirmReasonModal from "../components/Oders/ConfirmReasonModal";
import type { Order, OrderStatus } from "../components/Oders/Oder";
import { SearchInput } from "../components/Products/Product";
import { useListFilter } from "../components/useListFilter";

// ========================= Sample Data ========================= //
const initialOrders: Order[] = [
  {
    id: "#OD1256",
    table: "Bàn 05",
    time: "2 phút trước",
    total: 135000,
    status: "new",
    customerName: "Nguyễn Văn B",
    customerPhone: "0987654321",
    items: [
      {
        name: "Trà sữa trân châu",
        qty: 1,
        price: 45000,
        size: "Lớn",
        toppings: "Trân châu đen",
      },
      { name: "Cà phê sữa", qty: 2, price: 30000, note: "Ít đường" },
      { name: "Khoai tây chiên", qty: 1, price: 30000 },
    ],
  },
  {
    id: "#OD1255",
    table: "Bàn 02",
    time: "10 phút trước",
    total: 45000,
    status: "confirmed",
    confirmingEmployeeName: "Trần Hoàng An",
    items: [
      { name: "Phở bò tái", qty: 1, price: 40000 },
      { name: "Trà đá", qty: 1, price: 5000 },
    ],
  },
  {
    id: "#OD1254",
    table: "Bàn 07",
    time: "15 phút trước",
    total: 180000,
    status: "inprogress",
    confirmingEmployeeName: "Trần Hoàng An",
    preparingEmployeeName: "Lê Thị Bích Phượng",
    items: [
      { name: "Pizza Hải sản", qty: 1, price: 150000, size: "Vừa" },
      { name: "Coca-cola", qty: 2, price: 15000 },
    ],
  },
  {
    id: "#OD1252",
    table: "Bàn 01",
    time: "20 phút trước",
    total: 45000,
    status: "completed",
    confirmingEmployeeName: "Trần Hoàng An",
    preparingEmployeeName: "Lê Thị Bích Phượng",
    items: [{ name: "Bún chả", qty: 1, price: 45000 }],
  },
  {
    id: "#OD1250",
    table: "Bàn 10",
    time: "30 phút trước",
    total: 30000,
    status: "cancelled",
    confirmingEmployeeName: "Hệ thống",
    cancelReason: "Khách đổi ý",
    items: [{ name: "Nước ép dứa", qty: 1, price: 30000 }],
  },
];

const STATUS_ORDER: OrderStatus[] = [
  "new",
  "confirmed",
  "inprogress",
  "completed",
  "cancelled",
];

// ========================= Main Page ========================= //
const { Content } = Layout;

function groupByStatus(list: Order[]) {
  const g: Record<OrderStatus, Order[]> = {
    new: [],
    confirmed: [],
    inprogress: [],
    completed: [],
    cancelled: [],
  };
  list.forEach((o) => g[o.status].push(o));
  return g;
}

export default function Donhang() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [selectedStatuses, setSelectedStatuses] =
    useState<OrderStatus[]>(STATUS_ORDER);

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(
    null
  );
  const filteredOrders = useListFilter<Order>(
    orders,
    search,
    (o) => [o.id, o.table, o.customerName, o.customerPhone],
    [(o) => !selectedStatuses.length || selectedStatuses.includes(o.status)]
  );
  const grouped = groupByStatus(filteredOrders);
  const { updateStatus, cancelOrder } = useOrderActions(setOrders);

  const onViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };
  const onCloseDetail = () => setDetailOpen(false);

  const showCancelModal = (orderId: string) => {
    setCancellingOrderId(orderId);
    setIsCancelModalOpen(true);
  };
  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
    setCancellingOrderId(null);
  };
  const handleConfirmCancel = (reason: string) => {
    if (cancellingOrderId) {
      cancelOrder(cancellingOrderId, reason);
    }
    handleCloseCancelModal();
  };

  return (
    <Layout style={{ height: "100vh", background: "#f3f4f6" }}>
      <FilterSidebar title="BỘ LỌC ĐƠN HÀNG">
        <SearchInput
          placeholder="Theo mã, tên bàn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FilterSidebar.Section title="Trạng thái">
          <Checkbox.Group
            style={{ width: "100%" }}
            value={selectedStatuses}
            onChange={(vals) => setSelectedStatuses(vals as OrderStatus[])}
          >
            <Space direction="vertical">
              <Checkbox value="new">Mới</Checkbox>
              <Checkbox value="confirmed">Đã xác nhận</Checkbox>
              <Checkbox value="inprogress">Đang thực hiện</Checkbox>
              <Checkbox value="completed">Hoàn thành</Checkbox>
              <Checkbox value="cancelled">Đã hủy</Checkbox>
            </Space>
          </Checkbox.Group>
        </FilterSidebar.Section>
      </FilterSidebar>

      <Content style={{ padding: 16, overflow: "auto" }}>
        <Row gutter={[16, 16]} wrap>
          {STATUS_ORDER.map((st) => (
            <Col key={st} xs={24} sm={12} lg={8} xl={6} xxl={4.8}>
              <StatusColumn
                status={st}
                orders={grouped[st]}
                onView={onViewDetail}
                onUpdateStatus={updateStatus}
                onCancel={showCancelModal}
              />
            </Col>
          ))}
        </Row>
      </Content>

      <OrderDetailModal
        order={selectedOrder}
        open={detailOpen}
        onClose={onCloseDetail}
      />

      <ConfirmReasonModal
        open={isCancelModalOpen}
        title="Lý do hủy đơn hàng"
        okText="Xác nhận hủy"
        cancelText="Bỏ qua"
        onOk={handleConfirmCancel}
        onCancel={handleCloseCancelModal}
      />
    </Layout>
  );
}
