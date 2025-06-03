"use client"

import type { BudgetCategory } from "../types/budget-types"

interface SummaryCardsProps {
  categories: BudgetCategory[]
}

export default function SummaryCards({ categories }: SummaryCardsProps) {
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0)
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0)
  const totalAvailable = totalBudget - totalSpent
  const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0
  const availablePercentage = totalBudget > 0 ? (totalAvailable / totalBudget) * 100 : 0
  const exceededCategories = categories.filter((cat) => cat.spent > cat.budget).length

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const summaryData = [
    {
      title: "Presupuesto Total",
      value: formatCurrency(totalBudget),
      subtitle: "Presupuesto mensual",
      iconColor: "bg-[#3B82F6]",
    },
    {
      title: "Gastado",
      value: formatCurrency(totalSpent),
      subtitle: `${spentPercentage.toFixed(0)}% del presupuesto`,
      iconColor: "bg-[#F59E0B]",
      progress: Math.min(spentPercentage, 100),
    },
    {
      title: "Disponible",
      value: formatCurrency(totalAvailable),
      subtitle: `${availablePercentage.toFixed(0)}% restante`,
      iconColor: "bg-[#10B981]",
      progress: Math.min(availablePercentage, 100),
    },
    {
      title: "Categorías Excedidas",
      value: exceededCategories.toString(),
      subtitle: `De ${categories.length} categorías`,
      iconColor: "bg-[#EF4444]",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((item, index) => (
        <div key={index} className="bg-[#020817] border border-[#2A3441] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">{item.title}</h3>
            <div className={`w-8 h-8 ${item.iconColor}/20 rounded-full flex items-center justify-center`}>
              <div className={`w-4 h-4 ${item.iconColor} rounded-full`}></div>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{item.value}</div>
          <p className="text-gray-400 text-sm">{item.subtitle}</p>
          {item.progress !== undefined && (
            <div className="w-full bg-[#374151] rounded-full h-2 mt-3">
              <div
                className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
