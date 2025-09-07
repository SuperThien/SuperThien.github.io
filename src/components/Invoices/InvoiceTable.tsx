//Bảng danh sách hóa đơn
import React, { useMemo } from "react";
import { Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { RightOutlined } from "@ant-design/icons";
import type { PaymentMethod } from "./PaymentTag";
import PaymentTag from "./PaymentTag";
import { currency as formatVND } from "../Oders/Oder";

const { Text } = Typography;

export interface InvoiceRow {
  id: string;
  time: string;
  table: string;
  cashier: string;
  total: number;
  paymentMethod: PaymentMethod;
}

const InvoiceTable: React.FC<{
  rows: InvoiceRow[];
  onRowClick?: (row: InvoiceRow) => void;
}> = ({ rows, onRowClick }) => {
  const columns: TableColumnsType<InvoiceRow> = useMemo(
    () => [
      {
        title: "Mã Hóa đơn",
        dataIndex: "id",
        key: "id",
        render: (id: string) => (
          <Text strong className="hd-text-primary">
            {id}
          </Text>
        ),
      },
      { title: "Thời gian", dataIndex: "time", key: "time" },
      { title: "Bàn", dataIndex: "table", key: "table" },
      { title: "Thu ngân", dataIndex: "cashier", key: "cashier" },
      {
        title: "Tổng tiền",
        dataIndex: "total",
        key: "total",
        align: "right",
        render: (v: number) => <Text strong>{formatVND(v)}</Text>,
      },
      {
        title: "Phương thức",
        dataIndex: "paymentMethod",
        key: "paymentMethod",
        align: "center",
        render: (m: PaymentMethod) => <PaymentTag method={m} />,
      },
      {
        title: "",
        key: "action",
        align: "center",
        render: () => <RightOutlined className="hd-icon-muted" />,
      },
    ],
    []
  );

  return (
    <div className="hd-table-wrap">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={rows}
        pagination={{ pageSize: 8, hideOnSinglePage: true }}
        rowClassName={() => "hd-row-clickable"}
        onRow={(record) => ({ onClick: () => onRowClick?.(record) })}
      />
    </div>
  );
};

export default InvoiceTable;
