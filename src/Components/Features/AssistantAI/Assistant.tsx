import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { useState } from "react";
import FinanceAssistant from "./ChatAssitant";
import { Menu } from "lucide-react";

export const Assistant = () => {
  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`
          min-h-screen flex flex-col sm:p-6 lg:p-8 transition-all text-white duration-300 ease-in-out bg-[#020817]
          ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
          } /* Ajusta 'ml-20' si tu sidebar cerrada es de otro ancho */
        `}
      >
        <div className="flex items-center gap-4 px-4 pt-8">
          <div className="flex justify-between items-center mb-20 lg:hidden">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md border border-gray-600 hover:bg-gray-800"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-white">
              Asistente de IA
            </h1>
            <p className="text-white/70 mb-12 text-sm sm:text-lg">
              Aquí puedes interactuar con el asistente de inteligencia
              artificial para obtener ayuda.
            </p>
          </div>
        </div>

        <FinanceAssistant />
      </div>
    </>
  );
};
