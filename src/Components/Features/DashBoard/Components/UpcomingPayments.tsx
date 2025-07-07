
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
  payments?: UpcomingPayment[];
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

// Datos quemados de ejemplo
const mockPayments: UpcomingPayment[] = [
  {
    id: '1',
    description: 'Tarjeta de Crédito Bancolombia',
    amount: 850000,
    dueDate: '2025-07-15'
  },
  {
    id: '2',
    description: 'Préstamo Personal Davivienda',
    amount: 1200000,
    dueDate: '2025-07-18'
  },
  {
    id: '3',
    description: 'Cuota Vehículo',
    amount: 750000,
    dueDate: '2025-07-20'
  },
  {
    id: '4',
    description: 'Seguro de Vida',
    amount: 320000,
    dueDate: '2025-07-22'
  },
  {
    id: '5',
    description: 'Cuota Hipotecaria',
    amount: 2100000,
    dueDate: '2025-07-25'
  },
  {
    id: '6',
    description: 'Tarjeta Crédito BBVA',
    amount: 450000,
    dueDate: '2025-07-28'
  }
];

export const UpcomingPayments: React.FC<UpcomingPaymentsProps> = ({
  payments = mockPayments,
  title = "Próximos Pagos",
}) => {
  // Función para determinar el color del indicador según la fecha
  const getUrgencyColor = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 3) return 'bg-red-500';
    if (diffDays <= 7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Función para formatear la fecha de vencimiento
  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    const today = new Date();
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays < 0) return `${Math.abs(diffDays)} días vencido`;
    
    return date.toLocaleDateString('es-CO', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className=" rounded-xl p-4 border border-gray-700 shadow-lg flex-1 min-w-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-blue-500/20 rounded-md">
          <CalendarDays className="w-4 h-4 text-blue-400" />
        </div>
        <h2 className="text-white text-lg font-bold">{title}</h2>
      </div>
      
      {payments.length > 0 ? (
        <div className="space-y-2">
          {payments.slice(0, 5).map((payment) => (
            <div 
              key={payment.id} 
              className="group relative bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 rounded-md p-3 border border-gray-700/50 hover:border-gray-600"
            >
              {/* Indicador de urgencia */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-md ${getUrgencyColor(payment.dueDate)}`}></div>
              
              <div className="flex justify-between items-center ml-2">
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-white text-sm group-hover:text-blue-400 transition-colors block truncate">
                    {payment.description}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDueDate(payment.dueDate)}
                  </span>
                </div>
                
                <div className="text-right ml-2">
                  <span className="font-semibold text-sm text-red-400 group-hover:text-red-300 transition-colors">
                    {formatCurrency(payment.amount)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {payments.length > 5 && (
            <div className="text-center pt-2">
              <span className="text-xs text-gray-500">
                +{payments.length - 5} pagos más
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="p-3 bg-gray-800/30 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <CalendarDays className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="font-medium text-gray-400 mb-1 text-sm">Sin pagos pendientes</h3>
          <p className="text-xs">No hay próximos pagos programados.</p>
        </div>
      )}
    </div>
  );
};
