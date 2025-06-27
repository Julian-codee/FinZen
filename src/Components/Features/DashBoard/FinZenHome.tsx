"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";

import { SummaryCards } from "./Components/SummaryCards";
import { RecentTransactions } from "./Components/RecentTransactions";
import { MonthlyBudget } from "./Components/MonthlyBudget";
import { UpcomingPayments } from "./Components/UpcomingPayments";
import TransactionTable from "../TransactionsDashboard/Components/TransactionTable";

import { Transaction, BudgetCategory, CardSummary } from "./Types/home";

import toast, { Toaster } from "react-hot-toast";

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

export default function FinZenHome() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgetData] = useState<BudgetCategory[]>([]);
  const [cardData, setCardData] = useState<CardSummary[]>([]);
  const [upcomingPayments, setUpcomingPayments] = useState<UpcomingPayment[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const updateTransactions = useCallback((newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTransactions(JSON.parse(stored));
      } catch {
        setTransactions([]);
      }
    }

    window.addEventListener("transaction-added", () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setTransactions(JSON.parse(stored));
        } catch {
          setTransactions([]);
        }
      }
    });

    return () => {
      window.removeEventListener("transaction-added", () => {});
    };
  }, []);

  useEffect(() => {
    setCardData(MOCK_CARD_DATA);
    setUpcomingPayments(MOCK_UPCOMING_PAYMENTS);
  }, []);

  const transactionsForRecentTable = transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      const today = new Date();
      return (
        transactionDate.getMonth() === today.getMonth() &&
        transactionDate.getFullYear() === today.getFullYear()
      );
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
