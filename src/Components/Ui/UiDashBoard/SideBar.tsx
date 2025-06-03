// src/Sidebar.tsx
import React from 'react';
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
  BadgeDollarSign,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {

  const Navigate = useNavigate();

  return (
    <div
      className={`
        fixed left-0 top-0 h-screen z-20
        bg-[#020817] border-r border-white/40 text-white py-5 shadow-lg flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      <button
        onClick={toggleSidebar}
        className={`
          absolute -right-4.5 top-0.5
          bg-[#020817] text-white p-4 border-l border-white/60 rounded-full shadow-lg
          
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'rotate-180' : 'rotate-180'}
          z-30 cursor-pointer
        `}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="px-5 mb-10 flex items-center">
        {isOpen && <h1 className="text-2xl font-bold flex bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent"> <BadgeDollarSign className='mr-3 m-1 text-indigo-500/90'/> Finzen</h1>}
      </div>

      <ul className="flex-grow">
        <li className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${!isOpen ? 'justify-center' : ''}`} onClick={() => Navigate("/Home")}>
          <Home className={`w-5 h-6 ${isOpen ? 'mr-4' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden" >Inicio</span>}
        </li>
        <li className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${!isOpen ? 'justify-center' : ''}`} onClick={() => Navigate("/Transactions")}>
          <ArrowLeftRight className={`w-5 h-6 ${isOpen ? 'mr-4' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Transacciones</span>}
        </li>
        <li className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${!isOpen ? 'justify-center' : ''}`} onClick={() => Navigate("/BudgetDashboard")}>
          <Wallet className={`w-5 h-6 ${isOpen ? 'mr-4' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Presupuesto</span>}
        </li>
        <li className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${!isOpen ? 'justify-center' : ''}`} onClick={() => Navigate("/Reporting")}>
          <BarChart2 className={`w-5 h-6 ${isOpen ? 'mr-4' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Informes</span>}
        </li>
        <li className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${!isOpen ? 'justify-center' : ''}`}>
          <DollarSign className={`w-5 h-6 ${isOpen ? 'mr-4' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Cuentas</span>}
        </li>
        <li className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${!isOpen ? 'justify-center' : ''}`}>
          <FileText className={`w-5 h-6 ${isOpen ? 'mr-4' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Informe Fiscal</span>}
        </li>
        <li className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${!isOpen ? 'justify-center' : ''}`}>
          <Book className={`w-5 h-6 ${isOpen ? 'mr-4' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Educación Financiera</span>}
        </li>
        <li className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${!isOpen ? 'justify-center' : ''}`}>
          <Sparkles className={`w-5 h-6 ${isOpen ? 'mr-4' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Asistente IA</span>}
        </li>
        <li className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${!isOpen ? 'justify-center' : ''}`}>
          <Target className={`w-5 h-6 ${isOpen ? 'mr-4' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Metas Financieras</span>}
        </li>
        <li className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#313149] ${!isOpen ? 'justify-center' : ''}`}>
          <Settings className={`w-5 h-6 ${isOpen ? 'mr-4' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Configuración</span>}
        </li>
      </ul>

      <div className="px-5">
        <button
          className={`
           bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg py-3 flex items-center justify-center w-full
            cursor-pointer text-lg font-medium transition-colors duration-200
          `}
          onClick={() => Navigate("/AddTransaction")}
        >
          <Plus className={`w-5 h-5 ${isOpen ? 'mr-2' : ''}`} />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Nueva Transacción</span>}
        </button>
      </div>
    </div>
  );
};
