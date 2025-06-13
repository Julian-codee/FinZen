import React from "react";

// Define las props que este componente recibirá del padre
interface TabNavigationProps {
  activeViewTab: string;
  setActiveViewTab: (tab: string) => void;
  activeDeductionTab: string; // Recibe el estado de la pestaña activa
  setActiveDeductionTab: (tab: string) => void; // Recibe la función para actualizar la pestaña activa
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeViewTab,
  setActiveViewTab,
  activeDeductionTab,
  setActiveDeductionTab,
}) => {
  // Define las pestañas principales
  const tabs = [
    "Personal",
    "Ingresos",
    "Deducciones",
    "Patrimonio",
    "Impuestos",
  ];

  // Define los tipos de vista
  const typeView = ["Formulario", "Vista Previa"];

  return (
    <>
      {/* Sección para los botones de "Tipo de Vista" */}
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

      {/* Sección para los botones de "Tipo de deducción" */}
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
            onClick={() => setActiveDeductionTab(tab)} // Llama a la función del padre para actualizar el estado
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
};
