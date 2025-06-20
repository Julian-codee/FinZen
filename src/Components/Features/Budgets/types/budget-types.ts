export interface BudgetCategory {
  id: string
  name: string
  spent: number
  budget: number
  categoryType: string
  accountId?: string // <-- Añadido para asociar cuenta
}

export interface NewCategoryForm {
  name: string
  budget: string
  categoryType: string
}

export interface Budget {
  id: string
  name: string
  totalBudget: number
  createdDate: string
  categories: BudgetCategory[]
  status: "active" | "completed" | "paused"
}

export interface BudgetData {
  name: string
  totalBudget: number
  categories: Array<{ name: string; budget: number; categoryType: string; accountId?: string }>
  accountId?: string
}

// Para MonthlyBudget y Transaction, asume que también pueden tener accountId si lo necesitas
export interface MonthlyBudget {
  id: string
  month: number
  year: number
  totalBudget: number
  categories: BudgetCategory[]
}

export interface Transaction {
  description: any
  id: string
  amount: number
  categoryId: string
  date: string
  accountId?: string
}