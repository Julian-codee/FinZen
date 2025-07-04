import { useState } from "react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import FinancialGoals from "./FinancialGoals";
import { Menu } from "lucide-react";

export const Goals = () => {
  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 sm:p-6 lg:p-8 transition-all bg-[#020817] text-white duration-300 ease-in-out min-h-screen ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="flex items-center px-4 gap-4 pt-8 mb-6">
          <div className="flex justify-between items-center mb-21 lg:hidden">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md border border-gray-600 hover:bg-gray-800"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl text-white font-bold mb-2">Metas Financieras</h1>
            <p className="mb-12 text-white/70 text-sm sm:text-lg">
              Establece y monitorea tus metas de ahorro para alcanzar tus
              objetivos financieros.
            </p>
          </div>
        </div>

        <FinancialGoals />
      </div>
    </>
  );
};
