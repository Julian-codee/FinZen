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
  categories: Array<{ name: string; budget: number; categoryType: string }>
}
