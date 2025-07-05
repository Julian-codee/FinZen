import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Transaction } from "../Types/home";

interface SummaryCardsProps {
  transactions: Transaction[];
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ transactions }) => {
  const [totalAccounts, setTotalAccounts] = useState<number>(0);

  // ✅ Fetch de cuentas solo para la tarjeta de "Tarjetas"
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token no encontrado");
          return;
        }

        const cuentasResponse = await fetch(
          "http://localhost:8080/finzen/cuentas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cuentasResponse.ok) {
          const cuentasData = await cuentasResponse.json();
          setTotalAccounts(cuentasData.length); // Solo se usa la cantidad
        } else {
          console.error("Error al obtener cuentas:", cuentasResponse.status);
        }
      } catch (error) {
        console.error("Error en la solicitud de cuentas:", error);
      }
    };

    fetchAccounts();
  }, []);

  const currentMonthIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentMonthExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = transactions.reduce((sum, t) => {
    return t.type === "income" ? sum + t.amount : sum - t.amount;
  }, 0);

  const incomeChange = 0;
  const expenseChange = 0;
  const balanceChange = 0;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? "+" : "";
    return `${sign}${percentage.toFixed(1)}%`;
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

  const SummaryCardItem: React.FC<{
    title: string;
    value: string;
    detail?: string;
    icon?: React.ReactNode;
    valueColorClass?: string;
    detailColorClass?: string;
    gradientFrom?: string;
    gradientTo?: string;
    percentage?: number;
  }> = ({
    title,
    value,
    detail,
    icon,
    valueColorClass,
    detailColorClass,
    gradientFrom,
    gradientTo,
    percentage,
  }) => (
    <div className="group relative overflow-hidden">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          gradientFrom || "from-slate-900/80"
        } ${
          gradientTo || "to-slate-800/50"
        } rounded-2xl transition-all duration-300 group-hover:scale-[1.02]`}
      ></div>

      {/* Border gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700/50 via-transparent to-slate-600/30 p-[1px]">
        <div className="h-full w-full rounded-2xl bg-slate-900/90 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-gray-400 text-sm font-medium tracking-wide">
              {title}
            </h3>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:border-slate-600/50 transition-colors">
            {icon}
          </div>
        </div>

        {/* Value */}
        <div
          className={`text-white text-2xl lg:text-3xl font-bold mb-3 ${valueColorClass} tracking-tight`}
        >
          {value}
        </div>

        {/* Detail with percentage */}
        {detail && (
          <div className="flex items-center gap-2">
            {percentage !== undefined && getPercentageIcon(percentage)}
            <p className={`text-sm font-medium ${detailColorClass}`}>
              {detail}
            </p>
          </div>
        )}

        {/* Decorative element */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <SummaryCardItem
        title="Saldo Total"
        value={formatCurrency(totalBalance)}
        detail={`${formatPercentage(balanceChange)} desde el mes pasado`}
        icon={<DollarSign className="w-5 h-5 text-blue-400" />}
        detailColorClass={getPercentageColor(balanceChange)}
        gradientFrom="from-blue-900/20"
        gradientTo="to-slate-900/80"
        percentage={balanceChange}
      />

      <SummaryCardItem
        title="Ingresos"
        value={formatCurrency(currentMonthIncome)}
        detail={`${formatPercentage(incomeChange)} desde el mes pasado`}
        icon={<TrendingUp className="w-5 h-5 text-green-400" />}
        detailColorClass={getPercentageColor(incomeChange)}
        gradientFrom="from-green-900/20"
        gradientTo="to-slate-900/80"
        percentage={incomeChange}
      />

      <SummaryCardItem
        title="Gastos"
        value={formatCurrency(currentMonthExpense)}
        detail={`${formatPercentage(expenseChange)} desde el mes pasado`}
        icon={<TrendingDown className="w-5 h-5 text-red-400" />}
        detailColorClass={getPercentageColor(expenseChange)}
        gradientFrom="from-red-900/20"
        gradientTo="to-slate-900/80"
        percentage={expenseChange}
      />

      {/* ✅ Cambiado para mostrar cuentas en lugar de tarjetas */}
      <SummaryCardItem
        title="Cuentas"
        value={totalAccounts.toString()}
        detail="Activas actualmente"
        icon={<CreditCard className="w-5 h-5 text-purple-400" />}
        detailColorClass="text-gray-400"
        gradientFrom="from-purple-900/20"
        gradientTo="to-slate-900/80"
      />
    </div>
  );
};
