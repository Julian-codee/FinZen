import { useState } from "react";
// Si ya no exportas a Excel, puedes eliminar la siguiente línea y la función exportToExcel
import * as XLSX from "xlsx";
import DateRangeSelector from "./DateRangeSelector";
import Filters from "./Filters";
import DashboardTabs from "./DashboardTabs";
import { Sidebar } from "../../../Ui/UiDashBoard/SideBar"; // Asegúrate de que la ruta sea correcta

const FinancialDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado del sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Datos de ejemplo para las gráficas, puedes eliminar si tu dashboard solo se enfoca en el informe
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

  // Función original para exportar a Excel (mantenla si la necesitas, de lo contrario elimínala)
  const exportToExcel = () => {
    const sheet1 = XLSX.utils.json_to_sheet(financialData);
    const sheet2 = XLSX.utils.json_to_sheet(categoryData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet1, "IngresosGastos");
    XLSX.utils.book_append_sheet(workbook, sheet2, "Categorías");
    XLSX.writeFile(workbook, "informe_financiero.xlsx");
  };

  // --- FUNCIÓN CLAVE PARA GENERAR Y DESCARGAR EL PDF DESDE EL BACKEND ---
  const generateAndDownloadPdf = async () => {
    try {
      // IMPORTANTE: Obtén tu token JWT.
      const token = localStorage.getItem("token"); 

      if (!token) {
        alert("No se encontró token de autenticación. Por favor, inicia sesión.");
        return;
      }

      // 1. **CAMBIO CRUCIAL**: Cambiado a método GET.
      // 2. **CAMBIO CRUCIAL**: La URL ya no incluye el ID de usuario, ya que el backend lo obtiene del token.
      const response = await fetch("http://localhost:8080/finzen/informes/generar", {
        method: "GET", // ¡CAMBIO AQUÍ: Ahora es GET!
        headers: {
          "Authorization": `Bearer ${token}`, // Esto es lo único que el backend necesita para el token
          // Ya no es necesario 'Content-Type: application/json' para una solicitud GET sin cuerpo.
        },
      });

      // Manejo de errores de la respuesta del servidor
      if (!response.ok) {
        let errorMessage = "Error desconocido al generar el informe.";
        try {
          // Intenta leer el cuerpo de la respuesta como texto para un mensaje de error detallado
          errorMessage = await response.text();
        } catch (e) {
          console.error("No se pudo leer el mensaje de error de la respuesta:", e);
        }
        console.error("Error al generar el informe PDF:", response.status, errorMessage);
        alert(`Error al generar el informe: ${response.status} - ${errorMessage}`);
        return;
      }

      // El backend devuelve un archivo PDF. Lo recibimos como un Blob.
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob); // Crea una URL temporal para el Blob

      // Crea un elemento 'a' (enlace) para simular la descarga
      const a = document.createElement("a");
      a.href = url;

      // Intenta obtener el nombre de archivo del encabezado 'Content-Disposition' del backend
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `informe_financiero_${Date.now()}.pdf`; // Nombre por defecto
      if (contentDisposition) {
        // Ejemplo: 'attachment; filename="informe_financiero_2025-07-03_user_1.pdf"'
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
        if (filenameMatch && filenameMatch.length > 1) {
          filename = filenameMatch[1]; // Usa el nombre de archivo del backend
        }
      }
      a.download = filename; 
      
      document.body.appendChild(a); // Añade el enlace al DOM (invisible)
      a.click(); // Simula un clic para iniciar la descarga
      a.remove(); // Elimina el enlace del DOM después de la descarga
      window.URL.revokeObjectURL(url); // Libera la URL del Blob para liberar memoria
      
      alert("Informe PDF generado y descargado exitosamente.");

    } catch (error) {
      console.error("Error de red o desconocido al generar el informe:", error);
      alert("Ocurrió un error inesperado al intentar generar el informe. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  return (
    // Contenedor principal que gestiona el layout del sidebar y el contenido
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/*
        El contenido principal del dashboard ajusta su margen izquierdo dinámicamente
        basado en el estado del sidebar que ahora gestiona este mismo componente.
      */}
      <div
        className={`
          flex-grow p-6 bg-[#020817] text-white
          transition-all duration-300 ease-in-out
          ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } // Ajusta el margen según el ancho del sidebar
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
          <button
            onClick={generateAndDownloadPdf} // ¡Este es el botón que llama a tu backend!
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            Generar informe 
          </button>
          {/* Si quieres mantener la opción de Excel, puedes agregar otro botón con la función exportToExcel */}
          {/*
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 ml-4 hover:bg-green-600 transition-colors"
          >
            Exportar a Excel (Local)
          </button>
          */}
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