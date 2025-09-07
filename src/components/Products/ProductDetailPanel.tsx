//Hiển thị giao diện chi tiết sản phẩm khi ấn
import { Tabs, Row, Col, Typography, Space, Button, Image } from "antd";
import { PriceText, StatusTag, type Product } from "./Product";

const { Title, Text, Paragraph } = Typography;

type Props = {
  product: Product;
  onUpdate: (p: Product) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProductDetailPanel({
  product,
  onUpdate,
  onToggleStatus,
  onDelete,
}: Props) {
  return (
    <div style={{ padding: 20, background: "#fafafa" }}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Thông tin",
            children: (
              <Row gutter={32}>
                <Col span={7}>
                  <Title level={4} style={{ marginBottom: 16 }}>
                    {product.name}
                  </Title>
                  {product.imageUrl ? (
                    <Image
                      width="100%"
                      src={product.imageUrl}
                      style={{ borderRadius: 8 }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        paddingTop: "100%",
                        background: "#f0f0f0",
                        borderRadius: 8,
                      }}
                    />
                  )}
                </Col>
                <Col span={17}>
                  <Title
                    level={5}
                    style={{ color: "#595959", marginBottom: 20 }}
                  >
                    Chi tiết sản phẩm
                  </Title>
                  <Row gutter={[16, 20]} style={{ fontSize: 16 }}>
                    <Col span={12}>
                      <Text strong>Mã Sản Phẩm:</Text> <Text>{product.id}</Text>
                    </Col>
                    <Col span={12}>
                      <Text strong>Loại Sản Phẩm:</Text>{" "}
                      <Text>{product.type}</Text>
                    </Col>
                    <Col span={12}>
                      <Text strong>Danh Mục:</Text>{" "}
                      <Text>{product.category}</Text>
                    </Col>
                    <Col span={12}>
                      <Text strong>Giá Bán:</Text>{" "}
                      <PriceText value={product.price} />
                    </Col>
                    <Col span={24}>
                      <Text strong>Trạng Thái:</Text>{" "}
                      <StatusTag status={product.status} />
                    </Col>
                    {product.description && (
                      <Col span={24}>
                        <Text strong>Mô tả:</Text>
                        <Paragraph
                          type="secondary"
                          style={{ marginTop: 4, fontSize: 15 }}
                        >
                          {product.description}
                        </Paragraph>
                      </Col>
                    )}
                  </Row>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 24,
                    }}
                  >
                    <Space>
                      <Button onClick={() => onToggleStatus(product.id)}>
                        Cập nhật trạng thái
                      </Button>
                      <Button type="primary" onClick={() => onUpdate(product)}>
                        Cập nhật
                      </Button>
                      <Button danger onClick={() => onDelete(product.id)}>
                        Xóa
                      </Button>
                    </Space>
                  </div>
                </Col>
              </Row>
            ),
          },
          {
            key: "2",
            label: "Món thêm",
            children: <>Nội dung quản lý món thêm…</>,
          },
        ]}
      />
    </div>
  );
}
