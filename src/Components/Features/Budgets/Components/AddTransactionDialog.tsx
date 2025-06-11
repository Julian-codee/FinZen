"use client"

import React, { useState } from "react"
import { X } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: React.ReactElement
  bgColor: string
  textColor: string
}

interface AddTransactionDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (amount: number, description: string, categoryId: string) => void
  categories: Category[]
}

export default function AddTransactionDialog({ isOpen, onClose, onSubmit, categories }: AddTransactionDialogProps) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const handleSubmit = () => {
    const amountValue = Number.parseFloat(amount)
    if (!isNaN(amountValue) && amountValue > 0 && description.trim() && selectedCategory) {
      onSubmit(amountValue, description.trim(), selectedCategory)
      setAmount("")
      setDescription("")
      setSelectedCategory("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#020817] border border-white/40 rounded-xl p-5 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Registrar Gasto</h2>
            <p className="text-gray-400 text-sm">
              Selecciona una categoría
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="transaction-amount" className="block text-sm font-medium text-gray-300 mb-2">
            Monto
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
            <input
              id="transaction-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#020817] border border-white/40 text-white pl-7 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <label htmlFor="transaction-description" className="block text-sm font-medium text-gray-300 mb-2">
            Descripción
          </label>
          <input
            id="transaction-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#020817] border border-white/40 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ej: Compra en supermercado"
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label htmlFor="transaction-category" className="block text-sm font-medium text-gray-300 mb-2">
            Categoría
          </label>
          <select
            id="transaction-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#020817] border border-white/40 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[#475569] hover:bg-[#64748B] text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!amount || !description.trim() || !selectedCategory}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  )
}
