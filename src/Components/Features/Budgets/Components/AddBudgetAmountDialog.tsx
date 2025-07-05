"use client";

import { useState } from "react";
import { X, DollarSign } from "lucide-react";
import type { BudgetCategory } from "../types/budget-types";

interface AddBudgetAmountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: BudgetCategory[];
  onAddBudgetAmount: (categoryId: string, additionalAmount: number) => void;
}

const categoryConfig = {
  comida: { icon: "🍽️", bgColor: "bg-[#FED7AA]", textColor: "text-[#EA580C]" },
  supermercado: {
    icon: "🛒",
    bgColor: "bg-[#BBF7D0]",
    textColor: "text-[#059669]",
  },
  vivienda: {
    icon: "🏠",
    bgColor: "bg-[#DBEAFE]",
    textColor: "text-[#2563EB]",
  },
  transporte: {
    icon: "🚗",
    bgColor: "bg-[#BFDBFE]",
    textColor: "text-[#3B82F6]",
  },
  entretenimiento: {
    icon: "🎮",
    bgColor: "bg-[#E9D5FF]",
    textColor: "text-[#9333EA]",
  },
  servicios: {
    icon: "⚡",
    bgColor: "bg-[#FEF3C7]",
    textColor: "text-[#D97706]",
  },
  cafe: { icon: "☕", bgColor: "bg-[#FED7AA]", textColor: "text-[#92400E]" },
  salud: { icon: "❤️", bgColor: "bg-[#FECACA]", textColor: "text-[#DC2626]" },
  restaurante: {
    icon: "🍕",
    bgColor: "bg-[#FED7AA]",
    textColor: "text-[#EA580C]",
  },
  internet: {
    icon: "📶",
    bgColor: "bg-[#BFDBFE]",
    textColor: "text-[#3B82F6]",
  },
  telefono: {
    icon: "📞",
    bgColor: "bg-[#E9D5FF]",
    textColor: "text-[#9333EA]",
  },
  educacion: {
    icon: "🎓",
    bgColor: "bg-[#BBF7D0]",
    textColor: "text-[#059669]",
  },
  ocio: { icon: "🎉", bgColor: "bg-[#FECACA]", textColor: "text-[#DC2626]" },
  musica: { icon: "🎵", bgColor: "bg-[#E9D5FF]", textColor: "text-[#9333EA]" },
  otros: { icon: "➕", bgColor: "bg-[#F3F4F6]", textColor: "text-[#6B7280]" },
};

export default function AddBudgetAmountDialog({
  isOpen,
  onClose,
  categories,
  onAddBudgetAmount,
}: AddBudgetAmountDialogProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [amount, setAmount] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleSubmit = () => {
    if (selectedCategoryId && amount) {
      const additionalAmount = Number.parseFloat(amount);
      if (!isNaN(additionalAmount) && additionalAmount > 0) {
        onAddBudgetAmount(selectedCategoryId, additionalAmount);
        setSelectedCategoryId("");
        setAmount("");
        onClose();
      }
    }
  };

  const handleClose = () => {
    setSelectedCategoryId("");
    setAmount("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#020817] border border-white/40 rounded-xl p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              Añadir Monto al Presupuesto
            </h2>
            <p className="text-gray-400 text-sm">
              Incrementa el presupuesto de una categoría existente
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-white mb-3">
            Seleccionar Categoría
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => {
              const config =
                categoryConfig[
                  category.categoryType as keyof typeof categoryConfig
                ] || categoryConfig.otros;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedCategoryId === category.id
                      ? "bg-blue-600/20 border border-blue-500"
                      : "bg-[#1A2332] border border-[#2A3441] hover:bg-[#243041]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 ${config.bgColor} rounded-lg flex items-center justify-center`}
                    >
                      <span className="text-sm">{config.icon}</span>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium">
                        {category.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Actual: {formatCurrency(category.budget ?? 0)}
                      </div>
                    </div>
                  </div>
                  {selectedCategoryId === category.id && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-white mb-2">
            Monto a Añadir
          </h3>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#1A2332] border border-[#2A3441] text-white pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          {selectedCategoryId && amount && (
            <div className="mt-2 text-sm text-gray-400">
              Nuevo total:{" "}
              {formatCurrency(
                (categories.find((cat) => cat.id === selectedCategoryId)
                  ?.budget || 0) + Number.parseFloat(amount || "0")
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleClose}
            className="flex-1 bg-[#475569] hover:bg-[#64748B] text-white py-3 rounded-lg text-sm font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              !selectedCategoryId ||
              !amount ||
              Number.parseFloat(amount || "0") <= 0
            }
            className="flex-1 bg-[#10B981] hover:bg-[#059669] disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg text-sm font-medium transition-colors"
          >
            Añadir Monto
          </button>
        </div>
      </div>
    </div>
  );
}
