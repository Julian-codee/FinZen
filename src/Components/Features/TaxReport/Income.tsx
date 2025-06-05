import React from "react";
import { Percent } from "lucide-react"; // Importa el ícono de porcentaje

export const IncomeForm: React.FC = () => {
  return (
    <>
      {/* Encabezado de la sección de Deducciones */}
      <div className="flex items-center text-gray-400 mb-4">
        <Percent className="text-white" />
        <h2 className="text-xl font-semibold text-white">Ingresos</h2>
      </div>
      {/* Descripción de la sección */}
      <p className="text-gray-400 mb-6">
        Ingresa tus deducciones para la declaración de renta 2024. Recuerda incluir gastos de salud, educación y otros permitidos por la ley.
      </p>

      {/* Grid para los campos del formulario de deducciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo para Deducción por Salud */}
        <div>
          <label
            htmlFor="deduccionSalud"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Gastos de Salud (Medicina Prepagada, EPS)
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
            Gastos de Educación (Matrículas, Pensiones)
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
            Intereses Préstamos de Vivienda
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
            Donaciones
          </label>
          <input
            type="number"
            id="deduccionDonaciones"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>

        {/* Campo para Otras Deducciones (ocupa 2 columnas en pantallas medianas) */}
        <div className="md:col-span-2">
          <label
            htmlFor="otrasDeducciones"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Otras Deducciones
          </label>
          <textarea
            id="otrasDeducciones"
            rows={3} // Número de filas visibles
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="Describe otras deducciones aplicables..."
          ></textarea>
        </div>
      </div>
    </>
  );
};
