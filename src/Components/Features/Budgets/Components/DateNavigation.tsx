"use client"

import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface DateNavigationProps {
  currentDate: Date
  onNavigate: (direction: "prev" | "next") => void
  onNewBudget: () => void
}

export default function DateNavigation({ currentDate, onNavigate, onNewBudget }: DateNavigationProps) {
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" })
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigate("prev")}
          className="bg-[#020817] border border-[#2A3441] hover:bg-[#243041] p-2 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="bg-[#020817] border border-[#2A3441] px-6 py-2 rounded-lg">
          <span className="text-lg font-medium">{formatMonth(currentDate)}</span>
        </div>
        <button
          onClick={() => onNavigate("next")}
          className="bg-[#020817] border border-[#2A3441] hover:bg-[#243041] p-2 rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={onNewBudget}
        className="bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-lg transition-colors flex items-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Nuevo Presupuesto
      </button>
    </div>
  )
}
