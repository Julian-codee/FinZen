"use client"

import { useState, useEffect } from "react"
import type { BudgetCategory } from "../types/budget-types"

interface DistributionSectionProps {
  categories: BudgetCategory[]
}

export default function DistributionSection({ categories }: DistributionSectionProps) {
  const [viewMode, setViewMode] = useState<"budget" | "spent">("budget")
  const [animationProgress, setAnimationProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Colores para las categorías
  const categoryColors = {
    vivienda: "#3B82F6",
    comida: "#10B981",
    supermercado: "#F59E0B",
    servicios: "#EF4444",
    transporte: "#8B5CF6",
    entretenimiento: "#EC4899",
    salud: "#06B6D4",
    cafe: "#F97316",
    restaurante: "#84CC16",
    internet: "#6366F1",
    telefono: "#A855F7",
    educacion: "#14B8A6",
    ocio: "#F43F5E",
    musica: "#8B5CF6",
    otros: "#6B7280",
  }

  // Calcular el total para los porcentajes
  const total = categories.reduce((sum, cat) => sum + (viewMode === "budget" ? cat.budget : cat.spent), 0)

  // Crear los datos para el gráfico
  const chartData = categories
    .filter((cat) => (viewMode === "budget" ? cat.budget : cat.spent) > 0)
    .map((cat) => {
      const value = viewMode === "budget" ? cat.budget : cat.spent
      const percentage = total > 0 ? (value / total) * 100 : 0
      const color = categoryColors[cat.categoryType as keyof typeof categoryColors] || categoryColors.otros

      return {
        ...cat,
        value,
        percentage,
        color,
        startAngle: 0,
        endAngle: 0,
      }
    })

  // Calcular ángulos para cada segmento
  let currentAngle = 0
  chartData.forEach((item) => {
    item.startAngle = currentAngle
    item.endAngle = currentAngle + (item.percentage / 100) * 360
    currentAngle = item.endAngle
  })

  // Animación cuando cambia el modo de vista o se cargan datos
  useEffect(() => {
    setIsAnimating(true)
    setAnimationProgress(0)

    const duration = 1000 // 1 segundo
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Función de easing (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setAnimationProgress(easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(animate)
  }, [viewMode, categories])

  // Función para crear el path del arco SVG con animación
  const createArcPath = (
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    innerRadius = 0,
    progress = 1,
  ) => {
    // Aplicar progreso de animación
    const animatedEndAngle = startAngle + (endAngle - startAngle) * progress

    const start = polarToCartesian(centerX, centerY, radius, animatedEndAngle)
    const end = polarToCartesian(centerX, centerY, radius, startAngle)
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, animatedEndAngle)
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle)

    const largeArcFlag = animatedEndAngle - startAngle <= 180 ? "0" : "1"

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      innerEnd.x,
      innerEnd.y,
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      "Z",
    ].join(" ")
  }

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold mb-2">No hay datos para mostrar</h3>
        <p className="text-gray-400">Crea un presupuesto para ver la distribución</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Distribución del Presupuesto</h2>
          <p className="text-gray-400">Visualiza cómo se distribuye tu presupuesto por categoría</p>
        </div>
        <div className="flex bg-[#1A2332] border border-[#2A3441] rounded-lg p-1">
          <button
            onClick={() => setViewMode("budget")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              viewMode === "budget" ? "bg-[#3B82F6] text-white transform scale-105" : "text-gray-400 hover:text-white"
            }`}
          >
            Presupuesto
          </button>
          <button
            onClick={() => setViewMode("spent")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              viewMode === "spent" ? "bg-[#3B82F6] text-white transform scale-105" : "text-gray-400 hover:text-white"
            }`}
          >
            Gastado
          </button>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <svg width="300" height="300" className="mb-6">
            {/* Círculo de fondo para mostrar el progreso */}
            <circle cx="150" cy="150" r="90" fill="none" stroke="#374151" strokeWidth="60" opacity="0.3" />

            {chartData.map((item) => (
              <g key={`${item.id}-${viewMode}`}>
                <path
                  d={createArcPath(150, 150, 120, item.startAngle, item.endAngle, 60, animationProgress)}
                  fill={item.color}
                  className="hover:brightness-110 transition-all duration-300 cursor-pointer hover:drop-shadow-lg"
                  style={{
                    filter: `drop-shadow(0 0 ${isAnimating ? 8 : 4}px ${item.color}40)`,
                    transform: "scale(1)",
                    transformOrigin: "150px 150px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                />

                {/* Texto del porcentaje en el centro de cada segmento */}
                {animationProgress > 0.8 && item.percentage > 5 && (
                  <text
                    x={150 + 90 * Math.cos((((item.startAngle + item.endAngle) / 2 - 90) * Math.PI) / 180)}
                    y={150 + 90 * Math.sin((((item.startAngle + item.endAngle) / 2 - 90) * Math.PI) / 180)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-bold fill-white"
                    style={{
                      opacity: animationProgress,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    {item.percentage.toFixed(0)}%
                  </text>
                )}
              </g>
            ))}

            {/* Texto central animado */}
            <text
              x="150"
              y="140"
              textAnchor="middle"
              className="text-lg font-bold fill-white"
              style={{
                opacity: animationProgress,
                transform: `scale(${0.5 + animationProgress * 0.5})`,
                transformOrigin: "150px 140px",
              }}
            >
              Total
            </text>
            <text
              x="150"
              y="160"
              textAnchor="middle"
              className="text-sm fill-gray-400"
              style={{
                opacity: animationProgress,
                transform: `scale(${0.5 + animationProgress * 0.5})`,
                transformOrigin: "150px 160px",
              }}
            >
              {formatCurrency(total * animationProgress)}
            </text>
          </svg>
        </div>

        {/* Legend con animación */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 transition-all duration-300 hover:scale-110"
              style={{
                opacity: animationProgress,
                transform: `translateY(${(1 - animationProgress) * 20}px)`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 ${animationProgress * 8}px ${item.color}60`,
                }}
              />
              <span className="text-sm text-gray-300">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Details Grid con animación escalonada */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="bg-[#1A2332] border border-[#2A3441] rounded-xl p-4 transition-all duration-500 hover:scale-105 hover:border-[#3B82F6]"
            style={{
              opacity: animationProgress,
              transform: `translateY(${(1 - animationProgress) * 30}px)`,
              transitionDelay: `${index * 150}ms`,
            }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div
                className="w-4 h-4 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 ${animationProgress * 6}px ${item.color}60`,
                }}
              />
              <h3 className="font-semibold text-white">{item.name}</h3>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(item.value * animationProgress)}</div>
            <div className="text-sm text-gray-400">{(item.percentage * animationProgress).toFixed(1)}% del total</div>
          </div>
        ))}
      </div>

      {/* Summary con animación */}
      <div
        className="mt-8 bg-[#1A2332] border border-[#2A3441] rounded-xl p-6 transition-all duration-700"
        style={{
          opacity: animationProgress,
          transform: `translateY(${(1 - animationProgress) * 40}px)`,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(total * animationProgress)}</div>
            <div className="text-gray-400">Total {viewMode === "budget" ? "Presupuestado" : "Gastado"}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">{Math.round(chartData.length * animationProgress)}</div>
            <div className="text-gray-400">Categorías Activas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(
                (categories.reduce((sum, cat) => sum + cat.budget, 0) -
                  categories.reduce((sum, cat) => sum + cat.spent, 0)) *
                  animationProgress,
              )}
            </div>
            <div className="text-gray-400">Disponible Total</div>
          </div>
        </div>
      </div>
    </div>
  )
}
