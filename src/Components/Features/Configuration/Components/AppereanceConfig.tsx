import { useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

export const AppereanceConfig = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [roundedCorners, setRoundedCorners] = useState(true);

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
      <h2 className="text-2xl font-semibold">Tema</h2>
      <p className="text-gray-400 mb-6">
        Personaliza el aspecto visual de la aplicación.
      </p>

      {/* Opciones de tema */}
      <div className="flex  gap-4 mb-6">
        {[
          { label: "Claro", icon: <Sun size={24} />, value: "light" },
          { label: "Oscuro", icon: <Moon size={24} />, value: "dark" },
          { label: "Sistema", icon: <Monitor size={24} />, value: "system" },
        ].map(({ label, icon, value }) => (
          <div
            key={value}
            onClick={() => setTheme(value as any)}
            className={`flex-1 border rounded-lg p-4 text-center cursor-pointer transition ${
              theme === value
                ? "border-white text-blue-400"
                : "border-white/20 hover:border-white/40"
            }`}
          >
            <div className="mx-auto mb-8 flex justify-center">{icon}</div>
            <p className="text-sm">{label}</p>
          </div>
        ))}
      </div>

      <hr className="border-white/10 my-6" />

      {/* Switches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Modo compacto</p>
            <p className="text-sm text-gray-400">
              Reduce el espaciado y tamaño de los elementos
            </p>
          </div>
          {renderSwitch(compactMode, setCompactMode)}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Animaciones</p>
            <p className="text-sm text-gray-400">
              Habilitar animaciones y transiciones
            </p>
          </div>
          {renderSwitch(animations, setAnimations)}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Modo alto contraste</p>
            <p className="text-sm text-gray-400">
              Aumenta el contraste para mejor accesibilidad
            </p>
          </div>
          {renderSwitch(highContrast, setHighContrast)}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Esquinas redondeadas</p>
            <p className="text-sm text-gray-400">
              Aplica bordes redondeados a los elementos
            </p>
          </div>
          {renderSwitch(roundedCorners, setRoundedCorners)}
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
