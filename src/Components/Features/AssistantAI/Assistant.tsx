import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { useState } from "react";

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
          flex-1 p-6 transition-all duration-300 ease-in-out
          ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } /* Ajusta 'ml-20' si tu sidebar cerrada es de otro ancho */
        `}
      >
        <h1 className="text-2xl font-bold mb-4">Asistente de IA</h1>
        <p className="text-gray-400">
          Aquí puedes interactuar con el asistente de inteligencia artificial
          para obtener ayuda.
        </p>
      </div>
    </>
  );
};
