import api from "./api";

export type BackendUser = {
  maNV: number;
  tenNV: string;
  sdt?: string | null;
  email: string;
  chucVu: "admin" | "staff";
  trangThai: "dang_lam" | "da_nghi";
  maPB?: number | null;
  createdAt: string;
  updatedAt: string;
};

export async function register(payload: {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  maPB?: number | null;
  adminInvite?: string; // tuỳ chọn
}) {
  const { data } = await api.post<{ message: string; user: BackendUser }>(
    "/auth/register",
    payload
  );
  return data;
}

export async function login(payload: { credential: string; password: string }) {
  const { data } = await api.post<{ accessToken: string; user: BackendUser }>(
    "/auth/login",
    payload
  );
  return data;
}

export function storeAuth(auth: { accessToken: string; user: BackendUser }) {
  // Header của bạn đang đọc localStorage 'auth_user' với roles[]
  localStorage.setItem("access_token", auth.accessToken);
  localStorage.setItem(
    "auth_user",
    JSON.stringify({
      id: auth.user.maNV,
      username: auth.user.email || auth.user.sdt,
      fullName: auth.user.tenNV,
      roles: [auth.user.chucVu.toUpperCase()], // ["ADMIN"] hoặc ["STAFF"]
    })
  );
}

export function clearAuth() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("auth_user");
}
