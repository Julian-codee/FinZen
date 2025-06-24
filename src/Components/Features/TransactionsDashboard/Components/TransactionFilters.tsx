import React from 'react';

interface TransactionFiltersProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const tabs = ['Todas', 'Gastos', 'Ingresos'];

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  activeTab,
  onTabChange,
  dateRange,
  onDateRangeChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <section className="mb-6">
      {/* Tabs */}
      <nav className="flex bg-[#0F1525] rounded-md p-1 mb-6 w-fit" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
        <div className="flex items-center gap-4">
          {/* Date Range */}
          <button
            onClick={() => onDateRangeChange(dateRange)}
            type="button"
            className="inline-flex items-center justify-center border border-gray-700 rounded-md px-4 py-2 bg-[#121827] hover:bg-[#1e2533] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            aria-label={`Seleccionar rango de fechas, rango actual: ${dateRange}`}
          >
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-white">{dateRange}</span>
          </button>

          {/* Filters Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center border border-gray-700 rounded-md px-4 py-2 text-sm text-white bg-[#121827] hover:bg-[#1e2533] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            aria-label="Abrir filtros avanzados"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            Filtros
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v14m8-14v14" />
          </svg>
          <select
            className="bg-[#0D1119] border border-gray-700 text-white py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Ordenar transacciones"
          >
            <option value="Más recientes">Más recientes</option>
            <option value="Más antiguos">Más antiguos</option>
            <option value="Mayor importe">Mayor importe</option>
            <option value="Menor importe">Menor importe</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default TransactionFilters;
