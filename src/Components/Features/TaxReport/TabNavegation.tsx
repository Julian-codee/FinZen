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
      <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg mb-6">
        {typeView.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeViewTab === type // Usa activeViewTab aquí
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setActiveViewTab(type)} // Actualiza activeViewTab
          >
            {type}
          </button>
        ))}
      </div>

      {/*Tipo de deduccion*/}
      <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeDeductionTab === tab // Usa activeDeductionTab aquí
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setActiveDeductionTab(tab)} // Actualiza activeDeductionTab
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
};
