import { useRef, useState } from "react";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";

export default function FileUploader({ handleFileChange, inputRef }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files.length) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-full p-6 border-2 ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-600 bg-gray-800"
        } border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <FiUploadCloud className="text-4xl text-gray-300" />
        <p className="mt-2 text-gray-300 text-sm">
          Resimleri buraya sürükleyin veya{" "}
          <span className="text-blue-400 underline">dosya seçin</span>.
        </p>
        <input
          type="file"
          ref={inputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
