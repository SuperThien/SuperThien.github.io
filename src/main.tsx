import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterForm from "./Forms/Dangky.tsx";
import LoginForm from "./Forms/Dangnhap.tsx";
import LayoutAuth from "./components/LayoutAuth.tsx";
import LayoutMain from "./components/LayoutMain.tsx";
import HomePage from "./pages/HomePage.tsx";
import SanPham from "./pages/SanPham.tsx";
import Oder from "./pages/Oder.tsx";
import GioHang from "./pages/GioHang.tsx";
import { CartProvider } from "./pages/GioHangs/CartContext.tsx";
import PrivateRoute from "./Forms/PrivateRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutAuth />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>

          <Route element={<LayoutMain />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/item"
              element={
                <PrivateRoute>
                  <SanPham />
                </PrivateRoute>
              }
            />
            <Route path="/contact" element="hotline:0920310908" />
            <Route path="/news" element="Tin Tức này thặc thú dị" />
            <Route path="/recruitment" element="Tuyển Dụng" />
            <Route
              path="/Shopping"
              element={
                <PrivateRoute>
                  <GioHang />
                </PrivateRoute>
              }
            />
            <Route
              path="/oder/:id"
              element={
                <PrivateRoute>
                  <Oder />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
