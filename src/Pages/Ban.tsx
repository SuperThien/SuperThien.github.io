import React, { useEffect, useMemo, useState } from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  FloatButton,
  message,
  Modal,
} from "antd";
import type { DiningTable } from "../components/Tables/Table";
import TableCard from "../components/Tables/TableCard";
import { PlusOutlined } from "@ant-design/icons";
import TableFormModal from "../components/Tables/TableFormModal";
import TableQrModal from "../components/Tables/TableQrModal";

const { Content } = Layout;
const { Title } = Typography;

// --- Demo data ---
const initialTables: DiningTable[] = [
  { key: "1", id: "T1-01", name: "Bàn 01", status: "empty" },
  { key: "2", id: "T1-02", name: "Bàn 02", status: "reserved" },
  { key: "3", id: "T1-03", name: "Bàn 03", status: "empty" },
  { key: "4", id: "T1-04", name: "Bàn 04", status: "empty" },
  { key: "5", id: "T1-05", name: "Bàn 05", status: "reserved" },
  { key: "6", id: "T1-06", name: "Bàn 06", status: "empty" },
  { key: "7", id: "T1-07", name: "Bàn 07", status: "empty" },
];

// --- Helpers ---
const STORAGE_KEY = "smartpos.tables";
const extractSuffix = (id: string) => {
  const m = id.match(/-(\d+)$/);
  return m ? parseInt(m[1], 10) : 0;
};

const Ban: React.FC = () => {
  const [tables, setTables] = useState<DiningTable[]>(initialTables);
  const [openForm, setOpenForm] = useState(false);
  const [openQr, setOpenQr] = useState(false);
  const [selected, setSelected] = useState<DiningTable | null>(null);

  // Load/Save LocalStorage (demo-only)
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as DiningTable[];
        if (Array.isArray(parsed)) setTables(parsed);
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
  }, [tables]);

  const handleOpenForm = (table: DiningTable | null) => {
    setSelected(table);
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
    setSelected(null);
  };

  const handleOpenQr = (table: DiningTable) => {
    setSelected(table);
    setOpenQr(true);
  };
  const handleCloseQr = () => {
    setOpenQr(false);
    setSelected(null);
  };

  const generateNextId = (name?: string) => {
    const byName = name?.match(/(\d+)$/)?.[1];
    const maxSuffix = tables.reduce(
      (acc, t) => Math.max(acc, extractSuffix(t.id)),
      0
    );
    const intCandidate = byName ? parseInt(byName, 10) : maxSuffix + 1;
    const next = Math.max(intCandidate, maxSuffix + 1);
    return `T1-${String(next).padStart(2, "0")}`;
  };

  const submitTableForm = (
    values: Pick<DiningTable, "id" | "name" | "status">,
    editing: boolean
  ) => {
    const trimmedId = values.id?.trim();
    const nextId = trimmedId || generateNextId(values.name);

    const isDup = tables.some(
      (t) =>
        t.id.toLowerCase() === nextId.toLowerCase() && t.key !== selected?.key
    );
    if (isDup) {
      message.error("Mã bàn đã tồn tại. Vui lòng nhập mã khác!");
      return;
    }

    if (editing && selected) {
      const updated: DiningTable = {
        key: selected.key,
        id: nextId,
        name: values.name,
        status: values.status,
      };
      setTables((prev) =>
        prev.map((t) => (t.key === selected.key ? updated : t))
      );
      message.success("Đã cập nhật bàn");
    } else {
      const newRow: DiningTable = {
        key: (crypto?.randomUUID?.() || Date.now().toString()) as string,
        id: nextId,
        name: values.name,
        status: values.status || "empty",
      };
      setTables((prev) => [newRow, ...prev]);
      message.success("Đã thêm bàn mới");
    }

    handleCloseForm();
  };

  const handleDelete = (table: DiningTable) => {
    Modal.confirm({
      title: `Xóa ${table.name}?`,
      content: "Thao tác này không thể hoàn tác.",
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { danger: true },
      onOk: () => setTables((prev) => prev.filter((t) => t.key !== table.key)),
    });
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <Content style={{ padding: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            Quản lý Bàn
          </Title>
        </div>

        <Row gutter={[24, 24]}>
          {tables.map((table) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={table.key}>
              <TableCard
                table={table}
                onQrClick={() => handleOpenQr(table)}
                onEditClick={() => handleOpenForm(table)}
                onDeleteClick={() => handleDelete(table)}
              />
            </Col>
          ))}
        </Row>

        <FloatButton
          type="primary"
          icon={<PlusOutlined />}
          tooltip="Thêm bàn mới"
          onClick={() => handleOpenForm(null)}
          style={{ width: 56, height: 56 }}
        />
      </Content>

      {/* Modal Thêm/Cập nhật Bàn */}
      <TableFormModal
        open={openForm}
        initial={selected}
        onCancel={handleCloseForm}
        onSubmit={submitTableForm}
      />

      {/* Modal QR Code */}
      <TableQrModal open={openQr} table={selected} onCancel={handleCloseQr} />
    </Layout>
  );
};

export default Ban;
