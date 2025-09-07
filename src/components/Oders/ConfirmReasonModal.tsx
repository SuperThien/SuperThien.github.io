// Dùng để nhập lý do hủy, ghi nhận lý do hủy
import React from "react";
import { Modal, Form, Input } from "antd";

type Props = {
  open: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk: (reason: string) => void;
  onCancel: () => void;
};

const ConfirmReasonModal: React.FC<Props> = ({
  open,
  title = "Nhập lý do",
  okText = "Xác nhận",
  cancelText = "Bỏ qua",
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm<{ reason: string }>();

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
      okText={okText}
      cancelText={cancelText}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(v) => {
          onOk(v.reason);
          form.resetFields();
        }}
      >
        <Form.Item
          name="reason"
          label="Vui lòng nhập lý do"
          rules={[{ required: true, message: "Bắt buộc!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ConfirmReasonModal;
