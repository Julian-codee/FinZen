import { useState } from "react";
import {
  User,
  Palette,
  Bell,
  Lock,
  Link,
  Download,
  HelpCircle,
} from "lucide-react";
import { UserProfileConfig } from "./Components/UserProfileConfig";
import { UserProfileTax } from "./Components/UserProfileTax";

type Option =
  | "Perfil"
  | "Apariencia"
  | "Notificaciones"
  | "Seguridad"
  | "Integraciones"
  | "Exportar Datos"
  | "Soporte y Ayuda";

const options: { name: Option; icon: React.ReactNode }[] = [
  { name: "Perfil", icon: <User size={16} /> },
  { name: "Apariencia", icon: <Palette size={16} /> },
  { name: "Notificaciones", icon: <Bell size={16} /> },
  { name: "Seguridad", icon: <Lock size={16} /> },
  { name: "Integraciones", icon: <Link size={16} /> },
  { name: "Exportar Datos", icon: <Download size={16} /> },
  { name: "Soporte y Ayuda", icon: <HelpCircle size={16} /> },
];

export const Navconfiguration = () => {
  const [selected, setSelected] = useState<Option>("Perfil");

  // Función para renderizar el contenido según la opción seleccionada

  const renderContent = () => {
    switch (selected) {
      case "Perfil":
        return (
          <>
            <UserProfileConfig />

            <UserProfileTax />
          </>
        );
      case "Apariencia":
        return (
          <p>Configura el tema oscuro, colores y fuentes de la aplicación.</p>
        );
      case "Notificaciones":
        return (
          <p>Activa o desactiva las notificaciones por correo o en la app.</p>
        );
      case "Seguridad":
        return (
          <p>Cambia tu contraseña, activa verificación en dos pasos, y más.</p>
        );
      case "Integraciones":
        return (
          <p>Conecta tu cuenta con otras plataformas o servicios externos.</p>
        );
      case "Exportar Datos":
        return <p>Descarga toda tu información en formato JSON o CSV.</p>;
      case "Soporte y Ayuda":
        return (
          <p>Consulta la documentación, tutoriales o contacta con soporte.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full text-white">
      {/* Sidebar */}
      <div className="w-[30%] p-4 space-y-2">
        {options.map((opt) => (
          <div
            key={opt.name}
            className={`flex items-center space-x-2 text-sm p-2 rounded-md cursor-pointer transition 
              ${
                selected === opt.name
                  ? "bg-white/10 font-medium"
                  : "hover:bg-white/10"
              }`}
            onClick={() => setSelected(opt.name)}
          >
            {opt.icon}
            <span>{opt.name}</span>
          </div>
        ))}
      </div>

      {/* Contenido derecho */}
      <div className="w-[70%] p-4">
        <div className="text-sm text-white/80">{renderContent()}</div>
      </div>
    </div>
  );
};
