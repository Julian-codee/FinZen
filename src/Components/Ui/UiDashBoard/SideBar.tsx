// src/Sidebar.tsx
import React from "react";
import {
  Home,
  ArrowLeftRight,
  Wallet,
  FileText,
  BarChart2,
  Book,
  Sparkles,
  Target,
  Settings,
  Plus,
  Menu,
  X,
  BadgeDollarSign,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Inicio", icon: Home, path: "/FinZenHome" },
    { name: "Transacciones", icon: ArrowLeftRight, path: "/Transactions" },
    { name: "Presupuesto", icon: Wallet, path: "/BudgetDashboard" },
    { name: "Informes", icon: BarChart2, path: "/Reporting" },
    { name: "Cuentas", icon: DollarSign, path: "/Accounts" },
    { name: "Informe Fiscal", icon: FileText, path: "/TaxReport" },
    { name: "Educación Financiera", icon: Book, path: "/FinancialEducation" },
    { name: "Asistente IA", icon: Sparkles, path: "/IA" },
    { name: "Metas Financieras", icon: Target, path: "/Goals" },
    { name: "Configuración", icon: Settings, path: "/Settings" },
  ];

  return (
    <>
      {/* Fondo oscuro en móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar fijo en escritorio */}
      <div
        className={`
          fixed top-0 left-0 h-screen z-30 hidden lg:flex flex-col justify-between
          bg-[#020817] border-r border-white/40 text-white py-5 shadow-lg
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"}
        `}
      >
        {/* Botón colapsar/expandir */}
        <button
          onClick={toggleSidebar}
          className={`
            absolute -right-6.5 top-2.5 z-30 cursor-pointer
            bg-[#020817] text-white p-4 border-l border-white/50 rounded-full shadow-lg
            transition-transform duration-300
            ${isOpen ? "rotate-180" : "rotate-180"}
          `}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <div className="px-5 mb-10 flex items-center">
          {isOpen && (
            <h1 className="text-2xl font-bold flex bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
              <BadgeDollarSign className="mr-3 m-1 text-indigo-500/90" />
              Finzen
            </h1>
          )}
        </div>

        {/* Menú */}
        <ul className="flex-grow">
          {menuItems.map(({ name, icon: Icon, path }, index) => (
            <li
              key={index}
              onClick={() => navigate(path)}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${
                !isOpen ? "justify-center" : ""
              }`}
            >
              <Icon className={`w-5 h-6 ${isOpen ? "mr-4" : ""}`} />
              {isOpen && (
                <span className="whitespace-nowrap overflow-hidden">
                  {name}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Botón Nueva Transacción */}
        <div className="px-5">
          <button
            onClick={() => navigate("/AddTransaction")}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg py-3 flex items-center justify-center w-full text-lg font-medium transition-colors duration-200"
          >
            <Plus className={`w-5 h-5 ${isOpen ? "mr-2" : ""}`} />
            {isOpen && <span>Nueva Transacción</span>}
          </button>
        </div>
      </div>

      {/* Sidebar deslizante para móviles */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 z-40 bg-[#020817] border-r border-white/30 text-white py-6 px-4 shadow-xl transition-transform duration-300 ease-in-out
          lg:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Botón cerrar */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="mb-8 flex items-center">
          <BadgeDollarSign className="mr-2 text-indigo-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
            Finzen
          </h1>
        </div>

        {/* Menú móvil */}
        <ul className="space-y-4">
          {menuItems.map(({ name, icon: Icon, path }, index) => (
            <li
              key={index}
              onClick={() => {
                navigate(path);
                toggleSidebar();
              }}
              className="flex items-center cursor-pointer hover:bg-white/10 px-3 py-2 rounded"
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{name}</span>
            </li>
          ))}
        </ul>

        {/* Botón transacción móvil */}
        <button
          onClick={() => {
            navigate("/AddTransaction");
            toggleSidebar();
          }}
          className="mt-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg py-2 w-full text-center font-medium flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nueva Transacción
        </button>
      </div>
    </>
  );
};
