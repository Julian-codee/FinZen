"use client"

import { useState, useEffect } from "react"
import { Share2 } from "lucide-react"
import DateNavigation from "./Components/DateNavigation"
import SummaryCards from "./Components/SummaryCards"
import TabNavigation from "./Components/TabsNavigation"
import CategoriesSection from "./Components/CategoriesSection"
import DistributionSection from "./Components/DistributionSection"
import HistorySection from "./Components/HistorySection"
import AddBudgetDialog from "./Components/AddBudgetDialog"
import type { BudgetCategory } from "./types/budget-types"

export default function BudgetDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("categorias")
  const [categories, setCategories] = useState<BudgetCategory[]>([])
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)

  // Persistencia local
  useEffect(() => {
    const saved = localStorage.getItem("categories")
    if (saved) setCategories(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  const navigateMonth = (dir: "prev" | "next") => {
    setCurrentDate(prev => {
      const d = new Date(prev)
      d.setMonth(d.getMonth() + (dir === "prev" ? -1 : 1))
      return d
    })
  }

  const handleAddCategory = (newCat: Omit<BudgetCategory, "id" | "spent">) => {
    setCategories([...categories, { ...newCat, id: Date.now().toString(), spent: 0 }])
  }

  const handleDeleteCategory = (id: string) =>
    setCategories(categories.filter(c => c.id !== id))

  const handleUpdateBudget = (id: string, budget: number) =>
    setCategories(categories.map(c => c.id === id ? { ...c, budget } : c))

  const handleRegisterExpense = (id: string, amt: number) =>
    setCategories(categories.map(c => c.id === id ? { ...c, spent: c.spent + amt } : c))

  const handleAddBudget = (data: {
    totalBudget: number
    categories: { name: string; budget: number; categoryType: string }[]
  }) => {
    const count = data.categories.length
    const perCat = count > 0 ? data.totalBudget / count : 0
    const newCats: BudgetCategory[] = data.categories.map((c, i) => ({
      id: (Date.now() + i).toString(),
      name: c.name,
      categoryType: c.categoryType,
      budget: perCat,
      spent: 0,
    }))
    const filtered = newCats.filter(nc =>
      !categories.some(ec =>
        ec.name.toLowerCase() === nc.name.toLowerCase() &&
        ec.categoryType === nc.categoryType
      ))
    setCategories([...categories, ...filtered])
  }

  const renderTab = () => {
    if (activeTab === "categorias")
      return <CategoriesSection categories={categories} onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onUpdateBudget={handleUpdateBudget}
        onRegisterExpense={handleRegisterExpense} />
    if (activeTab === "distribucion") return <DistributionSection categories={categories} />
    if (activeTab === "historial") return <HistorySection categories={categories} />
    return null
  }

  const emptyState = (
    <div className="text-center py-16 bg-[#020817] border border-[#2A3441] rounded-xl">
      <h3 className="text-xl font-semibold mb-2">No hay presupuestos creados</h3>
      <p className="text-gray-400 mb-6">Comienza creando tu primer presupuesto</p>
      <button onClick={() => setIsAddBudgetOpen(true)}
        className="bg-[#3B82F6] hover:bg-[#2563EB] px-6 py-2 rounded-lg">
        Crear Presupuesto
      </button>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#020817] text-white">
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Presupuesto</h1>
              <p className="text-gray-400 text-lg">Gestiona tus presupuestos mensuales y controla tus gastos por categoría.</p>
            </div>
            <button className="bg-transparent border border-gray-600 hover:bg-gray-800 p-2 rounded-lg">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <DateNavigation currentDate={currentDate} onNavigate={navigateMonth}
            onNewBudget={() => setIsAddBudgetOpen(true)} />

          {categories.length > 0 && <SummaryCards categories={categories} />}
          {categories.length > 0 && <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />}

          {categories.length === 0 ? emptyState : renderTab()}

          <AddBudgetDialog isOpen={isAddBudgetOpen} onClose={() => setIsAddBudgetOpen(false)}
            onAddBudget={handleAddBudget} accounts={[]} />
        </div>
      </div>
    </div>
  )
}
