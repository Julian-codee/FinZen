import { useState } from "react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";


export const TaxReport = () => {

      // Sidebar
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
      
  return (
    <>
    
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div>
        <h1 className="text-2xl font-bold mb-4">Informe de Impuestos</h1>
        <p className="text-gray-400">
          Aquí puedes ver y descargar tu informe de impuestos.
        </p>
      </div>
    </>
  )
}

