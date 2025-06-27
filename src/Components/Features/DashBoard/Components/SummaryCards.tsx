import React from 'react';
import { TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { Transaction, CardSummary } from '../Types/home';

interface SummaryCardsProps {
  transactions: Transaction[];
  cardData: CardSummary[];
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ transactions, cardData }) => {
  // Cálculos reales (sin datos quemados)
  const currentMonthIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentMonthExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = transactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);

  // Si no hay datos previos, los cambios serán 0
  const incomeChange = 0;
  const expenseChange = 0;
  const balanceChange = 0;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(1)}%`;
  };

  const getPercentageColor = (percentage: number) => {
    return percentage >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const activeCards = cardData.filter(card => card.active).length;
  const blockedCards = cardData.filter(card => card.blocked).length;
  const totalCards = cardData.length;

  // Componente interno para una Card individual
  const SummaryCardItem: React.FC<{
    title: string;
    value: string;
    detail?: string;
    icon?: React.ReactNode;
    valueColorClass?: string;
    detailColorClass?: string;
  }> = ({ title, value, detail, icon, valueColorClass, detailColorClass }) => (
    <div className="bg-[#121827] rounded-lg p-5 border border-[#1f2937]">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        {icon}
      </div>
      <div className={`text-white text-3xl font-bold mb-1 ${valueColorClass}`}>
        {value}
      </div>
      {detail && (
        <p className={`text-sm ${detailColorClass}`}>
          {detail}
        </p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Saldo Total */}
      <SummaryCardItem
        title="Saldo Total"
        value={formatCurrency(totalBalance)}
        detail={`${formatPercentage(balanceChange)} desde el mes pasado`}
        icon={<span className="text-gray-500">$</span>}
        detailColorClass={getPercentageColor(balanceChange)}
      />

      {/* Ingresos */}
      <SummaryCardItem
        title="Ingresos"
        value={formatCurrency(currentMonthIncome)}
        detail={`${formatPercentage(incomeChange)} desde el mes pasado`}
        icon={<TrendingUp className="w-5 h-5 text-green-500" />}
        detailColorClass={getPercentageColor(incomeChange)}
      />

      {/* Gastos */}
      <SummaryCardItem
        title="Gastos"
        value={formatCurrency(currentMonthExpense)}
        detail={`${formatPercentage(expenseChange)} desde el mes pasado`}
        icon={<TrendingDown className="w-5 h-5 text-red-500" />}
        detailColorClass={getPercentageColor(expenseChange)}
      />

      {/* Tarjetas */}
      <SummaryCardItem
        title="Tarjetas"
        value={totalCards.toString()}
        detail={`${activeCards} activas, ${blockedCards} bloqueada${blockedCards !== 1 ? 's' : ''}`}
        icon={<CreditCard className="w-5 h-5 text-blue-400" />}
        detailColorClass="text-gray-400"
      />
    </div>
  );
};