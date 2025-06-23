import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Transaction } from '../Types/home';
import { format, parseISO, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';

interface RecentTransactionsProps {
  transactions: Transaction[];
  title?: string;
  maxItems?: number;
}

// Helper para obtener el label de la fecha (Hoy, Ayer, Mar 01)
const getDateLabel = (dateString: string) => {
  const date = parseISO(dateString);
  if (isToday(date)) return 'Hoy';
  if (isYesterday(date)) return 'Ayer';
  return format(date, 'MMM dd', { locale: es });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  title = "Transacciones Recientes",
  maxItems = 5,
}) => {
  const recentTransactions = transactions.slice(0, maxItems);

  return (
    <div className="bg-[#0d1119] rounded-lg p-5 border border-[#1f2937] flex-1 min-w-[300px]">
      <h2 className="text-white text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-400 text-sm mb-4">
        Has realizado {transactions.length} transacciones este mes.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs uppercase text-gray-400 border-b border-gray-700">
            <tr>
              <th scope="col" className="py-2 pr-2">Descripción</th>
              <th scope="col" className="py-2 px-2">Categoría</th>
              <th scope="col" className="py-2 px-2">Fecha</th>
              <th scope="col" className="py-2 pl-2 text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.length > 0 ? (
              recentTransactions.map(tx => (
                <tr key={tx.id} className="border-b border-gray-700 last:border-b-0">
                  <td className="py-3 pr-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {tx.type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{tx.description}</span>
                        <span className="text-xs text-gray-500">{tx.notes}</span>
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
                      <span className="text-white">{getDateLabel(tx.date)}</span>
                      <span className="text-xs text-gray-500">{tx.time}</span>
                    </div>
                  </td>
                  <td className={`py-3 pl-2 text-right font-semibold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type === 'income' ? '+' : ''}{formatCurrency(tx.amount)}
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