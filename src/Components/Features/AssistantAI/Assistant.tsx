import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { useState } from "react";
import FinanceAssistant from "./ChatAssitant";

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
          h-screen flex flex-col p-6 transition-all duration-300 ease-in-out bg-[#020817]
          ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } /* Ajusta 'ml-20' si tu sidebar cerrada es de otro ancho */
        `}
      >
        <div className="flex items-center gap-4 px-4 pt-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-white">
              Asistente de IA
            </h1>
            <p className="text-white/70 mb-12 text-lg">
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
