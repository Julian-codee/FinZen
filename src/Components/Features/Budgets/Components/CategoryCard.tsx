"use client"

import { useState } from "react"
import { MoreVertical, Edit, Plus, Trash2 } from "lucide-react"
import type { BudgetCategory } from "../types/budget-types"
import { categoryList } from "../utils/category-config"
import {
  formatCurrency,
  getProgressColor,
  calculatePercentage,
} from "../utils/budgest-utils"

interface CategoryCardProps {
  category: BudgetCategory
  budgetName?: string
  onDelete: (id: string) => void
  onUpdateBudget: (id: string, newBudget: number) => void
  onAddTransaction?: (categoryId: string) => void
}

export default function CategoryCard({
  category,
  budgetName,
  onDelete,
  onUpdateBudget,
  onAddTransaction,
}: CategoryCardProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editBudget, setEditBudget] = useState(category.budget.toString())

  const remaining = category.budget - category.spent
  const percentage = calculatePercentage(category.spent, category.budget)

  const handleEditSave = () => {
    const newBudget = Number.parseFloat(editBudget)
    if (!isNaN(newBudget) && newBudget >= 0) {
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
    setIsEditing(true)
    setShowDropdown(false)
  }

  const categoryConfig =
    categoryList.find((c) => c.id === category.categoryType) ||
    categoryList[categoryList.length - 1]

  return (
    <div className="bg-[#020817] border border-white/40 rounded-xl p-6">
      {budgetName && (
        <div className="mb-3 pb-2 border-b border-white/20">
          <span className="text-xs text-blue-400 font-medium bg-blue-400/10 px-2 py-1 rounded">
            {budgetName}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${categoryConfig.bgColor} rounded-lg flex items-center justify-center`}>
            <div className={categoryConfig.textColor}>{categoryConfig.icon}</div>
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
                <div className="absolute right-0 mt-2 w-40 bg-[#020817] border border-white/40 rounded-lg shadow-lg z-10">
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
                      Editar Presupuesto
                    </button>
                  )}

                  {onAddTransaction && (
                    <button
                      onClick={() => {
                        onAddTransaction(category.id)
                        setShowDropdown(false)
                      }}
                      className="w-full text-left px-3 py-2 text-white hover:bg-[#475569] flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Registrar Gasto
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onDelete(category.id)
                      setShowDropdown(false)
                    }}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-[#475569] rounded-b-lg flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
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
