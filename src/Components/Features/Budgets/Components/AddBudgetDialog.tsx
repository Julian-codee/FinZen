"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown } from "lucide-react"
import { categoryList } from "../utils/category-config"

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
  const [totalBudget, setTotalBudget] = useState("")
  const [period, setPeriod] = useState("Mensual")
  const [categoryBudgets, setCategoryBudgets] = useState<Record<string, string>>({})
  const [step, setStep] = useState(1)
  const [autoDistribute, setAutoDistribute] = useState(true)

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSelectedCategories(new Set())
      setTotalBudget("")
      setPeriod("Mensual")
      setCategoryBudgets({})
      setStep(1)
      setAutoDistribute(true)
    }
  }, [isOpen])

  const handleCategoryToggle = (categoryId: string) => {
    const newSelected = new Set(selectedCategories)
    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId)
      // Remove budget for this category
      const newBudgets = { ...categoryBudgets }
      delete newBudgets[categoryId]
      setCategoryBudgets(newBudgets)
    } else {
      newSelected.add(categoryId)
    }
    setSelectedCategories(newSelected)
  }

  const handleNextStep = () => {
    if (step === 1 && selectedCategories.size > 0 && totalBudget) {
      // If auto-distribute is enabled, calculate budgets automatically
      if (autoDistribute) {
        const budget = Number.parseFloat(totalBudget)
        const perCategory = budget / selectedCategories.size
        const newBudgets: Record<string, string> = {}

        selectedCategories.forEach((categoryId) => {
          newBudgets[categoryId] = perCategory.toFixed(0)
        })

        setCategoryBudgets(newBudgets)
      }

      setStep(2)
    }
  }

  const handlePrevStep = () => {
    setStep(1)
  }

  const handleSubmit = () => {
    if (selectedCategories.size > 0 && totalBudget) {
      const selectedCategoryData = Array.from(selectedCategories).map((categoryId) => {
        const category = categoryList.find((cat) => cat.id === categoryId)
        const budget = Number.parseFloat(categoryBudgets[categoryId] || "0")

        return {
          name: category?.name || "",
          budget: budget,
          categoryType: categoryId,
        }
      })

      onAddBudget({
        totalBudget: Number.parseFloat(totalBudget),
        categories: selectedCategoryData,
      })

      setTotalBudget("")
      setSelectedCategories(new Set())
      setCategoryBudgets({})
      setStep(1)
      onClose()
    }
  }

  const handleCategoryBudgetChange = (categoryId: string, value: string) => {
    setCategoryBudgets({
      ...categoryBudgets,
      [categoryId]: value,
    })
  }

  const getTotalAllocated = () => {
    return Object.values(categoryBudgets).reduce((sum, value) => {
      return sum + (Number.parseFloat(value) || 0)
    }, 0)
  }

  const totalAllocated = getTotalAllocated()
  const totalBudgetNum = Number.parseFloat(totalBudget) || 0
  const remaining = totalBudgetNum - totalAllocated

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#020817] border border-white/40 rounded-xl p-5 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">
              {step === 1 ? "Crear Nuevo Presupuesto" : "Distribuir Presupuesto"}
            </h2>
            <p className="text-gray-400 text-sm">
              {step === 1
                ? "Establece un presupuesto para controlar tus gastos por categoría."
                : "Asigna montos específicos a cada categoría seleccionada."}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <>
            {/* Amount Section */}
            <div className="mb-4">
              <h3 className="text-base font-semibold text-white mb-2">Monto Total</h3>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  className="w-full bg-[#020817] border border-white/40 text-white pl-7 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="0"
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
                  className="w-full bg-[#020817] border border-white/40 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="Mensual">Mensual</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Anual">Anual</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Category Section */}
            <div className="mb-5">
              <h3 className="text-base font-semibold text-white mb-3">Categorías</h3>

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
                  {categoryList.map((category) => (
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
                <div className="space-y-1.5 max-h-60 overflow-y-auto">
                  {categoryList.map((category) => (
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

            {/* Auto-distribute option */}
            <div className="mb-5 flex items-center">
              <input
                type="checkbox"
                id="auto-distribute"
                checked={autoDistribute}
                onChange={(e) => setAutoDistribute(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="auto-distribute" className="text-white text-sm">
                Distribuir presupuesto automáticamente entre categorías
              </label>
            </div>
          </>
        ) : (
          <>
            {/* Budget Distribution */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-semibold text-white">Distribución del Presupuesto</h3>
                <div className="text-sm">
                  <span className={remaining >= 0 ? "text-green-400" : "text-red-400"}>
                    {remaining >= 0 ? "Restante: " : "Excedido: "}${Math.abs(remaining).toFixed(0)}
                  </span>
                  <span className="text-gray-400"> / ${totalBudget}</span>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {Array.from(selectedCategories).map((categoryId) => {
                  const category = categoryList.find((cat) => cat.id === categoryId)
                  if (!category) return null

                  return (
                    <div key={categoryId} className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 ${category.bgColor} rounded-md flex items-center justify-center flex-shrink-0`}
                      >
                        <div className={category.textColor}>{category.icon}</div>
                      </div>
                      <div className="flex-grow">
                        <p className="text-white text-sm font-medium">{category.name}</p>
                      </div>
                      <div className="relative w-24">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                          $
                        </span>
                        <input
                          type="number"
                          value={categoryBudgets[categoryId] || ""}
                          onChange={(e) => handleCategoryBudgetChange(categoryId, e.target.value)}
                          className="w-full bg-[#020817] border border-white/40 text-white pl-6 pr-2 py-1 rounded text-sm focus:outline-none focus:border-[#3B82F6]"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {step === 1 ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 bg-[#475569] hover:bg-[#64748B] text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleNextStep}
                disabled={!totalBudget || selectedCategories.size === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Siguiente
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handlePrevStep}
                className="flex-1 bg-[#475569] hover:bg-[#64748B] text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Atrás
              </button>
              <button
                onClick={handleSubmit}
                disabled={totalAllocated <= 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Crear Presupuesto
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
