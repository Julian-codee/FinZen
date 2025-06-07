import React from "react";
import { BanknoteArrowDownIcon } from "lucide-react"; // Importa el ícono de porcentaje

export const DeductionsForm: React.FC = () => {
  return (
    <>
      {/* Encabezado de la sección de Deducciones */}
      <div className="flex items-center text-gray-400 mb-1 mt-12">
        <BanknoteArrowDownIcon className="text-red-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Deducciones</h2>
      </div>
      {/* Descripción de la sección */}
      <p className="text-gray-400 mb-10">
        Registra todas tus deducciones aplicables para el año 2024
      </p>

      {/* Grid para los campos del formulario de deducciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo para Salud */}
        <div>
          <label
            htmlFor="deduccionSalud"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Salud
          </label>
          <input
            type="text"
            id="deduccionSalud"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

        {/* Campo para Pensión */}
        <div>
          <label
            htmlFor="deduccionEducacion"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Pensión
          </label>
          <input
            type="text"
            id="deduccionEducacion"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

        {/* Campo para intereses de vivinenda*/}
        <div>
          <label
            htmlFor="deduccionVivienda"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Intereses de Vivienda
          </label>
          <input
            type="text"
            id="deduccionVivienda"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

        {/* Campo  Dependientes */}
        <div>
          <label
            htmlFor="deduccionDonaciones"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Dependientes
          </label>
          <input
            type="text"
            id="deduccionDonaciones"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

        {/* Campo para  Educacion (ocupa 2 columnas en pantallas medianas) */}
        <div>
          <label
            htmlFor="otrasDeducciones"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Educación
          </label>
          <input
            type="text"
            id="deduccionDonaciones"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

        {/* Campo para Donaciones */}
        <div>
          <label
            htmlFor="otrasDeducciones"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Donaciones
          </label>
          <input
            type="text"
            id="deduccionDonaciones"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

        {/* Campo para otras deducciones */}
        <div className="md:col-span-2">
          <label
            htmlFor="otrasDeducciones"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Otras Deducciones
          </label>
          <input
            type="text"
            id="deduccionDonaciones"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>
      </div>
    </>
  );
};
