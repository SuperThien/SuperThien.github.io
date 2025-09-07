// Modal để thêm phòng ban
import React from "react";
import { Form, Input, Modal } from "antd";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (name: string) => void; // UI-only
}

const DepartmentModal: React.FC<Props> = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm<{ departmentName: string }>();

  const handleOk = () => form.submit();

  const onFinish = (values: { departmentName: string }) => {
    const name = (values?.departmentName || "").trim();
    if (!name) return;
    onSubmit(name);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Thêm phòng ban mới"
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      okText="Lưu"
      cancelText="Hủy"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="nv-modal-form"
      >
        <Form.Item
          name="departmentName"
          label="Tên phòng ban"
          rules={[{ required: true, message: "Vui lòng nhập tên phòng ban!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepartmentModal;
