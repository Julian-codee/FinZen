import { MonitorCog } from "lucide-react";
import { useState } from "react";

export const SecurityDevices = () => {
  const [Auht, setAuht] = useState(true);
  const [AuhtBiometric, setAuhtBiometric] = useState(true);
  const [reminders, setReminders] = useState(true);

  const renderLogoutButton = (
    value: boolean,
    setValue: (v: boolean) => void
  ) => (
    <button
      onClick={() => setValue(false)}
      className="bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded text-sm"
      disabled={!value}
    >
      Cerrar sesión
    </button>
  );

  return (
    <div className="text-white p-6 border border-white/10 rounded-lg mt-6">
      <h2 className="text-2xl font-semibold flex items-center">
        <MonitorCog className="mr-2 text-yellow-600" />
        Dispositivos Conectados
      </h2>
      <p className="text-gray-400 mb-6">
        Gestiona los dispositivos que tienen acceso a tu cuenta.
      </p>

      {/* Botones de cierre de sesión */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Chrome - Windows</p>
            <p className="text-sm text-gray-400">Ultimo Acceso: Hoy, 14:30</p>
            <p className="text-xs text-gray-400">Bogotá, Colombia</p>
          </div>
          {renderLogoutButton(Auht, setAuht)}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium flex items-center">Safari - Iphone</p>
            <p className="text-sm text-gray-400">
              Ultimo Acceso: 12 May, 12:00
            </p>
            <p className="text-xs text-gray-400">Medellín, Colombia</p>
          </div>
          {renderLogoutButton(AuhtBiometric, setAuhtBiometric)}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Firefox - MacOS</p>
            <p className="text-sm text-gray-400">Ultimo Acceso: Ayer, 13:00</p>
            <p className="text-xs text-gray-400">Medellín, Colombia</p>
          </div>
          {renderLogoutButton(reminders, setReminders)}
        </div>
      </div>

         <div className="mt-8 text-right">
        <button className="bg-red-600/60 hover:bg-red-500/70 px-4 py-2 rounded text-white text-sm">
          Cerrar Todas las Sesiones
        </button>
      </div>
    </div>
  );
};