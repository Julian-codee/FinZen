import { MailIcon } from "lucide-react";
import { useState } from "react";

export const Notifications = () => {
  const [trasactionsNotifications, setTransactionsNotifications] =
    useState(true);
  const [emailBudgets, setEmailBudgets] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [reports, setReports] = useState(true);
  const [updates, setUpdates] = useState(false);

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
    <div className="text-white p-6 border border-white/10 rounded-lg">
      <h2 className="text-2xl font-semibold flex items-center">
       <MailIcon className="text-blue-500 mr-2"/> Notificaciones Por Correo Electronico
      </h2>
      <p className="text-gray-400 mb-6">
        Configura qué notificaciones recibirás por correo electrónico.
      </p>
      {/*Switches*/}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Alertas de Transacciones</p>
            <p className="text-sm text-gray-400">
              Recibe notificaciones cuando se registren nuevas transacciones
            </p>
          </div>
          {renderSwitch(trasactionsNotifications, setTransactionsNotifications)}
        </div>

          <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Alertas de Presupuestos</p>
            <p className="text-sm text-gray-400">
              Recibe notificaciones cuando te acerques al límite de un presupuesto
            </p>
          </div>
          {renderSwitch(emailBudgets, setEmailBudgets)}
        </div>

          <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Recordatorios de Facturas</p>
            <p className="text-sm text-gray-400">
              Recibe recordatorios de facturas y pagos pendientes
            </p>
          </div>
          {renderSwitch(reminders, setReminders)}
        </div>

          <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Informes Semanales</p>
            <p className="text-sm text-gray-400">
              Recibe un resumen semanal de tu actividad financiera
            </p>
          </div>
          {renderSwitch(reports, setReports)}
        </div>

          <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Actualización del Mercado</p>
            <p className="text-sm text-gray-400">
            Recibe actualizaciones sobre el mercado financiero
            </p>
          </div>
          {renderSwitch(updates, setUpdates)}
        </div>
      </div>
    </div>
  );
};