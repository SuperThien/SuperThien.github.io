// Nhãn Phương thức thanh toán
import React from "react";
import { Tag } from "antd";
import {
  MoneyCollectOutlined,
  CreditCardOutlined,
  StopOutlined,
} from "@ant-design/icons";

export type PaymentMethod = "Tiền mặt" | "Thẻ tín dụng" | "Đã hủy";

const PaymentTag: React.FC<{ method: PaymentMethod }> = ({ method }) => {
  if (method === "Tiền mặt")
    return (
      <Tag color="blue" icon={<MoneyCollectOutlined />}>
        {method}
      </Tag>
    );
  if (method === "Thẻ tín dụng")
    return (
      <Tag color="purple" icon={<CreditCardOutlined />}>
        {method}
      </Tag>
    );
  return (
    <Tag color="red" icon={<StopOutlined />}>
      {method}
    </Tag>
  );
};

export default PaymentTag;
