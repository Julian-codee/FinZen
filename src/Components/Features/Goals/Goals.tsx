import { useState } from "react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";

export const Goals = () => {
  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <h1 className="text-2xl font-bold mb-4">Mis Metas Financieras</h1>
      <p className="text-gray-400">
        Aquí puedes establecer y seguir tus metas financieras.
      </p>
    </>
  );
};
