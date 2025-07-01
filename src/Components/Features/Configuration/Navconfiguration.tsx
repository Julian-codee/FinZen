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
import { AppereanceConfig } from "./Components/AppereanceConfig";
import { ApperInterface } from "./Components/ApperInterface";
import { Notifications } from "./Components/Notifications";
import { NotificationsPush } from "./Components/NotificartionsPush";
import { FrecuencyNots } from "./Components/FrecuencyNots";
import { Security } from "./Components/Security";
import { SecurityConfig } from "./Components/SecurtityConfig";
import { SecurityDevices } from "./Components/SecurityDevices";
import { Integrations } from "./Components/IntegrationsBanks";
import { IntegrationsInvertions } from "./Components/IntegrationsInvertions";
import { IntegrationsServices } from "./Components/IntegrationsServices";
import { Export } from "./Components/Export";
import { BackUp } from "./Components/BackUp";
import { DeleteData } from "./Components/DeleteData";
import { FAQS } from "./Components/FAQS";
import { FAQsSupport } from "./Components/FAQsSupport";
import { FAQsContact } from "./Components/FAQsContact";

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
          <>
            <AppereanceConfig />
            <ApperInterface />
          </>
        );
      case "Notificaciones":
        return (
          <>
            <Notifications />
            <NotificationsPush />
            <FrecuencyNots />
          </>
        );
      case "Seguridad":
        return (
          <>
            <Security />
            <SecurityConfig />
            <SecurityDevices />
          </>
        );
      case "Integraciones":
        return (
          <>
            <Integrations />
            <IntegrationsInvertions />
            <IntegrationsServices />
          </>
        );
      case "Exportar Datos":
        return (
          <>
            <Export />
            <BackUp />
            <DeleteData />

           

          </>
        );
      case "Soporte y Ayuda":
        return (
          <>
            <FAQS />
            <FAQsSupport />
            <FAQsContact />
            
            <DeleteData />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full text-white">
      {/* Sidebar para pantallas grandes */}
      <div className="hidden md:block md:w-[30%] p-4 space-y-2">
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

      {/* Menú desplegable para móviles */}
      <div className="block md:hidden p-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value as Option)}
          className="w-full p-2 bg-white/10 text-white rounded-md"
        >
          {options.map((opt) => (
            <option key={opt.name} value={opt.name}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      {/* Contenido derecho */}
      <div className="w-full md:w-[70%] p-4">
        <div className="text-sm text-white/80">{renderContent()}</div>
      </div>
    </div>
  );
};
