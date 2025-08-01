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

export interface MonthlyBudget {
  id: string;
  month: number;
  year: number;
  totalBudget: number;
  categories: BudgetCategory[];
}


export interface BudgetCategoryUI {
  id: string;
  name: string;
  budget: number;
  spent: number;
  categoryType?: string;
  associatedEntityId?: number;
  associatedEntityType?: "cuenta" | "tarjeta" | "inversion";
  originalCategoryId?: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  categoryId: string;
  type: "expense" | "income";
}

export type Budget = {
  id: string;
  nombre: string;
  montoAsignado: number;
  montoGastado?: number;
  cuenta?: { nombre: string };
  tarjeta?: { nombre: string };
  inversion?: { nombre: string };
  categoriaPresupuesto?: { nombre: string };
};

export interface BudgetCategory {
  id: string;
  name: string;
  budget?: number;
  spent?: number;
  categoryType?: string;
}

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
