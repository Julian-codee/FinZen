import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, SlidersHorizontal } from 'lucide-react';

const TransactionsHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-8 px-4 sm:px-0">
 

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => navigate('/AddTransaction')}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white px-5 py-2.5 rounded-md flex items-center justify-center gap-2 text-sm font-semibold shadow-md transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Nueva Transacción
        </button>

        <button
          type="button"
          className="w-full sm:w-auto bg-transparent border border-gray-600 hover:border-gray-500 hover:bg-gray-700/30 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-white px-4 py-2.5 rounded-md flex items-center justify-center gap-2 transition-all duration-200"
          aria-label="Abrir filtros"
        >
          <SlidersHorizontal className="w-5 h-5" />
          {/* Mostrar texto solo en móvil */}
          <span className="block sm:hidden">Filtros</span>
        </button>
      </div>
    </header>
  );
};

export default TransactionsHeader;
