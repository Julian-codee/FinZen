"use client"
import { useState } from "react"
import { Share2 } from "lucide-react"
import DateNavigation from "./Components/DateNavigation"
import SummaryCards from "./Components/SummaryCards"
import TabNavigation from "./Components/TabsNavigation"
import CategoriesSection from "./Components/CategoriesSection"
import AddBudgetDialog from "./Components/AddBudgetDialog"
import type { BudgetCategory } from "./types/budget-types"
import { Sidebar } from "../../Ui/UiDashBoard/SideBar" // Asegúrate de que esta ruta sea correcta

export default function BudgetDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date()) // Fecha actual
  const [activeTab, setActiveTab] = useState("categorias")
  const [categories, setCategories] = useState<BudgetCategory[]>([]) // Inicializado como array vacío
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)

  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // Estado para la sidebar

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
    // Distribuir el presupuesto total entre las categorías seleccionadas
    const categoryCount = budgetData.categories.length
    const budgetPerCategory = categoryCount > 0 ? budgetData.totalBudget / categoryCount : 0

    // Crear nuevas categorías con el presupuesto distribuido
    const newCategories: BudgetCategory[] = budgetData.categories.map((cat, index) => ({
      id: (Date.now() + index).toString(),
      name: cat.name,
      spent: 0,
      budget: budgetPerCategory, // Distribuir el presupuesto equitativamente
      categoryType: cat.categoryType,
    }))

    // Filtrar categorías que no existan ya (evitar duplicados por nombre y tipo)
    const filteredNewCategories = newCategories.filter(
      (newCat) =>
        !categories.some(
          (existingCat) =>
            existingCat.name.toLowerCase() === newCat.name.toLowerCase() &&
            existingCat.categoryType === newCat.categoryType,
        ),
    )

    // Agregar solo las categorías que no existen
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
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Distribución del Presupuesto</h3>
            <p className="text-gray-400">Vista de distribución en desarrollo...</p>
          </div>
        )
      case "historial":
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Historial de Presupuestos</h3>
            <p className="text-gray-400">Vista de historial en desarrollo...</p>
          </div>
        )
      default:
        return null
    }
  }

  // Mensaje para mostrar cuando no hay categorías
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
    // Contenedor principal de toda la aplicación. Debe ser un flex container
    <div className="flex min-h-screen bg-[#020817] text-white">
      {/* Sidebar - La Sidebar recibe las props isSidebarOpen y toggleSidebar */}
      {/* ¡Importante! El componente Sidebar (en su propio archivo) debe manejar su ancho y visibilidad */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal del Dashboard */}
      {/* El margen izquierdo se ajusta dinámicamente según el estado de la Sidebar */}
      <div
        className={`
          flex-1 p-6 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "ml-64" : "ml-20"} /* Ajusta 'ml-20' si tu sidebar cerrada es de otro ancho */
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

          {/* Date Navigation */}
          <DateNavigation
            currentDate={currentDate}
            onNavigate={navigateMonth}
            onNewBudget={() => setIsAddBudgetOpen(true)}
          />

          {/* Summary Cards - Solo mostrar si hay categorías */}
          {categories.length > 0 && <SummaryCards categories={categories} />}

          {/* Tab Navigation - Solo mostrar si hay categorías */}
          {categories.length > 0 && <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />}

          {/* Empty State o Tab Content */}
          {categories.length === 0 ? renderEmptyState() : renderTabContent()}

          {/* Add Budget Dialog */}
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
