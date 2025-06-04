"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { BudgetCategory } from "../types/budget-types"
import RegisterExpenseDialog from "./RegisterExpenseDialog"
import CategoryCard from "./CategoryCard"

interface CategoriesSectionProps {
  categories: BudgetCategory[]
  onAddCategory: (category: Omit<BudgetCategory, "id" | "spent">) => void
  onDeleteCategory: (id: string) => void
  onUpdateBudget?: (id: string, newBudget: number) => void
  onRegisterExpense?: (id: string, amount: number) => void
}

export default function CategoriesSection({
  categories,
  onDeleteCategory,
  onUpdateBudget,
  onRegisterExpense,
}: CategoriesSectionProps) {
  const [searchFilter, setSearchFilter] = useState("")
  const [isRegisterExpenseOpen, setIsRegisterExpenseOpen] = useState(false)

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchFilter.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Presupuestos por Categoría</h2>
          <p className="text-gray-400">Gestiona tus límites de gasto por categoría</p>
        </div>
        <button
          onClick={() => setIsRegisterExpenseOpen(true)}
          className="bg-[#F59E0B] hover:bg-[#D97706] px-4 py-2 rounded-lg transition-colors flex items-center"
          disabled={categories.length === 0}
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar Gasto
        </button>
      </div>

      {/* Search Filter */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="max-w-md bg-[#1A2332] border border-[#2A3441] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6]"
        />
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={onDeleteCategory}
            onUpdateBudget={onUpdateBudget || (() => {})}
          />
        ))}
      </div>

      {/* Register Expense Dialog */}
      <RegisterExpenseDialog
        isOpen={isRegisterExpenseOpen}
        onClose={() => setIsRegisterExpenseOpen(false)}
        categories={categories}
        onRegisterExpense={onRegisterExpense || (() => {})}
      />
    </div>
  )
}
