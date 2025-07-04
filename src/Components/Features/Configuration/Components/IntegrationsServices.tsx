import { useState } from "react";
import {
  CircleAlert,
  CreditCard,
  Link as LinkIcon,
  Unlink as UnlinkIcon,
} from "lucide-react";

const banks = [
  {
    name: "DIAN - Factura Electrónica",
    description: "Importa automáticamente tus facturas electrónicas",
    connected: false,
    color: "bg-blue-100 text-blue-700",
  },
];

export const IntegrationsServices = () => {
  const [bankStates] = useState(banks);

  return (
    <div className="text-white p-6 rounded-lg border border-white/10 mt-6">
      <h2 className="text-2xl font-semibold flex items-center mb-1">
        <CreditCard className="mr-2 text-blue-500" />
        Servicios Fiscales
      </h2>
      <p className="text-gray-400 mb-6">
        Conecta servicios fiscales para facilitar la declaración de impuestos.
      </p>


    {/* Lista de servicios */}

      <div className="space-y-6">
        {bankStates.map((bank, index) => (
          <div key={index} className="flex items-center justify-between">
            {/* Banco */}
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${bank.color}`}
              >
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{bank.name}</p>

                  <span className="bg-yellow-100 text-yellow-700 text-sm px-2 py-0.5 h-5 flex items-center rounded-full font-medium">
                    <CircleAlert className="w-3 mr-1.5" />
                    No Conectado
                  </span>
                </div>
                <p className="text-sm text-gray-400">{bank.description}</p>
              </div>
            </div>

            {/* Auto-sync + botón */}
            <div className="flex items-center space-x-4">
              {bank.connected && (
                <>
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
