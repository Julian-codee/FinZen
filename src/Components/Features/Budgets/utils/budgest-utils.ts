import type { BudgetCategory, MonthlyBudget, Transaction } from "../types/budget-types"

// Formatear moneda en formato colombiano
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Obtener el color de la barra de progreso según el porcentaje gastado
export const getProgressColor = (spent: number, budget: number) => {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0
  if (percentage >= 100) return "bg-[#EF4444]"
  if (percentage >= 80) return "bg-[#F59E0B]"
  return "bg-[#3B82F6]"
}

// Calcular el porcentaje gastado
export const calculatePercentage = (spent: number, budget: number) => {
  return budget > 0 ? (spent / budget) * 100 : 0
}

// Guardar presupuesto en localStorage
export const saveBudget = (budget: MonthlyBudget) => {
  const budgets = getBudgets()
  const existingIndex = budgets.findIndex((b) => b.id === budget.id)

  if (existingIndex >= 0) {
    budgets[existingIndex] = budget
  } else {
    budgets.push(budget)
  }

  localStorage.setItem("budgets", JSON.stringify(budgets))
}

// Obtener todos los presupuestos de localStorage
export const getBudgets = (): MonthlyBudget[] => {
  const budgetsJson = localStorage.getItem("budgets")
  return budgetsJson ? JSON.parse(budgetsJson) : []
}

// Obtener presupuesto para un mes específico
export const getBudgetForMonth = (month: number, year: number): MonthlyBudget | undefined => {
  const budgets = getBudgets()
  return budgets.find((b) => b.month === month && b.year === year)
}

// Guardar transacción
export const saveTransaction = (transaction: Transaction) => {
  const transactions = getTransactions()
  transactions.push(transaction)
  localStorage.setItem("transactions", JSON.stringify(transactions))
}

// Obtener todas las transacciones
export const getTransactions = (): Transaction[] => {
  const transactionsJson = localStorage.getItem("transactions")
  return transactionsJson ? JSON.parse(transactionsJson) : []
}

// Obtener transacciones para un mes específico
export const getTransactionsForMonth = (month: number, year: number): Transaction[] => {
  const transactions = getTransactions()
  return transactions.filter((t) => {
    const date = new Date(t.date)
    return date.getMonth() === month && date.getFullYear() === year
  })
}

// Calcular gastos por categoría basado en transacciones
export const calculateSpentByCategory = (categoryId: string, month: number, year: number): number => {
  const transactions = getTransactionsForMonth(month, year)
  return transactions.filter((t) => t.categoryId === categoryId).reduce((total, t) => total + t.amount, 0)
}

// Actualizar gastos en categorías basado en transacciones
export const updateCategoriesWithTransactions = (budget: MonthlyBudget): MonthlyBudget => {
  const updatedCategories = budget.categories.map((category) => {
    const spent = calculateSpentByCategory(category.id, budget.month, budget.year)
    return { ...category, spent }
  })

  return { ...budget, categories: updatedCategories }
}

// Crear un nuevo presupuesto mensual
export const createMonthlyBudget = (
  month: number,
  year: number,
  totalBudget: number,
  categories: Omit<BudgetCategory, "id" | "spent">[],
): MonthlyBudget => {
  const budgetCategories: BudgetCategory[] = categories.map((cat) => ({
    ...cat,
    id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    spent: 0,
  }))

  return {
    id: `budget-${month}-${year}-${Date.now()}`,
    month,
    year,
    totalBudget,
    categories: budgetCategories,
  }
}