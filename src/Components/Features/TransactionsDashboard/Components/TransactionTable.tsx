import React, { useEffect, useState } from 'react';
import EditTransactionModal from './EditTransactionModal';
import TransactionRow from './TransactionRow';
import { Transaction } from '../Types/types';

interface TransactionTableProps {
  data: Transaction[]; // Esta prop 'data' ya no se usa para la carga inicial, pero puede permanecer.
  activeTab: string;
}

const STORAGE_KEY = 'finzen_transactions';

const TransactionTable: React.FC<TransactionTableProps> = ({ data, activeTab }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  // Nueva bandera de estado para controlar la carga inicial
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadTransactions = () => {
        console.log("TransactionTable: Intentando cargar transacciones...");
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsedTransactions = JSON.parse(stored);
            setTransactions(parsedTransactions);
            console.log("TransactionTable: Transacciones cargadas:", parsedTransactions.length);
          } catch (e) {
            console.error("TransactionTable: Error al parsear transacciones de localStorage:", e);
            setTransactions([]);
          }
        } else {
          setTransactions([]);
          console.log("TransactionTable: No hay transacciones en localStorage.");
        }
        // Una vez que las transacciones se han cargado (o inicializado), marcamos la carga como completa
        setIsInitialLoadComplete(true); 
      };

      loadTransactions();

      console.log("TransactionTable: Configurando listener para 'transaction-added'.");
      window.addEventListener("transaction-added", loadTransactions);

      return () => {
        console.log("TransactionTable: Limpiando listener para 'transaction-added'.");
        window.removeEventListener("transaction-added", loadTransactions);
      };
    } else {
      console.log("TransactionTable: No en entorno de navegador (window no definido), no se configurará el listener.");
    }
  }, []); // Se ejecuta solo una vez al montar

  // Este useEffect ahora solo guarda cuando 'transactions' cambia Y la carga inicial ha terminado
  useEffect(() => {
    // Solo guardamos si estamos en el cliente Y la carga inicial ya se completó
    if (typeof window !== 'undefined' && isInitialLoadComplete) { 
      console.log("TransactionTable: Guardando transacciones en localStorage (cambio interno). Total:", transactions.length);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, isInitialLoadComplete]); // Ahora depende de transactions Y de la bandera

  const filtered = transactions.filter((t) => {
    if (activeTab === 'Todas') return true;
    if (activeTab === 'Gastos') return t.type === 'expense';
    if (activeTab === 'Ingresos') return t.type === 'income';
    return true;
  });

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed min-w-[700px]">
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((t) => (
                <TransactionRow
                  key={t.id}
                  transaction={t}
                  onEdit={() => setEditTransaction(t)}
                  onDelete={() => {
                    if (confirm('¿Estás seguro de que quieres eliminar esta transacción?')) {
                      setTransactions(prev => prev.filter(x => x.id !== t.id));
                    }
                  }}
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
      {editTransaction && (
        <EditTransactionModal
          transaction={editTransaction}
          onClose={() => setEditTransaction(null)}
          onSave={(updated) => {
            setTransactions(prev => prev.map(x => x.id === updated.id ? updated : x));
            setEditTransaction(null);
          }}
        />
      )}
    </div>
  );
};

export default TransactionTable;