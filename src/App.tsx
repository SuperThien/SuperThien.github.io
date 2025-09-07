import { Flex, Layout } from "antd";
import Hoadon from "./Pages/hoadon";

import { Content, Header } from "antd/es/layout/layout";
import HeaderBar from "./components/Header";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Donhang from "./Pages/Donhang";
import Ban from "./Pages/Ban";

import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import Nhanvien from "./Pages/nhanvien";
import SanPham from "./Pages/Sanpham";
import ProtectedRoute from "./components/Forms/ProtectedRoute";
import RequireRole from "./components/RequireRole";
const AppLayout: React.FC = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <HeaderBar />
    <Outlet />
  </Layout>
);
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/donhang" element={<Donhang />} />
          <Route path="/hoadon" element={<Hoadon />} />
          <Route path="/danhmuc" element={<SanPham />} />
          <Route path="/ban" element={<Ban />} />

          <Route
            path="/nhanvien"
            element={
              <RequireRole allow={["ADMIN"]}>
                <Nhanvien />
              </RequireRole>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
}

export default App;
