"use client"

import React, { useState } from "react"
import { Menu } from "lucide-react"
import { Sidebar } from "../../Ui/UiDashBoard/SideBar"
import TransactionsHeader from "./Components/TransactionsHeader"
import SummaryCards from "./Components/SumaryCards"
import TransactionFilters from "./Components/TransactionFilters"
import TransactionTable from "./Components/TransactionTable"
import { transactionsSummary, transactionsData } from "./Data/TransactionData"

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Todas")
  const [dateRange, setDateRange] = useState<string>("1 de junio de 2025 - 9 de junio de 2025")
  const [sortBy, setSortBy] = useState<string>("Más recientes")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <div className="flex min-h-screen bg-[#0D1119] text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold">Transacciones</h1>
        </div>

        <TransactionsHeader />

        <SummaryCards data={transactionsSummary} />

        <TransactionFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <TransactionTable data={transactionsData} activeTab={activeTab} />
      </div>
    </div>
  )
}

export default Transactions
