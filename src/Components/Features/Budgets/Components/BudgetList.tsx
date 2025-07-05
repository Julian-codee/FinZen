// src/components/BudgetList.tsx
"use client";

import { useState, useEffect } from "react";
import { DollarSign, Tag, Banknote, CreditCard, TrendingUp, XCircle, Loader2 } from "lucide-react";
import { Budget } from "../types/budget-types";

interface BudgetListProps {
  shouldRefresh: boolean;
  onRefreshDone: () => void;
}

export default function BudgetList({ shouldRefresh, onRefreshDone }: BudgetListProps) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token de autenticación disponible. Por favor, inicia sesión.");
      }

      const response = await fetch("http://localhost:8080/finzen/presupuesto/getPresupuestoUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al cargar los presupuestos.");
      }

      const data: Budget[] = await response.json();
      setBudgets(data);
    } catch (err: any) {
      console.error("Error fetching budgets:", err);
      setError(err.message || "Error desconocido al cargar los presupuestos.");
    } finally {
      setIsLoading(false);
      onRefreshDone();
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchBudgets();
    }
  }, [shouldRefresh]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        Cargando presupuestos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-red-900 border border-red-700 rounded-xl text-red-200">
        <XCircle className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Error al cargar los presupuestos</h3>
        <p className="text-red-300 mb-4">{error}</p>
        <button
          onClick={fetchBudgets}
          className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded-lg transition-colors text-white"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (budgets.length === 0) {
    return (
      <div className="text-center py-16 bg-[#020817] border border-[#2A3441] rounded-xl">
        <h3 className="text-xl font-semibold mb-2">No hay presupuestos creados</h3>
        <p className="text-gray-400 mb-6">Comienza creando tu primer presupuesto.</p>
      </div>
    );
  }

  const getEntityDisplay = (budget: Budget) => {
    if (budget.cuenta) {
      return { icon: <Banknote className="w-4 h-4 text-green-400" />, name: budget.cuenta.nombre };
    }
    if (budget.tarjeta) {
      return { icon: <CreditCard className="w-4 h-4 text-blue-400" />, name: budget.tarjeta.nombre };
    }
    if (budget.inversion) {
      return { icon: <TrendingUp className="w-4 h-4 text-purple-400" />, name: budget.inversion.nombre };
    }
    return { icon: null, name: "Sin asociar" };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {budgets.map(budget => {
        const spentPercentage = budget.montoAsignado ? ((budget.montoGastado || 0) / budget.montoAsignado) * 100 : 0;
        const progressBarColor = spentPercentage > 90 ? "bg-red-500" : spentPercentage > 70 ? "bg-orange-400" : "bg-green-500";
        const { icon: entityIcon, name: entityName } = getEntityDisplay(budget);

        return (
          <div key={budget.id} className="bg-[#0b1424] rounded-xl p-6 border border-[#2A3441] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{budget.nombre}</h3>
                <span className="text-sm font-medium text-gray-400">
                  {budget.categoriaPresupuesto?.nombre || "Sin Categoría"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
                {entityIcon}
                <span>{entityName}</span>
              </div>

              <div className="mb-4">
                <p className="text-2xl font-bold text-blue-400 mb-1">
                  ${budget.montoAsignado ? budget.montoAsignado.toLocaleString('es-CO') : '0'}
                </p>
                <p className="text-gray-400 text-sm">
                  Gastado: <span className="font-semibold text-white">${(budget.montoGastado || 0).toLocaleString('es-CO')}</span>
                </p>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                <div
                  className={`h-2.5 rounded-full ${progressBarColor}`}
                  style={{ width: `${Math.min(100, spentPercentage)}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-400">{spentPercentage.toFixed(1)}% Gastado</p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              {/* Aquí podrías añadir botones o íconos para editar, eliminar, etc. */}
            </div>
          </div>
        );
      })}
    </div>
  );
}