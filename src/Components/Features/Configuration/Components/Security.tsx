import { Lock } from "lucide-react";

export const Security = () => {
  return (
    <div className="text-white p-6 border border-white/10 rounded-lg">
      <h2 className="text-2xl font-semibold flex items-center">
        {" "}
        <Lock className="text-yellow-600 mr-2" /> Cambiar Contraseña
      </h2>
      <p className="text-gray-400 mb-6">
        Actualiza tu contraseña para mantener tu cuenta segura.
      </p>

      <div className="space-y-4">
        <label className="block text-sm mb-1">Contraseña Actual</label>
        <input
          type="text"
          placeholder="********"
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="space-y-4 mt-4">
        <label className="block text-sm mb-1">Nueva Contraseña</label>
        <input
          type="text"
          placeholder="********"
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="space-y-4 mt-4">
        <label className="block text-sm mb-1">Confirmar Nueva Contraseña</label>
        <input
          type="text"
          placeholder="********"
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="mt-6 flex justify-start">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded">
          Cambiar Contraseña
        </button>
      </div>
    </div>
  );
};
