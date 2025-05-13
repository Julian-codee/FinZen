import { useState } from "react";
import DateRangeSelector from "./DateRangeSelector";
import Filters from "./Filters";
import DashboardTabs from "./DashboardTabs";


export default function FinancialDashboard() {
  

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6">
      <div>
        <h1 className="text-3xl font-bold">Informes</h1>
        <p className="mt-2 text-gray-400">
          Analiza tus finanzas con informes detallados y visualizaciones
          personalizables.
        </p>
      </div>

      <div className="flex justify-between items-center my-6">
        <DateRangeSelector />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
          Exportar
        </button>
      </div>
      <Filters />
      <DashboardTabs />
    </div>
  );
}
