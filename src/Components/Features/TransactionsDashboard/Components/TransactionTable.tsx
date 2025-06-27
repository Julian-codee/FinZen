import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

import EditTransactionModal from './EditTransactionModal';
import TransactionRow from './TransactionRow';
import { Transaction } from '../Types/types'; // Asegúrate de que esta ruta sea correcta

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
      toast.error("No estás autenticado. Inicia sesión.");
      return;
    }

    try {
      const { data } = await axios.get("http://localhost:8080/finzen/gasto/user/finances", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const mappedIncomes = Array.isArray(data.ingresos)
        ? data.ingresos.map((item) => ({
            id: item.idIngreso?.toString() ?? crypto.randomUUID(),
            amount: item.monto ?? 0,
            date: item.fecha ?? new Date().toISOString(),
            description: item.nombre || item.descripcion || 'Sin descripción',
            subtitle: item.descripcion || '',
            category: 'otros',
            account: 'Ingreso',
            type: 'income',
            time: item.hora ?? '00:00',
          }))
        : [];

      const mappedExpenses = Array.isArray(data.gastos)
        ? data.gastos.map((item) => ({
            id: item.idGasto?.toString() ?? crypto.randomUUID(),
            amount: item.monto ?? 0,
            date: item.fecha ?? new Date().toISOString(),
            description: item.nombre || item.descripcion || 'Sin descripción',
            subtitle: item.descripcion || '',
            category: item.categoria || 'otros',
            account: item.cuenta || 'Gasto',
            type: 'expense',
            time: item.hora ?? '00:00',
          }))
        : [];

      const all = [...mappedIncomes, ...mappedExpenses];

      setTransactions(all);
      onTransactionsUpdate(all); // 🔁 Propaga al padre (FinZenHome)

    } catch (err: any) {
      toast.error("Error al obtener transacciones.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const handler = () => fetchTransactions();
    window.addEventListener("transaction-added", handler);
    return () => window.removeEventListener("transaction-added", handler);
  }, []);

  const handleDeleteTransaction = (id: string) => {
    toast.custom((t) => (
      <div className="bg-neutral-800 p-4 rounded-lg shadow-xl text-white max-w-md w-full">
        <p className="mb-2">¿Estás seguro de eliminar la transacción?</p>
        <div className="flex justify-end gap-2">
          <button onClick={() => toast.dismiss(t.id)} className="px-4 py-1 border border-gray-500 rounded hover:bg-gray-700">Cancelar</button>
          <button
            className="px-4 py-1 bg-red-600 rounded hover:bg-red-700"
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:8080/finzen/ingreso/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                toast.dismiss(t.id);
                fetchTransactions();
              } catch (err) {
                toast.error("Error al eliminar.");
              }
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    ));
  };

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === 'Todas') return true;
    if (activeTab === 'Gastos') return t.type === 'expense';
    if (activeTab === 'Ingresos') return t.type === 'income';
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
          onSave={(updated) => {
            const updatedList = transactions.map((x) =>
              x.id === updated.id ? updated : x
            );
            setTransactions(updatedList);
            onTransactionsUpdate(updatedList); // 🔁 Propaga actualización
            setEditTransaction(null);
            toast.success("Transacción actualizada.");
          }}
        />
      )}
    </>
  );
};

export default TransactionTable;
