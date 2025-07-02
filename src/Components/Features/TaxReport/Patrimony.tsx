import React from "react";
import { Building, TrendingDown, TrendingUp } from "lucide-react";

export const PatrimonyForm: React.FC = () => {
  return (
    <>
      {/* Encabezado */}
      <div className="flex items-center text-gray-400 -mb-10 md:mb-0 mt-8 sm:mt-12 p-6 md:p-0">
        <Building className="text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Patrimonio</h2>
      </div>

      {/* Descripción */}
      <p className="text-gray-400 mb-5 md:mb-12 text-sm sm:text-base p-6 md:p-0">
        Registra tus activos y pasivos a 31 de diciembre de 2024.
      </p>

      {/* Activos */}
      <h3 className="text-lg font-semibold text-white mt-8 -mb-4 md:mb-4 flex items-center p-6 md:p-0">
        <TrendingUp className="mr-2 text-green-400" />
        Activos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8 p-6 md:p-0">
        <InputField id="bienesRaices" label="Bienes Raíces" />
        <InputField id="vehiculos" label="Vehículos" />
        <InputField id="activosFinancieros" label="Activos Financieros" />
        <InputField id="otrosActivos" label="Otros Activos" />
      </div>

      {/* Pasivos */}
      <h3 className="text-lg font-semibold text-white -mb-4 md:mb-4 flex items-center p-6 md:p-0">
        <TrendingDown className="mr-2 text-red-500" />
        Pasivos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6 md:p-0">
        <InputField id="hipotecas" label="Hipotecas" />
        <InputField id="prestamos" label="Préstamos" />
        <InputField
          id="creditosVivienda"
          label="Hipotecas y Créditos de Vivienda"
        />
        <InputField
          id="otrosPasivos"
          label="Otros Pasivos (Deudas Personales)"
        />
      </div>
    </>
  );
};

// Componente reutilizable
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
