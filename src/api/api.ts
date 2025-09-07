import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 15000,
});

// đọc token từ localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// xử lý lỗi chung
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    // ví dụ: token hết hạn/không hợp lệ
    if (status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("auth_user");
      // tuỳ app: window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
