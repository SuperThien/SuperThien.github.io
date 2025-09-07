// Hiển Thị thẻ bàn gồm các nút
import React from "react";
import { Card, Tag, Space, Button, Dropdown, Typography } from "antd";
import type { MenuProps } from "antd";
import { QrcodeOutlined, EllipsisOutlined } from "@ant-design/icons";
import type { DiningTable } from "./Table";

const { Title, Text } = Typography;

interface Props {
  table: DiningTable;
  onQrClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const TableCard: React.FC<Props> = ({
  table,
  onQrClick,
  onEditClick,
  onDeleteClick,
}) => {
  const items: MenuProps["items"] = [
    { key: "edit", label: "Chỉnh sửa", onClick: onEditClick },
    { key: "delete", label: "Xóa", danger: true, onClick: onDeleteClick },
  ];

  return (
    <Card hoverable>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              {table.name}
            </Title>
            <Tag color={table.status === "empty" ? "success" : "warning"}>
              {table.status === "empty" ? "Trống" : "Đã đặt"}
            </Tag>
          </div>
          <Text type="secondary">Mã: {table.id}</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <Space size="middle">
            <Button
              type="text"
              shape="circle"
              icon={<QrcodeOutlined style={{ fontSize: 24 }} />}
              onClick={onQrClick}
            />
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button
                type="text"
                shape="circle"
                icon={<EllipsisOutlined style={{ fontSize: 24 }} />}
              />
            </Dropdown>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default TableCard;
