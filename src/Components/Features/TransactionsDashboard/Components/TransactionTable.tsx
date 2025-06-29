// src/components/TransactionTable.tsx
"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

import EditTransactionModal from "./EditTransactionModal";
import TransactionRow from "./TransactionRow";
import { Transaction } from "../Types/types";

// Componentes Toast personalizados
const CustomSuccessToast: React.FC<{ t: any; message: string }> = ({ t, message }) => (
  <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}>
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-white">¡Éxito!</p>
          <p className="mt-1 text-sm text-gray-300">{message}</p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-green-600/30">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-green-400 hover:text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Cerrar
      </button>
    </div>
  </div>
);

const CustomErrorToast: React.FC<{ t: any; message: string }> = ({ t, message }) => (
  <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}>
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <XCircle className="h-6 w-6 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-white">Error</p>
          <p className="mt-1 text-sm text-gray-300">{message}</p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-red-600/30">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-red-400 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Cerrar
      </button>
    </div>
  </div>
);

interface TransactionTableProps {
  activeTab: string;
  onTransactionsUpdate: (transactions: Transaction[]) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ activeTab, onTransactionsUpdate }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.custom((t) => <CustomErrorToast t={t} message="No estás autenticado. Inicia sesión." />);
      setTransactions([]);
      onTransactionsUpdate([]);
      return;
    }

    try {
      const { data } = await axios.get("http://localhost:8080/finzen/gasto/user/finances", {
        headers: { Authorization: `Bearer ${token}` },
      });

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

      all.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      setTransactions(all);
      onTransactionsUpdate(all);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.custom((t) => <CustomErrorToast t={t} message="Tu sesión ha expirado o no estás autorizado. Por favor, inicia sesión de nuevo." />);
        localStorage.removeItem("token");
      } else {
        toast.custom((t) => <CustomErrorToast t={t} message="Error al obtener transacciones." />);
      }
      console.error(err);
      setTransactions([]);
      onTransactionsUpdate([]);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const handler = () => fetchTransactions();
    window.addEventListener("transaction-added", handler);
    return () => window.removeEventListener("transaction-added", handler);
  }, []);

  const handleDeleteTransaction = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.custom((t) => <CustomErrorToast t={t} message="No estás autenticado. Inicia sesión." />);
      return;
    }

    try {
      const transactionToDelete = transactions.find((tx) => tx.id === id);
      if (!transactionToDelete) {
        toast.custom((t) => <CustomErrorToast t={t} message="Transacción no encontrada para eliminar." />);
        return;
      }

      const deleteEndpoint =
        transactionToDelete.type === "income"
          ? `http://localhost:8080/finzen/ingreso/${id}`
          : `http://localhost:8080/finzen/gasto/${id}`;

      await axios.delete(deleteEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.custom((t) => <CustomSuccessToast t={t} message="Transacción eliminada exitosamente." />);
      fetchTransactions();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.custom((t) => <CustomErrorToast t={t} message="Tu sesión ha expirado o no estás autorizado. Por favor, inicia sesión de nuevo." />);
        localStorage.removeItem("token");
      } else {
        toast.custom((t) => <CustomErrorToast t={t} message="Error al eliminar la transacción." />);
      }
      console.error(err);
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === "Todas") return true;
    if (activeTab === "Gastos") return t.type === "expense";
    if (activeTab === "Ingresos") return t.type === "income";
    return true;
  });

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="border border-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed min-w-[700px]">
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t, i) => (
                  <TransactionRow
                    key={t.id || `tx-${i}`}
                    transaction={t}
                    onEdit={() => setEditTransaction(t)}
                    onDelete={() => handleDeleteTransaction(t.id)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-400">
                    No hay transacciones para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editTransaction && (
        <EditTransactionModal
          transaction={editTransaction}
          onClose={() => setEditTransaction(null)}
          onSave={async (updated) => {
            try {
              const token = localStorage.getItem("token");
              if (!token) {
                toast.custom((t) => <CustomErrorToast t={t} message="No estás autenticado. Inicia sesión." />);
                setEditTransaction(null);
                return;
              }

              const updateEndpoint =
                updated.type === "income"
                  ? `http://localhost:8080/finzen/ingreso/${updated.id}`
                  : `http://localhost:8080/finzen/gasto/${updated.id}`;

              const payload = {
                monto: updated.amount,
                fecha: updated.date,
                descripcion: updated.description,
                nombre: updated.description,
                categoria: updated.category,
                cuenta: updated.account,
              };

              await axios.put(updateEndpoint, payload, {
                headers: { Authorization: `Bearer ${token}` },
              });

              setEditTransaction(null);
              toast.custom((t) => <CustomSuccessToast t={t} message="Transacción actualizada." />);
              fetchTransactions();
            } catch (error) {
              if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.custom((t) => <CustomErrorToast t={t} message="Tu sesión ha expirado o no estás autorizado. Por favor, inicia sesión de nuevo." />);
                localStorage.removeItem("token");
              } else {
                toast.custom((t) => <CustomErrorToast t={t} message="Error al actualizar la transacción." />);
              }
              console.error("Error al actualizar transacción:", error);
            }
          }}
        />
      )}
    </>
  );
};

export default TransactionTable;