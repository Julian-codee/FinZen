// Components/TransactionRow.tsx
import React from 'react';
import {
  ShoppingCart, Home, Coffee, Gamepad2, Music, Plus, Delete,
  TrendingDown, TrendingUp, UtensilsCrossed, Zap, Heart, Pizza, Wifi, Phone,
  GraduationCap, PartyPopper, Car
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Transaction } from '../Types/types'; // Asegúrate de la ruta correcta

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: () => void;
  onDelete: () => void;
}

// Helper para obtener icono y colores de categoría (repetido de AddTransaction para consistencia)
const getCategoryDetails = (categoryId: string) => {
  const categories = [
    { id: "comida", name: "Comida", icon: <UtensilsCrossed className="w-4 h-4" />, bgColor: "bg-[#FED7AA]", textColor: "text-[#EA580C]" },
    { id: "supermercado", name: "Supermercado", icon: <ShoppingCart className="w-4 h-4" />, bgColor: "bg-[#BBF7D0]", textColor: "text-[#059669]" },
    { id: "vivienda", name: "Vivienda", icon: <Home className="w-4 h-4" />, bgColor: "bg-[#DBEAFE]", textColor: "text-[#2563EB]" },
    { id: "transporte", name: "Transporte", icon: <Car className="w-4 h-4" />, bgColor: "bg-[#BFDBFE]", textColor: "text-[#3B82F6]" },
    { id: "entretenimiento", name: "Entretenimiento", icon: <Gamepad2 className="w-4 h-4" />, bgColor: "bg-[#E9D5FF]", textColor: "text-[#9333EA]" },
    { id: "servicios", name: "Servicios", icon: <Zap className="w-4 h-4" />, bgColor: "bg-[#FEF3C7]", textColor: "text-[#D97706]" },
    { id: "cafe", name: "Café", icon: <Coffee className="w-4 h-4" />, bgColor: "bg-[#FED7AA]", textColor: "text-[#92400E]" },
    { id: "salud", name: "Salud", icon: <Heart className="w-4 h-4" />, bgColor: "bg-[#FECACA]", textColor: "text-[#DC2626]" },
    { id: "restaurante", name: "Restaurante", icon: <Pizza className="w-4 h-4" />, bgColor: "bg-[#FED7AA]", textColor: "text-[#EA580C]" },
    { id: "internet", name: "Internet", icon: <Wifi className="w-4 h-4" />, bgColor: "bg-[#BFDBFE]", textColor: "text-[#3B82F6]" },
    { id: "telefono", name: "Teléfono", icon: <Phone className="w-4 h-4" />, bgColor: "bg-[#E9D5FF]", textColor: "text-[#9333EA]" },
    { id: "educacion", name: "Educación", icon: <GraduationCap className="w-4 h-4" />, bgColor: "bg-[#BBF7D0]", textColor: "text-[#059669]" },
    { id: "ocio", name: "Ocio", icon: <PartyPopper className="w-4 h-4" />, bgColor: "bg-[#FECACA]", textColor: "text-[#DC2626]" },
    { id: "musica", name: "Música", icon: <Music className="w-4 h-4" />, bgColor: "bg-[#E9D5FF]", textColor: "text-[#9333EA]" },
    { id: "otros", name: "Otros", icon: <Plus className="w-4 h-4" />, bgColor: "bg-[#F3F4F6]", textColor: "text-[#6B7280]" },
  ];
  return categories.find(cat => cat.id === categoryId) || categories.find(cat => cat.id === "otros")!;
};


const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onEdit, onDelete }) => {
  const categoryDetails = getCategoryDetails(transaction.category);
  const transactionDate = new Date(transaction.date + 'T00:00:00'); // Añade 'T00:00:00' para evitar problemas de zona horaria

  const formattedAmount = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP", // O la moneda que uses
    minimumFractionDigits: 0, // Generalmente se usa 0 o 2 para COP, ajusta si es necesario
    maximumFractionDigits: 0, // Generalmente se usa 0 o 2 para COP, ajusta si es necesario
  }).format(transaction.amount);

  const amountColorClass = transaction.type === 'expense' ? 'text-red-500' : 'text-green-500';

  return (
    <tr className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50 transition-colors">
      <td className="py-3 px-4 w-[120px] sm:w-[150px]">
        <div className="flex items-center gap-3">
          <div className={`${categoryDetails.bgColor} p-2 rounded-lg`}>
            <div className={`${categoryDetails.textColor}`}>{categoryDetails.icon}</div>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{categoryDetails.name}</p>
            <p className="text-xs text-gray-400">{transaction.account}</p> {/* Muestra la cuenta/presupuesto */}
          </div>
        </div>
      </td>
      <td className="py-3 px-4 w-[200px] sm:w-[300px]">
        <p className="text-sm text-gray-300 font-semibold">{transaction.description}</p> {/* Usa 'description' */}
        {transaction.subtitle && <p className="text-xs text-gray-500">{transaction.subtitle}</p>}
      </td>
      <td className="py-3 px-4 w-[100px] text-sm text-gray-400 hidden sm:table-cell">
        {format(transactionDate, "dd MMM yyyy", { locale: es })} {/* Usa 'date' */}
      </td>
      <td className="py-3 px-4 w-[120px] text-right">
        <span className={`text-sm font-semibold ${amountColorClass}`}>
          {transaction.type === 'expense' ? '- ' : '+ '}{formattedAmount}
        </span>
      </td>
      <td className="py-3 px-4 w-[100px] text-right">
        <div className="flex justify-end gap-2">
          <button onClick={onEdit} className="text-blue-400 hover:text-blue-300">
            {/* Icono de editar, si tienes uno (ej. Pencil de lucide-react) */}
            Editar
          </button>
          <button onClick={onDelete} className="text-red-400 hover:text-red-300">
            {/* Icono de eliminar (ej. Trash2 de lucide-react) */}
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;