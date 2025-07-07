import React from "react";
import { Building, TrendingUp, TrendingDown } from "lucide-react";

interface PatrimonyFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
}

export const PatrimonyForm: React.FC<PatrimonyFormProps> = ({ handleInputChange, formData }) => {
  return (
    <>
      <div className="flex items-center text-gray-400 mb-1 mt-12">
        <Building className="text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Patrimonio</h2>
      </div>
      <p className="text-gray-400 mb-10">Registra tus activos y pasivos a 31 de diciembre de 2024.</p>
      <h3 className="text-lg font-semibold text-white mt-8 mb-4 flex"><TrendingUp className="mr-2 text-green-400"/> Activos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="bienesRaices" className="block text-white/80 text-sm font-medium mb-1">
            Bienes Raíces
          </label>
          <input
            type="number"
            id="bienesRaices"
            value={formData.bienesRaices}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="vehiculos" className="block text-white/80 text-sm font-medium mb-1">
            Vehículos
          </label>
          <input
            type="number"
            id="vehiculos"
            value={formData.vehiculos}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="activosFinancieros" className="block text-white/80 text-sm font-medium mb-1">
            Activos Financieros
          </label>
          <input
            type="number"
            id="activosFinancieros"
            value={formData.activosFinancieros}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="otrosActivos" className="block text-white/80 text-sm font-medium mb-1">
            Otros Activos
          </label>
          <input
            type="number"
            id="otrosActivos"
            value={formData.otrosActivos}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-4 flex"><TrendingDown className="mr-2 text-red-500"/> Pasivos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="hipotecas" className="block text-white/80 text-sm font-medium mb-1">
            Hipotecas
          </label>
          <input
            type="number"
            id="hipotecas"
            value={formData.hipotecas}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="prestamos" className="block text-white/80 text-sm font-medium mb-1">
            Préstamos
          </label>
          <input
            type="number"
            id="prestamos"
            value={formData.prestamos}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="tarjetasCredito" className="block text-white/80 text-sm font-medium mb-1">
            Tarjetas de Crédito
          </label>
          <input
            type="number"
            id="tarjetasCredito"
            value={formData.tarjetasCredito}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="otrosPasivos" className="block text-white/80 text-sm font-medium mb-1">
            Otros Pasivos
          </label>
          <input
            type="number"
            id="otrosPasivos"
            value={formData.otrosPasivos}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
      </div>
    </>
  );
};