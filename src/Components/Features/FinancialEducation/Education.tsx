import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { useState } from "react";
import { HeaderEducation } from "./HeaderEducation";
import { Menu } from "lucide-react";

export const Education = () => {
  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Control del estado de las tablas

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`
          flex-1 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out bg-[#020817] text-white min-h-screen
          ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
          } /* Ajusta el margen izquierdo según el estado del Sidebar */
        `}
      >
        <div className="flex items-center px-4 gap-4 pt-8 mb-6">
          <div className="flex justify-between items-center mb-25 lg:hidden">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md border border-gray-600 hover:bg-gray-800"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Educación Financiera</h1>
            <p className="mb-12 text-white/70 text-sm sm:text-lg">
              Aprende conceptos financieros, recibe consejos personalizados y
              mejora tus habilidades para tomar decisiones financieras
              inteligentes.
            </p>
          </div>
        </div>
        <HeaderEducation />
      </div>
    </>
  );
};
