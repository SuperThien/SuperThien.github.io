// Modal khi ấn thêm danh mục mới
import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Space,
  Button,
  Typography,
  message,
} from "antd";

const { Title } = Typography;

type Props = {
  open: boolean;
  categories: string[];
  onClose: () => void;
  onAdd: (name: string, parent?: string) => void;
};

export default function CategoryModal({
  open,
  categories,
  onClose,
  onAdd,
}: Props) {
  const [form] = Form.useForm<{ name: string; parent?: string }>();

  return (
    <Modal
      title={<Title level={5}>Thêm danh mục</Title>}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" form={form} style={{ marginTop: 24 }}>
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="parent" label="Danh mục cha">
          <Select
            placeholder="--Lựa chọn--"
            options={categories.map((c) => ({ value: c, label: c }))}
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Space>
            <Button onClick={onClose}>Bỏ qua</Button>
            <Button
              type="primary"
              onClick={async () => {
                const vals = await form.validateFields();
                const name = vals.name?.trim();
                if (!name) return;
                onAdd(name, vals.parent);
                form.resetFields();
                onClose();
                message.success("Đã thêm danh mục");
              }}
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
