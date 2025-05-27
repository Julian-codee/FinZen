import React from 'react';

interface Movement {
  id: number;
  description: string;
  date: string; // formato: "14 mar 2024"
  amount: number;
}

interface MovementsModalProps {
  visible: boolean;
  onClose: () => void;
  movements: Movement[];
}

const MovementsModal = ({ visible, onClose, movements }: MovementsModalProps) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-[#0f172a] p-6 rounded-lg w-[600px] text-white shadow-xl relative">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-1">Movimientos de Cuenta Corriente</h3>
        <p className="text-sm text-gray-400 mb-4">Historial de transacciones de tu cuenta</p>

        {/* Filtros (sin funcionalidad por ahora) */}
        <div className="flex gap-2 mb-4">
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Todos</button>
          <button className="bg-gray-700 px-3 py-1 rounded text-sm">Ingresos</button>
          <button className="bg-gray-700 px-3 py-1 rounded text-sm">Gastos</button>
          <button className="bg-gray-700 px-3 py-1 rounded text-sm">Transferencias</button>
          <button className="ml-auto bg-blue-600 px-3 py-1 rounded text-sm">+ Añadir</button>
        </div>

        {/* Lista de movimientos */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-400 border-b border-gray-700 pb-1">
            <span>Descripción</span>
            <span>Fecha</span>
            <span>Importe</span>
          </div>
          {movements.map((m) => (
            <div
              key={m.id}
              className="flex justify-between items-center border-b border-gray-800 py-2 text-sm"
            >
              <span
                className={`${
                  m.amount > 0
                    ? 'text-green-400'
                    : m.description.toLowerCase() === 'transferencia'
                    ? 'text-blue-400'
                    : 'text-red-400'
                }`}
              >
                {m.description}
              </span>
              <span className="text-gray-400">{m.date}</span>
              <span
                className={`font-semibold ${
                  m.amount > 0
                    ? 'text-green-400'
                    : m.description.toLowerCase() === 'transferencia'
                    ? 'text-blue-400'
                    : 'text-white'
                }`}
              >
                {m.amount > 0 ? `+$${m.amount.toFixed(2)}` : `$${Math.abs(m.amount).toFixed(2)}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovementsModal;
