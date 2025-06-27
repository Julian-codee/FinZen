// components/dashboard/UpcomingPayments.tsx
import React from 'react';
import { CalendarDays } from 'lucide-react'; // Ejemplo de icono

interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: string; // Formato 'YYYY-MM-DD'
}

interface UpcomingPaymentsProps {
  payments: UpcomingPayment[];
  title?: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const UpcomingPayments: React.FC<UpcomingPaymentsProps> = ({
  payments,
  title = "Próximos Pagos",
}) => {
  return (
    <div className=" rounded-lg p-5 border border-[#1f2937] flex-1 min-w-[300px]">
      <h2 className="text-white text-lg font-semibold mb-2">{title}</h2>
      
      {payments.length > 0 ? (
        <div className="space-y-3">
          {payments.map(payment => (
            <div key={payment.id} className="flex justify-between items-center text-gray-300 text-sm border-b border-gray-700 pb-2 last:border-b-0 last:pb-0">
              <div className="flex flex-col">
                <span className="font-medium text-white">{payment.description}</span>
                <span className="text-xs text-gray-500">Vence: {payment.dueDate}</span>
              </div>
              <span className="font-semibold text-red-400">{formatCurrency(payment.amount)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <CalendarDays className="w-8 h-8 mx-auto mb-2 text-gray-600" />
          <p>No hay próximos pagos programados.</p>
        </div>
      )}
    </div>
  );
};