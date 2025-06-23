import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, SlidersHorizontal } from 'lucide-react'; // Importa los iconos de Lucide React

const TransactionsHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-4 sm:px-0"> {/* Ajustes para responsividad y padding */}
      <div className="mb-4 sm:mb-0"> {/* Margen inferior para separar el texto de los botones en móvil */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Transacciones</h1>
        <p className="mt-2 text-gray-400 max-w-lg leading-relaxed text-sm sm:text-base"> {/* Ajuste de tamaño de fuente */}
          Visualiza y gestiona todas tus transacciones financieras.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"> {/* Contenedor de botones, flex-col para apilar en móvil */}
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-900 focus:ring-2 text-white px-5 py-2.5 rounded-md flex items-center justify-center gap-2 text-sm font-semibold shadow-md transition-all duration-200 w-full sm:w-auto" // py más grande, w-full en móvil
          onClick={() => navigate('/AddTransaction')}
        >
          <Plus className="w-5 h-5" aria-hidden="true" /> {/* Icono de Lucide React */}
          Nueva Transacción
        </button>

        <button
          type="button"
          className="bg-transparent border border-gray-600 hover:border-gray-500 hover:bg-gray-700/30 focus:ring-gray-500 focus:ring-offset-gray-900 focus:ring-2 text-white p-2.5 rounded-md transition-all duration-200 flex items-center justify-center w-full sm:w-auto" // py más grande, w-full en móvil, hover de fondo
          aria-label="Abrir filtros"
        >
          <SlidersHorizontal className="w-5 h-5" aria-hidden="true" /> {/* Icono de Lucide React */}
          <span className="sr-only">Abrir filtros</span> {/* Texto solo para lectores de pantalla */}
        </button>
      </div>
    </header>
  );
};

export default TransactionsHeader;