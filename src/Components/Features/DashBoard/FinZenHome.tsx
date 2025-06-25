"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";

import { SummaryCards } from "./Components/SummaryCards";
import { RecentTransactions } from "./Components/RecentTransactions";
import { MonthlyBudget } from "./Components/MonthlyBudget";
import { UpcomingPayments } from "./Components/UpcomingPayments";
import { Transaction, BudgetCategory, CardSummary } from "./Types/home";

import toast, { Toaster, Toast } from "react-hot-toast";

// ========================
// MOCK DATA
// ========================
const MOCK_CARD_DATA: CardSummary[] = [
  { id: "c1", name: "Débito Principal", active: true, blocked: false },
  { id: "c2", name: "Crédito Visa", active: true, blocked: false },
  { id: "c3", name: "Crédito Mastercard", active: false, blocked: true },
];

const MOCK_UPCOMING_PAYMENTS: UpcomingPayment[] = [];

const STORAGE_KEY = "finzen_transactions";

interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
}

// ========================
// COMPONENTES TOAST
// ========================
interface CustomToastProps {
  t: Toast;
  message: string;
}

const CustomSuccessToast = ({ t, message }: CustomToastProps) => (
  <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}>
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <CheckCircle className="h-6 w-6 text-green-500" />
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-white">¡Éxito!</p>
          <p className="mt-1 text-sm text-gray-300">{message}</p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-green-600/30">
      <button onClick={() => toast.dismiss(t.id)} className="w-full rounded-none rounded-r-xl p-4 text-sm font-medium text-green-400 hover:text-green-200">
        Cerrar
      </button>
    </div>
  </div>
);

const CustomErrorToast = ({ t, message }: CustomToastProps) => (
  <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}>
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <XCircle className="h-6 w-6 text-red-500" />
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-white">Error</p>
          <p className="mt-1 text-sm text-gray-300">{message}</p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-red-600/30">
      <button onClick={() => toast.dismiss(t.id)} className="w-full rounded-none rounded-r-xl p-4 text-sm font-medium text-red-400 hover:text-red-200">
        Cerrar
      </button>
    </div>
  </div>
);

const DeleteConfirmationToast = ({ t, onConfirm, onCancel }: { t: Toast; onConfirm: () => void; onCancel: () => void }) => (
  <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex flex-col p-4`}>
    <div className="flex items-start">
      <Trash2 className="h-6 w-6 text-orange-400" />
      <div className="ml-3 flex-1">
        <p className="text-sm font-semibold text-white">Confirmar Eliminación</p>
        <p className="mt-1 text-sm text-gray-300">¿Estás seguro de que quieres eliminar esta transacción? Esta acción no se puede deshacer.</p>
      </div>
    </div>
    <div className="mt-4 flex space-x-2 justify-end">
      <button onClick={() => { toast.dismiss(t.id); onCancel(); }} className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700 text-sm">
        Cancelar
      </button>
      <button onClick={() => { toast.dismiss(t.id); onConfirm(); }} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm">
        Eliminar
      </button>
    </div>
  </div>
);

// ========================
// COMPONENTE PRINCIPAL
// ========================
export default function FinZenHome() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgetData] = useState<BudgetCategory[]>([]);
  const [cardData, setCardData] = useState<CardSummary[]>([]);
  const [upcomingPayments, setUpcomingPayments] = useState<UpcomingPayment[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const loadTransactions = useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setTransactions(JSON.parse(stored));
        } catch (error) {
          console.error("Error al parsear transacciones:", error);
          setTransactions([]);
        }
      }
    }
  }, []);

  useEffect(() => {
    loadTransactions();
    window.addEventListener("transaction-added", loadTransactions);
    return () => {
      window.removeEventListener("transaction-added", loadTransactions);
    };
  }, [loadTransactions]);

  useEffect(() => {
    setCardData(MOCK_CARD_DATA);
    setUpcomingPayments(MOCK_UPCOMING_PAYMENTS);
  }, []);

  const transactionsForRecentTable = transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      const today = new Date();
      return transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear();
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time || "00:00"}`).getTime();
      const dateB = new Date(`${b.date}T${b.time || "00:00"}`).getTime();
      return dateB - dateA;
    });

  return (
    <div className="flex min-h-screen bg-[#020817] text-gray-100">
      <Toaster position="bottom-right" reverseOrder={false} />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        } ml-0`}
      >
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <button onClick={toggleSidebar} className="p-2 rounded-md border border-gray-600 hover:bg-gray-800" aria-label="Abrir menú de navegación">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-center flex-grow">Dashboard</h1>
        </div>

        <h1 className="hidden lg:block text-3xl font-bold text-white mb-6">Dashboard</h1>

        <SummaryCards transactions={transactions} cardData={cardData} />

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
}
