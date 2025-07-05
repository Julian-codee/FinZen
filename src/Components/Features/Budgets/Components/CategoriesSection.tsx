"use client"

import { useState } from "react"
import type { BudgetCategoryUI } from "../types/budget-types"
import RegisterExpenseDialog from "./RegisterExpenseDialog"
import CategoryCard from "./CategoryCard"

interface CategoriesSectionProps {
  categories: BudgetCategoryUI[];
  budgetName?: string;
  onDeleteCategory: (id: string) => Promise<void>;
  onUpdateBudget: (id: string, budgetAmount: number, currentCategory: BudgetCategoryUI) => Promise<void>;
  onRegisterExpense: (budgetId: string, amount: number, description?: string) => Promise<void>;
}

export default function CategoriesSection({
  categories,
  budgetName,
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
          {budgetName && (
            <div className="mt-2">
              <span className="text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">📊 {budgetName}</span>
            </div>
          )}
        </div>
      
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="max-w-md bg-[#1A2332] border border-[#2A3441] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6]"
        />
      </div>

      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            budgetName={budgetName}
            onDelete={onDeleteCategory}
            onUpdateBudget={(id, newBudget) => onUpdateBudget(id, newBudget, category)}
          />
        ))}
      </div>

      <RegisterExpenseDialog
        isOpen={isRegisterExpenseOpen}
        onClose={() => setIsRegisterExpenseOpen(false)}
        categories={categories}
        onRegisterExpense={onRegisterExpense}
      />
    </div>
  )
}