// Register.tsx
import React, { useState } from "react";
import axios from "axios";
import {
  Layout,
  Card,
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Alert,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

const http = axios.create({
  baseURL:
    (import.meta as any).env?.VITE_API_URL || "http://localhost:3000/api",
  validateStatus: () => true,
});

interface RegisterFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [form] = Form.useForm<RegisterFormData>();
  const [loading, setLoading] = useState(false);
  const [alertBox, setAlertBox] = useState<{
    type: "error" | "warning";
    text: string;
  } | null>(null);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormData) => {
    setLoading(true);
    setAlertBox(null);
    try {
      const fullName = [values.firstName, values.lastName]
        .map((s) => (s || "").trim())
        .filter(Boolean)
        .join(" ");
      const payload = {
        fullName,
        phone: (values.phone || "").replace(/\s+/g, ""),
        email: (values.email || "").trim(),
        password: values.password,
      };

      const res = await http.post("/auth/register", payload);

      // ✅ THÀNH CÔNG: KHÔNG alert ở đây, chỉ chuyển sang /login + flash
      if (res.status === 200 || res.status === 201) {
        navigate("/login", {
          replace: true,
          state: {
            flash: {
              type: "success",
              text: "Đăng ký thành công! Mời bạn đăng nhập.",
            },
          },
        });
        return;
      }

      // ❌ LỖI: hiển thị Alert tại trang đăng ký
      if (res.status === 409) {
        setAlertBox({ type: "error", text: "Email hoặc SĐT đã tồn tại!" });
        return;
      }
      if (res.status === 400) {
        const data = res.data;
        const msg =
          data?.message ||
          data?.errors
            ?.map((x: any) => `${x.field}: ${x.errors.join(", ")}`)
            .join("\n") ||
          "Dữ liệu không hợp lệ!";
        setAlertBox({ type: "error", text: msg });
        return;
      }
      if (res.status === 0) {
        setAlertBox({
          type: "error",
          text: "Không kết nối được máy chủ. Kiểm tra backend/cổng 3000.",
        });
        return;
      }
      setAlertBox({
        type: "error",
        text: res.data?.message || "Đăng ký thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    setAlertBox({
      type: "warning",
      text: "Vui lòng điền đầy đủ và hợp lệ các trường!",
    });
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 500,
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Title level={2} style={{ margin: 0 }}>
              Tạo tài khoản mới
            </Title>
            <Text type="secondary">Nhanh chóng và dễ dàng.</Text>
          </div>

          {alertBox && (
            <Alert
              style={{ marginBottom: 16, whiteSpace: "pre-line" }}
              showIcon
              type={alertBox.type}
              message={alertBox.text}
            />
          )}

          <Form
            form={form}
            name="register"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="Họ"
                  rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Họ" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Tên"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input placeholder="Tên" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                { max: 100, message: "Mật khẩu tối đa 100 ký tự" },
              ]}
              hasFeedback
              extra="Mật khẩu tối thiểu 6 ký tự (tối đa 100)."
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value)
                      return Promise.resolve();
                    return Promise.reject(
                      new Error("Hai mật khẩu không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
              loading={loading}
            >
              Đăng ký
            </Button>

            <div style={{ textAlign: "center", marginTop: 12 }}>
              <Text type="secondary">Bạn đã có tài khoản? </Text>
              <RouterLink to="/login">Đăng nhập ngay</RouterLink>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Register;
