// Hiển thị QR dựa trên table id
import React, { useMemo } from "react";
import { Modal, Typography, Image, Button } from "antd";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import type { DiningTable } from "./Table";

const { Title } = Typography;

interface Props {
  open: boolean;
  table: DiningTable | null;
  onCancel: () => void;
}

const TableQrModal: React.FC<Props> = ({ open, table, onCancel }) => {
  const qrSrc = useMemo(() => {
    return table
      ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
          `https://your-restaurant.com/order?table=${table.id}`
        )}`
      : "";
  }, [table]);

  const handleDownload = () => {
    if (!table || !qrSrc) return;
    const a = document.createElement("a");
    a.href = qrSrc;
    a.download = `${table.id}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handlePrint = () => {
    if (!table || !qrSrc) return;
    const w = window.open("");
    if (!w) return;
    w.document.write(
      `<img src="${qrSrc}" style="width:300px;height:300px;" onload="window.print();window.close();"/>`
    );
    w.document.close();
  };

  return (
    <Modal
      title={
        <Title level={3} style={{ margin: 0 }}>
          Mã QR cho {table?.name}
        </Title>
      }
      open={open}
      onCancel={onCancel}
      width={380}
      footer={[
        <Button
          key="download"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
        >
          Tải xuống
        </Button>,
        <Button
          key="print"
          type="primary"
          icon={<PrinterOutlined />}
          onClick={handlePrint}
        >
          In mã
        </Button>,
      ]}
    >
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        {table && <Image width={250} src={qrSrc} preview={false} />}
      </div>
    </Modal>
  );
};

export default TableQrModal;
