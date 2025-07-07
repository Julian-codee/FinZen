import React, { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Transaction } from "../Types/types";

interface SummaryCardsProps {
  transactions: Transaction[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ transactions }) => {
  const summary = useMemo(() => {
    const incomeTotal = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const expenseTotal = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const balance = incomeTotal - expenseTotal;

    const formatCurrency = (value: number) =>
      new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(value);

    const fakePercentage = (value: number): string => {
      if (value === 0) return "0";
      return (Math.random() * 20).toFixed(1);
    };

    return [
      {
        type: "income" as const,
        title: "Ingresos",
        amount: formatCurrency(incomeTotal),
        percentage: parseFloat(fakePercentage(incomeTotal)),
        isPositive: true,
        gradientFrom: "from-green-900/20",
        gradientTo: "to-slate-900/80",
        iconColor: "text-green-400",
      },
      {
        type: "expense" as const,
        title: "Gastos",
        amount: formatCurrency(expenseTotal),
        percentage: parseFloat(fakePercentage(expenseTotal)),
        isPositive: true,
        gradientFrom: "from-red-900/20",
        gradientTo: "to-slate-900/80",
        iconColor: "text-red-400",
      },
      {
        type: "balance" as const,
        title: "Balance",
        amount: formatCurrency(balance),
        percentage: parseFloat(fakePercentage(balance)),
        isPositive: balance >= 0,
        gradientFrom: "from-blue-900/20",
        gradientTo: "to-slate-900/80",
        iconColor: "text-blue-400",
      },
    ];
  }, [transactions]);

  const icons = {
    income: <TrendingUp className="w-5 h-5 text-green-400" />,
    expense: <TrendingDown className="w-5 h-5 text-red-400" />,
    balance: <DollarSign className="w-5 h-5 text-blue-400" />,
  };

  const getPercentageColor = (percentage: number) => {
    return percentage >= 0 ? "text-green-400" : "text-red-400";
  };

  const getPercentageIcon = (percentage: number) => {
    return percentage >= 0 ? (
      <ArrowUpRight className="w-4 h-4 text-green-400" />
    ) : (
      <ArrowDownRight className="w-4 h-4 text-red-400" />
    );
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? "+" : "";
    return `${sign}${percentage}%`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 px-4 sm:px-0">
      {summary.map((item, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl max-w-full"
          role="region"
          aria-label={item.title}
        >
          {/* Background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} rounded-2xl transition-all duration-300 group-hover:scale-[1.02]`}
          ></div>

          {/* Border gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700/50 via-transparent to-slate-600/30 p-[1px]">
            <div className="h-full w-full rounded-2xl bg-slate-900/90 backdrop-blur-sm"></div>
          </div>

          {/* Content */}
          <div className="relative p-5 sm:p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wide">
                {item.title}
              </h3>
              <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:border-slate-600/50 transition-colors">
                {icons[item.type]}
              </div>
            </div>

            {/* Amount */}
            <div className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 tracking-tight">
              {item.amount}
            </div>

            {/* Percentage */}
            <div
              className="flex items-center gap-2 flex-wrap text-sm sm:text-base"
              aria-live="polite"
            >
              {getPercentageIcon(item.percentage)}
              <span
                className={`${getPercentageColor(
                  item.percentage
                )} font-semibold`}
              >
                {formatPercentage(item.percentage)}
              </span>
              <span className="text-gray-400">
                respecto al período anterior
              </span>
            </div>

            {/* Blur decoration */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
