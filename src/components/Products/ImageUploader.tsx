// dùng để upload ảnh
import { Upload, Image, message } from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";

type Props = {
  value?: string;
  onChange?: (url?: string) => void;
};

export default function ImageUploader({ value, onChange }: Props) {
  const uploadProps: UploadProps = {
    maxCount: 1,
    showUploadList: false,
    beforeUpload: (file) => {
      const url = URL.createObjectURL(file);
      onChange?.(url);
      message.success(`Đã chọn ảnh: ${file.name}`);
      return false;
    },
  };

  return (
    <>
      <Upload.Dragger {...uploadProps} name="files" listType="picture-card">
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Nhấn hoặc kéo file vào đây</p>
      </Upload.Dragger>
      {value && (
        <Image
          src={value}
          width="100%"
          style={{ marginTop: 12, borderRadius: 8 }}
        />
      )}
    </>
  );
}
