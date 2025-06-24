import { useState } from "react";
import {
  ChartColumnIncreasing,
  ChartNoAxesColumnIncreasing,
  Link as LinkIcon,
  Unlink as UnlinkIcon,
} from "lucide-react";

const banks = [
  {
    name: "Vanguard",
    description: "Sincroniza tus fondos de inversión",
    connected: true,
    autoSync: true,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Interactive Brokers",
    description: "Fondos de inversión y ETFs",
    connected: false,
    autoSync: false,
    color: "bg-red-100 text-red-700",
  },
];

export const IntegrationsInvertions = () => {
  const [bankStates, setBankStates] = useState(banks);

  const toggleAutoSync = (index: number) => {
    const updated = [...bankStates];
    updated[index].autoSync = !updated[index].autoSync;
    setBankStates(updated);
  };

  const renderSwitch = (value: boolean, onClick: () => void) => (
    <button
      onClick={onClick}
      className={`w-11 h-6 flex items-center rounded-full transition duration-300 ${
        value ? "bg-blue-600" : "bg-white/20"
      }`}
    >
      <div
        className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="text-white p-6 rounded-lg border border-white/10 mt-6">
      <h2 className="text-2xl font-semibold flex items-center mb-1">
        <ChartColumnIncreasing className="mr-2 text-blue-500" />
        Inversiones
      </h2>
      <p className="text-gray-400 mb-6">
        Conecta tus cuentas de inversión para seguir tu cartera.
      </p>

      <div className="space-y-6">
        {bankStates.map((bank, index) => (
          <div key={index} className="flex items-center justify-between">
            {/* Banco */}
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${bank.color}`}
              >
                <ChartNoAxesColumnIncreasing className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{bank.name}</p>
                  {bank.connected && (
                    <span className="bg-green-100 text-green-700 text-sm px-2 py-0.5 h-5 flex items-center rounded-full font-medium">
                      ✓ Conectado
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{bank.description}</p>
              </div>
            </div>

            {/* Auto-sync + botón */}
            <div className="flex items-center space-x-4">
              {bank.connected && (
                <>
                  <div className="text-sm text-white">Auto-sincronización</div>
                  {renderSwitch(bank.autoSync, () => toggleAutoSync(index))}
                  <button className="flex items-center bg-red-700 hover:bg-red-600 px-4 py-1.5 rounded text-sm">
                    <UnlinkIcon className="w-4 h-4 mr-1" />
                    Desconectar
                  </button>
                </>
              )}
              {!bank.connected && (
                <button className="flex items-center bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded text-sm">
                  <LinkIcon className="w-4 h-4 mr-1" />
                  Conectar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
