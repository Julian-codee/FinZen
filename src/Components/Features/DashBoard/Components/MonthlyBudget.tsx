import React from 'react';
import { BudgetCategory } from '../Types/home';

interface MonthlyBudgetProps {
  budgetData: BudgetCategory[];
  title?: string;
  monthYear?: string; // Ej: "Marzo 2024"
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const MonthlyBudget: React.FC<MonthlyBudgetProps> = ({
  budgetData,
  title = "Presupuesto Mensual",
  monthYear = "Junio 2024",
}) => {
  // Componente interno para la barra de progreso
  const ProgressBar: React.FC<{ progress: number; }> = ({ progress }) => {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    const barColor = clampedProgress > 100 ? 'bg-red-500' : 'bg-blue-500';
    return (
      <div className="w-full bg-[#1a202c] rounded-full h-1.5">
        <div
          className={`${barColor} h-1.5 rounded-full`}
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className=" rounded-lg p-5 border border-[#1f2937] flex-1 min-w-[300px]">
      <h2 className="text-white text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-400 text-sm mb-4">
        Tu progreso de gastos para {monthYear}
      </p>

      <div className="space-y-4">
        {budgetData.length > 0 ? (
          budgetData.map(category => {
            const progress = (category.spent / category.limit) * 100;
            const progressColorClass = progress > 100 ? 'text-red-400' : 'text-blue-400';

            return (
              <div key={category.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white text-sm font-medium">{category.name}</span>
                  <span className={`text-sm font-semibold ${progressColorClass}`}>
                    {formatCurrency(category.spent)} / {formatCurrency(category.limit)}
                  </span>
                </div>
                <ProgressBar progress={progress} />
              </div>
            );
          })
        ) : (
          <p className="text-center py-6 text-gray-500">No hay categorías de presupuesto definidas.</p>
        )}
      </div>
    </div>
  );
};