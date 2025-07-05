import { useState } from "react";
import DateRangeSelector from "./DateRangeSelector";
import Filters from "./Filters";
import DashboardTabs from "./DashboardTabs";
import { Sidebar } from "../../../Ui/UiDashBoard/SideBar";

const FinancialDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("pdf"); // Estado para el formato seleccionado (pdf o excel)

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

  const downloadFileFromBackend = async (url, defaultFilename, alertMessage, mimeType) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No se encontró token de autenticación. Por favor, inicia sesión.");
        return;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errorMessage = `Error desconocido al generar el informe desde ${url}.`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = await response.text();
        }
        console.error(`Error al generar el informe desde ${url}:`, response.status, errorMessage);
        alert(`Error al generar el informe: ${response.status} - ${errorMessage}`);
        return;
      }

      const blob = await response.blob();
      const fileUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = fileUrl;

      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = defaultFilename;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
        if (filenameMatch && filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }
      a.download = filename; 
      
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(fileUrl);
      
      alert(alertMessage);

    } catch (error) {
      console.error("Error de red o desconocido al generar el informe:", error);
      alert("Ocurrió un error inesperado al intentar generar el informe. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const handleGenerateReport = () => {
    const today = new Date().toISOString().slice(0,10); // Formato YYYY-MM-DD

    if (selectedFormat === "pdf") {
      const url = "http://localhost:8080/finzen/informes/generar";
      const defaultFilename = `informe_financiero_general_${today}.pdf`;
      const alertMessage = "Informe PDF general generado y descargado exitosamente.";
      const mimeType = "application/pdf";
      downloadFileFromBackend(url, defaultFilename, alertMessage, mimeType);
    } else if (selectedFormat === "excel") {
      const url = "http://localhost:8080/finzen/informes/excel-informe-completo";
      const defaultFilename = `informe_presupuestos_general_${today}.xlsx`;
      const alertMessage = "Informe Excel de presupuestos generado y descargado exitosamente.";
      const mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      downloadFileFromBackend(url, defaultFilename, alertMessage, mimeType);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`
          flex-grow p-6 bg-[#020817] text-white
          transition-all duration-300 ease-in-out
          ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }
        `}
      >
        <div className="flex items-center gap-4 px-4 pt-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Informes</h1>
            <p className="mb-12 text-white/70 text-lg">
              Analiza tus finanzas con informes detallados y visualizaciones
              personalizables.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center my-6">
          <DateRangeSelector />
          <div className="flex items-center gap-4"> {/* Alineación de select y botón */}
            <label htmlFor="report-format" className="text-white/70">Formato:</label>
            <select
              id="report-format"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="p-2 rounded-md bg-[#1f2937] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>

            <button
              onClick={handleGenerateReport}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors"
            >
              Generar Informe
            </button>
          </div>
        </div>

        <Filters />
        <DashboardTabs
          financialData={financialData}
          categoryData={categoryData}
        />
      </div>
    </div>
  );
};

export default FinancialDashboard;