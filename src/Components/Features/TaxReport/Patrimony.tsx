import React from "react";
import { Building, TrendingDown, TrendingUp } from "lucide-react"; // Importa el ícono de edificio/patrimonio

export const PatrimonyForm: React.FC = () => {
  return (
    <>
      {/* Encabezado de la sección de Patrimonio */}
      <div className="flex items-center text-gray-400 mb-4">
        {" "}
        {/* Ajustado mb y eliminado mt-12 */}
        <Building className="text-blue-500" />
        {/* Cambiado el color del ícono a blanco para consistencia */}
        <h2 className="text-xl font-semibold text-white">Patrimonio</h2>
      </div>
      {/* Descripción de la sección */}
      <p className="text-gray-400 mb-6">
        {" "}
        {/* Ajustado mb */}
        Registra tus activos y pasivos a 31 de diciembre de 2024.
      </p>

      {/* Bloque de Activos */}
      <h3 className="text-lg font-semibold text-white mt-8 mb-4 flex"><TrendingUp className="mr-2 text-green-400"/> Activos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {" "}
        {/* Añadido margen inferior para separar de Pasivos */}
        {/* Campo para Efectivo y Equivalentes */}
        <div>
          <label
            htmlFor="efectivo"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Bienes Raíces
          </label>
          <input
            type="text"
            id="efectivo"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>
        {/* Campo para Inversiones */}
        <div>
          <label
            htmlFor="inversiones"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Vehiculos
          </label>
          <input
            type="text"
            id="inversiones"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>
        {/* Campo para Bienes Inmuebles */}
        <div>
          <label
            htmlFor="inmuebles"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Activos Financieros
          </label>
          <input
            type="text"
            id="inmuebles"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>
        {/* Campo para Vehículos y Otros Activos */}
        <div>
          <label
            htmlFor="vehiculos"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Otros Activos
          </label>
          <input
            type="text"
            id="vehiculos"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>
      </div>

      {/* Bloque de Pasivos */}
      <h3 className="text-lg font-semibold text-white mb-4 flex"><TrendingDown className="mr-2 text-red-500"/>Pasivos</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo para Hipotecas */}
        <div>
          <label
            htmlFor="deudasBancarias"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Hipotecas
          </label>
          <input
            type="text"
            id="deudasBancarias"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

        {/* Campo para Préstamo */}
        <div>
          <label
            htmlFor="tarjetasCredito"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Préstamos
          </label>
          <input
            type="text"
            id="tarjetasCredito"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

        {/* Campo para Hipotecas */}
        <div>
          <label
            htmlFor="hipotecas"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Hipotecas y Créditos de Vivienda
          </label>
          <input
            type="text"
            id="hipotecas"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

        {/* Campo para Otros Pasivos */}
        <div>
          <label
            htmlFor="otrosPasivos"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Otros Pasivos (Deudas Personales)
          </label>
          <input
            type="text"
            id="otrosPasivos"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>
      </div>
    </>
  );
};
