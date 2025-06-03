"use client"

import { useState } from "react"
import { MoreVertical, Edit, Plus } from "lucide-react"
import type { BudgetCategory } from "../types/budget-types"

interface CategoryCardProps {
  category: BudgetCategory
  onDelete: (id: string) => void
  onUpdateBudget?: (id: string, newBudget: number) => void
}

// Mapeo de iconos y colores para las categorías del modal
const categoryConfig = {
  comida: {
    icon: "🍽️",
    bgColor: "bg-[#FED7AA]",
    textColor: "text-[#EA580C]",
  },
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
  cafe: {
    icon: "☕",
    bgColor: "bg-[#FED7AA]",
    textColor: "text-[#92400E]",
  },
  salud: {
    icon: "❤️",
    bgColor: "bg-[#FECACA]",
    textColor: "text-[#DC2626]",
  },
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
  ocio: {
    icon: "🎉",
    bgColor: "bg-[#FECACA]",
    textColor: "text-[#DC2626]",
  },
  musica: {
    icon: "🎵",
    bgColor: "bg-[#E9D5FF]",
    textColor: "text-[#9333EA]",
  },
  otros: {
    icon: "➕",
    bgColor: "bg-[#F3F4F6]",
    textColor: "text-[#6B7280]",
  },
}

export default function CategoryCard({ category, onDelete, onUpdateBudget }: CategoryCardProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editBudget, setEditBudget] = useState(category.budget.toString())
  const remaining = category.budget - category.spent
  const percentage = category.budget > 0 ? (category.spent / category.budget) * 100 : 0

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = budget > 0 ? (spent / budget) * 100 : 0
    if (percentage >= 100) return "bg-[#EF4444]"
    if (percentage >= 80) return "bg-[#F59E0B]"
    return "bg-[#3B82F6]"
  }

  const handleEditSave = () => {
    const newBudget = Number.parseFloat(editBudget)
    if (!isNaN(newBudget) && newBudget >= 0 && onUpdateBudget) {
      onUpdateBudget(category.id, newBudget)
    }
    setIsEditing(false)
    setShowDropdown(false)
  }

  const handleEditCancel = () => {
    setEditBudget(category.budget.toString())
    setIsEditing(false)
    setShowDropdown(false)
  }

  const handleAddBudget = () => {
    if (onUpdateBudget) {
      onUpdateBudget(category.id, 0)
    }
    setIsEditing(true)
    setShowDropdown(false)
  }

  // Obtener configuración de la categoría
  const config = categoryConfig[category.categoryType as keyof typeof categoryConfig] || categoryConfig.otros

  return (
    <div className="bg-[#020817] border border-white/40 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center`}>
            <span className="text-lg">{config.icon}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{category.name}</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    value={editBudget}
                    onChange={(e) => setEditBudget(e.target.value)}
                    className="w-24 bg-[#020817] border border-white/40 text-white pl-6 pr-2 py-1 rounded text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="0"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleEditSave}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-2 py-1 rounded text-xs"
                >
                  ✓
                </button>
                <button
                  onClick={handleEditCancel}
                  className="bg-[#475569] hover:bg-[#64748B] text-white px-2 py-1 rounded text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className="text-lg font-bold text-white">
                  {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                </div>
                <div className={`text-sm ${remaining >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {formatCurrency(Math.abs(remaining))} {remaining >= 0 ? "restantes" : "excedido"}
                </div>
              </>
            )}
          </div>
          {!isEditing && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-[#020817] border border-white/40 rounded-lg shadow-lg z-10">
                  {category.budget === 0 ? (
                    <button
                      onClick={handleAddBudget}
                      className="w-full text-left px-3 py-2 text-white hover:bg-[#475569] rounded-t-lg flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Presupuesto
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditing(true)
                        setShowDropdown(false)
                      }}
                      className="w-full text-left px-3 py-2 text-white hover:bg-[#475569] rounded-t-lg flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onDelete(category.id)
                      setShowDropdown(false)
                    }}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-[#475569] rounded-b-lg"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full bg-[#374151] rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(category.spent, category.budget)}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}
