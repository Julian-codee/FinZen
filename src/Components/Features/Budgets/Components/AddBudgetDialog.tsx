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
  Calendar,
} from "lucide-react"
import type { BudgetData } from "../types/budget-types"

interface Account {
  id: string
  name: string
}

interface AddBudgetDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddBudget: (budgetData: BudgetData & { accountId: string }) => void
  accounts: Account[]
}

export default function AddBudgetDialog({ isOpen, onClose, onAddBudget, accounts }: AddBudgetDialogProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [budgetName, setBudgetName] = useState("")
  const [amount, setAmount] = useState("")
  const [period, setPeriod] = useState("Mensual")
  const [selectedAccount, setSelectedAccount] = useState("")

  const categories = [
    { id: "comida", name: "Comida", icon: <UtensilsCrossed className="w-4 h-4" />, bgColor: "bg-[#FED7AA]", textColor: "text-[#EA580C]" },
    { id: "supermercado", name: "Supermercado", icon: <ShoppingCart className="w-4 h-4" />, bgColor: "bg-[#BBF7D0]", textColor: "text-[#059669]" },
    { id: "vivienda", name: "Vivienda", icon: <Home className="w-4 h-4" />, bgColor: "bg-[#DBEAFE]", textColor: "text-[#2563EB]" },
    { id: "transporte", name: "Transporte", icon: <Car className="w-4 h-4" />, bgColor: "bg-[#BFDBFE]", textColor: "text-[#3B82F6]" },
    { id: "entretenimiento", name: "Entretenimiento", icon: <Gamepad2 className="w-4 h-4" />, bgColor: "bg-[#E9D5FF]", textColor: "text-[#9333EA]" },
    { id: "servicios", name: "Servicios", icon: <Zap className="w-4 h-4" />, bgColor: "bg-[#FEF3C7]", textColor: "text-[#D97706]" },
    { id: "cafe", name: "Café", icon: <Coffee className="w-4 h-4" />, bgColor: "bg-[#FED7AA]", textColor: "text-[#92400E]" },
    { id: "salud", name: "Salud", icon: <Heart className="w-4 h-4" />, bgColor: "bg-[#FECACA]", textColor: "text-[#DC2626]" },
    { id: "restaurante", name: "Restaurante", icon: <Pizza className="w-4 h-4" />, bgColor: "bg-[#FED7AA]", textColor: "text-[#EA580C]" },
    { id: "internet", name: "Internet", icon: <Wifi className="w-4 h-4" />, bgColor: "bg-[#BFDBFE]", textColor: "text-[#3B82F6]" },
    { id: "telefono", name: "Teléfono", icon: <Phone className="w-4 h-4" />, bgColor: "bg-[#E9D5FF]", textColor: "text-[#9333EA]" },
    { id: "educacion", name: "Educación", icon: <GraduationCap className="w-4 h-4" />, bgColor: "bg-[#BBF7D0]", textColor: "text-[#059669]" },
    { id: "ocio", name: "Ocio", icon: <PartyPopper className="w-4 h-4" />, bgColor: "bg-[#FECACA]", textColor: "text-[#DC2626]" },
    { id: "musica", name: "Música", icon: <Music className="w-4 h-4" />, bgColor: "bg-[#E9D5FF]", textColor: "text-[#9333EA]" },
    { id: "otros", name: "Otros", icon: <Plus className="w-4 h-4" />, bgColor: "bg-[#F3F4F6]", textColor: "text-[#6B7280]" },
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
    if (budgetName.trim() && amount && selectedCategories.size > 0 && selectedAccount) {
      const selectedCategoryData = Array.from(selectedCategories).map((categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId)
        return {
          name: category?.name || "",
          budget: 0,
          categoryType: categoryId,
          accountId: selectedAccount,
        }
      })

      onAddBudget({
        name: budgetName.trim(),
        totalBudget: Number.parseFloat(amount),
        categories: selectedCategoryData,
        accountId: selectedAccount,
      })

      setBudgetName("")
      setAmount("")
      setSelectedCategories(new Set())
      setSelectedAccount("")
      onClose()
    }
  }

  const handleClose = () => {
    setBudgetName("")
    setAmount("")
    setSelectedCategories(new Set())
    setSelectedAccount("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#020817] border border-white/40 rounded-xl p-5 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Crear Nuevo Presupuesto</h2>
            <p className="text-gray-400 text-sm">Establece un presupuesto para controlar tus gastos por categoría.</p>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-base font-semibold text-white mb-2">Nombre del Presupuesto</h3>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              className="w-full bg-[#020817] border border-[#475569] text-white pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ej: Presupuesto Enero 2024"
            />
          </div>
          {budgetName.trim() && (
            <p className="text-xs text-gray-400 mt-1">
              Este nombre te ayudará a identificar el presupuesto en el historial
            </p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-base font-semibold text-white mb-2">Cuenta</h3>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full bg-[#020817] border border-[#475569] text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
          >
            <option value="">Selecciona una cuenta</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-base font-semibold text-white mb-3">Categorías</h3>
          <div className="flex bg-[#334155] rounded-lg p-1 mb-3">
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

          {viewMode === "grid" ? (
            <div className="grid grid-cols-5 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`${category.bgColor} rounded-lg p-2 flex flex-col items-center justify-center min-h-[50px] transition-all hover:scale-105 ${
                    selectedCategories.has(category.id) ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className={`${category.textColor} mb-1`}>{category.icon}</div>
                  <span className="text-xs text-black font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                    selectedCategories.has(category.id)
                      ? "bg-blue-800 text-white"
                      : "bg-[#1E293B] text-gray-300 hover:bg-[#334155]"
                  }`}
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`${category.textColor}`}>{category.icon}</div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  {selectedCategories.has(category.id) && <span className="text-xs text-blue-400">Seleccionada</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-base font-semibold text-white mb-2">Cantidad Total</h3>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[#020817] border border-[#475569] text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ej: 500000"
            min="0"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
          disabled={!budgetName.trim() || !amount || selectedCategories.size === 0 || !selectedAccount}
        >
          Crear Presupuesto
        </button>
      </div>
    </div>
  )
}
