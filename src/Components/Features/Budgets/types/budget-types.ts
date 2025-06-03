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
