import { useState } from "react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import FinancialGoals from "./FinancialGoals";

export const Goals = () => {
  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex h-screen bg-[#020817] text-white">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div
          className={`flex-1 p-6 transition-all bg-[#020817] text-white duration-300 ease-in-out ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <div className="px-4 pt-8">
            <h1 className="text-4xl font-bold mb-2">Metas Financieras</h1>
            <p className="mb-12 max-w-2xl text-white/70 text-lg">
              Establece y monitorea tus metas de ahorro para alcanzar tus
              objetivos financieros.
            </p>
          </div>

          <FinancialGoals />
        </div>
      </div>
    </>
  );
};
