"use client"

import { useEffect, useRef } from "react"
import type { BudgetCategory } from "../types/budget-types"
import { categoryList } from "../utils/category-config"
import { formatCurrency } from "../utils/budgest-utils"

interface DistributionChartProps {
  categories: BudgetCategory[]
}

export default function DistributionChart({ categories }: DistributionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || categories.length === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0)
    if (totalBudget === 0) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set up dimensions
    const centerX = canvasRef.current.width / 2
    const centerY = canvasRef.current.height / 2
    const radius = Math.min(centerX, centerY) - 40

    let startAngle = 0

    // Draw pie slices
    categories.forEach((category) => {
      if (category.budget <= 0) return

      const slice = category.budget / totalBudget
      const endAngle = startAngle + slice * 2 * Math.PI

      // Find category config
      const categoryConfig = categoryList.find((c) => String(c.id) === String(category.categoryType))

      // Get color from category config or use default
      let color = "#3B82F6"
      if (categoryConfig) {
        const bgColor = categoryConfig.bgColor.replace("bg-[", "").replace("]", "")
        color = bgColor
      }

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()

      // Prepare for next slice
      startAngle = endAngle
    })

    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
    ctx.fillStyle = "#020817"
    ctx.fill()

    // Draw total in center
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Total", centerX, centerY - 10)
    ctx.fillText(formatCurrency(totalBudget), centerX, centerY + 15)
  }, [categories])

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md aspect-square relative">
        <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
        {categories
          .filter((cat) => cat.budget > 0)
          .map((category) => {
            const categoryConfig =
              categoryList.find((c) => String(c.id) === String(category.categoryType)) || categoryList[categoryList.length - 1]
            const percentage =
              categories.reduce((sum, cat) => sum + cat.budget, 0) > 0
                ? ((category.budget / categories.reduce((sum, cat) => sum + cat.budget, 0)) * 100).toFixed(1)
                : "0.0"

            return (
              <div key={category.id} className="flex items-center space-x-2">
                <div className={`w-4 h-4 ${categoryConfig.bgColor} rounded-full`}></div>
                <div className="flex-grow">
                  <p className="text-sm text-white">{category.name}</p>
                  <p className="text-xs text-gray-400">
                    {formatCurrency(category.budget)} ({percentage}%)
                  </p>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
