import React from "react";
import {
  ShoppingCart,
  Home,
  Coffee,
  Gamepad2,
  Music,
  Plus,
  UtensilsCrossed,
  Zap,
  Heart,
  Pizza,
  Wifi,
  Phone,
  GraduationCap,
  PartyPopper,
  Car,
  Pencil,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Transaction } from "../Types/types";

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: () => void;
  onDelete: () => void;
}

// Categorización
const getCategoryDetails = (categoryId: string) => {
  const categories = [
    {
      id: "comida",
      name: "Comida",
      icon: <UtensilsCrossed className="w-4 h-4" />,
      bgColor: "bg-[#FED7AA]",
      textColor: "text-[#EA580C]",
    },
    {
      id: "supermercado",
      name: "Supermercado",
      icon: <ShoppingCart className="w-4 h-4" />,
      bgColor: "bg-[#BBF7D0]",
      textColor: "text-[#059669]",
    },
    {
      id: "vivienda",
      name: "Vivienda",
      icon: <Home className="w-4 h-4" />,
      bgColor: "bg-[#DBEAFE]",
      textColor: "text-[#2563EB]",
    },
    {
      id: "transporte",
      name: "Transporte",
      icon: <Car className="w-4 h-4" />,
      bgColor: "bg-[#BFDBFE]",
      textColor: "text-[#3B82F6]",
    },
    {
      id: "entretenimiento",
      name: "Entretenimiento",
      icon: <Gamepad2 className="w-4 h-4" />,
      bgColor: "bg-[#E9D5FF]",
      textColor: "text-[#9333EA]",
    },
    {
      id: "servicios",
      name: "Servicios",
      icon: <Zap className="w-4 h-4" />,
      bgColor: "bg-[#FEF3C7]",
      textColor: "text-[#D97706]",
    },
    {
      id: "cafe",
      name: "Café",
      icon: <Coffee className="w-4 h-4" />,
      bgColor: "bg-[#FED7AA]",
      textColor: "text-[#92400E]",
    },
    {
      id: "salud",
      name: "Salud",
      icon: <Heart className="w-4 h-4" />,
      bgColor: "bg-[#FECACA]",
      textColor: "text-[#DC2626]",
    },
    {
      id: "restaurante",
      name: "Restaurante",
      icon: <Pizza className="w-4 h-4" />,
      bgColor: "bg-[#FED7AA]",
      textColor: "text-[#EA580C]",
    },
    {
      id: "internet",
      name: "Internet",
      icon: <Wifi className="w-4 h-4" />,
      bgColor: "bg-[#BFDBFE]",
      textColor: "text-[#3B82F6]",
    },
    {
      id: "telefono",
      name: "Teléfono",
      icon: <Phone className="w-4 h-4" />,
      bgColor: "bg-[#E9D5FF]",
      textColor: "text-[#9333EA]",
    },
    {
      id: "educacion",
      name: "Educación",
      icon: <GraduationCap className="w-4 h-4" />,
      bgColor: "bg-[#BBF7D0]",
      textColor: "text-[#059669]",
    },
    {
      id: "ocio",
      name: "Ocio",
      icon: <PartyPopper className="w-4 h-4" />,
      bgColor: "bg-[#FECACA]",
      textColor: "text-[#DC2626]",
    },
    {
      id: "musica",
      name: "Música",
      icon: <Music className="w-4 h-4" />,
      bgColor: "bg-[#E9D5FF]",
      textColor: "text-[#9333EA]",
    },
    {
      id: "otros",
      name: "Otros",
      icon: <Plus className="w-4 h-4" />,
      bgColor: "bg-[#F3F4F6]",
      textColor: "text-[#6B7280]",
    },
  ];
  return (
    categories.find((cat) => cat.id === categoryId) ||
    categories.find((cat) => cat.id === "otros")!
  );
};

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const category = getCategoryDetails(transaction.category);

  const transactionDate = (() => {
    try {
      const date = new Date(transaction.date + "T00:00:00");
      return isNaN(date.getTime())
        ? "Fecha inválida"
        : format(date, "dd MMM yyyy", { locale: es });
    } catch {
      return "Fecha inválida";
    }
  })();

  const formattedAmount = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(transaction.amount);

  const amountColor =
    transaction.type === "expense" ? "text-red-500" : "text-green-500";

  return (
    <tr className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50 transition-colors">
      {/* Categoría + Cuenta */}
      <td className="py-3 px-4 w-[140px] sm:w-[180px] md:w-[200px]">
        <div className="flex items-center gap-3">
          <div className={`${category.bgColor} p-2 rounded-lg`}>
            <div className={`${category.textColor}`}>{category.icon}</div>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{category.name}</p>
            <p className="text-xs text-gray-400 hidden sm:block">
              {transaction.account}
            </p>
          </div>
        </div>
      </td>

      {/* Descripción + Subtítulo */}
      <td className="py-3 px-4 w-[160px] sm:w-[240px] lg:w-[300px]">
        <p className="text-sm text-gray-300 font-semibold truncate">
          {transaction.description}
        </p>
        {transaction.subtitle?.trim() && (
          <p className="text-xs text-gray-500 truncate hidden md:block">
            {transaction.subtitle}
          </p>
        )}
      </td>

      {/* Fecha */}
      <td className="py-3 px-4 text-sm text-gray-400 hidden sm:table-cell w-[100px] lg:w-[120px]">
        {transactionDate}
      </td>

      {/* Monto */}
      <td className="py-3 px-4 w-[100px] text-right">
        <span className={`text-sm font-semibold ${amountColor}`}>
          {transaction.type === "expense" ? "- " : "+ "}
          {formattedAmount}
        </span>
      </td>

      {/* Acciones */}
      <td className="py-3 px-4 w-[80px] text-right">
        <div className="flex justify-end gap-1 sm:gap-2">
          <button
            onClick={onEdit}
            className="p-1 rounded-md text-blue-400 hover:text-blue-300 hover:bg-neutral-700 transition-colors"
            aria-label="Editar transacción"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded-md text-red-400 hover:text-red-300 hover:bg-neutral-700 transition-colors"
            aria-label="Eliminar transacción"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;
