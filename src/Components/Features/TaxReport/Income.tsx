import React from "react";
import { CircleDollarSign } from "lucide-react";

export const IncomeForm: React.FC = () => {
  return (
    <>
      {/* Encabezado de la sección */}
      <div className="flex items-center text-gray-400 -mb-10 md:mb-0 mt-8 sm:mt-12 p-6 md:p-0">
        <CircleDollarSign className="text-green-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Ingresos</h2>
      </div>

      {/* Descripción */}
      <p className="text-gray-400 mb-4 md:mb-12 text-sm sm:text-base p-6 md:p-0">
        Registra todos tus ingresos recibidos durante el año 2024
      </p>

      {/* Formulario de ingresos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6 md:p-0">
        <InputField id="ingresosLaborales" label="Ingresos Laborales" />
        <InputField id="trabajoIndependiente" label="Trabajo independiente" />
        <InputField id="arrendamientos" label="Arrendamientos" />
        <InputField id="dividendos" label="Dividendos" />
        <InputField id="otrosIngresos" label="Otros Ingresos" />
        <InputField id="intereses" label="Intereses" />
      </div>
    </>
  );
};

// Componente reutilizable para los campos
const InputField = ({ id, label }: { id: string; label: string }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-white/80 text-sm font-medium mb-1"
    >
      {label}
    </label>
    <input
      type="number"
      id={id}
      className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500 text-white placeholder-gray-400"
      placeholder="0"
    />
  </div>
);
