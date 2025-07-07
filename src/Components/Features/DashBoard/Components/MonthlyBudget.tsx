"use client";

import { useState, useEffect, useCallback } from "react";
import type { PresupuestoResponseDto } from "../Types/home";
import { Wallet, AlertTriangle } from "lucide-react"; // Puedes reemplazarlos por otros íconos si lo prefieres

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const barColor = clampedProgress > 100 ? "bg-red-500" : "bg-blue-500";

  return (
    <div className="w-full bg-[#1a202c] rounded-full h-1.5">
      <div
        className={`${barColor} h-1.5 rounded-full transition-all duration-500`}
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};

export function MonthlyBudget() {
  const [budgets, setBudgets] = useState<PresupuestoResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No autenticado. Por favor inicia sesión.");
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
        setBudgets([]);
        setIsLoading(false);
        return;
      }

      if (response.status === 401) {
        throw new Error("Tu sesión ha expirado. Inicia sesión de nuevo.");
      }

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error cargando presupuestos.");
      }

      const data: PresupuestoResponseDto[] = await response.json();
      setBudgets(data);
    } catch (err: any) {
      console.error("Error al cargar presupuestos:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-400">
        Cargando presupuestos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400">
        Error: {error}
      </div>
    );
  }

  const budgetData = budgets.map(b => ({
    id: String(b.idPresupuesto),
    name: b.nombre,
    spent: b.montoGastado,
    limit: b.montoAsignado,
  }));

  const totalSpent = budgetData.reduce((sum, cat) => sum + cat.spent, 0);
  const totalLimit = budgetData.reduce((sum, cat) => sum + cat.limit, 0);

  return (
    <div className="rounded-lg p-5 border border-[#1f2937] flex-1 min-w-[300px] bg-[#020817]">
      <h2 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
        <Wallet className="w-5 h-5 text-blue-400" />
        Presupuesto Mensual
      </h2>

      <p className="text-gray-400 text-sm mb-1">
        Tu progreso de gastos para Julio 2025
      </p>

      <p className="text-blue-300 text-sm mb-4">
        Total gastado: {formatCurrency(totalSpent)} / {formatCurrency(totalLimit)}
      </p>

      <div className="space-y-4">
        {budgetData.length > 0 ? (
          budgetData.map(category => {
            const progress = (category.spent / category.limit) * 100;
            const progressColorClass = progress > 100 ? 'text-red-400' : 'text-blue-400';
            const available = category.limit - category.spent;

            return (
              <div key={category.id}>
                <div className="flex justify-between items-center mb-1">
                  <span
                    className="text-white text-sm font-medium flex items-center gap-2 hover:text-blue-300 transition-colors"
                    title={`Disponible: ${formatCurrency(available)}`}
                  >
                    <Wallet className="w-4 h-4 text-blue-400" />
                    {category.name}
                  </span>

                  <span className={`text-sm font-semibold ${progressColorClass}`}>
                    {formatCurrency(category.spent)} / {formatCurrency(category.limit)}
                    {progress > 100 && (
                      <AlertTriangle className="w-4 h-4 text-red-500 inline-block ml-2" aria-label="Presupuesto excedido" />
                    )}
                  </span>
                </div>
                <ProgressBar progress={progress} />
              </div>
            );
          })
        ) : (
          <p className="text-center py-6 text-gray-500">
            No hay categorías de presupuesto definidas.
          </p>
        )}
      </div>
    </div>
  );
}