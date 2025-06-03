"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { BudgetCategory } from "../types/budget-types"
import AddCategoryDialog from "./AddCategoryDialog"
import CategoryCard from "./CategoryCard"

interface CategoriesSectionProps {
  categories: BudgetCategory[]
  onAddCategory: (category: Omit<BudgetCategory, "id" | "spent">) => void
  onDeleteCategory: (id: string) => void
  onUpdateBudget?: (id: string, newBudget: number) => void
}

export default function CategoriesSection({
  categories,
  onAddCategory,
  onDeleteCategory,
  onUpdateBudget,
}: CategoriesSectionProps) {
  const [searchFilter, setSearchFilter] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

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
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Añadir
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
            onUpdateBudget={onUpdateBudget}
          />
        ))}
      </div>

      {/* Add Category Dialog */}
      <AddCategoryDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddCategory={onAddCategory}
      />
    </div>
  )
}
