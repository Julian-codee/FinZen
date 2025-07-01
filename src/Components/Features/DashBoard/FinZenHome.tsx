// src/components/FinZenHome.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu } from "lucide-react";
import { parseISO, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { SummaryCards } from "./Components/SummaryCards";
import { RecentTransactions } from "./Components/RecentTransactions";
import { MonthlyBudget } from "./Components/MonthlyBudget";
import { UpcomingPayments } from "./Components/UpcomingPayments";
import { DailyAdvice } from "./Components/DailyAdvice";


import { Transaction, CardSummary } from "./Types/home";

// Datos simulados de tarjetas y pagos próximos
const MOCK_CARD_DATA: CardSummary[] = [
  { id: "c1", name: "Débito Principal", active: true, blocked: false },
  { id: "c2", name: "Crédito Visa", active: true, blocked: false },
  { id: "c3", name: "Crédito Mastercard", active: false, blocked: true },
];

interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
}

const MOCK_UPCOMING_PAYMENTS: UpcomingPayment[] = [];

const FinZenHome: React.FC = () => {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [cardData, setCardData] = useState<CardSummary[]>([]);
  const [upcomingPayments, setUpcomingPayments] = useState<UpcomingPayment[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const fetchAllTransactions = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No estás autenticado. Inicia sesión.");
      setAllTransactions([]);
      return;
    }

    try {
      const { data } = await axios.get("http://localhost:8080/finzen/gasto/user/finances", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const ingresos: Transaction[] = (data.ingresos ?? []).map((item: any) => ({
        id: item.idIngreso?.toString() ?? crypto.randomUUID(),
        amount: item.monto ?? 0,
        date: item.fecha ?? new Date().toISOString().split("T")[0],
        description: item.nombre || item.descripcion || "Sin descripción",
        notes: item.descripcion || "",
        category: "otros",
        account: "Ingreso",
        type: "income",
        status: "Completada",
      }));

      const gastos: Transaction[] = (data.gastos ?? []).map((item: any) => ({
        id: item.idGasto?.toString() ?? crypto.randomUUID(),
        amount: item.monto ?? 0,
        date: item.fecha ?? new Date().toISOString().split("T")[0],
        description: item.nombre || item.descripcion || "Sin descripción",
        notes: item.descripcion || "",
        category: item.categoria || "otros",
        account: item.cuenta || "Gasto",
        type: "expense",
        status: "Completada",
      }));

      setAllTransactions([...ingresos, ...gastos]);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.");
        localStorage.removeItem("token");
      } else {
        toast.error("Error al obtener transacciones.");
      }
      setAllTransactions([]);
      console.error("Error al cargar transacciones:", err);
    }
  }, []);

  useEffect(() => {
    setCardData(MOCK_CARD_DATA);
    setUpcomingPayments(MOCK_UPCOMING_PAYMENTS);
    fetchAllTransactions();
  }, [fetchAllTransactions]);

  const transactionsForRecentTable = useMemo(() => {
    const today = new Date();
    return allTransactions
      .filter((t) =>
        isWithinInterval(parseISO(t.date), {
          start: startOfMonth(today),
          end: endOfMonth(today),
        })
      )
      .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())
      .slice(0, 5);
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
            <MonthlyBudget />
            <UpcomingPayments payments={upcomingPayments} />
             <DailyAdvice />
          </div>
        </div>

      </main>
    </div>
  );
};

export default FinZenHome;