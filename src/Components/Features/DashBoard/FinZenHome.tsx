// src/components/FinZenHome.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu } from "lucide-react";

// Asegúrate de que las rutas son correctas
import { Sidebar } from "../../Ui/UiDashBoard/SideBar"; 
import { SummaryCards } from "./Components/SummaryCards"; 
import { RecentTransactions } from "./Components/RecentTransactions"; 
import { MonthlyBudget } from "./Components/MonthlyBudget"; 
import { UpcomingPayments } from "./Components/UpcomingPayments"; 

import { Transaction, BudgetCategory, CardSummary } from "./Types/home"; 

// Datos mock si no vienen de otro lugar
const MOCK_CARD_DATA: CardSummary[] = [
  { id: "c1", name: "Débito Principal", active: true, blocked: false },
  { id: "c2", name: "Crédito Visa", active: true, blocked: false },
  { id: "c3", name: "Crédito Mastercard", active: false, blocked: true },
];

const MOCK_UPCOMING_PAYMENTS: UpcomingPayment[] = []; 

interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
}

// Nueva interfaz para las props de FinZenHome
interface FinZenHomeProps {
  // Aseguramos que allTransactions sea un array de Transaction,
  // y le damos un valor por defecto de array vacío si no se proporciona.
  allTransactions?: Transaction[]; // Hacemos la prop opcional
}

const FinZenHome: React.FC<FinZenHomeProps> = ({ allTransactions = [] }) => { // <--- CAMBIO AQUÍ: valor por defecto
  const [budgetData] = useState<BudgetCategory[]>([]);
  const [cardData, setCardData] = useState<CardSummary[]>([]);
  const [upcomingPayments, setUpcomingPayments] = useState<UpcomingPayment[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    setCardData(MOCK_CARD_DATA);
    setUpcomingPayments(MOCK_UPCOMING_PAYMENTS);
  }, []);

  const transactionsForRecentTable = useMemo(() => {
    // Ya no es necesario el chequeo 'allTransactions &&' porque ya le dimos un valor por defecto
    return allTransactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        const today = new Date();
        return (
          transactionDate.getMonth() === today.getMonth() &&
          transactionDate.getFullYear() === today.getFullYear()
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
  }, [allTransactions]);

  return (
    <div className="flex min-h-screen bg-[#020817] text-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        } ml-0`}
      >
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md border border-gray-600 hover:bg-gray-800"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-center flex-grow">Dashboard</h1>
        </div>

        <h1 className="hidden lg:block text-3xl font-bold text-white mb-6">Dashboard</h1>

        <SummaryCards transactions={allTransactions} cardData={cardData} />

        <div className="flex flex-col lg:flex-row gap-6">
          <RecentTransactions transactions={transactionsForRecentTable} />
          <div className="flex flex-col gap-6 lg:w-2/5">
            <MonthlyBudget budgetData={budgetData} />
            <UpcomingPayments payments={upcomingPayments} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinZenHome;