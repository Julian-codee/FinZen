"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { Menu } from "lucide-react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar"; // Asegúrate de que esta ruta sea correcta

import { SummaryCards } from './Components/SummaryCards';
import { RecentTransactions } from './Components/RecentTransactions';
import { MonthlyBudget } from './Components/MonthlyBudget';
import { UpcomingPayments } from './Components/UpcomingPayments';
import { Transaction, BudgetCategory, CardSummary } from './Types/home'; // Importa los tipos

// Datos de ejemplo iniciales (reemplázalos con tu lógica real)
// Es importante que MOCK_TRANSACTIONS se use solo como fallback si localStorage está vacío,
// o que se combine con lo de localStorage si hay una precarga desde el servidor.
// Para este ejemplo, haremos que localStorage sea la fuente de verdad.


const MOCK_CARD_DATA: CardSummary[] = [
    { id: 'c1', name: 'Débito Principal', active: true, blocked: false },
    { id: 'c2', name: 'Crédito Visa', active: true, blocked: false },
    { id: 'c3', name: 'Crédito Mastercard', active: false, blocked: true },
];

interface UpcomingPayment {
    id: string;
    description: string;
    amount: number;
    dueDate: string;
}

const MOCK_UPCOMING_PAYMENTS: UpcomingPayment[] = [
    // { id: 'up1', description: 'Cuota de Internet', amount: 45.00, dueDate: '2024-07-05' },
    // { id: 'up2', description: 'Préstamo coche', amount: 280.00, dueDate: '2024-07-10' },
];

const STORAGE_KEY = "finzen_transactions"; // La misma clave que usas en AddTransaction

export default function FinZenHome() {
    const [transactions, setTransactions] = useState<Transaction[]>([]); // Este estado es el que necesitamos actualizar
    const [budgetData, setBudgetData] = useState<BudgetCategory[]>([]);
    const [cardData, setCardData] = useState<CardSummary[]>([]);
    const [upcomingPayments, setUpcomingPayments] = useState<any[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // --- Manejo del Sidebar ---
    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((prev) => !prev);
    }, []);

    // Función para cargar transacciones desde localStorage
    const loadTransactions = useCallback(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsedTransactions: Transaction[] = JSON.parse(stored);
                    setTransactions(parsedTransactions); // Actualiza el estado de transacciones
                } catch (e) {
                    console.error("Error al parsear transacciones de localStorage en FinZenHome:", e);
                    setTransactions([]);
                }
            } else {
                setTransactions([]); // Si no hay nada, inicializa vacío
            }
        }
    }, []); // No depende de nada, se memoiza

    // Carga inicial y listener para nuevas transacciones
    useEffect(() => {
        loadTransactions(); // Carga las transacciones al montar el componente

        // Listener para cuando se añade una nueva transacción desde otro componente (ej. AddTransaction)
        window.addEventListener("transaction-added", loadTransactions);

        // Función de limpieza para remover el listener
        return () => {
            window.removeEventListener("transaction-added", loadTransactions);
        };
    }, [loadTransactions]); // Depende de loadTransactions

    // Simular carga de otros datos (presupuesto, tarjetas, etc.)
    useEffect(() => {
       
        setCardData(MOCK_CARD_DATA);
        setUpcomingPayments(MOCK_UPCOMING_PAYMENTS);
    }, []);

    // Lógica para filtrar y ordenar las transacciones para la tabla de recientes
    const transactionsForRecentTable = transactions
        .filter(t => {
            // Filtrar transacciones del mes actual
            const transactionDate = new Date(t.date);
            const currentDate = new Date();
            // Asegura que la comparación de meses y años sea precisa
            return transactionDate.getMonth() === currentDate.getMonth() && transactionDate.getFullYear() === currentDate.getFullYear();
        })
        .sort((a, b) => {
            // Ordenar por fecha y hora descendente para "más recientes"
            // Es importante que la hora esté incluida si `t.time` es parte de la data
            // Si t.time es opcional o no está, parseISO(t.date) sería suficiente
            const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime(); // Usa '00:00' si t.time puede ser undefined
            const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
            return dateB - dateA;
        });

    return (
        <div className="flex min-h-screen bg-[#020817] text-gray-100">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Contenido principal */}
            <div
                className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? "ml-64" : "sm:ml-20 ml-0"
                }`}
            >
                {/* Header para botón de menú en móvil */}
                <div className="flex justify-between items-center mb-6 sm:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors"
                        aria-label="Abrir menú de navegación"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-bold text-center flex-grow sm:flex-grow-0">Dashboard</h1>
                </div>

                <h1 className="hidden sm:block text-3xl font-bold text-white mb-6">Dashboard</h1>

                {/* Tarjetas de Resumen */}
                <SummaryCards transactions={transactions} cardData={cardData} /> {/* Usa 'transactions' directamente si SummaryCards necesita todas */}

                {/* Secciones Inferiores */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Transacciones Recientes (Columna Izquierda) */}
                    <RecentTransactions transactions={transactionsForRecentTable} /> {/* Pasa las transacciones filtradas y ordenadas */}

                    {/* Presupuesto Mensual y Próximos Pagos (Columna Derecha) */}
                    <div className="flex flex-col gap-6 lg:w-2/5">
                        <MonthlyBudget budgetData={budgetData} />
                        <UpcomingPayments payments={upcomingPayments} />
                    </div>
                </div>
            </div>
        </div>
    );
}