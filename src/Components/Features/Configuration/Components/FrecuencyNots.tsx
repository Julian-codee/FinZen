import { Calendar } from "lucide-react";

export const FrecuencyNots = () => {
  return (
    <div className="text-white p-6 border border-white/10 rounded-lg mt-6">
      <h2 className="text-2xl font-semibold flex items-center">
        <Calendar className="mr-2 text-blue-500" />
        Frecuencia de Notificaciones.
      </h2>
      <p className="text-gray-400 mb-6">
        Configura con qué frecuencia recibirás notificaciones.
      </p>

          <div>
            <label className="block text-sm mb-1">Frecuencia de Resumenes</label>
            <select
              defaultValue=""
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            >
              <option value="" disabled hidden>
                Selecciona el tipo de frecuencia
              </option>
              <option>Diario</option>
              <option>Semanal</option>
              <option>Quincenal</option>
              <option>Mensual</option>
            </select>
          </div>
    </div>
  );
};
