// src/components/RecentTransactions.tsx
"use client"; // Importante si usas componentes de cliente en Next.js

import React, { useState, useEffect, useCallback } from "react"; // Agregado useCallback
import { TrendingDown, TrendingUp } from "lucide-react";
import { format, parseISO, isToday, isYesterday } from "date-fns";
import { es } from "date-fns/locale";
import axios from "axios"; // Importar axios
import toast from "react-hot-toast"; // Para las notificaciones de error

// Asegúrate de que Transaction y los Custom Toasts estén correctamente importados
// Si Transaction está en 'Types/types', ajusta la ruta.
import { Transaction } from "../Types/home"; // Asumo que el tipo Transaction ahora está aquí
// import CustomErrorToast from '../../TransactionsDashboard/Components/TransactionTable'; // O la ruta donde estén definidos los Custom Toasts

interface RecentTransactionsProps {
  title?: string;
  maxItems?: number;
  transactions?: Transaction[]; // Permite pasar transacciones como prop opcional
}

// Helper para obtener el label de la fecha (Hoy, Ayer, Mar 01)
const getDateLabel = (dateString: string) => {
  const date = parseISO(dateString);
  if (isToday(date)) return "Hoy";
  if (isYesterday(date)) return "Ayer";
  return format(date, "MMM dd", { locale: es });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  title = "Transacciones Recientes",
  maxItems = 5,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Estado interno para las transacciones

  // Función para obtener las transacciones desde la API
  const fetchTransactions = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No estás autenticado. Inicia sesión.");
      setTransactions([]);
      // Podrías redirigir aquí si lo deseas
      // router.push('/login');
      return;
    }

    try {
      const { data } = await axios.get(
        "http://localhost:8080/finzen/gasto/user/finances",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const mappedIncomes: Transaction[] = Array.isArray(data.ingresos)
        ? data.ingresos.map((item: any) => ({
            id: item.idIngreso?.toString() ?? crypto.randomUUID(),
            amount: item.monto ?? 0,
            date: item.fecha ?? new Date().toISOString().split("T")[0],
            description: item.nombre || item.descripcion || "Sin descripción",
            notes: item.descripcion || "",
            category: "otros",
            account: "Ingreso",
            type: "income",
            status: "Completada",
          }))
        : [];

      const mappedExpenses: Transaction[] = Array.isArray(data.gastos)
        ? data.gastos.map((item: any) => ({
            id: item.idGasto?.toString() ?? crypto.randomUUID(),
            amount: item.monto ?? 0,
            date: item.fecha ?? new Date().toISOString().split("T")[0],
            description: item.nombre || item.descripcion || "Sin descripción",
            notes: item.descripcion || "",
            category: item.categoria || "otros",
            account: item.cuenta || "Gasto",
            type: "expense",
            status: "Completada",
          }))
        : [];

      const all = [...mappedIncomes, ...mappedExpenses];

      // Ordenar solo por fecha para mostrar las más recientes primero
      all.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime(); // Descendente
      });

      setTransactions(all);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error(
          "Tu sesión ha expirado o no estás autorizado. Por favor, inicia sesión de nuevo."
        );
        localStorage.removeItem("token");
        // router.push('/login');
      } else {
        toast.error("Error al obtener transacciones recientes.");
      }
      console.error(err);
      setTransactions([]);
    }
  }, []); // Dependencias vacías para que se cree una sola vez

  // Efecto para cargar las transacciones al montar el componente
  useEffect(() => {
    fetchTransactions();

    // Opcional: Si AddTransaction u otro componente dispara un evento global
    // para indicar una nueva transacción, puedes escucharlo aquí.
    const handler = () => fetchTransactions();
    window.addEventListener("transaction-added", handler);
    return () => window.removeEventListener("transaction-added", handler);
  }, [fetchTransactions]); // Se ejecuta cuando fetchTransactions cambia (que no debería ocurrir)

  // Filtrar y tomar solo los 'maxItems'
  const recentTransactionsToShow = transactions.slice(0, maxItems);

  return (
    <div className="rounded-lg p-5 border border-[#1f2937] flex-1 min-w-[500px] min-h-[300px]">
      <h2 className="text-white text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-400 text-sm mb-4">
        Has realizado {transactions.length} transacciones este mes.{" "}
        {/* Considera ajustar este conteo si solo muestras 5 */}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs uppercase text-gray-400 border-b border-gray-700">
            <tr>
              <th scope="col" className="py-2 pr-2">
                Descripción
              </th>
              <th scope="col" className="py-2 px-2">
                Categoría
              </th>
              <th scope="col" className="py-2 px-2">
                Fecha
              </th>
              <th scope="col" className="py-2 pl-2 text-right">
                Monto
              </th>
            </tr>
          </thead>
          <tbody>
            {recentTransactionsToShow.length > 0 ? (
              recentTransactionsToShow.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-gray-700 last:border-b-0"
                >
                  <td className="py-3 pr-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          tx.type === "income"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {tx.type === "income" ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">
                          {tx.description}
                        </span>
                        <span className="text-xs text-gray-500">
                          {tx.notes}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex flex-col">
                      <span className="text-white">
                        {getDateLabel(tx.date)}
                      </span>
                      {/* Eliminado tx.time ya que decidimos quitarlo */}
                    </div>
                  </td>
                  <td
                    className={`py-3 pl-2 text-right font-semibold ${
                      tx.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {tx.type === "income" ? "+" : ""}
                    {formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No hay transacciones recientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Si RecentTransactions es el único componente en este archivo, puedes exportarlo por defecto
export default RecentTransactions; // Cambiado a exportación por defecto
