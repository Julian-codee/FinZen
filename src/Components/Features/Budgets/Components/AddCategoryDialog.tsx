"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { BudgetCategory } from "../types/budget-types"

type NewCategoryForm = {
  name: string
  budget: string
  categoryType: string
}
import { categoryIcons } from "../utils/category-config"

interface AddCategoryDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddCategory: (category: Omit<BudgetCategory, "id" | "spent">) => void
}

export default function AddCategoryDialog({ isOpen, onClose, onAddCategory }: AddCategoryDialogProps) {
  const [newCategory, setNewCategory] = useState<NewCategoryForm>({
    name: "",
    budget: "",
    categoryType: "",
  })

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.budget && newCategory.categoryType) {
      onAddCategory({
        name: newCategory.name,
        budget: Number.parseFloat(newCategory.budget),
        categoryType: newCategory.categoryType,
      })
      setNewCategory({ name: "", budget: "", categoryType: "" })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#020817] border border-[#2A3441] rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Agregar Nueva Categoría</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
              Nombre de la categoría
            </label>
            <input
              id="name"
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="w-full bg-[#0B1426] border border-[#2A3441] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6]"
              placeholder="Ej: Entretenimiento"
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-gray-300 text-sm font-medium mb-2">
              Presupuesto
            </label>
            <input
              id="budget"
              type="number"
              value={newCategory.budget}
              onChange={(e) => setNewCategory({ ...newCategory, budget: e.target.value })}
              className="w-full bg-[#0B1426] border border-[#2A3441] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6]"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-300 text-sm font-medium mb-2">
              Tipo de categoría
            </label>
            <select
              id="category"
              value={newCategory.categoryType}
              onChange={(e) => setNewCategory({ ...newCategory, categoryType: e.target.value })}
              className="w-full bg-[#0B1426] border border-[#2A3441] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="">Selecciona una categoría</option>
              {Object.keys(categoryIcons).map((key) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddCategory}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-lg transition-colors"
          >
            Agregar Categoría
          </button>
        </div>
      </div>
    </div>
  )
}
