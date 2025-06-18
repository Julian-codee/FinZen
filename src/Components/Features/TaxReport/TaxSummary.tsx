import React from 'react';

export const TaxSummary: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-8">
      <div className="flex items-center text-gray-400 mb-4">
        <svg className="w-6 h-6 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h2 className="text-xl font-semibold">Resumen de Impuestos</h2>
      </div>
      <p className="text-gray-400 mb-6">Cálculo preliminar basado en la información proporcionada</p>

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
