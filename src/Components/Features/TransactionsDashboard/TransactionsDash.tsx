"use client"

import React, { useState, useMemo, useCallback } from "react"
import { Menu } from "lucide-react"
import {
  isWithinInterval,
  subDays,
  startOfMonth,
  endOfMonth,
  parseISO,
} from "date-fns"

import { Sidebar } from "../../Ui/UiDashBoard/SideBar"
import TransactionsHeader from "./Components/TransactionsHeader"
import SummaryCards from "./Components/SumaryCards"
import TransactionFilters from "./Components/TransactionFilters"
import TransactionTable from "./Components/TransactionTable"
import { Transaction } from "./Types/types"

export const Transactions: React.FC = () => {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])
  const [activeTab, setActiveTab] = useState<'Todas' | 'Gastos' | 'Ingresos'>('Todas')
  const [dateRange, setDateRange] = useState<'Hoy' | 'Últimos 7 días' | 'Últimos 30 días' | 'Este mes' | 'Personalizado'>('Este mes')
  const [sortBy, setSortBy] = useState<'Más recientes' | 'Más antiguos' | 'Mayor importe' | 'Menor importe'>('Más recientes')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...allTransactions]

    if (activeTab === 'Gastos') {
      filtered = filtered.filter(t => t.type === 'expense')
    } else if (activeTab === 'Ingresos') {
      filtered = filtered.filter(t => t.type === 'income')
    }

    const today = new Date()
    let startDate: Date | null = null
    let endDate: Date | null = null

    switch (dateRange) {
      case 'Hoy':
        startDate = new Date(today.setHours(0, 0, 0, 0))
        endDate = new Date(today.setHours(23, 59, 59, 999))
        break
      case 'Últimos 7 días':
        startDate = subDays(today, 6)
        endDate = today
        break
      case 'Últimos 30 días':
        startDate = subDays(today, 29)
        endDate = today
        break
      case 'Este mes':
        startDate = startOfMonth(today)
        endDate = endOfMonth(today)
        break
    }

    if (startDate && endDate) {
      filtered = filtered.filter(t =>
        isWithinInterval(parseISO(t.date + 'T00:00:00'), {
          start: startDate,
          end: endDate
        })
      )
    }

    filtered.sort((a, b) => {
      const dateA = parseISO(a.date).getTime()
      const dateB = parseISO(b.date).getTime()

      switch (sortBy) {
        case 'Más recientes': return dateB - dateA
        case 'Más antiguos': return dateA - dateB
        case 'Mayor importe': return b.amount - a.amount
        case 'Menor importe': return a.amount - b.amount
        default: return 0
      }
    })

    return filtered
  }, [allTransactions, activeTab, dateRange, sortBy])

  return (
    <div className="flex min-h-screen bg-[#020817] text-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 transition-all duration-300 ease-in-out
        p-4 sm:p-6 lg:p-8
        ml-0 lg:ml-20 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
        
        {/* Header móvil */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md border border-gray-600 hover:bg-gray-800 transition"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-center flex-grow">Transacciones</h1>
        </div>

        {/* Encabezado */}
        <TransactionsHeader />

        {/* Tarjetas resumen */}
        <SummaryCards transactions={filteredAndSortedTransactions} />

        {/* Filtros */}
        <TransactionFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Tabla */}
        <TransactionTable
          activeTab={activeTab}
          onTransactionsUpdate={setAllTransactions} // 👈 importante
        />
      </div>
    </div>
  )
}
