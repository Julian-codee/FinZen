import React from "react";
import { BanknoteArrowDownIcon } from "lucide-react";

interface DeductionsFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
}

export const DeductionsForm: React.FC<DeductionsFormProps> = ({ handleInputChange, formData }) => {
  return (
    <>
      <div className="flex items-center text-gray-400 mb-1 mt-12">
        <BanknoteArrowDownIcon className="text-red-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Deducciones</h2>
      </div>
      <p className="text-gray-400 mb-10">Registra todas tus deducciones aplicables para el año 2024</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="salud" className="block text-white/80 text-sm font-medium mb-1">
            Salud
          </label>
          <input
            type="number"
            id="salud"
            value={formData.salud}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="pension" className="block text-white/80 text-sm font-medium mb-1">
            Pensión
          </label>
          <input
            type="number"
            id="pension"
            value={formData.pension}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="interesesVivienda" className="block text-white/80 text-sm font-medium mb-1">
            Intereses de Vivienda
          </label>
          <input
            type="number"
            id="interesesVivienda"
            value={formData.interesesVivienda}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="dependientes" className="block text-white/80 text-sm font-medium mb-1">
            Dependientes
          </label>
          <input
            type="number"
            id="dependientes"
            value={formData.dependientes}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="educacion" className="block text-white/80 text-sm font-medium mb-1">
            Educación
          </label>
          <input
            type="number"
            id="educacion"
            value={formData.educacion}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="donaciones" className="block text-white/80 text-sm font-medium mb-1">
            Donaciones
          </label>
          <input
            type="number"
            id="donaciones"
            value={formData.donaciones}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="otrasDeducciones" className="block text-white/80 text-sm font-medium mb-1">
            Otras Deducciones
          </label>
          <input
            type="number"
            id="otrasDeducciones"
            value={formData.otrasDeducciones}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
      </div>
    </>
  );
};