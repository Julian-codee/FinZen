import { User, Palette, Bell, Lock, Link, Download, HelpCircle } from "lucide-react";

export const Navconfiguration = () => {
  return (
    <div className="flex h-screen w-full text-white">
      {/* Sidebar */}
      <div className="w-[25%] p-4 space-y-4">
        <div className="flex items-center space-x-2 text-sm font-medium bg-white/10 rounded-md p-2">
          <User size={16} />
          <span>Perfil</span>
        </div>
        <div className="flex items-center space-x-2 text-sm hover:bg-white/10 p-2 rounded-md transition">
          <Palette size={16} />
          <span>Apariencia</span>
        </div>
        <div className="flex items-center space-x-2 text-sm hover:bg-white/10 p-2 rounded-md transition">
          <Bell size={16} />
          <span>Notificaciones</span>
        </div>
        <div className="flex items-center space-x-2 text-sm hover:bg-white/10 p-2 rounded-md transition">
          <Lock size={16} />
          <span>Seguridad</span>
        </div>
        <div className="flex items-center space-x-2 text-sm hover:bg-white/10 p-2 rounded-md transition">
          <Link size={16} />
          <span>Integraciones</span>
        </div>
        <div className="flex items-center space-x-2 text-sm hover:bg-white/10 p-2 rounded-md transition">
          <Download size={16} />
          <span>Exportar Datos</span>
        </div>
        <div className="flex items-center space-x-2 text-sm hover:bg-white/10 p-2 rounded-md transition">
          <HelpCircle size={16} />
          <span>Soporte y Ayuda</span>
        </div>
      </div>

      {/* Contenido derecho (70%) */}
      <div className="w-[75%] mr-2 p-8 border border-white/10 rounded">
        {/* Aquí va el contenido de la sección seleccionada */}
        <h2 className="text-xl font-semibold">Contenido de configuración</h2>
      </div>
    </div>
  );
};
