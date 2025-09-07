// Form để sửa và cập nhật thông tin nhân viên
import React, { useEffect } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import type { Employee } from "./employee";

const { Option } = Select;

interface Props {
  employee: Employee | null;
  departments: string[];
  onSave: (id: string, values: Partial<Employee>) => void;
  onLock: (id: string) => void;
  onDelete: (id: string) => void;
}

const EmployeeEditInline: React.FC<Props> = ({
  employee,
  departments,
  onSave,
  onLock,
  onDelete,
}) => {
  const [form] = Form.useForm<Employee>();

  useEffect(() => {
    if (employee) form.setFieldsValue(employee);
  }, [employee, form]);

  if (!employee) return null;

  const handleFinish = (values: Employee) => {
    const { password, confirm, ...rest } = values as any;
    onSave(employee.id, {
      ...rest,
      ...(password ? { password } : {}),
    });
  };

  return (
    <div className="nv-panel">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div className="nv-form-grid-2">
          <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="id" label="Mã nhân viên">
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="department"
            label="Phòng ban"
            rules={[{ required: true }]}
          >
            <Select>
              {departments.map((d) => (
                <Option key={d} value={d}>
                  {d}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="role" label="Chức vụ" rules={[{ required: true }]}>
            <Select>
              <Option value="Nhân viên">Nhân viên</Option>
              <Option value="Quản lý">Quản lý</Option>
            </Select>
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu mới" hasFeedback>
            <Input.Password placeholder="Để trống nếu không đổi" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Xác nhận Mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
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

        <div className="nv-actions-end">
          <Space>
            <Button onClick={() => onLock(employee.id)}>Khóa tài khoản</Button>
            <Button danger onClick={() => onDelete(employee.id)}>
              Xóa
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default EmployeeEditInline;
