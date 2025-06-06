import { CreditCard } from "lucide-react"; // Importa el ícono de porcentaje

export const TaxesForm = () => {
  return (
    <>
      {/* Encabezado de la sección de Deducciones */}
      <div className="flex items-center text-gray-400 mb-1 mt-12">
        <CreditCard className="text-yellow-500" />
        <h2 className="text-xl font-semibold text-white">Impuestos Pagados</h2>
      </div>
      {/* Descripción de la sección */}
      <p className="text-gray-400 mb-10">
        Registra los impuestos que ya has pagado durante el año 2024
      </p>

      {/* Grid para los campos del formulario de deducciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo para Deducción por Salud */}
        <div>
          <label
            htmlFor="deduccionSalud"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Retención en la Fuente
          </label>
          <input
            type="text"
            id="deduccionSalud"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

        {/* Campo para Deducción por Educación */}
        <div>
          <label
            htmlFor="deduccionEducacion"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Anticipos Pagados
          </label>
          <input
            type="text"
            id="deduccionEducacion"
            className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
            placeholder="$ 00.00"
          />
        </div>

      </div>
    </>
  );
};
