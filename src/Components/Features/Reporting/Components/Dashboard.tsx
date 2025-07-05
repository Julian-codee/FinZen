import { useState } from "react";
import * as XLSX from "xlsx";
import DateRangeSelector from "./DateRangeSelector";
import Filters from "./Filters";
import DashboardTabs from "./DashboardTabs";
import { Sidebar } from "../../../Ui/UiDashBoard/SideBar";
import { Menu } from "lucide-react"; // Import the Menu icon

const FinancialDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado del sidebar gestionado aquí

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const financialData = [
    { month: "Ene", income: 40000, expenses: 2300 },
    { month: "Feb", income: 4500, expenses: 2500 },
    { month: "Mar", income: 4400, expenses: 3100 },
    { month: "Abr", income: 4300, expenses: 2700 },
    { month: "May", income: 4200, expenses: 3000 },
    { month: "Jun", income: 5500, expenses: 3400 },
  ];

  const categoryData = [
    { name: "Vivienda", value: 35, color: "#3B82F6" },
    { name: "Alimentación", value: 25, color: "#10B981" },
    { name: "Entretenimiento", value: 15, color: "#F59E0B" },
    { name: "Transporte", value: 12, color: "#EF4444" },
    { name: "Servicios", value: 8, color: "#8B5CF6" },
  ];

  const exportToExcel = () => {
    const sheet1 = XLSX.utils.json_to_sheet(financialData);
    const sheet2 = XLSX.utils.json_to_sheet(categoryData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet1, "IngresosGastos");
    XLSX.utils.book_append_sheet(workbook, sheet2, "Categorías");
    XLSX.writeFile(workbook, "informe_financiero.xlsx");
  };

  return (
    // Contenedor principal que gestiona el layout del sidebar y el contenido
    <div className="flex min-h-screen bg-[#020817] text-white">
      {" "}
      {/* Contenedor flex para el layout */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />{" "}
      {/* Sidebar dentro del dashboard */}
      {/*
        El contenido principal del dashboard ajusta su margen izquierdo dinámicamente
        basado en el estado del sidebar que ahora gestiona este mismo componente.
      */}
      <main
        className={`
          flex-grow p-4 sm:p-6 lg:p-8 // Added responsive padding
          transition-all duration-300 ease-in-out
          ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
          } // Ajusta el margen según el ancho del sidebar
          ml-0 // Default margin for small screens
        `}
      >
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md border border-gray-600 hover:bg-gray-800"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-center flex-grow">Informes</h1>
        </div>

        <h1 className="hidden lg:block text-3xl font-bold text-white">
          Informes
        </h1>
        <p className="mt-2 text-gray-400">
          Analiza tus finanzas con informes detallados y visualizaciones
          personalizables.
        </p>

        <div className="flex justify-between items-center my-6">
          <DateRangeSelector />
          <button
            onClick={exportToExcel}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            Exportar
          </button>
        </div>

        <Filters />
        <DashboardTabs
          financialData={financialData}
          categoryData={categoryData}
        />
      </main>
    </div>
  );
};

export default FinancialDashboard;
