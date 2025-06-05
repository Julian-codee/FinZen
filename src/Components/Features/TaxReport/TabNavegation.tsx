import React, { useState } from "react";

export const TabNavigation: React.FC = () => {
  // Estado para los botones de "Tipo de Vista"
  const [activeViewTab, setActiveViewTab] = useState("Formulario");

  // Estado para los botones de "Tipo de deducción"
  const [activeDeductionTab, setActiveDeductionTab] = useState("Personal");

  const tabs = [
    "Personal",
    "Ingresos",
    "Deducciones",
    "Patrimonio",
    "Impuestos",
  ];

  const typeView = ["Formulario", "Vista Previa"];

  return (
    <>
      {/*Tipo de Vista*/}
      {/* Añadimos 'w-fit' para que el div tome el ancho de su contenido */}
      <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg mb-6 w-fit">
        {typeView.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${
              activeViewTab === type
                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setActiveViewTab(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/*Tipo de deduccion*/}
      {/* Añadimos 'w-fit' para que el div tome el ancho de su contenido */}
      <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${
              activeDeductionTab === tab
                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setActiveDeductionTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
};
