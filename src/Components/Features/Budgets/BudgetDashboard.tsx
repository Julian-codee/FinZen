"use client"

import { useState, useEffect } from "react"
import { Share2, Menu } from "lucide-react" // Import Menu icon
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // State for sidebar

  useEffect(() => {
    const saved = localStorage.getItem("categories")
    if (saved) setCategories(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  // Function to toggle sidebar, similar to FinZenHome
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  const navigateMonth = (dir: "prev" | "next") => {
    setCurrentDate(prev => {
      const d = new Date(prev)
      d.setMonth(d.getMonth() + (dir === "prev" ? -1 : 1))
      return d
    })
  }

  const handleAddCategory = (newCat: Omit<BudgetCategory, "id" | "spent">) => {
    setCategories(prev => [...prev, { ...newCat, id: Date.now().toString(), spent: 0 }])
  }

  const handleDeleteCategory = (id: string) =>
    setCategories(prev => prev.filter(c => c.id !== id))

  const handleUpdateBudget = (id: string, budget: number) =>
    setCategories(prev => prev.map(c => c.id === id ? { ...c, budget } : c))

  const handleRegisterExpense = (id: string, amt: number) =>
    setCategories(prev => prev.map(c => c.id === id ? { ...c, spent: c.spent + amt } : c))

  const handleAddBudget = (data: {
    totalBudget: number
    categories: { name: string; budget: number; categoryType: string }[]
  }) => {
    const count = data.categories.length
    const perCat = count > 0 ? data.totalBudget / count : 0
    const newCats = data.categories.map((c, i) => ({
      id: Date.now().toString() + "-" + i,
      name: c.name,
      categoryType: c.categoryType,
      budget: perCat,
      spent: 0,
    }))
    setCategories(prev =>
      [...prev, ...newCats].filter((nc, i, arr) =>
        arr.findIndex(x =>
          x.name.toLowerCase() === nc.name.toLowerCase() &&
          x.categoryType === nc.categoryType) === i)
    )
  }

  const renderTabContent = () => {
    if (activeTab === "categorias")
      return (
        <CategoriesSection
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onUpdateBudget={handleUpdateBudget}
          onRegisterExpense={handleRegisterExpense}
        />
      )
    if (activeTab === "distribucion") return <DistributionSection categories={categories} />
    if (activeTab === "historial") return <HistorySection categories={categories} />
    return null
  }

  const renderEmptyState = (
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

  return (
    <div className="flex min-h-screen bg-[#020817] text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <main className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ${ // Added sm:p-6 and lg:p-8 for consistent padding
        isSidebarOpen ? "lg:ml-64" : "lg:ml-20" // Responsive margin-left
      } ml-0`}> {/* Set ml-0 for small screens by default */}
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              {/* Button to toggle sidebar, visible on smaller screens */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors lg:hidden" // Only visible on lg screens and below
                aria-label="Abrir menú de navegación"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="hidden lg:block text-3xl font-bold text-white mb-2">Presupuesto</h1> {/* Hidden on small screens, shown on lg */}
                <h1 className="lg:hidden text-2xl font-bold text-center flex-grow">Presupuesto</h1> {/* Shown on small screens, hidden on lg */}
                <p className="text-gray-400 text-lg">
                  Gestiona tus presupuestos mensuales y controla tus gastos por categoría.
                </p>
              </div>
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

          {/* Contenido principal */}
          {categories.length === 0 ? renderEmptyState : renderTabContent()}

          {/* Diálogo para nuevo presupuesto */}
          {/* Si luego necesitas cuentas, pásalas aquí */}
          <AddBudgetDialog
            isOpen={isAddBudgetOpen}
            onClose={() => setIsAddBudgetOpen(false)}
            onAddBudget={handleAddBudget}
            accounts={[]}
          />
        </div>
      </main>
    </div>
  )
}