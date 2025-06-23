// types.ts

export interface Transaction {
  id: string;
  date: string;
  description: string;
  subtitle?: string;
  category: string;
  amount: number;
  account: string;
  method: string;
  status: 'Completada' | 'Pendiente' | 'Cancelada';
  type: 'income' | 'expense';
}
