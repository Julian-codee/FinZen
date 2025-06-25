import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

import EditTransactionModal from './EditTransactionModal';
import TransactionRow from './TransactionRow'; // Asegúrate de que esta importación sea correcta
import { Transaction } from '../Types/types';

// Props del componente
interface TransactionTableProps {
  data: Transaction[];
  activeTab: string;
}

const STORAGE_KEY = 'finzen_transactions';

// --- TOAST COMPONENTES PERSONALIZADOS ---

interface CustomSuccessToastProps {
  t: any;
  message: string;
}

const CustomSuccessToast: React.FC<CustomSuccessToastProps> = ({ t, message }) => (
  <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}>
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <CheckCircle className="h-6 w-6 text-green-500" />
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-white">¡Éxito!</p>
          <p className="mt-1 text-sm text-gray-300">{message}</p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-green-600/30">
      <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-xl p-4 text-sm font-medium text-green-400 hover:text-green-200">
        Cerrar
      </button>
    </div>
  </div>
);

interface CustomErrorToastProps {
  t: any;
  message: string;
}

const CustomErrorToast: React.FC<CustomErrorToastProps> = ({ t, message }) => (
  <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}>
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <XCircle className="h-6 w-6 text-red-500" />
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-white">Error</p>
          <p className="mt-1 text-sm text-gray-300">{message}</p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-red-600/30">
      <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-xl p-4 text-sm font-medium text-red-400 hover:text-red-200">
        Cerrar
      </button>
    </div>
  </div>
);

interface DeleteConfirmationToastProps {
  t: any;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationToast: React.FC<DeleteConfirmationToastProps> = ({ t, onConfirm, onCancel }) => (
  <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex flex-col p-4`}>
    <div className="flex items-start">
      <Trash2 className="h-6 w-6 text-orange-400" />
      <div className="ml-3 flex-1">
        <p className="text-sm font-semibold text-white">Confirmar Eliminación</p>
        <p className="mt-1 text-sm text-gray-300">¿Estás seguro de que quieres eliminar esta transacción? Esta acción no se puede deshacer.</p>
      </div>
    </div>
    <div className="mt-4 flex space-x-2 justify-end">
      <button onClick={() => { toast.dismiss(t.id); onCancel(); }} className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700 text-sm">Cancelar</button>
      <button onClick={() => { toast.dismiss(t.id); onConfirm(); }} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm">Eliminar</button>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

const TransactionTable: React.FC<TransactionTableProps> = ({ data, activeTab }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Cargar desde localStorage y escuchar eventos
  useEffect(() => {
    const loadTransactions = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      try {
        const parsed = stored ? JSON.parse(stored) : [];
        setTransactions(parsed);
      } catch (error) {
        console.error("Error al cargar transacciones:", error);
        setTransactions([]);
      }
      setIsInitialLoadComplete(true);
    };

    loadTransactions();
    window.addEventListener("transaction-added", loadTransactions);
    return () => window.removeEventListener("transaction-added", loadTransactions);
  }, []);

  // Guardar en localStorage cada vez que se modifique internamente
  useEffect(() => {
    if (isInitialLoadComplete) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, isInitialLoadComplete]);

  const handleDeleteTransaction = (idToDelete: string) => {
    toast.custom((t) => (
      <DeleteConfirmationToast
        t={t}
        onConfirm={() => {
          setTransactions(prev => prev.filter(x => x.id !== idToDelete));
          toast.custom((tSuccess) => (
            <CustomSuccessToast t={tSuccess} message="La transacción ha sido eliminada." />
          ));
        }}
        onCancel={() => {
          toast.custom((tError) => (
            <CustomErrorToast t={tError} message="Eliminación cancelada." />
          ));
        }}
      />
    ), { duration: Infinity });
  };

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === 'Todas') return true;
    if (activeTab === 'Gastos') return t.type === 'expense';
    if (activeTab === 'Ingresos') return t.type === 'income';
    return true;
  });

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className="border border-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed min-w-[700px]">
            {/* Si tienes un thead, también deberías considerar cómo hacerlo responsivo */}
            {/* <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-1/3 sm:w-1/4">Descripción</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-400 uppercase tracking-wider w-[120px]">Monto</th>
                <th className="hidden md:table-cell px-4 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider w-[80px]">Tipo</th>
                <th className="hidden lg:table-cell px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-[100px]">Fecha</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-400 uppercase tracking-wider w-[100px]">Acciones</th>
              </tr>
            </thead> */}
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => (
                  <TransactionRow
                    key={t.id}
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
            setTransactions(prev => prev.map(x => x.id === updated.id ? updated : x));
            setEditTransaction(null);
            toast.custom((tSuccess) => (
              <CustomSuccessToast t={tSuccess} message="Transacción actualizada con éxito." />
            ));
          }}
        />
      )}
    </>
  );
};

export default TransactionTable;