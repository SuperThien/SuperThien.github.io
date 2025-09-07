//Thanh Lọc và tìm kiếm bên trái
import React from "react";
import { Layout, Typography, Space } from "antd";
import type { CSSProperties, ReactNode } from "react";

const { Sider } = Layout;
const { Title } = Typography;

export type FilterSidebarProps = {
  title?: string;
  width?: number;
  headerExtra?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

const FilterSidebar: React.FC<FilterSidebarProps> & {
  Section: React.FC<{ title: string; children: ReactNode }>;
} = ({
  title,
  width = 250,
  headerExtra,
  footer,
  children,
  style,
  className,
}) => {
  return (
    <Sider
      width={width}
      theme="light"
      style={{
        padding: 16,
        borderRight: "1px solid #f0f0f0",
        overflowY: "auto",
        ...style,
      }}
      className={className}
    >
      {(title || headerExtra) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          {title && (
            <Title level={4} style={{ margin: 0 }}>
              {title}
            </Title>
          )}
          {headerExtra}
        </div>
      )}
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {children}
      </Space>
      {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
    </Sider>
  );
};

const Section: React.FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <Typography.Text strong>{title}</Typography.Text>
    <div style={{ marginTop: 8 }}>{children}</div>
  </div>
);

FilterSidebar.Section = Section;
export default FilterSidebar;
