import { SearchOutlined } from "@ant-design/icons";
import { Input, Tag, Typography } from "antd";
import { useMemo } from "react";
import { currency } from "../Oders/Oder";

// các kiểu type
export type ProductType = "Thức ăn" | "Đồ uống" | "Khác";
export type ProductStatus = "Đang kinh doanh" | "Ngừng kinh doanh";

export interface Product {
  key: string;
  id: string;
  name: string;
  category: string;
  type: ProductType;
  price: number;
  status: ProductStatus;
  description?: string;
  isExtra?: boolean;
  imageUrl?: string;
}
//loại sản phẩm
export const PRODUCT_TYPES: ProductType[] = ["Thức ăn", "Đồ uống", "Khác"];
// thẻ trạng thái
export const STATUS_COLOR: Record<ProductStatus, "success" | "error"> = {
  "Đang kinh doanh": "success",
  "Ngừng kinh doanh": "error",
};

//Tái sử dụng Ô tìm kiếm
export function SearchInput(props: React.ComponentProps<typeof Input>) {
  return <Input allowClear prefix={<SearchOutlined />} {...props} />;
}
//hiển thị màu trạng thái
export function StatusTag({ status }: { status: ProductStatus }) {
  return <Tag color={STATUS_COLOR[status]}>{status}</Tag>;
}

// hiển thị text giá tiền
const { Text } = Typography;
export function PriceText({ value }: { value: number }) {
  return (
    <Text style={{ color: "#f5222d", fontWeight: 600 }}>
      {currency(value)}đ
    </Text>
  );
}
