"use client"

import { DollarSign, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"
import { formatCurrency } from "../utils/budgest-utils"
import type { BudgetCategory } from "../types/budget-types"

interface SummaryCardsProps {
  categories: BudgetCategory[]
}

export default function SummaryCards({ categories }: SummaryCardsProps) {
  const totalBudget = categories.reduce((sum, cat) => sum + (cat.budget ?? 0), 0)
  const totalSpent = categories.reduce((sum, cat) => sum + (cat.spent ?? 0), 0)
  const totalAvailable = totalBudget - totalSpent
  const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0
  const availablePercentage = totalBudget > 0 ? (totalAvailable / totalBudget) * 100 : 0
  const exceededCategories = categories.filter((cat) => (cat.spent ?? 0) > (cat.budget ?? 0)).length

  const summaryData = [
    {
      title: "Presupuesto Total",
      value: formatCurrency(totalBudget),
      subtitle: "Presupuesto mensual",
      icon: <DollarSign className="w-5 h-5 text-blue-400" />,
      gradientFrom: "from-blue-900/20",
      gradientTo: "to-slate-900/80",
    },
    {
      title: "Gastado",
      value: formatCurrency(totalSpent),
      subtitle: `${spentPercentage.toFixed(0)}% del presupuesto`,
      icon: <TrendingDown className="w-5 h-5 text-amber-400" />,
      gradientFrom: "from-amber-900/20",
      gradientTo: "to-slate-900/80",
      progress: Math.min(spentPercentage, 100),
      progressColor: "from-amber-500 to-orange-500",
    },
    {
      title: "Disponible",
      value: formatCurrency(totalAvailable),
      subtitle: `${availablePercentage.toFixed(0)}% restante`,
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
      gradientFrom: "from-green-900/20",
      gradientTo: "to-slate-900/80",
      progress: Math.min(availablePercentage, 100),
      progressColor: "from-green-500 to-emerald-500",
    },
    {
      title: "Categorías Excedidas",
      value: exceededCategories.toString(),
      subtitle: `De ${categories.length} categorías`,
      icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
      gradientFrom: "from-red-900/20",
      gradientTo: "to-slate-900/80",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((item, index) => (
        <div key={index} className="group relative overflow-hidden">
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} rounded-2xl transition-all duration-300 group-hover:scale-[1.02]`}></div>
          
          {/* Border gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700/50 via-transparent to-slate-600/30 p-[1px]">
            <div className="h-full w-full rounded-2xl bg-slate-900/90 backdrop-blur-sm"></div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-gray-400 text-sm font-medium tracking-wide">{item.title}</h3>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:border-slate-600/50 transition-colors">
                {item.icon}
              </div>
            </div>

            {/* Value */}
            <div className="text-white text-2xl lg:text-3xl font-bold mb-3 tracking-tight">
              {item.value}
            </div>

            {/* Subtitle */}
            <p className="text-gray-400 text-sm font-medium mb-3">{item.subtitle}</p>

            {/* Progress bar */}
            {item.progress !== undefined && (
              <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${item.progressColor} h-2 rounded-full transition-all duration-500 ease-out shadow-sm`}
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            )}

            {/* Decorative element */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      ))}
    </div>
  )
}