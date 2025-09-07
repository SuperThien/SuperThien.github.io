//Hiển thị bảng danh sách nhân viên
import React from "react";
import { Avatar, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { UserOutlined } from "@ant-design/icons";

import EmployeeEditInline from "./EmployeeEditInline";
import type { Employee, EmpStatus } from "./employee";

interface Props {
  data: Employee[];
  departments: string[];
  onSaveInline: (id: string, values: Partial<Employee>) => void;
  onLock: (id: string) => void;
  onDelete: (id: string) => void;
}

const EmployeeTable: React.FC<Props> = ({
  data,
  departments,
  onSaveInline,
  onLock,
  onDelete,
}) => {
  const columns: TableProps<Employee>["columns"] = [
    {
      title: "Nhân viên",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Employee) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div className="nv-cell-name">{text}</div>
            <div className="nv-cell-id">{record.id}</div>
          </div>
        </Space>
      ),
    },
    { title: "Chức vụ", dataIndex: "role", key: "role" },
    { title: "SĐT", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status: EmpStatus) => (
        <Tag color={status === "Đang làm việc" ? "success" : "error"}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      expandable={{
        expandedRowRender: (record: Employee) => (
          <EmployeeEditInline
            employee={record}
            departments={departments}
            onSave={onSaveInline}
            onLock={onLock}
            onDelete={onDelete}
          />
        ),
        rowExpandable: () => true,
      }}
    />
  );
};

export default EmployeeTable;
