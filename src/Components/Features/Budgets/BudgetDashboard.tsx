"use client"
import { useState } from "react"
import { Share2 } from "lucide-react"
import DateNavigation from "./Components/DateNavigation"
import SummaryCards from "./Components/SummaryCards"
import TabNavigation from "./Components/TabsNavigation"
import CategoriesSection from "./Components/CategoriesSection"
import DistributionSection from "./Components/DistributionSection"
import HistorySection from "./Components/HistorySection"
import AddBudgetDialog from "./Components/AddBudgetDialog"
import type { BudgetCategory } from "./types/budget-types"
import { Sidebar } from "../../Ui/UiDashBoard/SideBar"

export default function BudgetDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("categorias")
  const [categories, setCategories] = useState<BudgetCategory[]>([])
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleAddCategory = (newCategory: Omit<BudgetCategory, "id" | "spent">) => {
    const category: BudgetCategory = {
      ...newCategory,
      id: Date.now().toString(),
      spent: 0,
    }
    setCategories([...categories, category])
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const handleUpdateBudget = (id: string, newBudget: number) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, budget: newBudget } : cat)))
  }

  const handleRegisterExpense = (id: string, amount: number) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, spent: cat.spent + amount } : cat)))
  }

  const handleAddBudget = (budgetData: {
    totalBudget: number
    categories: Array<{ name: string; budget: number; categoryType: string }>
  }) => {
    const categoryCount = budgetData.categories.length
    const budgetPerCategory = categoryCount > 0 ? budgetData.totalBudget / categoryCount : 0

    const newCategories: BudgetCategory[] = budgetData.categories.map((cat, index) => ({
      id: (Date.now() + index).toString(),
      name: cat.name,
      spent: 0,
      budget: budgetPerCategory,
      categoryType: cat.categoryType,
    }))

    const filteredNewCategories = newCategories.filter(
      (newCat) =>
        !categories.some(
          (existingCat) =>
            existingCat.name.toLowerCase() === newCat.name.toLowerCase() &&
            existingCat.categoryType === newCat.categoryType,
        ),
    )

    setCategories([...categories, ...filteredNewCategories])
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "categorias":
        return (
          <CategoriesSection
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onUpdateBudget={handleUpdateBudget}
            onRegisterExpense={handleRegisterExpense}
          />
        )
      case "distribucion":
        return <DistributionSection categories={categories} />
      case "historial":
        return <HistorySection categories={categories} />
      default:
        return null
    }
  }

  const renderEmptyState = () => {
    if (categories.length === 0) {
      return (
        <div className="text-center py-16 bg-[#020817] border border-[#2A3441] rounded-xl">
          <h3 className="text-xl font-semibold mb-2">No hay presupuestos creados</h3>
          <p className="text-gray-400 mb-6">Comienza creando tu primer presupuesto</p>
          <button
            onClick={() => setIsAddBudgetOpen(true)}
            className="bg-[#3B82F6] hover:bg-[#2563EB] px-6 py-2 rounded-lg transition-colors"
          >
            Crear Presupuesto
          </button>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex min-h-screen bg-[#020817] text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <div
        className={`
          flex-1 p-6 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "ml-64" : "ml-20"}
        `}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Presupuesto</h1>
              <p className="text-gray-400 text-lg">
                Gestiona tus presupuestos mensuales y controla tus gastos por categoría.
              </p>
            </div>
            <button className="bg-transparent border border-gray-600 hover:bg-gray-800 p-2 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Navegación por mes */}
          <DateNavigation
            currentDate={currentDate}
            onNavigate={navigateMonth}
            onNewBudget={() => setIsAddBudgetOpen(true)}
          />

          {/* Resumen y Tabs */}
          {categories.length > 0 && <SummaryCards categories={categories} />}
          {categories.length > 0 && <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />}

          {/* Contenido principal o estado vacío */}
          {categories.length === 0 ? renderEmptyState() : renderTabContent()}

          {/* Diálogo para nuevo presupuesto */}
          <AddBudgetDialog
            isOpen={isAddBudgetOpen}
            onClose={() => setIsAddBudgetOpen(false)}
            onAddBudget={handleAddBudget}
          />
        </div>
      </div>
    </div>
  )
}
