"use client"

import { useState, useEffect } from "react"
import { Calendar, TrendingUp, TrendingDown, Search, Download } from "lucide-react"
import type { BudgetCategory } from "../types/budget-types"

interface HistoryEntry {
  id: string
  date: string
  month: string
  year: number
  totalBudget: number
  totalSpent: number
  categories: BudgetCategory[]
  status: "completed" | "in-progress" | "exceeded"
}

interface HistorySectionProps {
  categories: BudgetCategory[]
}

export default function HistorySection({ categories }: HistorySectionProps) {
  const [animationProgress, setAnimationProgress] = useState(0)
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Datos de ejemplo para el historial
  const historyData: HistoryEntry[] = [
    {
      id: "1",
      date: "2024-01-01",
      month: "Enero 2024",
      year: 2024,
      totalBudget: 2500000,
      totalSpent: 2200000,
      categories: [
        { id: "1", name: "Vivienda", budget: 800000, spent: 750000, categoryType: "vivienda" },
        { id: "2", name: "Comida", budget: 600000, spent: 580000, categoryType: "comida" },
        { id: "3", name: "Transporte", budget: 400000, spent: 420000, categoryType: "transporte" },
        { id: "4", name: "Entretenimiento", budget: 300000, spent: 250000, categoryType: "entretenimiento" },
        { id: "5", name: "Salud", budget: 400000, spent: 200000, categoryType: "salud" },
      ],
      status: "completed",
    },
    {
      id: "2",
      date: "2024-02-01",
      month: "Febrero 2024",
      year: 2024,
      totalBudget: 2600000,
      totalSpent: 2750000,
      categories: [
        { id: "1", name: "Vivienda", budget: 800000, spent: 800000, categoryType: "vivienda" },
        { id: "2", name: "Comida", budget: 650000, spent: 720000, categoryType: "comida" },
        { id: "3", name: "Transporte", budget: 450000, spent: 480000, categoryType: "transporte" },
        { id: "4", name: "Entretenimiento", budget: 350000, spent: 400000, categoryType: "entretenimiento" },
        { id: "5", name: "Salud", budget: 350000, spent: 350000, categoryType: "salud" },
      ],
      status: "exceeded",
    },
    {
      id: "3",
      date: "2024-03-01",
      month: "Marzo 2024",
      year: 2024,
      totalBudget: 2400000,
      totalSpent: 2100000,
      categories: [
        { id: "1", name: "Vivienda", budget: 750000, spent: 750000, categoryType: "vivienda" },
        { id: "2", name: "Comida", budget: 550000, spent: 480000, categoryType: "comida" },
        { id: "3", name: "Transporte", budget: 400000, spent: 350000, categoryType: "transporte" },
        { id: "4", name: "Entretenimiento", budget: 300000, spent: 220000, categoryType: "entretenimiento" },
        { id: "5", name: "Salud", budget: 400000, spent: 300000, categoryType: "salud" },
      ],
      status: "completed",
    },
    {
      id: "4",
      date: "2024-04-01",
      month: "Abril 2024",
      year: 2024,
      totalBudget: 2700000,
      totalSpent: 2650000,
      categories: [
        { id: "1", name: "Vivienda", budget: 850000, spent: 850000, categoryType: "vivienda" },
        { id: "2", name: "Comida", budget: 600000, spent: 590000, categoryType: "comida" },
        { id: "3", name: "Transporte", budget: 500000, spent: 480000, categoryType: "transporte" },
        { id: "4", name: "Entretenimiento", budget: 400000, spent: 380000, categoryType: "entretenimiento" },
        { id: "5", name: "Salud", budget: 350000, spent: 350000, categoryType: "salud" },
      ],
      status: "completed",
    },
    {
      id: "5",
      date: "2024-05-01",
      month: "Mayo 2024",
      year: 2024,
      totalBudget: 2800000,
      totalSpent: 2600000,
      categories: [
        { id: "1", name: "Vivienda", budget: 900000, spent: 900000, categoryType: "vivienda" },
        { id: "2", name: "Comida", budget: 650000, spent: 600000, categoryType: "comida" },
        { id: "3", name: "Transporte", budget: 500000, spent: 450000, categoryType: "transporte" },
        { id: "4", name: "Entretenimiento", budget: 400000, spent: 350000, categoryType: "entretenimiento" },
        { id: "5", name: "Salud", budget: 350000, spent: 300000, categoryType: "salud" },
      ],
      status: "completed",
    },
    {
      id: "6",
      date: "2024-06-01",
      month: "Junio 2024",
      year: 2024,
      totalBudget: 2900000,
      totalSpent: 1800000,
      categories:
        categories.length > 0
          ? categories
          : [
              { id: "1", name: "Vivienda", budget: 950000, spent: 600000, categoryType: "vivienda" },
              { id: "2", name: "Comida", budget: 700000, spent: 450000, categoryType: "comida" },
              { id: "3", name: "Transporte", budget: 550000, spent: 350000, categoryType: "transporte" },
              { id: "4", name: "Entretenimiento", budget: 400000, spent: 200000, categoryType: "entretenimiento" },
              { id: "5", name: "Salud", budget: 300000, spent: 200000, categoryType: "salud" },
            ],
      status: "in-progress",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Filtrar datos según el período seleccionado
  const getFilteredData = () => {
    const now = new Date()
    let filteredData = historyData

    switch (selectedPeriod) {
      case "3months":
        filteredData = historyData.slice(-3)
        break
      case "6months":
        filteredData = historyData.slice(-6)
        break
      case "1year":
        filteredData = historyData
        break
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filteredData = filteredData.filter((entry) => entry.month.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filtrar por estado
    if (filterStatus !== "all") {
      filteredData = filteredData.filter((entry) => entry.status === filterStatus)
    }

    return filteredData
  }

  const chartData = getFilteredData()

  // Animación
  useEffect(() => {
    setAnimationProgress(0)
    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setAnimationProgress(easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [selectedPeriod, searchTerm, filterStatus])

  // Calcular el máximo para escalar las barras
  const maxValue = Math.max(...chartData.map((entry) => Math.max(entry.totalBudget, entry.totalSpent)))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "exceeded":
        return "text-red-400"
      case "in-progress":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "exceeded":
        return "Excedido"
      case "in-progress":
        return "En Progreso"
      default:
        return "Desconocido"
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Historial de Presupuestos</h2>
          <p className="text-gray-400">Revisa el rendimiento de tus presupuestos anteriores</p>
        </div>
        <button className="bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-lg transition-colors flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex bg-[#1A2332] border border-[#2A3441] rounded-lg p-1">
          <button
            onClick={() => setSelectedPeriod("3months")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              selectedPeriod === "3months" ? "bg-[#3B82F6] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            3 Meses
          </button>
          <button
            onClick={() => setSelectedPeriod("6months")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              selectedPeriod === "6months" ? "bg-[#3B82F6] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            6 Meses
          </button>
          <button
            onClick={() => setSelectedPeriod("1year")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              selectedPeriod === "1year" ? "bg-[#3B82F6] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            1 Año
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por mes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1A2332] border border-[#2A3441] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6] w-64"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#1A2332] border border-[#2A3441] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6]"
        >
          <option value="all">Todos los estados</option>
          <option value="completed">Completados</option>
          <option value="exceeded">Excedidos</option>
          <option value="in-progress">En Progreso</option>
        </select>
      </div>

      {/* Bar Chart */}
      <div className="bg-[#1A2332] border border-[#2A3441] rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-6">Presupuesto vs Gastado</h3>
        <div className="relative h-80">
          <svg width="100%" height="100%" className="overflow-visible">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <g key={index}>
                <line
                  x1="60"
                  y1={320 - ratio * 280}
                  x2="100%"
                  y2={320 - ratio * 280}
                  stroke="#374151"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <text x="50" y={325 - ratio * 280} textAnchor="end" className="text-xs fill-gray-400">
                  {formatCurrency(maxValue * ratio)}
                </text>
              </g>
            ))}

            {/* Bars */}
            {chartData.map((entry, index) => {
              const barWidth = 40
              const barSpacing = 80
              const x = 80 + index * barSpacing
              const budgetHeight = (entry.totalBudget / maxValue) * 280 * animationProgress
              const spentHeight = (entry.totalSpent / maxValue) * 280 * animationProgress

              return (
                <g key={entry.id}>
                  {/* Budget bar */}
                  <rect
                    x={x}
                    y={320 - budgetHeight}
                    width={barWidth / 2}
                    height={budgetHeight}
                    fill="#3B82F6"
                    className="transition-all duration-300 hover:brightness-110"
                    style={{
                      filter: "drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))",
                    }}
                  />

                  {/* Spent bar */}
                  <rect
                    x={x + barWidth / 2 + 2}
                    y={320 - spentHeight}
                    width={barWidth / 2}
                    height={spentHeight}
                    fill={entry.totalSpent > entry.totalBudget ? "#EF4444" : "#10B981"}
                    className="transition-all duration-300 hover:brightness-110"
                    style={{
                      filter: `drop-shadow(0 4px 8px ${entry.totalSpent > entry.totalBudget ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"})`,
                    }}
                  />

                  {/* Month label */}
                  <text
                    x={x + barWidth / 2}
                    y={340}
                    textAnchor="middle"
                    className="text-xs fill-gray-400"
                    style={{
                      opacity: animationProgress,
                    }}
                  >
                    {entry.month.split(" ")[0]}
                  </text>

                  {/* Values on hover */}
                  <g className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <rect
                      x={x - 20}
                      y={280 - Math.max(budgetHeight, spentHeight) - 40}
                      width={barWidth + 40}
                      height="35"
                      fill="#020817"
                      stroke="#2A3441"
                      rx="4"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={280 - Math.max(budgetHeight, spentHeight) - 25}
                      textAnchor="middle"
                      className="text-xs fill-white font-medium"
                    >
                      {formatCurrency(entry.totalBudget)}
                    </text>
                    <text
                      x={x + barWidth / 2}
                      y={280 - Math.max(budgetHeight, spentHeight) - 12}
                      textAnchor="middle"
                      className="text-xs fill-gray-400"
                    >
                      {formatCurrency(entry.totalSpent)}
                    </text>
                  </g>
                </g>
              )
            })}
          </svg>

          {/* Legend */}
          <div className="absolute top-4 right-4 flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#3B82F6] rounded"></div>
              <span className="text-sm text-gray-400">Presupuesto</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#10B981] rounded"></div>
              <span className="text-sm text-gray-400">Gastado</span>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-[#1A2332] border border-[#2A3441] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Detalle del Historial</h3>
        <div className="space-y-4">
          {chartData.map((entry, index) => (
            <div
              key={entry.id}
              className="bg-[#020817] border border-[#2A3441] rounded-lg p-4 transition-all duration-500 hover:border-[#3B82F6]"
              style={{
                opacity: animationProgress,
                transform: `translateY(${(1 - animationProgress) * 20}px)`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-white">{entry.month}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-gray-400 text-sm flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(entry.date).toLocaleDateString("es-ES")}
                    </span>
                    <span className={`text-sm font-medium ${getStatusColor(entry.status)}`}>
                      {getStatusText(entry.status)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    {formatCurrency(entry.totalSpent)} / {formatCurrency(entry.totalBudget)}
                  </div>
                  <div className="flex items-center justify-end space-x-1">
                    {entry.totalSpent <= entry.totalBudget ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={`text-sm ${entry.totalSpent <= entry.totalBudget ? "text-green-400" : "text-red-400"}`}
                    >
                      {((entry.totalSpent / entry.totalBudget) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#374151] rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    entry.totalSpent > entry.totalBudget ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min((entry.totalSpent / entry.totalBudget) * 100 * animationProgress, 100)}%`,
                    transitionDelay: `${index * 200}ms`,
                  }}
                />
              </div>

              {/* Categories summary */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {entry.categories.slice(0, 5).map((category, catIndex) => (
                  <div key={catIndex} className="text-center">
                    <div className="text-xs text-gray-400">{category.name}</div>
                    <div className="text-sm font-medium text-white">{formatCurrency(category.spent)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {chartData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No se encontraron registros con los filtros aplicados</p>
          </div>
        )}
      </div>
    </div>
  )
}
