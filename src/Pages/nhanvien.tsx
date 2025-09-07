import React, { useMemo, useState } from "react";
import { Layout, Button, Input, Select, Typography, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import FilterSidebar from "../components/Sidebar"; // giữ nguyên
import { useListFilter } from "../components/useListFilter"; // giữ nguyên
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeModal from "../components/employees/EmployeeModal";
import DepartmentModal from "../components/employees/DepartmentModal";
import type { Employee, EmpStatus } from "../components/employees/employee";

const { Content } = Layout;
const { Title } = Typography;

// =============== Mock data giống code gốc ===============
const initialData: Employee[] = [
  {
    key: "1",
    id: "NV001",
    name: "Trần Hoàng An",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=AN",
    role: "Phục vụ",
    department: "Phục vụ",
    phone: "0901234567",
    email: "an.th@example.com",
    status: "Đang làm việc",
  },
  {
    key: "2",
    id: "NV002",
    name: "Lê Thị Bích Phượng",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=BP",
    role: "Bếp chính",
    department: "Bếp",
    phone: "0912345678",
    email: "phuong.ltb@example.com",
    status: "Đang làm việc",
  },
  {
    key: "3",
    id: "NV003",
    name: "Phạm Văn Cường",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=PC",
    role: "Thu ngân",
    department: "Thu ngân",
    phone: "0987654321",
    email: "cuong.pv@example.com",
    status: "Đã nghỉ",
  },
];

const Nhanvien: React.FC = () => {
  // dữ liệu chính của bảng (UI-only, không API)
  const [employees, setEmployees] = useState<Employee[]>(initialData);

  // filter state
  const [search, setSearch] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<EmpStatus | null>(null);

  // danh sách phòng ban
  const [departments, setDepartments] = useState<string[]>([
    "Phục vụ",
    "Bếp",
    "Thu ngân",
  ]);

  // modal state
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [openDepartmentModal, setOpenDepartmentModal] = useState(false);

  // ======= Helpers tạo id/key mới =======
  const extractDigits = (s: string) =>
    s.match(/\d+/)?.[0] ? Number(s.match(/\d+/)![0]) : 0;
  const nextKey = () =>
    String(Math.max(0, ...employees.map((e) => Number(e.key || 0))) + 1);
  const nextId = () => {
    const n = Math.max(0, ...employees.map((e) => extractDigits(e.id))) + 1;
    return `NV${String(n).padStart(3, "0")}`;
  };

  // ======= Lọc danh sách (giữ hook cũ) =======
  const filtered = useListFilter<Employee>(
    employees,
    search,
    (e) => [e.id, e.name, e.phone, e.email],
    [
      (e) =>
        !selectedDepartments.length ||
        selectedDepartments.includes(e.department),
      (e) => !selectedStatus || e.status === selectedStatus,
    ]
  );

  // ======= Handlers inline (UI-only) =======
  const handleSaveInline = (id: string, values: Partial<Employee>) => {
    setEmployees((list) =>
      list.map((e) => (e.id === id ? { ...e, ...values } : e))
    );
    message.success("Đã lưu thay đổi");
  };
  const handleLock = (id: string) => {
    setEmployees((list) =>
      list.map((e) =>
        e.id === id
          ? {
              ...e,
              status:
                e.status === "Đang làm việc" ? "Đã nghỉ" : "Đang làm việc",
            }
          : e
      )
    );
    message.success("Đã cập nhật trạng thái");
  };
  const handleDelete = (id: string) => {
    setEmployees((list) => list.filter((e) => e.id !== id));
    message.success("Đã xóa nhân viên");
  };

  // ======= Handlers modal thêm/sửa (UI-only) =======
  const showAddModal = () => {
    setEditingEmployee(null);
    setOpenEmployeeModal(true);
  };

  const onSubmitEmployeeModal = (values: Employee, editing?: boolean) => {
    if (editing && editingEmployee) {
      setEmployees((list) =>
        list.map((e) => (e.id === editingEmployee.id ? { ...e, ...values } : e))
      );
      message.success("Đã cập nhật nhân viên");
    } else {
      const newItem: Employee = {
        ...values,
        id: values.id?.trim() ? values.id : nextId(),
        key: nextKey(),
        avatar:
          values.avatar || "https://placehold.co/100x100/E2E8F0/4A5568?text=NV",
        status: (values as any).status || "Đang làm việc",
      };
      setEmployees((list) => [newItem, ...list]);
      message.success("Đã thêm nhân viên mới");
    }
    setOpenEmployeeModal(false);
    setEditingEmployee(null);
  };

  // ======= Phòng ban (UI-only) =======
  const handleAddDepartment = (name: string) => {
    if (!name) return;
    if (departments.includes(name))
      return message.warning("Phòng ban đã tồn tại");
    setDepartments((prev) => [name, ...prev]);
    message.success("Đã thêm phòng ban");
  };

  return (
    <Layout className="nv-layout-root">
      <Layout>
        {/* ================= Sidebar lọc ================= */}
        <FilterSidebar title="Lọc nhân viên" className="nv-sider">
          <FilterSidebar.Section title="Tìm kiếm">
            <Input
              placeholder="Tên, SĐT, email"
              prefix={<SearchOutlined />}
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FilterSidebar.Section>

          <FilterSidebar.Section title="Phòng ban">
            <Select
              mode="multiple"
              allowClear
              placeholder="Chọn phòng ban"
              style={{ width: "100%" }}
              value={selectedDepartments}
              onChange={(vals) => setSelectedDepartments(vals as string[])}
              options={departments.map((d) => ({ value: d, label: d }))}
            />
          </FilterSidebar.Section>

          <FilterSidebar.Section title="Trạng thái">
            <Select
              allowClear
              placeholder="Chọn trạng thái"
              style={{ width: "100%" }}
              value={selectedStatus ?? undefined}
              onChange={(val) => setSelectedStatus((val as EmpStatus) ?? null)}
              options={[
                { value: "Đang làm việc", label: "Đang làm việc" },
                { value: "Đã nghỉ", label: "Đã nghỉ" },
              ]}
            />
          </FilterSidebar.Section>
        </FilterSidebar>

        {/* ================= Content ================= */}
        <Content className="nv-content">
          <div className="nv-card">
            <div className="nv-card-header">
              <Title level={2}>Nhân viên</Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showAddModal}
                className="nv-btn-green"
              >
                Thêm mới
              </Button>
            </div>

            <EmployeeTable
              data={filtered}
              departments={departments}
              onSaveInline={handleSaveInline}
              onLock={handleLock}
              onDelete={handleDelete}
            />
          </div>
        </Content>
      </Layout>

      {/* ================= Modal Thêm/Cập nhật Nhân viên ================= */}
      <EmployeeModal
        open={openEmployeeModal}
        onCancel={() => {
          setOpenEmployeeModal(false);
          setEditingEmployee(null);
        }}
        onSubmit={onSubmitEmployeeModal}
        departments={departments}
        editingEmployee={editingEmployee}
        onAddDepartmentClick={() => setOpenDepartmentModal(true)}
      />

      {/* ================= Modal Thêm phòng ban ================= */}
      <DepartmentModal
        open={openDepartmentModal}
        onCancel={() => setOpenDepartmentModal(false)}
        onSubmit={handleAddDepartment}
      />
    </Layout>
  );
};

export default Nhanvien;
