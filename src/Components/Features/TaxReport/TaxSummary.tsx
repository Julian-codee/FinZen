import { Gauge } from "lucide-react";
import React from "react";

export const TaxSummary: React.FC = () => {
  return (
    <div className="bg-[#111827] border border-white/60 p-6 rounded-lg mt-8 text-white">
      <div className="flex items-center text-gray-400 mb-4">
        <Gauge className="m-2 text-indigo-400"/>
        <h2 className="text-xl font-semibold text-white">
          Resumen de Impuestos
        </h2>
      </div>
      <p className="text-gray-400 mb-6">
        Cálculo preliminar basado en la información proporcionada
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-gray-400 text-sm">Ingresos Totales</p>
          <p className="text-2xl font-bold mt-1">$70,000,000</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Deducciones Totales</p>
          <p className="text-2xl font-bold mt-1">$24,320,000</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Renta Líquida</p>
          <p className="text-2xl font-bold mt-1">$45,680,000</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Impuesto Calculado</p>
          <p className="text-2xl font-bold mt-1">$764,940</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Impuestos Pagados</p>
          <p className="text-2xl font-bold mt-1">$9,200,000</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Saldo a Favor</p>
          <p className="text-2xl font-bold mt-1 text-green-400">$8,435,060</p>
        </div>
      </div>
    </div>
  );
};
