// Datos de resumen para las tarjetas superiores
export const transactionsSummary = [
  {
    type: 'income' as const,
    title: 'Ingresos',
    amount: '$8.750.420 COP',
    percentage: '12,5%',
    isPositive: true,
  },
  {
    type: 'expense' as const,
    title: 'Gastos',
    amount: '$5.320.180 COP',
    percentage: '8,3%',
    isPositive: true,
  },
  {
    type: 'balance' as const,
    title: 'Balance',
    amount: '$3.430.240 COP',
    percentage: '32,7%',
    isPositive: true,
  },
];

// Datos de transacciones
export const transactionsData = [
  {
    id: '1',
    date: '15/04/23',
    description: 'Supermercado El Corte Inglés',
    subtitle: 'Compra de alimentos',
    category: 'Alimentación',
    amount: 125450, // $125.450 COP
    account: 'Cuenta Principal',
    method: 'Tarjeta de Débito',
    status: 'Completada' as const,
    type: 'expense' as const,
  },
  {
    id: '2',
    date: '14/04/23',
    description: 'Transferencia recibida',
    subtitle: 'Pago de nómina',
    category: 'Ingresos',
    amount: 1500000, // $1.500.000 COP
    account: 'Cuenta Principal',
    method: 'Transferencia',
    status: 'Completada' as const,
    type: 'income' as const,
  },
  {
    id: '3',
    date: '13/04/23',
    description: 'Netflix',
    subtitle: 'Suscripción mensual',
    category: 'Ocio',
    amount: 12990, // $12.990 COP
    account: 'Tarjeta de Crédito',
    method: 'Tarjeta de Crédito',
    status: 'Completada' as const,
    type: 'expense' as const,
  },
  {
    id: '4',
    date: '12/04/23',
    description: 'Restaurante La Mafia',
    subtitle: 'Cena con amigos',
    category: 'Restaurantes',
    amount: 45800, // $45.800 COP
    account: 'Tarjeta de Crédito',
    method: 'Tarjeta de Crédito',
    status: 'Completada' as const,
    type: 'expense' as const,
  },
  {
    id: '5',
    date: '10/04/23',
    description: 'Gasolina Repsol',
    subtitle: 'Llenado del depósito',
    category: 'Transporte',
    amount: 65320, // $65.320 COP
    account: 'Cuenta Principal',
    method: 'Tarjeta de Débito',
    status: 'Completada' as const,
    type: 'expense' as const,
  },
  {
    id: '6',
    date: '08/04/23',
    description: 'Devolución Hacienda',
    subtitle: 'Devolución de la declaración de l...',
    category: 'Ingresos',
    amount: 320150, // $320.150 COP
    account: 'Cuenta Principal',
    method: 'Transferencia',
    status: 'Completada' as const,
    type: 'income' as const,
  },
];

// Tipos para TypeScript
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

export interface SummaryData {
  type: 'income' | 'expense' | 'balance';
  title: string;
  amount: string;
  percentage: string;
  isPositive: boolean;
}
