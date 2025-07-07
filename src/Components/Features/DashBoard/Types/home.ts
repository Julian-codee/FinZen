
export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'Completada' | 'Pendiente' | 'Cancelada';

export interface Transaction {
    id: string;
    description: string;
    category: string;
    amount: number;
    type: TransactionType;
    date: string;
    time?: string;
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

export interface PresupuestoResponseDto {
  idPresupuesto: number;
  nombre: string;
  montoAsignado: number;
  montoGastado: number;
  categoria?: {
      idCategoria: number;
      nombre: string;
  };
  cuenta?: {
      idCuenta: number;
      nombre: string;
  };
  tarjeta?: {
      idTarjeta: number;
      nombre: string;
  };
  inversion?: {
      idInversion: number;
      nombre: string;
  };
}

export interface PresupuestoRequestDto {
  nombre: string;
  montoAsignado: number;
  idCategoriaPresupuesto: number;
  idCuenta?: number;
  idTarjeta?: number;
  idInversion?: number;
}

export interface GastoRequestDto {
  monto: number;
  descripcion: string;
  idPresupuesto: number;
  fecha: string;
  nombre?: string;
  IdCategoria?: number;
}

export interface GastosResponseDto {
  idGasto: number;
  nombre: string;
  monto: number;
  descripcion: string;
  fecha: string;
  idCategoria: number;
  nombreCategoria: string;
  idPresupuesto?: number;
  nombrePresupuesto?: string;
}

export interface BudgetCategoryUI {
  id: string;
  name: string;
  budget: number;
  spent: number;
  categoryType?: string;
  associatedEntityId?: number;
  associatedEntityType?: 'cuenta' | 'tarjeta' | 'inversion';
  originalCategoryId?: number;
}

// Removed duplicate Transaction interface to avoid type conflicts

export interface AddBudgetData {
  name: string;
  montoAsignado: number;
  selectedCategoryId: number;
  entityType?: "cuenta" | "tarjeta" | "inversion";
  entityId?: number;
}

export interface BudgetData {
  name: string;
  totalBudget: number;
  categories: {
    name: string;
    budget: number;
    categoryType: string;
  }[];
}

// Puedes incluir esto donde declares tus tipos, si aún no lo tienes:
export interface Budget {
  id: string;
  nombre: string;
  montoAsignado: number;
  montoGastado: number;
  categoriaPresupuesto?: {
    nombre: string;
  };
  cuenta?: { nombre: string };
  tarjeta?: { nombre: string };
  inversion?: { nombre: string };
}