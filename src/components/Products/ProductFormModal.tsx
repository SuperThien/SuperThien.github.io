// Modal thêm hoặc cập nhật sản phẩm
import React from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
  Space,
  Button,
  Checkbox,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PRODUCT_TYPES, type Product } from "./Product";
import ImageUploader from "./ImageUploader";

type Props = {
  open: boolean;
  initial?: Partial<Product> | null;
  categories: string[];
  onSubmit: (values: Product) => void;
  onCancel: () => void;
  onOpenCategoryModal: () => void;
};

export default function ProductFormModal({
  open,
  initial,
  categories,
  onSubmit,
  onCancel,
  onOpenCategoryModal,
}: Props) {
  const [form] = Form.useForm<Product>();

  React.useEffect(() => {
    form.resetFields();
    form.setFieldsValue(
      initial ?? {
        status: "Đang kinh doanh",
        type: "Thức ăn",
      }
    );
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width="80vw"
      style={{ maxWidth: 1000, top: 20 }}
      title={
        <span style={{ fontSize: 18, fontWeight: 600 }}>
          {initial ? "Cập nhật hàng hóa" : "Thêm hàng hóa"}
        </span>
      }
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        style={{ marginTop: 24 }}
      >
        <Row gutter={32}>
          <Col span={8}>
            <Form.Item
              label="Hình ảnh sản phẩm"
              name="imageUrl"
              valuePropName="value"
            >
              <ImageUploader />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Tên hàng"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="id" label="Mã hàng hóa">
                  <Input
                    placeholder="Mã tự động (khi thêm mới)"
                    readOnly={!initial}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Loại thực đơn"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={PRODUCT_TYPES.map((t) => ({ value: t, label: t }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Danh mục"
                  rules={[{ required: true }]}
                >
                  <Space.Compact style={{ width: "100%" }}>
                    <Select
                      placeholder="--Lựa chọn--"
                      options={categories.map((c) => ({ value: c, label: c }))}
                    />
                    <Button
                      icon={<PlusOutlined />}
                      onClick={onOpenCategoryModal}
                    />
                  </Space.Compact>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Giá bán"
                  rules={[{ required: true }]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="Trạng thái"
                  initialValue="Đang kinh doanh"
                >
                  <Select
                    options={[
                      { value: "Đang kinh doanh", label: "Đang kinh doanh" },
                      { value: "Ngừng kinh doanh", label: "Ngừng kinh doanh" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="description" label="Mô tả">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="isExtra" valuePropName="checked">
                  <Checkbox>Là món thêm (Extra topping)</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "1px solid #f0f0f0",
            paddingTop: 16,
            marginTop: 16,
          }}
        >
          <Space>
            <Button onClick={onCancel}>Bỏ qua</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#52c41a" }}
            >
              Lưu
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
}
