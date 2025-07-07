import { Info } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  message: string;
  placeholder: string;
  inputType?: string;
  confirmText?: string;
  cancelText?: string;
}

export function InputDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  placeholder,
  inputType = "text",
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}: Props) {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (inputValue.trim()) {
      onConfirm(inputValue);
      setInputValue("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Info className="text-blue-400 w-5 h-5" />
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>

        <p className="text-gray-300 mb-4 text-sm">{message}</p>

        <div className="mb-6">
          <div className="flex items-center bg-[#0f172a] border border-gray-600 px-3 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <span className="text-gray-400 mr-2">$</span>
            <input
              type={inputType}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className="bg-transparent text-white w-full outline-none placeholder-gray-500"
              onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setInputValue("");
              onClose();
            }}
            className="px-4 py-2 rounded-md text-sm bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
          >
            {cancelText}
          </button>

          <button
            onClick={handleConfirm}
            disabled={!inputValue.trim()}
            className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
