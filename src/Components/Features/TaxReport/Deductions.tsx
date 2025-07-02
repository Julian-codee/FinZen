import React from "react";
import { BanknoteArrowDownIcon } from "lucide-react";

export const DeductionsForm: React.FC = () => {
  return (
    <>
      {/* Encabezado de la sección */}
      <div className="flex items-center text-gray-400 -mb-10 md:mb-0 mt-8 sm:mt-12 p-6 md:p-0">
        <BanknoteArrowDownIcon className="text-red-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Deducciones</h2>
      </div>

      {/* Descripción */}
      <p className="text-gray-400 mb-4 sm:mb-12 text-sm sm:text-base p-6 md:p-0">
        Registra todas tus deducciones aplicables para el año 2024
      </p>

      {/* Formulario de deducciones */}
      <div className="grid grid-cols-1 mb-4 md:mb-12 md:grid-cols-2 gap-x-6 gap-y-4 p-6 md:p-0">
        <InputField id="salud" label="Salud" />
        <InputField id="pension" label="Pensión" />
        <InputField id="vivienda" label="Intereses de Vivienda" />
        <InputField id="dependientes" label="Dependientes" />
        <InputField id="educacion" label="Educación" />
        <InputField id="donaciones" label="Donaciones" />
        <InputField id="otrasDeducciones" label="Otras Deducciones" fullWidth />
      </div>
    </>
  );
};

// Componente reutilizable para los campos de entrada
const InputField = ({
  id,
  label,
  fullWidth = false,
}: {
  id: string;
  label: string;
  fullWidth?: boolean;
}) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <label
      htmlFor={id}
      className="block text-white/80 text-sm font-medium mb-1"
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500 text-white placeholder-gray-400"
      placeholder="$ 00.00"
    />
  </div>
);
