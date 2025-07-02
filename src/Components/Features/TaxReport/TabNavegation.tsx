import React from "react";

interface TabNavigationProps {
  activeViewTab: string;
  setActiveViewTab: (tab: string) => void;
  activeDeductionTab: string;
  setActiveDeductionTab: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeViewTab,
  setActiveViewTab,
  activeDeductionTab,
  setActiveDeductionTab,
}) => {
  const tabs = [
    "Personal",
    "Ingresos",
    "Deducciones",
    "Patrimonio",
    "Impuestos",
  ];
  const typeView = ["Formulario", "Vista Previa"];

  return (
    <div className="space-y-4 p-5 md:p-0">
      {/* Tipo de Vista */}
      <div className="flex flex-col md:flex-row w-full mb-5 md:mb-3  md:w-fit gap-y-2 md:gap-y-0 md:gap-x-2 bg-gray-800 p-2 rounded-lg md:overflow-x-auto md:scrollbar-hide">
        {typeView.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out w-full md:w-auto ${
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

      {/* Tabs de Deducciones */}
      <div
        className="grid grid-cols-2 gap-2
    md:flex md:flex-row md:gap-x-2 
    md:bg-gray-800 md:p-2 md:rounded-lg 
    md:overflow-x-auto md:scrollbar-hide md:w-fit
  "
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out w-full md:w-auto border border-white/30 md:border-none ${
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
    </div>
  );
};
