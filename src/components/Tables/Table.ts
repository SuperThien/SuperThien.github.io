// trạng thái
export type TableStatus = "empty" | "reserved";
// kiểu dữ liệu
export interface DiningTable {
  key: string;
  id: string;
  name: string;
  status: TableStatus;
}
