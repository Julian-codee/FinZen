import { useState } from 'react';
import { Calendar, X } from 'lucide-react';

interface Movement {
  id: string | number;
  description: string;
  amount: number;
  date: string; // Añadimos la fecha aquí
  type: 'Ingreso' | 'Gasto' | 'Transferencia'; // Para filtro
}

interface Account {
  title: string;
  movements: Movement[];
}

interface MovementsModalProps {
  open: boolean;
  onClose: () => void;
  account: Account | null;
}

const MovementsModal = ({ open, onClose, account }: MovementsModalProps) => {
  const [filter, setFilter] = useState<'Todos' | 'Ingreso' | 'Gasto' | 'Transferencia'>('Todos');

  if (!open || !account) return null;

  const filteredMovements =
    filter === 'Todos'
      ? account.movements
      : account.movements.filter((mov) => mov.type === filter);

  const formatAmount = (amount: number) =>
    amount > 0 ? `+$${amount.toLocaleString('es-CO', { minimumFractionDigits: 2 })}` : `$${Math.abs(amount).toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;

  return (
    <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50">
      <div className="bg-[#020817] border border-white/20 text-white p-6 rounded-lg w-[600px] shadow-xl relative">
        {/* Botón cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-400">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-1">Movimientos de {account.title}</h2>
        <p className="text-sm text-gray-400 mb-5">Historial de transacciones de tu cuenta</p>

        {/* Filtros */}
        <div className="flex gap-3 mb-4">
          {['Todos', 'Ingreso', 'Gasto', 'Transferencia'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
          <button className="ml-auto bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md text-sm font-medium">
            + Añadir
          </button>
        </div>

        {/* Encabezados de tabla */}
        <div className="flex justify-between text-sm text-gray-400 py-2 border-b border-gray-700">
          <span>Descripción</span>
          <span>Fecha</span>
          <span>Importe</span>
        </div>

        {/* Lista de movimientos */}
        <ul className="divide-y divide-gray-700 max-h-60 overflow-auto">
          {filteredMovements.length > 0 ? (
            filteredMovements.map((mov) => (
              <li key={mov.id} className="flex justify-between items-center py-3 text-sm">
                <span className={`font-semibold ${
                  mov.type === 'Ingreso'
                    ? 'text-green-400'
                    : mov.type === 'Gasto'
                    ? 'text-red-400'
                    : 'text-blue-400'
                }`}>
                  {mov.description}
                </span>
                <span className="flex items-center gap-1 text-gray-300">
                  <Calendar size={16} />
                  {mov.date}
                </span>
                <span className={`font-semibold ${
                  mov.amount > 0 ? 'text-green-400' : mov.type === 'Transferencia' ? 'text-blue-400' : 'text-red-400'
                }`}>
                  {formatAmount(mov.amount)}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-400 py-4">No hay movimientos para esta cuenta.</li>
          )}
        </ul>

        {/* Botón cerrar */}
        <button
          className="mt-6 px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-sm"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default MovementsModal;
