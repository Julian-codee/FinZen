"use client";
import { useState } from "react";
import { Share2} from "lucide-react";
import DateNavigation from "./Components/DateNavigation";
import SummaryCards from "./Components/SummaryCards";
import TabNavigation from "./Components/TabsNavigation";
import CategoriesSection from "./Components/CategoriesSection";
import AddBudgetDialog from "./Components/AddBudgetDialog";
import type { BudgetCategory } from "./types/budget-types";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";

const initialCategories: BudgetCategory[] = [
  {
    id: "1",
    name: "Comida",
    spent: 420,
    budget: 500,
    categoryType: "comida",
  },
  {
    id: "2",
    name: "Supermercado",
    spent: 385,
    budget: 400,
    categoryType: "supermercado",
  },
  {
    id: "3",
    name: "Vivienda",
    spent: 800,
    budget: 800,
    categoryType: "vivienda",
  },
];

export default function BudgetDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4)); // Mayo 2025
  const [activeTab, setActiveTab] = useState("categorias");
  const [categories, setCategories] =
    useState<BudgetCategory[]>(initialCategories);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);

    // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

    const handleAddCategory = (
      newCategory: Omit<BudgetCategory, "id" | "spent">
    ) => {
      const category: BudgetCategory = {
        ...newCategory,
        id: Date.now().toString(),
        spent: 0,
      };
      setCategories([...categories, category]);
    };

    const handleDeleteCategory = (id: string) => {
      setCategories(categories.filter((cat) => cat.id !== id));
    };

    const handleUpdateBudget = (id: string, newBudget: number) => {
      setCategories(
        categories.map((cat) =>
          cat.id === id ? { ...cat, budget: newBudget } : cat
        )
      );
    };

    const handleAddBudget = (budgetData: {
      totalBudget: number;
      categories: Array<{ name: string; budget: number; categoryType: string }>;
    }) => {
      // Reset all categories and add new ones
      const newCategories: BudgetCategory[] = budgetData.categories.map(
        (cat, index) => ({
          id: (Date.now() + index).toString(),
          name: cat.name,
          spent: 0,
          budget: cat.budget,
          categoryType: cat.categoryType,
        })
      );
      setCategories(newCategories);
    };

    const renderTabContent = () => {
      switch (activeTab) {
        case "categorias":
          return (
            <CategoriesSection
              categories={categories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
              onUpdateBudget={handleUpdateBudget}
            />
          );
        case "distribucion":
          return (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">
                Distribución del Presupuesto
              </h3>
              <p className="text-gray-400">
                Vista de distribución en desarrollo...
              </p>
            </div>
          );
        case "historial":
          return (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">
                Historial de Presupuestos
              </h3>
              <p className="text-gray-400">
                Vista de historial en desarrollo...
              </p>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="min-h-screen bg-[#020817] text-white p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Presupuesto</h1>
                <p className="text-gray-400 text-lg">
                  Gestiona tus presupuestos mensuales y controla tus gastos por
                  categoría.
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

            {/* Summary Cards */}
            <SummaryCards categories={categories} />

            {/* Tab Navigation */}
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            {renderTabContent()}

            {/* Add Budget Dialog */}
            <AddBudgetDialog
              isOpen={isAddBudgetOpen}
              onClose={() => setIsAddBudgetOpen(false)}
              onAddBudget={handleAddBudget}
            />
          </div>
        </div>
      </>
    );
  };
