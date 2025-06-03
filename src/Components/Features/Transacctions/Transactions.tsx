import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { useState } from "react";

export const Transactions = () => {
  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div>
        <h1>Hola Soy Transacciones</h1>
      </div>
    </>
  );
};
