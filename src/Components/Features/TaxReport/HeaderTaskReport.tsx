import { CalendarRange, Download, Printer, Share2 } from "lucide-react";
import React, { useState } from "react"; // Importa useState

export const Header: React.FC = () => {
  // Estado para almacenar el año seleccionado en el select
  const [selectedYear, setSelectedYear] = useState<string>(""); // Inicializa con un string vacío para representar "ningún año seleccionado"

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-8 gap-4 px-4 pt-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Informe Fiscal</h1>
        <p className="text-white/70 mb-12 text-lg">
          Genera tu declaración de renta con la información de tus finanzas
          personales.
        </p>
      </div>

      {/*Selector para la fecha*/}
      <div className="flex space-x-6">
        <div className="relative flex items-center border border-white/50 bg-[#111827] rounded-md">
          {" "}
          {/* Contenedor para el select y el icono */}
          {!selectedYear && ( // Muestra el icono solo si no hay un año seleccionado
            <CalendarRange className="absolute  w-4 left-3 text-gray-400 pointer-events-none" />
          )}
          <select
            className={`p-2 rounded-md hover:bg-gray-700 appearance-none pr-8 cursor-pointer ${
              !selectedYear ? "pl-9" : "pl-2"
            }`} // Ajusta el padding izquierdo si el icono está presente
            value={selectedYear} // Controla el valor del select con el estado
            onChange={handleYearChange} // Maneja el cambio del select
          >
            <option value="" disabled>
              Año
            </option>{" "}
            {/* Opción por defecto oculta */}
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>

        {/*Boton Para Imprimir*/}
        <button className="p-2 rounded-md hover:bg-gray-700 border border-white/50 bg-[#111827] cursor-pointer">
          <Printer className="w-4 h-4 text-gray-400" />
        </button>
        {/* Botón para descargar */}
        <button className="p-2 rounded-md hover:bg-gray-700 border border-white/50 bg-[#111827] cursor-pointer">
          <Download className="w-4 h-4 text-gray-400" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-700 border border-white/50 bg-[#111827] cursor-pointer">
          <Share2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};
