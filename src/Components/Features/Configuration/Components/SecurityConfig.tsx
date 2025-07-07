import { Fingerprint, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";

export const SecurityConfig = () => {
  const [Auht, setAuht] = useState(true);
  const [AuhtBiometric, setAuhtBiometric] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [reports, setReports] = useState(false);

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
      <h2 className="text-2xl font-semibold flex items-center">
        <ShieldCheck className="mr-2 text-yellow-600" />
        Configuración de Seguridad
      </h2>
      <p className="text-gray-400 mb-6">
        Configura opciones adicionales de seguridad para proteger tu cuenta.
      </p>
      {/*Switches*/}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium flex items-center">
              <Smartphone className="w-4 mr-1" />
              Autenticación de dos Factores
            </p>
            <p className="text-sm text-gray-400">
              Requiere un código adicional al iniciar sesión.
            </p>
          </div>
          {renderSwitch(Auht, setAuht)}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium flex items-center">
              <Fingerprint className="w-4 mr-1" />
              Atenticación Biometrica
            </p>
            <p className="text-sm text-gray-400">
              Permite iniciar sesión con huella digital o reconocimiento facial.
            </p>
          </div>
          {renderSwitch(AuhtBiometric, setAuhtBiometric)}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Notificaciones de Inicio de Sesión</p>
            <p className="text-sm text-gray-400">
              Recibe notificaciones cuando se inicie sesión en tu cuenta.
            </p>
          </div>
          {renderSwitch(reminders, setReminders)}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Tiempo de espera de sesión</p>
            <p className="text-sm text-gray-400">
              Cierra la sesión automáticamente después de 30 minutos de
              inactividad.
            </p>
          </div>
          {renderSwitch(reports, setReports)}
        </div>
      </div>

      <div className="mt-8 text-right">
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white text-sm">
          Guardar cambios
        </button>
      </div>
    </div>
  );
};