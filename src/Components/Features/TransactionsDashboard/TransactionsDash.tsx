"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { Menu } from "lucide-react"
import { Sidebar } from "../../Ui/UiDashBoard/SideBar" // Asegúrate de que la ruta sea correcta
import TransactionsHeader from "./Components/TransactionsHeader" // Asegúrate de que la ruta sea correcta
import SummaryCards from "./Components/SumaryCards" // Asegúrate de que la ruta sea correcta
import TransactionFilters from "./Components/TransactionFilters" // Asegúrate de que la ruta sea correcta
import TransactionTable from "./Components/TransactionTable" // Asegúrate de que la ruta sea correcta
import { Transaction } from "./Types/types" // Asegúrate de que la ruta sea correcta
import {
  isWithinInterval,
  subDays,
  startOfMonth,
  endOfMonth,
  parseISO,
} from "date-fns" // Importa las funciones necesarias de date-fns

const STORAGE_KEY = "finzen_transactions"

const Transactions: React.FC = () => {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]) // Renombramos a 'allTransactions' para claridad
  const [activeTab, setActiveTab] = useState<'Todas' | 'Gastos' | 'Ingresos'>('Todas')
  // Inicializamos el dateRange con un valor predeterminado que la lógica de filtrado pueda interpretar
  const [dateRange, setDateRange] = useState<'Hoy' | 'Últimos 7 días' | 'Últimos 30 días' | 'Este mes' | 'Personalizado'>('Este mes')
  const [sortBy, setSortBy] = useState<'Más recientes' | 'Más antiguos' | 'Mayor importe' | 'Menor importe'>('Más recientes')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // --- Manejo del Sidebar ---
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, []) // No hay dependencias, se memoiza una vez

  // --- Carga y Sincronización de Transacciones ---
  useEffect(() => {
    // Solo ejecuta en el cliente (navegador)
    if (typeof window !== "undefined") {
      const loadTransactions = () => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          try {
            setAllTransactions(JSON.parse(stored))
          } catch (e) {
            console.error("Error al parsear transacciones de localStorage:", e)
            setAllTransactions([]) // Restablecer a vacío si hay un error
          }
        } else {
          setAllTransactions([]) // Si no hay nada, inicializa vacío
        }
      }

      loadTransactions()

      // Listener para cuando se añade una nueva transacción desde otro componente (ej. AddTransactionModal)
      window.addEventListener("transaction-added", loadTransactions)

      // Función de limpieza para remover el listener
      return () => {
        window.removeEventListener("transaction-added", loadTransactions)
      }
    }
  }, []) // Se ejecuta una vez al montar el componente

  // --- Lógica de Filtrado y Ordenación ---
  const filteredAndSortedTransactions = useMemo(() => {
    let currentTransactions = [...allTransactions] // Trabaja con una copia para no mutar el estado original

    // 1. Filtrar por Tipo (Tab)
    if (activeTab === 'Gastos') {
      currentTransactions = currentTransactions.filter(t => t.type === 'expense')
    } else if (activeTab === 'Ingresos') {
      currentTransactions = currentTransactions.filter(t => t.type === 'income')
    }

    // 2. Filtrar por Rango de Fechas
    const today = new Date()
    let startDate: Date | null = null
    let endDate: Date | null = null

    if (dateRange === 'Hoy') {
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()) // Inicio del día
      endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999) // Fin del día
    } else if (dateRange === 'Últimos 7 días') {
      startDate = subDays(today, 6) // Incluye hoy y los 6 días anteriores
      endDate = today
    } else if (dateRange === 'Últimos 30 días') {
      startDate = subDays(today, 29) // Incluye hoy y los 29 días anteriores
      endDate = today
    } else if (dateRange === 'Este mes') {
      startDate = startOfMonth(today)
      endDate = new Date(today.getFullYear(), today.getMonth(), new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(), 23, 59, 59, 999) // Fin del mes
    }
    // Para 'Personalizado', podrías implementar un modal de selección de fechas aquí
    // Por ahora, si es 'Personalizado' y no hay un rango definido, no se filtra por fecha.

    if (startDate && endDate) {
        currentTransactions = currentTransactions.filter(t => {
            // Asegura que la fecha de la transacción se interprete correctamente (como UTC o con fecha local)
            // Agregamos 'T00:00:00' para asegurar que parseISO la interprete como inicio del día
            const transactionDate = parseISO(t.date + 'T00:00:00');
            // Es crucial que startDate y endDate tengan la misma hora de referencia (o rango de horas)
            // para una comparación precisa. Usaremos solo el día para la comparación.
            return isWithinInterval(transactionDate, { start: startDate, end: endDate });
        });
    }

    // 3. Ordenar
    currentTransactions.sort((a, b) => {
      // Parsear las fechas una sola vez para optimizar
      const dateA = parseISO(a.date).getTime();
      const dateB = parseISO(b.date).getTime();

      if (sortBy === 'Más recientes') {
        return dateB - dateA; // De más nuevo a más antiguo
      } else if (sortBy === 'Más antiguos') {
        return dateA - dateB; // De más antiguo a más nuevo
      } else if (sortBy === 'Mayor importe') {
        return b.amount - a.amount; // De mayor a menor monto
      } else if (sortBy === 'Menor importe') {
        return a.amount - b.amount; // De menor a mayor monto
      }
      return 0; // No cambiar el orden si no hay criterio de ordenación
    })

    return currentTransactions
  }, [allTransactions, activeTab, dateRange, sortBy]) // Dependencias del useMemo

  return (
    <div className="flex min-h-screen bg-[#020817] text-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <div
        className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "sm:ml-20 ml-0" // Ajuste para móviles, el sidebar se superpone
        }`}
      >
        {/* Header para botón de menú en móvil */}
        <div className="flex justify-between items-center mb-6 sm:hidden"> {/* Ocultar en pantallas grandes */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-center flex-grow sm:flex-grow-0">Transacciones</h1> {/* Ajuste de tamaño de fuente */}
        </div>

        {/* El TransactionsHeader que ya tenías */}
        <TransactionsHeader />

        <SummaryCards transactions={filteredAndSortedTransactions} /> {/* Pasa las transacciones filtradas y ordenadas */}

        <TransactionFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          // Si tuvieras un modal de filtros avanzados, lo pasarías aquí:
          // onOpenAdvancedFilters={() => setShowAdvancedFilters(true)}
        />

        <TransactionTable
          data={filteredAndSortedTransactions} // Pasa las transacciones filtradas y ordenadas
          activeTab={activeTab}
        />
      </div>
    </div>
  )
}

export default Transactions