// Form nhập tên bàn , mã bàn , trạng thái
import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Space, Typography, Button } from "antd";
import type { DiningTable } from "./Table";

const { Title } = Typography;
const { Option } = Select;

type FormValues = Pick<DiningTable, "id" | "name" | "status">;

interface Props {
  open: boolean;
  initial?: DiningTable | null; // null = thêm mới
  onCancel: () => void;
  onSubmit: (values: FormValues, editing: boolean) => void; // UI-only
}

const TableFormModal: React.FC<Props> = ({
  open,
  initial,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    if (initial) form.setFieldsValue(initial);
    else {
      form.resetFields();
      form.setFieldValue("status", "empty");
    }
  }, [initial, form]);

  return (
    <Modal
      title={
        <Title level={3} style={{ margin: 0 }}>
          {initial ? "Cập nhật Bàn" : "Thêm bàn mới"}
        </Title>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(v) => onSubmit(v, !!initial)}
        style={{ marginTop: 24 }}
      >
        <Form.Item
          name="name"
          label="Tên bàn"
          rules={[{ required: true, message: "Vui lòng nhập tên bàn!" }]}
        >
          <Input placeholder="VD: Bàn 04" />
        </Form.Item>
        <Form.Item name="id" label="Mã bàn">
          <Input placeholder="VD: T1-04 (Để trống sẽ tự tạo)" />
        </Form.Item>
        <Form.Item name="status" label="Trạng thái" initialValue="empty">
          <Select>
            <Option value="empty">Trống</Option>
            <Option value="reserved">Đã đặt</Option>
          </Select>
        </Form.Item>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}
        >
          <Space>
            <Button onClick={onCancel}>Hủy bỏ</Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default TableFormModal;
