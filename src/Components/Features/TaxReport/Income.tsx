import React from "react";
import { CircleDollarSign } from "lucide-react"; // Importa el ícono de porcentaje

export const IncomeForm: React.FC = () => {
  return (
    <>
      {/* Encabezado de la sección de Deducciones */}
      <div className="flex items-center text-gray-400 mb-1 mt-12">
        <CircleDollarSign className="text-green-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Ingresos</h2>
      </div>
      {/* Descripción de la sección */}
      <p className="text-gray-400 mb-10">
        Registra todos tus ingresos recibidos durante el año 2024
      </p>

      {/* Grid para los campos del formulario de deducciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo para Deducción por Salud */}
        <div>
          <label
            htmlFor="deduccionSalud"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Ingresos Laborales
          </label>
          <input
            type="number"
            id="deduccionSalud"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>

        {/* Campo para Deducción por Educación */}
        <div>
          <label
            htmlFor="deduccionEducacion"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Trabajo independiente
          </label>
          <input
            type="number"
            id="deduccionEducacion"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>

        {/* Campo para Deducción por Intereses de Vivienda */}
        <div>
          <label
            htmlFor="deduccionVivienda"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Arrendamientos
          </label>
          <input
            type="number"
            id="deduccionVivienda"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>

        {/* Campo para Deducción por Donaciones */}
        <div>
          <label
            htmlFor="deduccionDonaciones"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Dividendos
          </label>
          <input
            type="number"
            id="deduccionDonaciones"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>

        {/* Campo para Otras Deducciones (ocupa 2 columnas en pantallas medianas) */}
        <div>
          <label
            htmlFor="deduccionVivienda"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Otros Ingresos
          </label>
          <input
            type="number"
            id="deduccionVivienda"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>

        {/* Campo para Otras Deducciones (ocupa 2 columnas en pantallas medianas) */}

        <div>
          <label
            htmlFor="deduccionVivienda"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Intereses
          </label>
          <input
            type="number"
            id="deduccionVivienda"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
      </div>
    </>
  );
};
