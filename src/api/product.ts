import { http } from "./http";

// ===== BE types =====
export type TenLoai = "ThucAn" | "DoUong" | "Khac";
export type TrangThaiBE = "DangKinhDoanh" | "NgungKinhDoanh";
export interface Loai { MaLoai: number; TenLoai: TenLoai }
export interface DanhMuc { MaDM: number; TenDanhMuc: string }

export interface SanPhamBE {
  MaSP: number; TenSP: string; GiaTien: number;
  MoTa?: string; HinhAnh?: string;
  TrangThai: TrangThaiBE; LaMonDiKem: boolean;
  MaLoai: number; MaDM?: number | null;
  loai: Loai; danhMuc?: DanhMuc | null;
}

// ===== Calls =====
export const getLoaiSP     = () => http.get<Loai[]>("/loai-sp").then(r => r.data);
export const getDanhMuc    = () => http.get<DanhMuc[]>("/danh-muc").then(r => r.data);
export const listSanPham   = (params: any) =>
  http.get<{data:SanPhamBE[], meta:any}>("/san-pham", { params }).then(r => r.data);
export const createDanhMuc = (body: { TenDanhMuc: string }) =>
  http.post<DanhMuc>("/danh-muc", body).then(r => r.data);
export const createSanPham = (body: any) =>
  http.post<SanPhamBE>("/san-pham", body).then(r => r.data);
// (nếu đã thêm endpoint PATCH như mình gợi ý)
export const updateSanPham = (id: number, body: any) =>
  http.patch<SanPhamBE>(`/san-pham/${id}`, body).then(r => r.data);

// ===== Map BE -> FE (đúng UI hiện tại) =====
export type ProductType = "Thức ăn" | "Đồ uống" | "Khác";
export type ProductStatus = "Đang kinh doanh" | "Ngừng kinh doanh";
export type ProductFE = {
  key: string; id: string; name: string;
  category: string | null; type: ProductType; price: number;
  status: ProductStatus; description?: string; imageUrl?: string;
  isExtra?: boolean; MaSP: number; MaDM?: number | null; MaLoai: number;
};

const TYPE_VN: Record<TenLoai, ProductType> = { ThucAn: "Thức ăn", DoUong: "Đồ uống", Khac: "Khác" };
const STATUS_VN: Record<TrangThaiBE, ProductStatus> = {
  DangKinhDoanh: "Đang kinh doanh", NgungKinhDoanh: "Ngừng kinh doanh"
};

export function mapToFE(sp: SanPhamBE): ProductFE {
  return {
    key: String(sp.MaSP),
    id: `SP${String(sp.MaSP).padStart(3, "0")}`,
    name: sp.TenSP,
    category: sp.danhMuc?.TenDanhMuc ?? null,
    type: TYPE_VN[sp.loai.TenLoai],
    price: sp.GiaTien,
    status: STATUS_VN[sp.TrangThai],
    description: sp.MoTa ?? undefined,
    imageUrl: sp.HinhAnh ?? undefined,
    isExtra: sp.LaMonDiKem,
    MaSP: sp.MaSP,
    MaDM: sp.MaDM ?? null,
    MaLoai: sp.MaLoai,
  };
}
