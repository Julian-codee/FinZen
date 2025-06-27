import React, { useMemo } from 'react';
import { Transaction } from '../Types/types';

interface SummaryCardsProps {
  transactions: Transaction[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ transactions }) => {
  const summary = useMemo(() => {
    const incomeTotal = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const expenseTotal = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const balance = incomeTotal - expenseTotal;

    const formatCurrency = (value: number) =>
      new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(value);

    const fakePercentage = (value: number): string => {
      if (value === 0) return '0%';
      return `${(Math.random() * 20).toFixed(1)}%`;
    };

    return [
      {
        type: 'income' as const,
        title: 'Ingresos',
        amount: formatCurrency(incomeTotal),
        percentage: fakePercentage(incomeTotal),
        isPositive: true,
      },
      {
        type: 'expense' as const,
        title: 'Gastos',
        amount: formatCurrency(expenseTotal),
        percentage: fakePercentage(expenseTotal),
        isPositive: true,
      },
      {
        type: 'balance' as const,
        title: 'Balance',
        amount: formatCurrency(balance),
        percentage: fakePercentage(balance),
        isPositive: balance >= 0,
      },
    ];
  }, [transactions]);

  const icons = {
    income: (
      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
      </svg>
    ),
    expense: (
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
      </svg>
    ),
    balance: (
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
        />
      </svg>
    ),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {summary.map((item, index) => (
        <div
          key={index}
          className="border border-gray-800 rounded-lg p-6 bg-[#121827] shadow-md hover:shadow-lg transition-shadow duration-300"
          role="region"
          aria-label={item.title}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wide">{item.title}</h3>
            {icons[item.type]}
          </div>

          <div className="mb-3">
            <span className="text-3xl font-extrabold leading-tight">{item.amount}</span>
          </div>

          <div className="flex items-center text-sm select-none" aria-live="polite">
            <svg
              className={`w-4 h-4 mr-1 ${item.isPositive ? 'text-green-500' : 'text-red-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={item.isPositive ? 'M7 11l5-5m0 0l5 5m5-5v12' : 'M17 13l-5 5m0 0l-5-5m5 5V6'}
              />
            </svg>
            <span className={`${item.isPositive ? 'text-green-500' : 'text-red-500'} font-semibold`}>
              {item.percentage}
            </span>
            <span className="text-gray-400 ml-1">respecto al período anterior</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
