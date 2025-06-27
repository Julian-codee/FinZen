import { useState } from "react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { Navconfiguration } from "./Navconfiguration";

export const Configuration = () => {
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
          flex-1 p-6 transition-all duration-300 ease-in-out  text-white bg-[#020817] min-h-screen
          ${isSidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}
      >
        <div className="flex items-center px-4 gap-4 pt-8 mb-6">
          <div>
            <h1 className="text-2xl md:text-4xl  font-bold mb-2">Configuración</h1>
            <p className="mb-12 text-white/70 text-sm sm:text-lg">
              Personaliza tu experiencia en Finzen y gestiona tus preferencias.
            </p>
          </div>
        </div>

        {/*Aqui iran los demas componentes */}

        <Navconfiguration />
      </div>
    </>
  );
};
