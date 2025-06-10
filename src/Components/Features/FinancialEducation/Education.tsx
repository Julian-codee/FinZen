import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { useState } from "react";
import { HeaderEducation } from "./HeaderEducation";



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
          flex-1 p-6 transition-all duration-300 ease-in-out bg-[#020817] text-white h-full
          ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } /* Ajusta el margen izquierdo según el estado del Sidebar */
        `}
      >
        <HeaderEducation />
      </div>
    </>
  );
};
