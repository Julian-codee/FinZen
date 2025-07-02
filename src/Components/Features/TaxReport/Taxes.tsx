import { CreditCard } from "lucide-react";

export const TaxesForm = () => {
  return (
    <>
      {/* Encabezado */}
      <div className="flex items-center text-gray-400 -mb-10 md:mb-0 mt-8 sm:mt-12 p-6 md:p-0">
        <CreditCard className="text-yellow-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Impuestos Pagados</h2>
      </div>

      {/* Descripción */}
      <p className="text-gray-400 mb-4 md:mb-12 text-sm sm:text-base p-6 md:p-0">
        Registra los impuestos que ya has pagado durante el año 2024
      </p>

      {/* Formulario de impuestos pagados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6 md:p-0">
        <InputField id="retencionFuente" label="Retención en la Fuente" />
        <InputField id="anticiposPagados" label="Anticipos Pagados" />
      </div>
    </>
  );
};

// Componente reutilizable para inputs
const InputField = ({
  id,
  label,
  fullWidth = false,
}: {
  id: string;
  label: string;
  fullWidth?: boolean;
}) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <label
      htmlFor={id}
      className="block text-white/80 text-sm font-medium mb-1"
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500 text-white placeholder-gray-400"
      placeholder="$ 00.00"
    />
  </div>
);
