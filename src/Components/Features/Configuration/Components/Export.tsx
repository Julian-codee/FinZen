import { useState } from "react";
import { Download, FileSpreadsheet, FileJson2, FileText } from "lucide-react";

export const Export = () => {
  const [format, setFormat] = useState("csv");
  const [selectedData, setSelectedData] = useState<string[]>([
    "Transacciones",
    "Cuentas y tarjetas",
    "Presupuestos",
    "Categorías",
    "Inversiones",
  ]);


  {/* Toggle itema*/}
  const toggleDataOption = (option: string) => {
    setSelectedData((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
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
          {/*SVC*/}
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="format"
              checked={format === "csv"}
              onChange={() => setFormat("csv")}
              className="accent-blue-500"
            />
            <span className="flex items-center">
              <FileSpreadsheet className="w-4 h-4 mr-1 text-green-500" />
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

          {/*JSON*/}
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="format"
              checked={format === "json"}
              onChange={() => setFormat("json")}
              className="accent-blue-500"
            />
            <span className="flex items-center">
              <FileJson2 className="w-4 h-4 mr-1 text-yellow-400" />
              JSON
            </span>
          </label>
        </div>
      </div>

      {/* Rango de fechas */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Rango de fechas</p>
        <select className="w-full bg-[#0f172a] text-white p-2 rounded border border-white/10 text-sm">
          <option>Todos los datos</option>
          <option>Últimos 30 días</option>
          <option>Este año</option>
          <option>Personalizado</option>
        </select>
      </div>

      {/* Datos a exportar */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Datos a exportar</p>
        <div className="space-y-2 text-sm">
          {[
            "Transacciones",
            "Cuentas y tarjetas",
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
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botón de exportar */}
      <div className="text-right">
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white text-sm flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Exportar datos
        </button>
      </div>
    </div>
  );
};
