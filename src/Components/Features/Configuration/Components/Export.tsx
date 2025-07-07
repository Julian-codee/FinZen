import { useState, useEffect } from "react";
import { Download, FileSpreadsheet, FileJson2, FileText } from "lucide-react";

export const Export = () => {
  const [format, setFormat] = useState<string>("xlsx"); // Valor predeterminado a 'xlsx'
  const [selectedData, setSelectedData] = useState<string[]>([]); // Permite selección múltiple, inicialmente vacío
  const [dateRange, setDateRange] = useState<string>("Todos los datos"); // Nuevo estado para el rango de fechas

  // URL base de tu backend
  const API_BASE_URL = "http://localhost:8080/finzen/informes";

  // Función para alternar la selección de datos
  const toggleDataOption = (option: string) => {
    setSelectedData((prev) => {
      if (option === "Informe Completo") {
        // Si se selecciona "Informe Completo", solo esa opción debe estar seleccionada
        return prev.includes(option) ? [] : [option];
      } else {
        // Si se selecciona otra opción, asegúrate de que "Informe Completo" no esté seleccionado
        const updatedSelection = prev.filter((item) => item !== "Informe Completo");
        if (updatedSelection.includes(option)) {
          return updatedSelection.filter((item) => item !== option); // Deseleccionar
        } else {
          return [...updatedSelection, option]; // Seleccionar
        }
      }
    });
  };

  // Efecto para asegurar que "Informe Completo" es exclusivo
  useEffect(() => {
    if (selectedData.includes("Informe Completo") && selectedData.length > 1) {
      setSelectedData(["Informe Completo"]);
    }
  }, [selectedData]);

  // --- Función para descargar el archivo desde el backend ---
  const downloadFileFromBackend = async (
    url: string,
    suggestedFileName: string,
    mimeType: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error(
          "No JWT token found. Redirecting to login or showing error."
        );
        alert("No estás autenticado. Por favor, inicia sesión de nuevo.");
        // Considera redirigir al usuario a la página de login aquí
        return;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: mimeType,
        },
      });

      if (!response.ok) {
        let errorBody = "Error desconocido";
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorJson = await response.json();
            errorBody = errorJson.error || JSON.stringify(errorJson);
          } else {
            errorBody = await response.text();
          }
        } catch (parseError) {
          console.warn("Could not parse error response:", parseError);
        }
        throw new Error(
          `(${response.status}) ${response.statusText}: ${errorBody}`
        );
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      let fileName = suggestedFileName;
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(
          /filename\*?=['"]?(?:UTF-8'')?([^"'\s;]+)['"]?/
        );
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = decodeURIComponent(fileNameMatch[1]);
        }
      }

      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(urlBlob);

      alert(`¡${fileName} exportado exitosamente!`);
    } catch (error: any) {
      console.error(`Error al descargar el archivo: ${error.message}`);
      alert(`Error al exportar datos: ${error.message}`);
    }
  };

  // --- Manejador para el botón de exportar ---
  const handleExportData = () => {
    if (selectedData.length === 0) {
      alert("Por favor, selecciona al menos un tipo de dato a exportar.");
      return;
    }

    // El rango de fecha solo se aplica a algunos tipos de informes
    const dateParam =
      dateRange === "Todos los datos" ? "" : `?dateRange=${dateRange}`;

    let url = "";
    let fileNameBase = "";
    let mimeType = "";
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Determinar MIME Type y extensión
    if (format === "xlsx") {
      mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    } else if (format === "pdf") {
      mimeType = "application/pdf";
    } else {
      alert(`El formato ${format} no está soportado en este momento.`);
      return;
    }

    // Construir la URL y el nombre del archivo basado en los datos seleccionados
    if (selectedData.includes("Informe Completo")) {
      fileNameBase = `informe_financiero_completo_${today}`;
      url = `${API_BASE_URL}/informe-completo/${format}`; // Usar el formato dinámico
    } else if (selectedData.length === 1) {
      // Si se selecciona solo una opción específica
      const dataType = selectedData[0];
      fileNameBase = `${dataType.toLowerCase().replace(/ /g, "_")}_usuario_${today}`;

      switch (dataType) {
        case "Transacciones": // Asumo que esto se refiere a Gastos e Ingresos
          // Si tienes un endpoint combinado para transacciones (gastos e ingresos)
          // url = `${API_BASE_URL}/transacciones/${format}${dateParam}`;
          // Por ahora, redirigiré a Presupuestos que los incluye
          alert("Para 'Transacciones' (Gastos e Ingresos), por favor, selecciona 'Presupuestos' para obtener el informe combinado.");
          return;
        case "Cuentas y tarjetas":
          // Estos informes no usan dateRange en el backend actual
          fileNameBase = `cuentas_y_tarjetas_usuario_${today}`;
          if (format === "xlsx") {
              url = `${API_BASE_URL}/cuentas/excel?${dateParam.substring(1)}` + // Incluye dateRange aunque no lo use internamente para Cuentas
                    `&${API_BASE_URL}/tarjetas/excel?${dateParam.substring(1)}`; // Tendríamos que combinar o crear un endpoint específico en el backend
              alert("La exportación combinada de 'Cuentas y Tarjetas' a Excel no está directamente soportada con un solo endpoint. Exporta por separado o selecciona 'Informe Completo'.");
              return;
          } else { // PDF
              alert("La exportación combinada de 'Cuentas y Tarjetas' a PDF no está directamente soportada con un solo endpoint. Exporta por separado o selecciona 'Informe Completo'.");
              return;
          }
          // Opción 1: Podrías exportar Cuentas y Tarjetas por separado.
          // Opción 2: Crear un endpoint único en el backend para ambos.
          // Por ahora, si seleccionan esto y no "Completo", les avisamos.
        case "Cuentas": // Endpoint individual para Cuentas
          url = `${API_BASE_URL}/cuentas/${format}${dateParam}`;
          break;
        case "Tarjetas": // Endpoint individual para Tarjetas
          url = `${API_BASE_URL}/tarjetas/${format}${dateParam}`;
          break;
        case "Presupuestos": // Incluye gastos e ingresos relacionados
          url = `${API_BASE_URL}/presupuestos/${format}${dateParam}`;
          break;
        case "Categorías":
          url = `${API_BASE_URL}/categorias/${format}${dateParam}`;
          break;
        case "Inversiones":
          url = `${API_BASE_URL}/inversiones/${format}${dateParam}`;
          break;
        default:
          alert("Tipo de dato no reconocido: " + dataType);
          return;
      }
    } else {
      alert("Por favor, selecciona 'Informe Completo' o un único tipo de dato específico para exportar.");
      return;
    }

    if (url) {
      downloadFileFromBackend(url, `${fileNameBase}.${format}`, mimeType);
    } else {
      alert("No se pudo determinar la acción de exportación para la combinación seleccionada.");
    }
  };

  return (
    <div className="text-white p-6 rounded-lg border border-white/10">
      <h2 className="text-2xl font-semibold flex items-center mb-1">
        <Download className="mr-2 text-blue-500" />
        Exportar Datos
      </h2>
      <p className="text-gray-400 mb-6">
        Exporta tus datos financieros para hacer copias de seguridad o análisis
        externos.
      </p>

      {/* Formato de exportación */}
      <div className="mb-6">
        <p className="font-semibold mb-3">Formato de exportación</p>

        {/*Exportaciones*/}
        <div className="space-y-2 text-sm">
          {/*CSV (Deshabilitado temporalmente) */}
          <label className="flex items-center space-x-3 text-gray-500 cursor-not-allowed">
            <input
              type="radio"
              name="format"
              checked={format === "csv"}
              onChange={() => setFormat("csv")}
              className="accent-blue-500"
              disabled // Deshabilitado porque el backend no lo soporta
            />
            <span className="flex items-center">
              <FileSpreadsheet className="w-4 h-4 mr-1 text-gray-500" />
              CSV (valores separados por comas)
            </span>
          </label>

          {/*Excel*/}
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="format"
              checked={format === "xlsx"}
              onChange={() => setFormat("xlsx")}
              className="accent-blue-500"
            />
            <span className="flex items-center">
              <FileSpreadsheet className="w-4 h-4 mr-1 text-blue-400" />
              Excel (.xlsx)
            </span>
          </label>

          {/*PDF*/}
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="format"
              checked={format === "pdf"}
              onChange={() => setFormat("pdf")}
              className="accent-blue-500"
            />
            <span className="flex items-center">
              <FileText className="w-4 h-4 mr-1 text-red-500" />
              PDF
            </span>
          </label>

          {/*JSON (Deshabilitado temporalmente) */}
          <label className="flex items-center space-x-3 text-gray-500 cursor-not-allowed">
            <input
              type="radio"
              name="format"
              checked={format === "json"}
              onChange={() => setFormat("json")}
              className="accent-blue-500"
              disabled // Deshabilitado porque el backend no lo soporta
            />
            <span className="flex items-center">
              <FileJson2 className="w-4 h-4 mr-1 text-gray-500" />
              JSON
            </span>
          </label>
        </div>
      </div>

      {/* Rango de fechas */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Rango de fechas</p>
        <select
          className="w-full bg-[#0f172a] text-white p-2 rounded border border-white/10 text-sm"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          // Deshabilita el rango de fechas si "Informe Completo" está seleccionado
          disabled={selectedData.includes("Informe Completo")}
        >
          <option value="Todos los datos">Todos los datos</option>
          <option value="Últimos 30 días">Últimos 30 días</option>
          <option value="Este año">Este año</option>
          <option value="Personalizado">Personalizado (YYYY-MM-DD_YYYY-MM-DD)</option>
        </select>
        {dateRange === "Personalizado" && (
          <p className="text-xs text-gray-400 mt-1">
            Formato: YYYY-MM-DD_YYYY-MM-DD (ej. 2024-01-01_2024-12-31)
          </p>
        )}
      </div>

      {/* Datos a exportar */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Datos a exportar</p>
        <div className="space-y-2 text-sm">
          {[
            "Informe Completo",
            "Cuentas", // Cambiado de "Cuentas y tarjetas" para ser individual
            "Tarjetas", // Añadido para ser individual
            "Presupuestos",
            "Categorías",
            "Inversiones",
          ].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedData.includes(option)}
                onChange={() => toggleDataOption(option)}
                className="accent-blue-500"
                // Deshabilitar checkboxes si "Informe Completo" está seleccionado y no es él mismo
                disabled={
                  selectedData.includes("Informe Completo") &&
                  option !== "Informe Completo"
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botón de exportar */}
      <div className="text-right">
        <button
          onClick={handleExportData}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white text-sm flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar datos
        </button>
      </div>
    </div>
  );
};