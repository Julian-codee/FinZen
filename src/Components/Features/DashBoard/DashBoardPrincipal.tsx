import { Sidebar } from "../../Ui/UiDashBoard/SideBar"; // Update the import path to your actual Sidebar component
import { useState } from "react";

export const DashBoardPrincipal = () => {
  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">Bienvenido al panel de control.</p>
      </div>
    </>
  );
};
