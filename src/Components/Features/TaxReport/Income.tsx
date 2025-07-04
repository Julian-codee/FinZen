import React from "react";
import { CircleDollarSign } from "lucide-react";

interface IncomeFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
}

export const IncomeForm: React.FC<IncomeFormProps> = ({ handleInputChange, formData }) => {
  return (
    <>
      <div className="flex items-center text-gray-400 mb-1 mt-12">
        <CircleDollarSign className="text-green-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Ingresos</h2>
      </div>
      <p className="text-gray-400 mb-10">Registra todos tus ingresos recibidos durante el año 2024</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="ingresosLaborales" className="block text-white/80 text-sm font-medium mb-1">
            Ingresos Laborales
          </label>
          <input
            type="number"
            id="ingresosLaborales"
            value={formData.ingresosLaborales}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="trabajoIndependiente" className="block text-white/80 text-sm font-medium mb-1">
            Trabajo Independiente
          </label>
          <input
            type="number"
            id="trabajoIndependiente"
            value={formData.trabajoIndependiente}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="arrendamientos" className="block text-white/80 text-sm font-medium mb-1">
            Arrendamientos
          </label>
          <input
            type="number"
            id="arrendamientos"
            value={formData.arrendamientos}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="dividendos" className="block text-white/80 text-sm font-medium mb-1">
            Dividendos
          </label>
          <input
            type="number"
            id="dividendos"
            value={formData.dividendos}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="otrosIngresos" className="block text-white/80 text-sm font-medium mb-1">
            Otros Ingresos
          </label>
          <input
            type="number"
            id="otrosIngresos"
            value={formData.otrosIngresos}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="intereses" className="block text-white/80 text-sm font-medium mb-1">
            Intereses
          </label>
          <input
            type="number"
            id="intereses"
            value={formData.intereses}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
      </div>
    </>
  );
};