// SanPham.tsx (connected to NestJS API)
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useMemo, useState } from "react";
import {
  Layout,
  Typography,
  Input,
  Checkbox,
  Space,
  Button,
  Table,
  Select,
  Modal,
  message,
} from "antd";
import type { TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import FilterSidebar from "../components/Sidebar";
import {
  PriceText,
  SearchInput,
  StatusTag,
  type Product,
  type ProductStatus,
  type ProductType,
} from "../components/Products/Product";
import ProductDetailPanel from "../components/Products/ProductDetailPanel";
import ProductFormModal from "../components/Products/ProductFormModal";
import CategoryModal from "../components/Products/CategoryModal";
import { useListFilter } from "../components/useListFilter";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;


/* ----------------------------- API & Typings ----------------------------- */

const API_BASE =
  (import.meta as any).env?.VITE_API || "http://localhost:3000"; // fallback
const http = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: false,
});

type TenLoai = "ThucAn" | "DoUong" | "Khac";
type TrangThaiBE = "DangKinhDoanh" | "NgungKinhDoanh";

type Loai = { MaLoai: number; TenLoai: TenLoai };
type DanhMuc = { MaDM: number; TenDanhMuc: string };

type SanPhamBE = {
  MaSP: number;
  TenSP: string;
  GiaTien: number;
  MoTa?: string | null;
  HinhAnh?: string | null;
  TrangThai: TrangThaiBE;
  LaMonDiKem: boolean;
  MaLoai: number;
  MaDM?: number | null;
  loai: Loai;
  danhMuc?: DanhMuc | null;
};

const TYPE_VN: Record<TenLoai, ProductType> = {
  ThucAn: "Thức ăn",
  DoUong: "Đồ uống",
  Khac: "Khác",
};
const TYPE_BE: Record<ProductType, TenLoai> = {
  "Thức ăn": "ThucAn",
  "Đồ uống": "DoUong",
  Khác: "Khac",
};
const STATUS_VN: Record<TrangThaiBE, ProductStatus> = {
  DangKinhDoanh: "Đang kinh doanh",
  NgungKinhDoanh: "Ngừng kinh doanh",
};
const STATUS_BE: Record<ProductStatus, TrangThaiBE> = {
  "Đang kinh doanh": "DangKinhDoanh",
  "Ngừng kinh doanh": "NgungKinhDoanh",
};

function mapToFE(sp: SanPhamBE): Product {
  return {
    key: String(sp.MaSP),
    id: `SP${String(sp.MaSP).padStart(3, "0")}`,
    name: sp.TenSP,
    category: sp.danhMuc?.TenDanhMuc ?? "Chưa phân loại",
    type: TYPE_VN[sp.loai.TenLoai],
    price: Number(sp.GiaTien),
    status: STATUS_VN[sp.TrangThai],
    description: sp.MoTa ?? undefined,
    imageUrl: sp.HinhAnh ?? undefined,
    isExtra: sp.LaMonDiKem,
  };
}

/* --------------------------------- Page --------------------------------- */

const SanPham: React.FC = () => {
  // Data & UI state
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterTypes, setFilterTypes] = useState<ProductType[]>([]);
  const [filterStatuses, setFilterStatuses] = useState<ProductStatus[]>([]);

  // BE data
  const [categories, setCategories] = useState<DanhMuc[]>([]);
  const [loais, setLoais] = useState<Loai[]>([]);

  // Modals
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Derived
  const categoryNames = useMemo(
    () => categories.map((dm) => dm.TenDanhMuc),
    [categories]
  );

  const filteredProducts = useListFilter(
    products,
    search,
    (p) => [p.id, p.name],
    [
      (p) => !filterCategory || p.category === filterCategory,
      (p) => !filterTypes.length || filterTypes.includes(p.type),
      (p) => !filterStatuses.length || filterStatuses.includes(p.status),
    ]
  );

  /* ------------------------------ Initial load ------------------------------ */
  useEffect(() => {
    (async () => {
      try {
        const [loaiRes, dmRes] = await Promise.all([
          http.get<Loai[]>("/loai-sp"),
          http.get<DanhMuc[]>("/danh-muc"),
        ]);
        setLoais(loaiRes.data);
        setCategories(dmRes.data);

        const spRes = await http.get<{ data: SanPhamBE[]; meta: any }>(
          "/san-pham",
          { params: { page: 1, limit: 200 } }
        );
        setProducts(spRes.data.data.map(mapToFE));
      } catch (e: any) {
        message.error(
          e?.response?.data?.message || "Không tải được dữ liệu từ API"
        );
      }
    })();
  }, []);

  /* ------------------------- Helpers: Danh mục/so sánh ------------------------- */

  // Chuẩn hoá chuỗi để so sánh mềm (bỏ thừa khoảng trắng, không phân biệt hoa/thường)
  const norm = (s?: string | null) =>
    (s ?? "").trim().replace(/\s+/g, " ").toLowerCase();

  /**
   * Trả về MaDM theo tên danh mục.
   * - Nếu đã có trong state -> trả MaDM hiện có.
   * - Nếu chưa có -> gọi API tạo danh mục mới rồi trả MaDM mới.
   * - Nếu tên rỗng hoặc tạo thất bại -> trả null (BE cho phép MaDM NULL).
   */
  const ensureDanhMucId = async (
    tenDanhMuc?: string | null
  ): Promise<number | null> => {
    if (!tenDanhMuc || !tenDanhMuc.trim()) return null;

    // 1) Tìm trong state (đã load từ DB)
    const found = categories.find(
      (dm) => norm(dm.TenDanhMuc) === norm(tenDanhMuc)
    );
    if (found) return found.MaDM;

    // 2) Chưa có -> tạo mới ở DB, rồi cập nhật state
    try {
      const created = await http.post<DanhMuc>("/danh-muc", {
        TenDanhMuc: tenDanhMuc.trim(),
      });
      setCategories((prev) => [created.data, ...prev]);
      return created.data.MaDM;
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Không thể tạo danh mục mới");
      return null; // nếu muốn bắt buộc phải có danh mục, có thể throw ở đây
    }
  };

  /* -------------------------------- Handlers -------------------------------- */

  const openCreateModal = () => {
    setEditingProduct(null);
    setProductModalOpen(true);
  };
  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setProductModalOpen(true);
  };
  const closeProductModal = () => setProductModalOpen(false);

  // Tạo/cập nhật sản phẩm
  const onSubmitProduct = async (values: Product) => {
    try {
      // Map FE -> BE: Loại SP
      const tenLoaiBE: TenLoai = TYPE_BE[values.type] ?? "Khac";
      const foundLoai = loais.find((l) => l.TenLoai === tenLoaiBE);
      if (!foundLoai) {
        message.error(
          "Loại sản phẩm không hợp lệ. Hãy seed bảng LoaiSP (ThucAn/DoUong/Khac)."
        );
        return;
      }

      // LẤY (hoặc TẠO) MaDM từ tên danh mục đang chọn
      const maDM = await ensureDanhMucId(values.category);

      const payload = {
        TenSP: values.name,
        GiaTien: Number(values.price) || 0,
        MoTa: values.description || undefined,
        HinhAnh: values.imageUrl || undefined,
        TrangThai: STATUS_BE[values.status || "Đang kinh doanh"],
        LaMonDiKem: !!values.isExtra,
        MaLoai: foundLoai.MaLoai,
        MaDM: maDM, // có thể là null nếu bạn cho phép không thuộc danh mục
      };

      if (editingProduct) {
        // Nếu đã có PATCH ở backend, mở 3 dòng này để lưu DB thật:
        // const updated = await http.patch<SanPhamBE>(`/san-pham/${Number(editingProduct.id.replace(/\D/g,''))}`, payload);
        // setProducts(list => list.map(p => p.key === editingProduct.key ? mapToFE(updated.data) : p));
        // message.success("Đã cập nhật sản phẩm");
        // Tạm thời chỉ cập nhật UI:
        setProducts((list) =>
          list.map((p) =>
            p.key === editingProduct.key ? { ...editingProduct, ...values } : p
          )
        );
        message.success("Đã cập nhật (UI). Bật PATCH để lưu DB.");
      } else {
        const created = await http.post<SanPhamBE>("/san-pham", payload);
        setProducts((list) => [mapToFE(created.data), ...list]);
        message.success("Đã thêm sản phẩm mới");
      }
      closeProductModal();
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Không thể lưu sản phẩm");
    }
  };

  const onToggleStatus = async (id: string) => {
    // tìm product hiện tại
    const target = products.find((p) => p.id === id);
    if (!target) return;

    // FE next status
    const nextFE: ProductStatus =
      target.status === "Đang kinh doanh"
        ? "Ngừng kinh doanh"
        : "Đang kinh doanh";

    // map FE -> BE enum
    const beStatus =
      nextFE === "Đang kinh doanh" ? "DangKinhDoanh" : "NgungKinhDoanh";

    // lấy số từ id dạng "SP001" -> 1
    const numericId = Number(id.replace(/\D/g, ""));

    try {
      await http.patch(`/san-pham/${numericId}`, { TrangThai: beStatus });

      // cập nhật UI sau khi lưu thành công
      setProducts((list) =>
        list.map((p) => (p.id === id ? { ...p, status: nextFE } : p))
      );
      message.success("Đã cập nhật trạng thái");
    } catch (e: any) {
      message.error(
        e?.response?.data?.message || "Cập nhật trạng thái thất bại"
      );
    }
  };

  const onDelete = (id: string) => {
    const target = products.find((p) => p.id === id);
    Modal.confirm({
      title: `Xoá sản phẩm ${target?.name}?`,
      okText: "Xoá",
      okButtonProps: { danger: true },
      cancelText: "Hủy",
      // Trả Promise để Post-Confirm của AntD hiện loading và chỉ đóng Modal khi thành công
      onOk: () => {
        const numericId = Number(id.replace(/\D/g, "")); // "SP001" -> 1
        if (!Number.isFinite(numericId) || numericId <= 0) {
          message.error("Mã sản phẩm không hợp lệ");
          return Promise.reject(); // giữ modal nếu id sai
        }

        return http
          .delete(`/san-pham/${numericId}`)
          .then(() => {
            setProducts((list) => list.filter((p) => p.id !== id));
            message.success("Đã xoá sản phẩm");
          })
          .catch((e: any) => {
            message.error(e?.response?.data?.message ?? "Xoá thất bại");
            throw e; // giữ modal mở nếu lỗi
          });
      },
    });
  };

  const openCategoryModal = () => setCategoryModalOpen(true);
  const closeCategoryModal = () => setCategoryModalOpen(false);

  const onAddCategory = async (name: string) => {
    if (!name.trim()) {
      message.warning("Tên danh mục không được rỗng");
      return;
    }
    if (categoryNames.includes(name)) {
      message.warning("Danh mục đã tồn tại");
      return;
    }
    try {
      const created = await http.post<DanhMuc>("/danh-muc", {
        TenDanhMuc: name.trim(),
      });
      setCategories((prev) => [created.data, ...prev]);
      message.success("Đã thêm danh mục");
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Không thể thêm danh mục");
    }
  };

  /* --------------------------------- Columns -------------------------------- */

  const columns: TableProps<Product>[]["columns"] = [
    { title: "Mã hàng", dataIndex: "id", key: "id" },
    {
      title: "Tên hàng",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    { title: "Loại sản phẩm", dataIndex: "category", key: "category" },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <PriceText value={Number(price)} />,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status: ProductStatus) => <StatusTag status={status} />,
    },
  ];

  /* ---------------------------------- View ---------------------------------- */

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar lọc */}
      <FilterSidebar title="Tìm kiếm & Lọc">
        <SearchInput
          placeholder="Theo mã, tên hàng"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FilterSidebar.Section title="Danh mục sản phẩm">
          <Select
            allowClear
            placeholder="Tất cả danh mục"
            style={{ width: "100%" }}
            value={filterCategory ?? undefined}
            onChange={(value) => setFilterCategory(value ?? null)}
          >
            {categoryNames.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
        </FilterSidebar.Section>

        <FilterSidebar.Section title="Loại thực đơn">
          <Checkbox.Group
            style={{ width: "100%" }}
            value={filterTypes}
            onChange={(vals) => setFilterTypes(vals as ProductType[])}
          >
            <Space direction="vertical">
              <Checkbox value="Thức ăn">Thức ăn</Checkbox>
              <Checkbox value="Đồ uống">Đồ uống</Checkbox>
              <Checkbox value="Khác">Khác</Checkbox>
            </Space>
          </Checkbox.Group>
        </FilterSidebar.Section>

        <FilterSidebar.Section title="Trạng thái">
          <Checkbox.Group
            style={{ width: "100%" }}
            value={filterStatuses}
            onChange={(vals) => setFilterStatuses(vals as ProductStatus[])}
          >
            <Space direction="vertical">
              <Checkbox value="Đang kinh doanh">Đang kinh doanh</Checkbox>
              <Checkbox value="Ngừng kinh doanh">Ngừng kinh doanh</Checkbox>
            </Space>
          </Checkbox.Group>
        </FilterSidebar.Section>
      </FilterSidebar>

      {/* Nội dung chính */}
      <Content style={{ padding: 24, overflowY: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            Hàng hóa
          </Title>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreateModal}
              style={{ backgroundColor: "#52c41a" }}
            >
              Thêm mới
            </Button>
          </Space>
        </div>

        <Table
          dataSource={filteredProducts}
          columns={columns}
          rowKey="key"
          expandable={{
            expandedRowRender: (record) => (
              <ProductDetailPanel
                product={record}
                onUpdate={openEditModal}
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
              />
            ),
            rowExpandable: () => true,
          }}
        />
      </Content>

      <ProductFormModal
        open={productModalOpen}
        initial={editingProduct}
        categories={categoryNames}
        onOpenCategoryModal={openCategoryModal}
        onCancel={closeProductModal}
        onSubmit={onSubmitProduct}
      />

      <CategoryModal
        open={categoryModalOpen}
        categories={categoryNames}
        onClose={closeCategoryModal}
        onAdd={onAddCategory}
      />
    </Layout>
  );
};

export default SanPham;
