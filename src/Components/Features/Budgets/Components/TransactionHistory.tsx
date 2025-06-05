"use client"

import { useState } from "react"
import { Search, ArrowDownCircle, Calendar } from "lucide-react"
import { formatCurrency } from "../utils/budgest-utils"
import { categoryList } from "../utils/category-config"
import type { Transaction, BudgetCategory } from "../types/budget-types"

interface TransactionHistoryProps {
  transactions: Transaction[]
  categories: BudgetCategory[]
}

export default function TransactionHistory({ transactions, categories }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string | "all">("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const category = categories.find((c) => c.id === transaction.categoryId)
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category && category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "all" || transaction.categoryId === filterCategory

    return matchesSearch && matchesCategory
  })

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Historial de Transacciones</h2>
          <p className="text-gray-400">Revisa tus gastos recientes por categoría</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar transacciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#020817] border border-white/40 text-white pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6]"
          />
        </div>
        <div className="relative md:w-64">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full bg-[#020817] border border-white/40 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6] appearance-none"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ArrowDownCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length > 0 ? (
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => {
            const category = categories.find((c) => c.id === transaction.categoryId)
            const categoryConfig = category
              ? categoryList.find((c) => c.id === category.categoryType) || categoryList[categoryList.length - 1]
              : categoryList[categoryList.length - 1]

            return (
              <div
                key={transaction.id}
                className="bg-[#020817] border border-white/40 rounded-xl p-4 flex items-center"
              >
                <div className={`w-10 h-10 ${categoryConfig.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                  <div className={categoryConfig.textColor}>{categoryConfig.icon}</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-white font-medium">{transaction.description}</h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span>{category?.name || "Sin categoría"}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{formatCurrency(transaction.amount)}</p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#020817] border border-white/40 rounded-xl">
          <p className="text-gray-400">No se encontraron transacciones.</p>
        </div>
      )}
    </div>
  )
}
