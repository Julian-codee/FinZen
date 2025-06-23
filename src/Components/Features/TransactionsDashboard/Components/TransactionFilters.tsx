import React, { useState } from 'react'; // Importamos useState
import { Calendar, SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react';

interface TransactionFiltersProps {
  activeTab: string; // 'Todas', 'Gastos', 'Ingresos'
  onTabChange: (tab: 'Todas' | 'Gastos' | 'Ingresos') => void; // El tipo de tab ahora es más específico
  dateRange: string; // 'Hoy', 'Últimos 7 días', 'Últimos 30 días', 'Este mes', 'Personalizado'
  onDateRangeChange: (range: 'Hoy' | 'Últimos 7 días' | 'Últimos 30 días' | 'Este mes' | 'Personalizado') => void;
  sortBy: string; // 'Más recientes', 'Más antiguos', 'Mayor importe', 'Menor importe'
  onSortChange: (sort: 'Más recientes' | 'Más antiguos' | 'Mayor importe' | 'Menor importe') => void;
  // Puedes añadir un prop para mostrar/ocultar un modal de filtros avanzados si lo implementas
  onOpenAdvancedFilters?: () => void; // Función para abrir un modal de filtros
}

const tabs = ['Todas', 'Gastos', 'Ingresos'];
const dateRanges = ['Hoy', 'Últimos 7 días', 'Últimos 30 días', 'Este mes', 'Personalizado'];
const sortOptions = ['Más recientes', 'Más antiguos', 'Mayor importe', 'Menor importe'];

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  activeTab,
  onTabChange,
  dateRange,
  onDateRangeChange,
  sortBy,
  onSortChange,
  onOpenAdvancedFilters // Nuevo prop
}) => {
  // Estado para controlar la visibilidad del menú desplegable de rango de fechas
  const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);

  return (
    <section className="mb-6 px-4 sm:px-0">
      {/* Tabs */}
      <nav className="flex bg-[#0F1525] rounded-md p-0.5 mb-6 w-full sm:w-fit overflow-x-auto custom-scroll-tabs" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab as 'Todas' | 'Gastos' | 'Ingresos')} // Casteamos el tipo
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
                isActive
                  ? 'bg-gray-800 text-white shadow-md shadow-blue-500/50'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Date Range Button and Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setShowDateRangeDropdown(!showDateRangeDropdown)} // Alterna la visibilidad del dropdown
              type="button"
              className="inline-flex items-center justify-center border border-gray-700 rounded-md px-4 py-2 bg-[#121827] text-white hover:bg-[#1e2533] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 text-sm w-full"
              aria-label={`Seleccionar rango de fechas, rango actual: ${dateRange}`}
              aria-expanded={showDateRangeDropdown} // Para accesibilidad
            >
              <Calendar className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
              <span className="truncate">{dateRange}</span>
            </button>
            {showDateRangeDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-[#0F1525] border border-gray-700 rounded-md shadow-lg z-10 w-full sm:w-48">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      onDateRangeChange(range as 'Hoy' | 'Últimos 7 días' | 'Últimos 30 días' | 'Este mes' | 'Personalizado');
                      setShowDateRangeDropdown(false); // Cierra el dropdown al seleccionar
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filters Button (puedes añadir un modal aquí) */}
          <button
            type="button"
            className="inline-flex items-center justify-center border border-gray-700 rounded-md px-4 py-2 text-sm text-white bg-[#121827] hover:bg-[#1e2533] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 w-full sm:w-auto"
            aria-label="Abrir filtros avanzados"
            onClick={onOpenAdvancedFilters} // Llama a la función del padre para abrir un modal, por ejemplo
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" aria-hidden="true" />
            Filtros
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="sort-transactions" className="sr-only">Ordenar transacciones</label>
          <ArrowDownWideNarrow className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
          <select
            id="sort-transactions"
            className="bg-[#0D1119] border border-gray-700 text-white py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 w-full"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'Más recientes' | 'Más antiguos' | 'Mayor importe' | 'Menor importe')} // Casteamos el tipo
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default TransactionFilters;