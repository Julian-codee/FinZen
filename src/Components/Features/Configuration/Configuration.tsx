import { useState } from "react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";

export const Configuration = () => {
      // Sidebar
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
  return (
    <>
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <div>
      <h1 className="text-2xl font-bold mb-4">Configuración</h1>
      <p className="text-gray-400">
        Aquí puedes ajustar la configuración de tu cuenta.
      </p>
    </div>
    </>
  )
}


