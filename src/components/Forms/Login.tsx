// Login.tsx
import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Form,
  Input,
  Button,
  Typography,
  Checkbox,
  Alert,
  message,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const { Content } = Layout;
const { Title, Text } = Typography;

// Tạo instance riêng để chủ động xử lý status (không rơi vào catch)
const http = axios.create({
  baseURL:
    (import.meta as any).env?.VITE_API_URL || "http://localhost:3000/api",
  validateStatus: () => true,
});

interface LoginFormData {
  username: string; // Email hoặc SĐT
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const [form] = Form.useForm<LoginFormData>();
  const [loading, setLoading] = useState(false);
  const [alertBox, setAlertBox] = useState<{
    type: "success" | "error" | "info" | "warning";
    text: string;
  } | null>(null);

  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = (location.state as any)?.from?.pathname || "/donhang";
  useEffect(() => {
    const s = (location.state as any)?.flash;
    if (s?.text) {
      // nếu bạn có alertBox state thì có thể setAlertBox({ type: s.type, text: s.text });
      // mình dùng toast cho gọn:
      message.success(s.text);
      // xoá state để F5 không hiện lại
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onFinish = async (values: LoginFormData) => {
    setLoading(true);
    setAlertBox(null);
    try {
      const res = await http.post("/auth/login", {
        credential: values.username,
        password: values.password,
        remember: values.remember,
      });

      if (res.status === 200 && res.data?.accessToken) {
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem(
          "auth_user",
          JSON.stringify({
            id: res.data.user.maNV,
            username: res.data.user.email || res.data.user.sdt,
            fullName: res.data.user.tenNV,
            roles: [String(res.data.user.chucVu || "").toUpperCase()], // ["ADMIN"] | ["STAFF"]
          })
        );
        setAlertBox({ type: "success", text: "Đăng nhập thành công!" });
        message.success("Đăng nhập thành công!");
        setTimeout(() => navigate(from || "/donhang", { replace: true }), 300);
        return;
      }

      if (res.status === 401) {
        setAlertBox({ type: "error", text: "Sai email/SĐT hoặc mật khẩu!" });
        message.error("Sai email/SĐT hoặc mật khẩu!");
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
        message.error(msg);
        return;
      }

      if (res.status === 403) {
        setAlertBox({ type: "error", text: "Bạn không có quyền truy cập!" });
        message.error("Bạn không có quyền truy cập!");
        return;
      }

      if (res.status === 0) {
        setAlertBox({
          type: "error",
          text: "Không kết nối được máy chủ. Kiểm tra backend/cổng 3000.",
        });
        message.error(
          "Không kết nối được máy chủ. Kiểm tra backend/cổng 3000."
        );
        return;
      }

      setAlertBox({
        type: "error",
        text: res.data?.message || "Đăng nhập thất bại!",
      });
      message.error(res.data?.message || "Đăng nhập thất bại!");
    } catch (e) {
      setAlertBox({
        type: "error",
        text: "Lỗi không xác định. Vui lòng thử lại.",
      });
      message.error("Lỗi không xác định. Vui lòng thử lại.");
      // Phòng hờ: vẫn hiện alert native nếu antd message lỗi CSS
      window.alert?.("Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
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
            maxWidth: 400,
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Title level={2} style={{ margin: 0 }}>
              Đăng nhập
            </Title>
            <Text type="secondary">Chào mừng trở lại!</Text>
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
            name="login"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              label="Email hoặc Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email hoặc số điện thoại!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email hoặc SĐT"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ tôi</Checkbox>
                </Form.Item>
                <RouterLink to="/forgot-password">Quên mật khẩu?</RouterLink>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: "100%" }}
                loading={loading}
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text type="secondary">Chưa có tài khoản? </Text>
              <RouterLink to="/register">Tạo tài khoản mới</RouterLink>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
