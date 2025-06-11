import React from 'react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  subtitle?: string;
  category: string;
  amount: number;
  account: string;
  method: string;
  status: 'Completada' | 'Pendiente' | 'Cancelada';
  type: 'income' | 'expense';
}

interface TransactionTableProps {
  data: Transaction[];
  activeTab: string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ data, activeTab }) => {
  const filteredData = data.filter((transaction) => {
    if (activeTab === 'Todas') return true;
    if (activeTab === 'Gastos') return transaction.type === 'expense';
    if (activeTab === 'Ingresos') return transaction.type === 'income';
    return true;
  });

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed min-w-[700px]">
          <TableHeader />

          <tbody>
            {filteredData.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableHeader: React.FC = () => (
  <thead className="border-b border-gray-800 bg-[#141B2D]">
    <tr>
      <th className="text-left py-4 px-4 w-12">
        <input
          type="checkbox"
          className="rounded bg-[#0D1119] border-gray-600 focus:ring-blue-500 focus:ring-2"
          aria-label="Seleccionar todo"
        />
      </th>
      <th className="text-left py-4 px-4 text-gray-400 font-semibold">Fecha</th>
      <th className="text-left py-4 px-4 text-gray-400 font-semibold">Descripción</th>
      <th className="text-left py-4 px-4 text-gray-400 font-semibold">Categoría</th>
      <th className="text-left py-4 px-4 text-gray-400 font-semibold">Importe</th>
      <th className="text-left py-4 px-4 text-gray-400 font-semibold">Cuenta</th>
      <th className="text-left py-4 px-4 text-gray-400 font-semibold">Método</th>
      <th className="text-left py-4 px-4 text-gray-400 font-semibold">Estado</th>
      <th className="text-left py-4 px-4 w-12"></th>
    </tr>
  </thead>
);

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const categoryColor = getCategoryColor(transaction.category);

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-900/60 transition-colors">
      <td className="py-4 px-4">
        <input
          type="checkbox"
          className="rounded bg-[#0D1119] border-gray-600 focus:ring-blue-500 focus:ring-2"
          aria-label={`Seleccionar transacción ${transaction.description}`}
        />
      </td>
      <td className="py-4 px-4 text-gray-300 whitespace-nowrap">{transaction.date}</td>
      <td className="py-4 px-4">
        <div>
          <div className="font-semibold text-white">{transaction.description}</div>
          {transaction.subtitle && (
            <div className="text-sm text-gray-400 truncate max-w-xs">{transaction.subtitle}</div>
          )}
        </div>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColor} select-none`}
          aria-label={`Categoría ${transaction.category}`}
        >
          {transaction.category}
        </span>
      </td>
      <td className="py-4 px-4 font-semibold whitespace-nowrap">{formatAmount(transaction.amount, transaction.type)}</td>
      <td className="py-4 px-4 text-gray-300 whitespace-nowrap">{transaction.account}</td>
      <td className="py-4 px-4 text-gray-300 whitespace-nowrap">{transaction.method}</td>
      <td className="py-4 px-4 whitespace-nowrap">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 select-none">
          {transaction.status}
        </span>
      </td>
      <td className="py-4 px-4 text-center">
        <button
          className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 rounded"
          aria-label={`Más opciones para ${transaction.description}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Alimentación': 'bg-green-100 text-green-800',
    'Ingresos': 'bg-blue-100 text-blue-800',
    'Ocio': 'bg-purple-100 text-purple-800',
    'Restaurantes': 'bg-orange-100 text-orange-800',
    'Transporte': 'bg-red-100 text-red-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const formatAmount = (amount: number, type: 'income' | 'expense') => {
  const prefix = type === 'income' ? '+' : '-';
  const color = type === 'income' ? 'text-green-500' : 'text-red-500';

  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);

  return (
    <span className={`${color} select-none`}>
      {type === 'income' ? (
        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      ) : (
        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
        </svg>
      )}
      {prefix} {formattedAmount}
    </span>
  );
};

export default TransactionTable;
