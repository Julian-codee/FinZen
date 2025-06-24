"use client"

import { useState, useEffect, useCallback } from "react"
import { Calendar, TrendingUp, TrendingDown, Search, Download } from "lucide-react"
import { toast } from "sonner"
import type { BudgetCategory, GastosResponseDto } from "../types/budget-types"
import { formatCurrency } from "../utils/budgest-utils"

interface HistoryEntry {
  id: string;
  date: string;
  month: string;
  year: number;
  totalBudget: number; // Esto será una aproximación si el backend no lo provee históricamente
  totalSpent: number;
  categories: BudgetCategory[]; // Esto será una agregación de gastos por categoría
  status: "completed" | "in-progress" | "exceeded" | "unknown";
}

export default function HistorySection({ categories: currentCategories }: { categories: BudgetCategory[] }) {
  const [animationProgress, setAnimationProgress] = useState(0)
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [transactions, setTransactions] = useState<GastosResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found. Please log in.");
      setIsLoading(false);
      toast.error("No autenticado para ver el historial.");
      return;
    }

    try {
      const transactionsResponse = await fetch("http://localhost:8080/finzen/gasto/my-expenses", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (transactionsResponse.status === 204) {
        setTransactions([]);
        toast.info("No se encontraron transacciones para este usuario.");
      } else if (!transactionsResponse.ok) {
        const errorData = await transactionsResponse.json();
        throw new Error(errorData.error || "Fallo al cargar transacciones.");
      } else {
        const data: GastosResponseDto[] = await transactionsResponse.json();
        setTransactions(data);
      }
      toast.success("Transacciones cargadas exitosamente.");
    } catch (err: any) {
      console.error("Error al cargar transacciones:", err);
      setError(err.message || "Ocurrió un error desconocido al cargar transacciones.");
      toast.error(`Error al cargar transacciones: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Procesa las transacciones del backend para generar el historial monthly
  const processTransactionsToHistory = useCallback((txs: GastosResponseDto[]): HistoryEntry[] => {
    const monthlyDataMap = new Map<string, { totalSpent: number; categories: Map<string, { spent: number; budget: number }> }>();

    txs.forEach(tx => {
      const date = new Date(tx.fecha);
      const year = date.getFullYear();
      const month = date.toLocaleString('es-ES', { month: 'long' });
      const monthYearKey = `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;

      if (!monthlyDataMap.has(monthYearKey)) {
        monthlyDataMap.set(monthYearKey, { totalSpent: 0, categories: new Map() });
      }

      const monthlyEntry = monthlyDataMap.get(monthYearKey)!;
      monthlyEntry.totalSpent += tx.monto;

      const categoryKey = tx.nombreCategoria || "Sin categoría";
      if (!monthlyEntry.categories.has(categoryKey)) {
        monthlyEntry.categories.set(categoryKey, { spent: 0, budget: 0 }); // El budget por categoría aquí es desconocido sin un endpoint de historial de presupuestos
      }
      monthlyEntry.categories.get(categoryKey)!.spent += tx.monto;
    });

    const history: HistoryEntry[] = [];
    const sortedKeys = Array.from(monthlyDataMap.keys()).sort((a, b) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');
      const dateA = new Date(`${monthA} 1, ${yearA}`);
      const dateB = new Date(`${monthB} 1, ${yearB}`);
      return dateA.getTime() - dateB.getTime();
    });

    // Calcular un 'totalBudget' de ejemplo o usar los presupuestos actuales
    // Esto es una simplificación. Lo ideal es tener un historial de presupuestos del backend.
    const currentTotalBudget = currentCategories.reduce((sum, cat) => sum + cat.budget, 0);

    sortedKeys.forEach(key => {
      const data = monthlyDataMap.get(key)!;
      const [monthName, yearStr] = key.split(' ');
      const year = parseInt(yearStr);
      const monthDate = new Date(`${monthName} 1, ${year}`);
      
      // Intentar asignar un presupuesto aproximado. Podrías usar un promedio o el presupuesto actual.
      // Aquí, por simplicidad, usaremos el 'currentTotalBudget' como una aproximación del presupuesto para cada mes histórico.
      // O, si quieres que la gráfica muestre solo lo gastado vs una línea de referencia, pon un valor fijo o cero.
      const totalBudgetForMonth = currentTotalBudget > 0 ? currentTotalBudget : data.totalSpent * 1.1; // Ejemplo: 10% más de lo gastado si no hay presupuesto actual.

      const status: "completed" | "in-progress" | "exceeded" | "unknown" = 
        data.totalSpent <= totalBudgetForMonth * 0.95 ? "completed" : // Completado si está por debajo del 95%
        data.totalSpent > totalBudgetForMonth ? "exceeded" : "in-progress";

      history.push({
        id: key,
        date: monthDate.toISOString().split('T')[0],
        month: key,
        year: year,
        totalBudget: totalBudgetForMonth,
        totalSpent: data.totalSpent,
        categories: Array.from(data.categories.entries()).map(([name, { spent }]) => ({
          id: name, // Usamos el nombre como ID aquí
          name: name,
          budget: 0, // No podemos determinar el presupuesto por categoría histórica sin más datos
          spent: spent,
        })),
        status: status,
      });
    });

    return history;
  }, [currentCategories]);

  const historyData = processTransactionsToHistory(transactions);

  const getFilteredData = useCallback(() => {
    let filteredData = historyData

    const now = new Date();
    switch (selectedPeriod) {
      case "3months":
        filteredData = historyData.filter(entry => {
          const entryDate = new Date(entry.date);
          const diffMonths = (now.getFullYear() - entryDate.getFullYear()) * 12 + (now.getMonth() - entryDate.getMonth());
          return diffMonths >= 0 && diffMonths < 3;
        });
        break;
      case "6months":
        filteredData = historyData.filter(entry => {
          const entryDate = new Date(entry.date);
          const diffMonths = (now.getFullYear() - entryDate.getFullYear()) * 12 + (now.getMonth() - entryDate.getMonth());
          return diffMonths >= 0 && diffMonths < 6;
        });
        break;
      case "1year":
        filteredData = historyData.filter(entry => {
          const entryDate = new Date(entry.date);
          const diffMonths = (now.getFullYear() - entryDate.getFullYear()) * 12 + (now.getMonth() - entryDate.getMonth());
          return diffMonths >= 0 && diffMonths < 12;
        });
        break;
      default:
        filteredData = historyData; // All data for 'all' or undefined
        break;
    }

    if (searchTerm) {
      filteredData = filteredData.filter((entry) => entry.month.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (filterStatus !== "all") {
      filteredData = filteredData.filter((entry) => entry.status === filterStatus)
    }

    return filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [historyData, selectedPeriod, searchTerm, filterStatus]);

  const chartData = getFilteredData()

  useEffect(() => {
    setAnimationProgress(0)
    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setAnimationProgress(easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [selectedPeriod, searchTerm, filterStatus, transactions]) // Se añadió transactions como dependencia

  const maxValue = Math.max(...chartData.map((entry) => Math.max(entry.totalBudget, entry.totalSpent, 1)))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "exceeded":
        return "text-red-400"
      case "in-progress":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "exceeded":
        return "Excedido"
      case "in-progress":
        return "En Progreso"
      default:
        return "Desconocido"
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Cargando historial de transacciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error al cargar transacciones: {error}</p>
        <button onClick={fetchTransactions} className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Reintentar</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Historial de Presupuestos</h2>
          <p className="text-gray-400">Revisa el rendimiento de tus presupuestos anteriores</p>
        </div>
        <button className="bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-lg transition-colors flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex bg-[#1A2332] border border-[#2A3441] rounded-lg p-1">
          <button
            onClick={() => setSelectedPeriod("3months")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              selectedPeriod === "3months" ? "bg-[#3B82F6] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            3 Meses
          </button>
          <button
            onClick={() => setSelectedPeriod("6months")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              selectedPeriod === "6months" ? "bg-[#3B82F6] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            6 Meses
          </button>
          <button
            onClick={() => setSelectedPeriod("1year")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              selectedPeriod === "1year" ? "bg-[#3B82F6] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            1 Año
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por mes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1A2332] border border-[#2A3441] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6] w-64"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#1A2332] border border-[#2A3441] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#3B82F6]"
        >
          <option value="all">Todos los estados</option>
          <option value="completed">Completados</option>
          <option value="exceeded">Excedidos</option>
          <option value="in-progress">En Progreso</option>
        </select>
      </div>

      <div className="bg-[#1A2332] border border-[#2A3441] rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-6">Presupuesto vs Gastado</h3>
        <div className="relative h-80">
          <svg width="100%" height="100%" className="overflow-visible">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <g key={index}>
                <line
                  x1="60"
                  y1={320 - ratio * 280}
                  x2="100%"
                  y2={320 - ratio * 280}
                  stroke="#374151"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <text x="50" y={325 - ratio * 280} textAnchor="end" className="text-xs fill-gray-400">
                  {formatCurrency(maxValue * ratio)}
                </text>
              </g>
            ))}

            {chartData.map((entry, index) => {
              const barWidth = 40
              const barSpacing = 80
              const x = 80 + index * barSpacing
              const budgetHeight = (entry.totalBudget / maxValue) * 280 * animationProgress
              const spentHeight = (entry.totalSpent / maxValue) * 280 * animationProgress

              return (
                <g key={entry.id}>
                  <rect
                    x={x}
                    y={320 - budgetHeight}
                    width={barWidth / 2}
                    height={budgetHeight}
                    fill="#3B82F6"
                    className="transition-all duration-300 hover:brightness-110"
                    style={{
                      filter: "drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))",
                    }}
                  />

                  <rect
                    x={x + barWidth / 2 + 2}
                    y={320 - spentHeight}
                    width={barWidth / 2}
                    height={spentHeight}
                    fill={entry.totalSpent > entry.totalBudget ? "#EF4444" : "#10B981"}
                    className="transition-all duration-300 hover:brightness-110"
                    style={{
                      filter: `drop-shadow(0 4px 8px ${entry.totalSpent > entry.totalBudget ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"})`,
                    }}
                  />

                  <text
                    x={x + barWidth / 2}
                    y={340}
                    textAnchor="middle"
                    className="text-xs fill-gray-400"
                    style={{
                      opacity: animationProgress,
                    }}
                  >
                    {entry.month.split(" ")[0]}
                  </text>

                  <g className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <rect
                      x={x - 20}
                      y={280 - Math.max(budgetHeight, spentHeight) - 40}
                      width={barWidth + 40}
                      height="35"
                      fill="#020817"
                      stroke="#2A3441"
                      rx="4"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={280 - Math.max(budgetHeight, spentHeight) - 25}
                      textAnchor="middle"
                      className="text-xs fill-white font-medium"
                    >
                      {formatCurrency(entry.totalBudget)}
                    </text>
                    <text
                      x={x + barWidth / 2}
                      y={280 - Math.max(budgetHeight, spentHeight) - 12}
                      textAnchor="middle"
                      className="text-xs fill-gray-400"
                    >
                      {formatCurrency(entry.totalSpent)}
                    </text>
                  </g>
                </g>
              )
            })}
          </svg>

          <div className="absolute top-4 right-4 flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#3B82F6] rounded"></div>
              <span className="text-sm text-gray-400">Presupuesto</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#10B981] rounded"></div>
              <span className="text-sm text-gray-400">Gastado</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1A2332] border border-[#2A3441] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Detalle del Historial</h3>
        <div className="space-y-4">
          {chartData.map((entry, index) => (
            <div
              key={entry.id}
              className="bg-[#020817] border border-[#2A3441] rounded-lg p-4 transition-all duration-500 hover:border-[#3B82F6]"
              style={{
                opacity: animationProgress,
                transform: `translateY(${(1 - animationProgress) * 20}px)`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-white">{entry.month}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-gray-400 text-sm flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(entry.date).toLocaleDateString("es-ES")}
                    </span>
                    <span className={`text-sm font-medium ${getStatusColor(entry.status)}`}>
                      {getStatusText(entry.status)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    {formatCurrency(entry.totalSpent)} / {formatCurrency(entry.totalBudget)}
                  </div>
                  <div className="flex items-center justify-end space-x-1">
                    {entry.totalSpent <= entry.totalBudget ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={`text-sm ${entry.totalSpent <= entry.totalBudget ? "text-green-400" : "text-red-400"}`}
                    >
                      {((entry.totalSpent / entry.totalBudget) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full bg-[#374151] rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    entry.totalSpent > entry.totalBudget ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min((entry.totalSpent / entry.totalBudget) * 100 * animationProgress, 100)}%`,
                    transitionDelay: `${index * 200}ms`,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {entry.categories.slice(0, 5).map((category, catIndex) => (
                  <div key={catIndex} className="text-center">
                    <div className="text-xs text-gray-400">{category.name}</div>
                    <div className="text-sm font-medium text-white">{formatCurrency(category.spent)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {chartData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No se encontraron registros con los filtros aplicados</p>
          </div>
        )}
      </div>
    </div>
  )
}