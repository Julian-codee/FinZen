import { BadgeX } from "lucide-react";

export const DeleteData = () => {
  return (
    <div className="text-white p-6 rounded-lg border border-white/10 mt-6">
      <h2 className="text-2xl font-semibold flex items-center mb-1">
        <BadgeX className="mr-2 text-red-500" />
        Eliminar Datos
      </h2>
      <p className="text-gray-400 mb-6">
        Elimina permanentemente tus datos de la aplicación.
      </p>

      <div>
        <p className="font-bold mb-2">
          Esta acción eliminará permanentemente todos tus datos financieros.
          Esta acción no se puede deshacer.
        </p>
      </div>

      <div className="space-y-4 flex w-full">
        <button className="w-fit bg-red-600/60 hover:bg-red-600/40 px-4 py-2 rounded text-sm h-10 mt-4 flex items-center">
          Eliminar todos los Datos
        </button>
      </div>
    </div>
  );
};
