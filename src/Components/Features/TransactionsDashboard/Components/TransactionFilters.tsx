import React, { useState } from "react";
import { Calendar, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";

interface TransactionFiltersProps {
  activeTab: "Todas" | "Gastos" | "Ingresos";
  onTabChange: (tab: "Todas" | "Gastos" | "Ingresos") => void;
  dateRange:
    | "Hoy"
    | "Últimos 7 días"
    | "Últimos 30 días"
    | "Este mes"
    | "Personalizado";
  onDateRangeChange: (
    range:
      | "Hoy"
      | "Últimos 7 días"
      | "Últimos 30 días"
      | "Este mes"
      | "Personalizado"
  ) => void;
  sortBy: "Más recientes" | "Más antiguos" | "Mayor importe" | "Menor importe";
  onSortChange: (
    sort: "Más recientes" | "Más antiguos" | "Mayor importe" | "Menor importe"
  ) => void;
  onOpenAdvancedFilters?: () => void;
}

const tabs = ["Todas", "Gastos", "Ingresos"];
const dateRanges = [
  "Hoy",
  "Últimos 7 días",
  "Últimos 30 días",
  "Este mes",
  "Personalizado",
];
const sortOptions = [
  "Más recientes",
  "Más antiguos",
  "Mayor importe",
  "Menor importe",
];

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  activeTab,
  onTabChange,
  dateRange,
  onDateRangeChange,
  sortBy,
  onSortChange,
  onOpenAdvancedFilters,
}) => {
  const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);

  return (
    <section className="mb-6 px-4 sm:px-0 w-full">
      {/* Tabs */}
      <nav
        className="flex bg-[#0F1525] rounded-md p-0.5 mb-4 overflow-x-auto sm:w-fit custom-scroll-tabs"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() =>
                onTabChange(tab as TransactionFiltersProps["activeTab"])
              }
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
                isActive
                  ? "bg-gray-800 text-white shadow-md shadow-blue-500/50"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 w-full flex-wrap">
        {/* Date Range + Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Date Range Button */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setShowDateRangeDropdown((prev) => !prev)}
              type="button"
              className="inline-flex items-center justify-between sm:justify-center w-full sm:w-auto px-4 py-2 border border-gray-700 rounded-md bg-[#121827] text-white hover:bg-[#1e2533] text-sm transition focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
              aria-expanded={showDateRangeDropdown}
            >
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span className="truncate">{dateRange}</span>
            </button>
            {showDateRangeDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full sm:w-48 bg-[#0F1525] border border-gray-700 rounded-md shadow-lg z-10">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      onDateRangeChange(
                        range as TransactionFiltersProps["dateRange"]
                      );
                      setShowDateRangeDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botón Filtros Avanzados */}
          <button
            type="button"
            onClick={onOpenAdvancedFilters}
            className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-gray-700 rounded-md bg-[#121827] text-white hover:bg-[#1e2533] text-sm transition focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filtros
          </button>
        </div>

        {/* Ordenamiento */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ArrowDownWideNarrow className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <label htmlFor="sort-transactions" className="sr-only">
            Ordenar por
          </label>
          <select
            id="sort-transactions"
            className="w-full sm:w-auto bg-[#0D1119] border border-gray-700 text-white py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as TransactionFiltersProps["sortBy"])
            }
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default TransactionFilters;
