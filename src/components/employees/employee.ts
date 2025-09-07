// thanh trạng thái
export type EmpStatus = "Đang làm việc" | "Đã nghỉ";
//các kiểu dữ liệu
export interface Employee {
  id: string; // dùng làm rowKey ổn định
  key?: string; // tuỳ, nếu vẫn muốn giữ
  name: string;
  avatar?: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  status: EmpStatus;
  password?: string; // chỉ dùng ở form
}
