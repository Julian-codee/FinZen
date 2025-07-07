import React from "react";
import { CreditCard } from "lucide-react";

interface TaxesFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
}

export const TaxesForm: React.FC<TaxesFormProps> = ({ handleInputChange, formData }) => {
  return (
    <>
      <div className="flex items-center text-gray-400 mb-1 mt-12">
        <CreditCard className="text-yellow-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Impuestos Pagados</h2>
      </div>
      <p className="text-gray-400 mb-10">Registra los impuestos que ya has pagado durante el año 2024</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="retencionFuente" className="block text-white/80 text-sm font-medium mb-1">
            Retención en la Fuente
          </label>
          <input
            type="number"
            id="retencionFuente"
            value={formData.retencionFuente}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="anticiposPagados" className="block text-white/80 text-sm font-medium mb-1">
            Anticipos Pagados
          </label>
          <input
            type="number"
            id="anticiposPagados"
            value={formData.anticiposPagados}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="0"
          />
        </div>
      </div>
    </>
  );
};