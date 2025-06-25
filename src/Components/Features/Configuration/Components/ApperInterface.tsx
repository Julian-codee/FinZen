import { Palette } from "lucide-react";
import { useState } from "react";

export const ApperInterface = () => {
  const [Resume, setResume] = useState(false);
  const [Transactions, setTransactions] = useState(false);
  const [Budgets, setBugets] = useState(false);
  const [pay, setPay] = useState(false);
  const [IA, setIA] = useState(false);

  const renderSwitch = (value: boolean, setValue: (v: boolean) => void) => (
    <button
      onClick={() => setValue(!value)}
      className={`w-11 h-6 flex items-center rounded-full transition ${
        value ? "bg-blue-600" : "bg-white/20"
      }`}
    >
      <div
        className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
  return (
    <div className="text-white p-6 border border-white/10 rounded-lg mt-6">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="text-indigo-600" />
          <h2 className="text-2xl font-semibold">
            Personalización de la Interfaz
          </h2>
        </div>

        <p className="text-gray-400 mb-6">
          Configura qué elementos se muestran en tu panel principal.
        </p>
        {/* Switches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Resumen Financiero</p>
              <p className="text-sm text-gray-400">
                Mostrar tarjetas de resumen en el panel principal
              </p>
            </div>
            {renderSwitch(Transactions, setTransactions)}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Transacciones Recientes</p>
              <p className="text-sm text-gray-400">
                Mostrar lista de transacciones recientes.
              </p>
            </div>
            {renderSwitch(Budgets, setBugets)}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Presupuesto Mensual</p>
              <p className="text-sm text-gray-400">
                Mostrar Progreso de Presupuesto.
              </p>
            </div>
            {renderSwitch(pay, setPay)}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Próximos pagos</p>
              <p className="text-sm text-gray-400">
                Mostrar recordatorios de pagos pendientes.
              </p>
            </div>
            {renderSwitch(Resume, setResume)}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Asistente IA</p>
              <p className="text-sm text-gray-400">
                Mostrar consejos del asistente IA
              </p>
            </div>
            {renderSwitch(IA, setIA)}
          </div>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white text-sm">
          Guardar Personalización
        </button>
      </div>
    </div>
  );
};
