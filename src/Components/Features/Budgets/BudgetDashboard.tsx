"use client"

import { useState, useEffect, useCallback } from "react"
import { Share2, Menu } from "lucide-react"
import DateNavigation from "./Components/DateNavigation"
import SummaryCards from "./Components/SummaryCards"
import TabNavigation from "./Components/TabsNavigation"
import CategoriesSection from "./Components/CategoriesSection"
import DistributionSection from "./Components/DistributionSection"
import HistorySection from "./Components/HistorySection"
import AddBudgetDialog from "./Components/AddBudgetDialog" 
import type { BudgetCategoryUI, PresupuestoResponseDto, PresupuestoRequestDto, GastoRequestDto, AddBudgetDialogData } from "./types/budget-types"
import { Sidebar } from "../../Ui/UiDashBoard/SideBar"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom" 

export default function BudgetDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("categorias")
  const [categories, setCategories] = useState<BudgetCategoryUI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const fetchBudgets = useCallback(async () => {
    if (!isOperationLoading) {
      setIsLoading(true); 
    }
    setError(null);

    const token = localStorage.getItem("token") 

    if (!token) {
      setError("No authentication token found. Please log in.")
      setIsLoading(false)
      navigate("/") 
      toast.error("No autenticado. Por favor, inicia sesión.")
      return
    }

    try {
      const response = await fetch("http://localhost:8080/finzen/presupuesto/user-budgets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      if (response.status === 204) {
        setCategories([])
        toast.info("No se encontraron presupuestos para este usuario.")
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Fallo al cargar presupuestos")
      }

      const data: PresupuestoResponseDto[] = await response.json()
      
      const mappedCategories: BudgetCategoryUI[] = data.map(budget => ({
        id: String(budget.idPresupuesto),
        name: budget.nombre,
        budget: budget.montoAsignado,
        spent: budget.montoGastado,
        categoryType: budget.categoria?.nombre || "Sin Categoría",
        associatedEntityId: budget.cuenta?.idCuenta || budget.tarjeta?.idTarjeta || budget.inversion?.idInversion,
        associatedEntityType: budget.cuenta ? 'cuenta' : (budget.tarjeta ? 'tarjeta' : (budget.inversion ? 'inversion' : undefined)),
        originalCategoryId: budget.categoria?.idCategoria
      }))
      setCategories(mappedCategories)
    } catch (err: any) {
      console.error("Error al cargar presupuestos:", err)
      setError(err.message || "Ocurrió un error desconocido al cargar presupuestos.")
      toast.error(`Error al cargar presupuestos: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }, [isOperationLoading])

  useEffect(() => {
    fetchBudgets()
  }, [fetchBudgets])

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

  const handleAddBudget = async (data: AddBudgetDialogData) => {
    setIsOperationLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("No autenticado para crear presupuesto.");
        setIsOperationLoading(false);
        navigate("/");
        return;
    }

    try {
        const newBudgetDto: PresupuestoRequestDto = {
            nombre: data.name,
            montoAsignado: data.montoAsignado,
            idCategoriaPresupuesto: data.selectedCategoryId,
        };

        if (data.entityType === 'cuenta' && data.entityId !== undefined) {
            newBudgetDto.idCuenta = data.entityId;
        } else if (data.entityType === 'tarjeta' && data.entityId !== undefined) {
            newBudgetDto.idTarjeta = data.entityId;
        } else if (data.entityType === 'inversion' && data.entityId !== undefined) {
            newBudgetDto.idInversion = data.entityId;
        }

        const response = await fetch("http://localhost:8080/finzen/presupuesto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(newBudgetDto),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Fallo al crear presupuesto.");
        }

        toast.success("Presupuesto creado exitosamente.");
        setIsAddBudgetOpen(false);
        await fetchBudgets();
    } catch (err: any) {
        console.error("Error al añadir presupuesto:", err)
        toast.error(`Error al crear presupuesto: ${err.message}`);
    } finally {
        setIsOperationLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setIsOperationLoading(true);
    const token = localStorage.getItem("token")

    if (!token) {
      toast.error("No autenticado para eliminar presupuesto.")
      setIsOperationLoading(false);
      navigate("/")
      return
    }

    try {
      const response = await fetch(`http://localhost:8080/finzen/presupuesto/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Fallo al eliminar presupuesto.")
      }

      toast.success("Presupuesto eliminado exitosamente.")
      await fetchBudgets()
    } catch (err: any) {
      console.error("Error al eliminar presupuesto:", err)
      toast.error(`Error al eliminar presupuesto: ${err.message}`)
    } finally {
      setIsOperationLoading(false);
    }
  }

  const handleUpdateBudget = async (id: string, budgetAmount: number, currentCategory: BudgetCategoryUI) => {
    setIsOperationLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("No autenticado para actualizar presupuesto.");
        setIsOperationLoading(false);
        navigate("/");
        return;
    }

    try {
        if (!currentCategory.originalCategoryId) {
            throw new Error("ID de categoría original no disponible para la actualización.");
        }

        const updatedBudgetDto: PresupuestoRequestDto = {
            nombre: currentCategory.name,
            montoAsignado: budgetAmount,
            idCategoriaPresupuesto: currentCategory.originalCategoryId,
        };

        if (currentCategory.associatedEntityType === 'cuenta' && currentCategory.associatedEntityId !== undefined) {
            updatedBudgetDto.idCuenta = currentCategory.associatedEntityId;
        } else if (currentCategory.associatedEntityType === 'tarjeta' && currentCategory.associatedEntityId !== undefined) {
            updatedBudgetDto.idTarjeta = currentCategory.associatedEntityId;
        } else if (currentCategory.associatedEntityType === 'inversion' && currentCategory.associatedEntityId !== undefined) {
            updatedBudgetDto.idInversion = currentCategory.associatedEntityId;
        }

        const response = await fetch(`http://localhost:8080/finzen/presupuesto/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updatedBudgetDto),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Fallo al actualizar presupuesto.");
        }

        toast.success("Presupuesto actualizado exitosamente.");
        await fetchBudgets();
    } catch (err: any) {
        console.error("Error al actualizar presupuesto:", err);
        toast.error(`Error al actualizar presupuesto: ${err.message}`);
    } finally {
        setIsOperationLoading(false);
    }
  };

  const handleRegisterExpense = async (budgetId: string, amount: number, description: string = "Gasto") => {
    setIsOperationLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("No autenticado para registrar gasto.");
        setIsOperationLoading(false);
        navigate("/");
        return;
    }

    try {
        const expensePayload: GastoRequestDto = {
            monto: amount,
            descripcion: description,
            idPresupuesto: Number(budgetId),
            fecha: new Date().toISOString().split('T')[0],
        };

        const response = await fetch("http://localhost:8080/finzen/gasto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(expensePayload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Fallo al registrar gasto.");
        }

        toast.success("Gasto registrado exitosamente.");
        await fetchBudgets();
    } catch (err: any) {
        console.error("Error al registrar gasto:", err);
        toast.error(`Error al registrar gasto: ${err.message}`);
    } finally {
        setIsOperationLoading(false);
    }
  };

  const renderTabContent = () => {
    if (activeTab === "categorias")
      return (
        <CategoriesSection
          categories={categories}
          onAddCategory={(newCat) => {}}
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

  if (isLoading && !error) {
    return (
      <div className="flex min-h-screen bg-[#020817] text-white justify-center items-center">
        <p>Cargando presupuestos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#020817] text-red-500 justify-center items-center">
        <p>Error: {error}</p>
        <button onClick={fetchBudgets} className="ml-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Reintentar</button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#020817] text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "ml-64" : "ml-20"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold mb-2">Presupuesto</h1>
                <p className="text-gray-400 text-lg">
                  Gestiona tus presupuestos mensuales y controla tus gastos por categoría.
                </p>
              </div>
            </div>

            <button className="bg-transparent border border-gray-600 hover:bg-gray-800 p-2 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <DateNavigation
            currentDate={currentDate}
            onNavigate={navigateMonth}
            onNewBudget={() => setIsAddBudgetOpen(true)}
          />

          {isOperationLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <p className="text-white text-lg">Realizando operación...</p>
            </div>
          )}

          {categories.length > 0 && <SummaryCards categories={categories} />}
          {categories.length > 0 && <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />}

          {categories.length === 0 ? renderEmptyState : renderTabContent()}

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