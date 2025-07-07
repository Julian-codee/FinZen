"use client";

import { useState, useEffect, useCallback, ReactElement } from "react";
import { Share2, Menu, CheckCircle, XCircle } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import DateNavigation from "./Components/DateNavigation";
import SummaryCards from "./Components/SummaryCards";
import TabNavigation from "./Components/TabsNavigation";
import CategoriesSection from "./Components/CategoriesSection";
import DistributionSection from "./Components/DistributionSection";
import HistorySection from "./Components/HistorySection";
import AddBudgetDialog from "./Components/AddBudgetDialog";

import type {
  BudgetCategoryUI,
  PresupuestoResponseDto,
  PresupuestoRequestDto,
  GastoRequestDto,
} from "./types/budget-types";

type AddBudgetData = {
  name: string;
  montoAsignado: number;
  selectedCategoryId: number;
  entityType?: "cuenta" | "tarjeta" | "inversion";
  entityId?: number;
};

// ----------------------------------
// Toast personalizados
// ----------------------------------

const CustomToast = (
  t: any,
  message: string,
  type: "success" | "error"
): ReactElement => {
  const Icon = type === "success" ? CheckCircle : XCircle;
  const textColor = type === "success" ? "text-green-400" : "text-red-400";
  const bgColor = type === "success" ? "border-green-600/30" : "border-red-600/30";
  const ringColor = type === "success" ? "focus:ring-green-500" : "focus:ring-red-500";

  return (
    <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}>
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Icon className={`h-6 w-6 ${textColor}`} />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-white">
              {type === "success" ? "¡Éxito!" : "Error"}
            </p>
            <p className="mt-1 text-sm text-gray-300">{message}</p>
          </div>
        </div>
      </div>
      <div className={`flex border-l ${bgColor}`}>
        <button
          onClick={() => toast.dismiss(t.id)}
          className={`w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium ${textColor} hover:text-opacity-75 focus:outline-none ${ringColor}`}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

// ----------------------------------
// Componente principal
// ----------------------------------

export default function BudgetDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("categorias");
  const [categories, setCategories] = useState<BudgetCategoryUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchBudgets = useCallback(async () => {
    if (!isOperationLoading) setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No autenticado.");
      toast.custom((t) => CustomToast(t, "No autenticado. Por favor, inicia sesión.", "error"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/finzen/presupuesto/user-budgets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        setCategories([]);
        toast.custom((t) => CustomToast(t, "No se encontraron presupuestos para este usuario.", "success"));
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Fallo al cargar presupuestos");
      }

      const data: PresupuestoResponseDto[] = await response.json();
      const mapped: BudgetCategoryUI[] = data.map(b => ({
        id: String(b.idPresupuesto),
        name: b.nombre,
        budget: b.montoAsignado,
        spent: b.montoGastado,
        categoryType: b.categoria?.nombre || "Sin Categoría",
        associatedEntityId: b.cuenta?.idCuenta || b.tarjeta?.idTarjeta || b.inversion?.idInversion,
        associatedEntityType: b.cuenta ? 'cuenta' : b.tarjeta ? 'tarjeta' : b.inversion ? 'inversion' : undefined,
        originalCategoryId: b.categoria?.idCategoria,
      }));

      setCategories(mapped);
    } catch (err: any) {
      console.error("Error al cargar presupuestos:", err);
      setError(err.message);
      toast.custom((t) => CustomToast(t, `Error al cargar presupuestos: ${err.message}`, "error"));
    } finally {
      setIsLoading(false);
    }
  }, [isOperationLoading]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const navigateMonth = (dir: "prev" | "next") => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + (dir === "prev" ? -1 : 1));
      return d;
    });
  };

  // ------------------ Handlers ------------------

  const handleAddBudget = async (data: AddBudgetData) => {
    await sendBudgetRequest("POST", "crear", data);
  };

  const handleUpdateBudget = async (id: string, monto: number, current: BudgetCategoryUI) => {
    if (!current.originalCategoryId) {
      toast.custom((t) => CustomToast(t, "Falta el ID de la categoría original.", "error"));
      return;
    }

    const data: AddBudgetData = {
      name: current.name,
      montoAsignado: monto,
      selectedCategoryId: current.originalCategoryId,
      entityType: current.associatedEntityType,
      entityId: current.associatedEntityId,
    };

    await sendBudgetRequest("PUT", "actualizar", data, id);
  };

  const handleDeleteCategory = async (id: string) => {
    await sendBudgetRequest("DELETE", "eliminar", null, id);
  };

  const handleRegisterExpense = async (budgetId: string, amount: number, description = "Gasto") => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsOperationLoading(true);
    try {
      const payload: GastoRequestDto = {
        monto: amount,
        descripcion: description,
        idPresupuesto: Number(budgetId),
        fecha: new Date().toISOString().split("T")[0],
      };

      const res = await fetch("http://localhost:8080/finzen/gasto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Fallo al registrar gasto.");
      }

      toast.custom((t) => CustomToast(t, "Gasto registrado exitosamente.", "success"));
      await fetchBudgets();
    } catch (err: any) {
      toast.custom((t) => CustomToast(t, `Error al registrar gasto: ${err.message}`, "error"));
    } finally {
      setIsOperationLoading(false);
    }
  };

  async function sendBudgetRequest(
    method: "POST" | "PUT" | "DELETE",
    action: string,
    data?: AddBudgetData | null,
    id?: string
  ) {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsOperationLoading(true);
    try {
      let url = "http://localhost:8080/finzen/presupuesto";
      let body;

      if (method !== "DELETE" && data) {
        const dto: PresupuestoRequestDto = {
          nombre: data.name,
          montoAsignado: data.montoAsignado,
          idCategoriaPresupuesto: data.selectedCategoryId,
        };

        if (data.entityType && data.entityId !== undefined) {
          const key =
            `id${data.entityType.charAt(0).toUpperCase() + data.entityType.slice(1)}` as
              | "idCuenta"
              | "idTarjeta"
              | "idInversion";
          (dto as any)[key] = data.entityId;
        }

        body = JSON.stringify(dto);
      }

      if (id) url += `/${id}`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body || undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Fallo al ${action} presupuesto.`);
      }

      toast.custom((t) => CustomToast(t, `Presupuesto ${action} exitosamente.`, "success"));
      if (action === "crear") setIsAddBudgetOpen(false);
      await fetchBudgets();
    } catch (err: any) {
      toast.custom((t) => CustomToast(t, `Error al ${action} presupuesto: ${err.message}`, "error"));
    } finally {
      setIsOperationLoading(false);
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "categorias":
        return (
          <CategoriesSection
            categories={categories}
            onDeleteCategory={handleDeleteCategory}
            onUpdateBudget={handleUpdateBudget}
            onRegisterExpense={handleRegisterExpense}
          />
        );
      case "distribucion":
        return <DistributionSection categories={categories} />;
      case "historial":
        return <HistorySection categories={categories} />;
      default:
        return null;
    }
  };

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
  );

  if (isLoading && !error) {
    return (
      <div className="flex min-h-screen bg-[#020817] text-white justify-center items-center">
        <p>Cargando presupuestos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#020817] text-red-500 justify-center items-center">
        <p>Error: {error}</p>
        <button onClick={fetchBudgets} className="ml-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#020817] text-white">
      <Toaster position="bottom-right" />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className={`flex-1 p-6 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold mb-2">Presupuesto</h1>
                <p className="text-gray-400 text-lg">Gestiona tus presupuestos mensuales y controla tus gastos por categoría.</p>
              </div>
            </div>

            <button className="bg-transparent border border-gray-600 hover:bg-gray-800 p-2 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <DateNavigation currentDate={currentDate} onNavigate={navigateMonth} onNewBudget={() => setIsAddBudgetOpen(true)} />

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
  );
}