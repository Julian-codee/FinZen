
export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'Completada' | 'Pendiente' | 'Cancelada';

export interface Transaction {
    id: string;
    description: string;
    category: string;
    amount: number;
    type: TransactionType;
    date: string;
    time: string;
    notes?: string;
    account?: string;
    paymentMethod?: string;
    status?: TransactionStatus;
}

export interface BudgetCategory {
    id: string;
    name: string;
    spent: number;
    limit: number;
    icon?: React.ReactNode;
}

export interface CardSummary {
    id: string;
    name: string;
    active: boolean;
    blocked: boolean
}