export interface BudgetCategory {
  id: string
  name: string
  spent: number
  budget: number
  categoryType: string
}

export interface NewCategoryForm {
  name: string
  budget: string
  categoryType: string
}

export interface MonthlyBudget {
  id: string
  month: number
  year: number
  totalBudget: number
  categories: BudgetCategory[]
}

export interface Transaction {
  id: string
  categoryId: string
  amount: number
  description: string
  date: Date
}
