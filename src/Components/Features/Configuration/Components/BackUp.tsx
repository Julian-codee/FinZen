import { Database } from "lucide-react";

export const BackUp = () => {
  return (
    <div className="text-white p-6 rounded-lg border border-white/10 mt-6">
      <h2 className="text-2xl font-semibold flex items-center mb-1">
        <Database className="mr-2 text-yellow-500" />
        Copia de Seguridad
      </h2>
      <p className="text-gray-400 mb-6">
        Realiza copias de seguridad de tus datos para evitar pérdidas.
      </p>

      <div>
        <p className="font-bold mb-2">
          Las copias de seguridad incluyen todos tus datos financieros,
          configuraciones y preferencias.
        </p>

        <p className="font-light text-white/60 mb-3">Última copia de seguridad: 15 de junio de 2025, 14:30</p>
      </div>

      <div className="space-y-4 flex mx-auto w-full">
        <button className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm h-10 m-5">
          Crear Respaldo
        </button>
        <button className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm h-10 m-5">
          Restaurar Respaldo
        </button>
      </div>
    </div>
  );
};
