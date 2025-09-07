//Modal để xử lý thêm mới nhân viên
import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { Employee } from "./employee";
import { Option } from "antd/es/mentions";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Employee, editing?: boolean) => void; // UI-only
  departments: string[];
  editingEmployee?: Employee | null; // nếu muốn mở modal ở chế độ sửa
  onAddDepartmentClick: () => void;
}

const EmployeeModal: React.FC<Props> = ({
  open,
  onCancel,
  onSubmit,
  departments,
  editingEmployee,
  onAddDepartmentClick,
}) => {
  const [form] = Form.useForm<Employee>();

  useEffect(() => {
    if (editingEmployee) {
      form.setFieldsValue(editingEmployee);
    } else {
      form.resetFields();
      form.setFieldsValue({ status: "Đang làm việc" } as any);
    }
  }, [editingEmployee, form]);

  return (
    <Modal
      title={editingEmployee ? "Cập nhật Nhân viên" : "Thêm mới Nhân viên"}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(v) => onSubmit(v, !!editingEmployee)}
      >
        <div className="nv-form-grid-2">
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="id" label="Mã nhân viên">
            <Input placeholder="Tự động tạo" readOnly />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập SĐT!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Email không hợp lệ!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Phòng ban" rules={[{ required: true }]}>
            <Space.Compact className="nv-compact">
              <Form.Item name="department" noStyle rules={[{ required: true }]}>
                <Select
                  placeholder="Chọn phòng ban"
                  options={departments.map((d) => ({ value: d, label: d }))}
                />
              </Form.Item>
              <Button icon={<PlusOutlined />} onClick={onAddDepartmentClick} />
            </Space.Compact>
          </Form.Item>

          <Form.Item name="role" label="Chức vụ" rules={[{ required: true }]}>
            <Select>
              <Option value="Nhân viên">Nhân viên</Option>
              <Option value="Quản lý">Quản lý</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: !editingEmployee,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder={editingEmployee ? "Để trống nếu không đổi" : ""}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Xác nhận Mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: !editingEmployee,
                message: "Vui lòng xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value)
                    return Promise.resolve();
                  return Promise.reject(new Error("Hai mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>

        <Form.Item name="status" label="Trạng thái">
          <Select
            options={[
              { value: "Đang làm việc", label: "Đang làm việc" },
              { value: "Đã nghỉ", label: "Đã nghỉ" },
            ]}
          />
        </Form.Item>

        <Form.Item className="nv-form-actions">
          <Space>
            <Button onClick={onCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeModal;
