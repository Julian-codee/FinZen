"use client"

import { useState } from "react"
import {
  X,
  ChevronDown,
  UtensilsCrossed,
  ShoppingCart,
  Home,
  Car,
  Gamepad2,
  Zap,
  Coffee,
  Heart,
  Pizza,
  Wifi,
  Phone,
  GraduationCap,
  PartyPopper,
  Music,
  Plus,
} from "lucide-react"

interface AddBudgetDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddBudget: (budgetData: {
    totalBudget: number
    categories: Array<{ name: string; budget: number; categoryType: string }>
  }) => void
}

export default function AddBudgetDialog({ isOpen, onClose, onAddBudget }: AddBudgetDialogProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [amount, setAmount] = useState("")
  const [period, setPeriod] = useState("Mensual")

  const categories = [
    {
      id: "comida",
      name: "Comida",
      icon: <UtensilsCrossed className="w-4 h-4" />,
      bgColor: "bg-[#FED7AA]",
      textColor: "text-[#EA580C]",
    },
    {
      id: "supermercado",
      name: "Supermercado",
      icon: <ShoppingCart className="w-4 h-4" />,
      bgColor: "bg-[#BBF7D0]",
      textColor: "text-[#059669]",
    },
    {
      id: "vivienda",
      name: "Vivienda",
      icon: <Home className="w-4 h-4" />,
      bgColor: "bg-[#DBEAFE]",
      textColor: "text-[#2563EB]",
    },
    {
      id: "transporte",
      name: "Transporte",
      icon: <Car className="w-4 h-4" />,
      bgColor: "bg-[#BFDBFE]",
      textColor: "text-[#3B82F6]",
    },
    {
      id: "entretenimiento",
      name: "Entretenimiento",
      icon: <Gamepad2 className="w-4 h-4" />,
      bgColor: "bg-[#E9D5FF]",
      textColor: "text-[#9333EA]",
    },
    {
      id: "servicios",
      name: "Servicios",
      icon: <Zap className="w-4 h-4" />,
      bgColor: "bg-[#FEF3C7]",
      textColor: "text-[#D97706]",
    },
    {
      id: "cafe",
      name: "Café",
      icon: <Coffee className="w-4 h-4" />,
      bgColor: "bg-[#FED7AA]",
      textColor: "text-[#92400E]",
    },
    {
      id: "salud",
      name: "Salud",
      icon: <Heart className="w-4 h-4" />,
      bgColor: "bg-[#FECACA]",
      textColor: "text-[#DC2626]",
    },
    {
      id: "restaurante",
      name: "Restaurante",
      icon: <Pizza className="w-4 h-4" />,
      bgColor: "bg-[#FED7AA]",
      textColor: "text-[#EA580C]",
    },
    {
      id: "internet",
      name: "Internet",
      icon: <Wifi className="w-4 h-4" />,
      bgColor: "bg-[#BFDBFE]",
      textColor: "text-[#3B82F6]",
    },
    {
      id: "telefono",
      name: "Teléfono",
      icon: <Phone className="w-4 h-4" />,
      bgColor: "bg-[#E9D5FF]",
      textColor: "text-[#9333EA]",
    },
    {
      id: "educacion",
      name: "Educación",
      icon: <GraduationCap className="w-4 h-4" />,
      bgColor: "bg-[#BBF7D0]",
      textColor: "text-[#059669]",
    },
    {
      id: "ocio",
      name: "Ocio",
      icon: <PartyPopper className="w-4 h-4" />,
      bgColor: "bg-[#FECACA]",
      textColor: "text-[#DC2626]",
    },
    {
      id: "musica",
      name: "Música",
      icon: <Music className="w-4 h-4" />,
      bgColor: "bg-[#E9D5FF]",
      textColor: "text-[#9333EA]",
    },
    {
      id: "otros",
      name: "Otros",
      icon: <Plus className="w-4 h-4" />,
      bgColor: "bg-[#F3F4F6]",
      textColor: "text-[#6B7280]",
    },
  ]

  const handleCategoryToggle = (categoryId: string) => {
    const newSelected = new Set(selectedCategories)
    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId)
    } else {
      newSelected.add(categoryId)
    }
    setSelectedCategories(newSelected)
  }

  const handleSubmit = () => {
    if (amount && selectedCategories.size > 0) {
      const selectedCategoryData = Array.from(selectedCategories).map((categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId)
        return {
          name: category?.name || "",
          budget: 0,
          categoryType: categoryId,
        }
      })

      onAddBudget({
        totalBudget: Number.parseFloat(amount),
        categories: selectedCategoryData,
      })

      setAmount("")
      setSelectedCategories(new Set())
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#020817] border border-white/40 rounded-xl p-5 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Crear Nuevo Presupuesto</h2>
            <p className="text-gray-400 text-sm">Establece un presupuesto para controlar tus gastos por categoría.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Section */}
        <div className="mb-5">
          <h3 className="text-base font-semibold text-white mb-3">Categoría</h3>

          {/* View Toggle */}
          <div className="flex bg-[#334155] rounded-lg p-1 mb-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                viewMode === "grid" ? "bg-[#020817] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Vista Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                viewMode === "list" ? "bg-[#020817] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Lista
            </button>
          </div>

          {/* Categories Grid */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`${category.bgColor} rounded-lg p-2 flex flex-col items-center justify-center min-h-[60px] transition-all hover:scale-105 ${
                    selectedCategories.has(category.id) ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className={`${category.textColor} mb-1`}>{category.icon}</div>
                  <span className={`${category.textColor} text-xs font-medium text-center leading-tight`}>
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Categories List */}
          {viewMode === "list" && (
            <div className="space-y-1.5">
              {categories.slice(0, 8).map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                    selectedCategories.has(category.id)
                      ? "bg-blue-600/20 border border-blue-500"
                      : "bg-[#334155] hover:bg-[#475569]"
                  }`}
                >
                  <div className={`w-6 h-6 ${category.bgColor} rounded-md flex items-center justify-center`}>
                    <div className={category.textColor}>{category.icon}</div>
                  </div>
                  <span className="text-white text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Amount Section */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-white mb-2">Monto</h3>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#020817] border border-[#475569] text-white pl-7 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Period Section */}
        <div className="mb-5">
          <h3 className="text-base font-semibold text-white mb-2">Período</h3>
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full bg-[#020817] border border-[#475569] text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="Mensual">Mensual</option>
              <option value="Semanal">Semanal</option>
              <option value="Anual">Anual</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[#475569] hover:bg-[#64748B] text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!amount || selectedCategories.size === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Crear Presupuesto
          </button>
        </div>
      </div>
    </div>
  )
}
