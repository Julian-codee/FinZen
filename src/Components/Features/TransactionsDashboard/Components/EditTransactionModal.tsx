// Components/EditTransactionModal.tsx
import React, { useState, useEffect } from 'react';
import { Transaction } from '../Types/types'; // Asegúrate de que la ruta sea correcta
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Asegúrate de importar los estilos del day-picker

import {
  CalendarDays, ShoppingCart, Home, Coffee, Gamepad2, Music, Plus, Delete,
  TrendingDown, TrendingUp, UtensilsCrossed, Zap, Heart, Pizza, Wifi, Phone,
  GraduationCap, PartyPopper, Car
} from "lucide-react";

interface Props {
  transaction: Transaction;
  onClose: () => void;
  onSave: (updated: Transaction) => void;
}

// Helper para obtener icono y colores de categoría
// Considera mover esto a un archivo de utilidades si se usa en varios lugares
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

const getCategoryDetails = (categoryId: string) => {
  return categories.find(cat => cat.id === categoryId) || categories.find(cat => cat.id === "otros")!;
};

const EditTransactionModal: React.FC<Props> = ({ transaction, onClose, onSave }) => {
  const [formData, setFormData] = useState<Transaction>({ ...transaction });
  const [montoInput, setMontoInput] = useState<string>(
    transaction.amount.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, '_').replace(/,/g, '.').replace(/_/g, ',')
  );
  const [displayMonto, setDisplayMonto] = useState<string>(montoInput);
  const [showCalendar, setShowCalendar] = useState(false);

  const initialDate = transaction.date ? new Date(transaction.date + 'T00:00:00') : new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

  // Sincronizar formData.amount con montoInput
  useEffect(() => {
    // Si la transacción se actualiza desde fuera o al cargar el modal
    const initialFormattedAmount = transaction.amount.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, '_').replace(/,/g, '.').replace(/_/g, ',');
    setMontoInput(initialFormattedAmount);
    setDisplayMonto(initialFormattedAmount);
    setSelectedDate(transaction.date ? new Date(transaction.date + 'T00:00:00') : new Date());
    setFormData({ ...transaction });
  }, [transaction]);


  // Lógica de formateo del monto, copiada de AddTransaction
  useEffect(() => {
    const cleanMonto = montoInput.replace(/\./g, "").replace(/,/g, "");
    const formatter = new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    });

    const parsedMonto = parseFloat(cleanMonto.replace(",", "."));
    if (!isNaN(parsedMonto)) {
      setDisplayMonto(formatter.format(parsedMonto));
    } else {
      setDisplayMonto("0,00");
    }

    if (montoInput === "0,") {
      setDisplayMonto("0,");
    } else if (montoInput.startsWith("0") && montoInput.length > 1 && !montoInput.startsWith("0,")) {
      setDisplayMonto(
        formatter.format(parseFloat(cleanMonto.substring(1).replace(",", ".")))
      );
    } else if (montoInput.includes(",")) {
      const parts = montoInput.split(",");
      let formattedInt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      let displayedDecPart = parts[1] ?? "";
      if (parts[1]?.length === 1) displayedDecPart += "0";
      setDisplayMonto(`${formattedInt},${displayedDecPart}`);
    }
    // Actualizar formData.amount cada vez que montoInput cambia
    setFormData(prev => ({
      ...prev,
      amount: parseFloat(cleanMonto.replace(",", ".")) || 0 // Asegura que sea un número válido
    }));
  }, [montoInput]);


  const handleMontoClick = (valor: string) => {
    setMontoInput((prevMonto) => {
      let currentInput = prevMonto;

      if (valor === "del") {
        if (currentInput.length === 1 || currentInput === "0") return "0";
        if (currentInput.endsWith(",") && currentInput.length === 2 && currentInput.startsWith("0")) return "0";
        return currentInput.slice(0, -1);
      }

      if (valor === ",") {
        if (currentInput.includes(",")) return currentInput;
        return currentInput === "0" ? "0," : currentInput + ",";
      }

      if (currentInput === "0" && valor !== ",") return valor;

      if (currentInput.includes(",")) {
        const parts = currentInput.split(",");
        if (parts[1] && parts[1].length >= 2) return currentInput;
      }

      return currentInput + valor;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setFormData(prev => ({ ...prev, category: categoryId }));
  };

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handleDateSelect = (selectedDay: Date | undefined) => {
    if (selectedDay) {
      setSelectedDate(selectedDay);
      setFormData(prev => ({ ...prev, date: selectedDay.toISOString().split("T")[0] }));
      setShowCalendar(false);
    }
  };

  const formatDateDisplay = () => selectedDate
    ? format(selectedDate, "d MMMM", { locale: es })
    : "Selecciona una fecha";


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // formData ya tiene el amount correcto del useEffect
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Contenedor principal del modal con scrollbar personalizado */}
      <div className="bg-[#020817] border border-white/40 rounded-xl p-5 w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scroll-modal"> {/* <-- Clases para el scrollbar aquí */}
        <h2 className="text-xl font-bold mb-4 text-center">Editar Transacción</h2>
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Campo de Nota/Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
            <input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2.5 rounded-md bg-[#0D1119] border border-white/40 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre de la Transacción"
              required
            />
          </div>

          {/* Tipo de transacción */}
          <div className="mb-3 flex rounded-md p-0.5 border border-white/40">
            <button
              type="button"
              className={`flex-1 py-2 m-0.5 rounded-md font-semibold transition-colors duration-200 ${formData.type === "expense" ? "bg-rose-500 text-white" : "text-red-500 hover:bg-neutral-700"}`}
              onClick={() => setFormData(prev => ({ ...prev, type: "expense" }))}
            >
              <TrendingDown className="inline-block mr-1" size={18} /> Gasto
            </button>
            <button
              type="button"
              className={`flex-1 py-2 m-0.5 rounded-md font-semibold transition-colors duration-200 ${formData.type === "income" ? "bg-green-600 text-white" : "text-green-600 hover:bg-neutral-700"}`}
              onClick={() => setFormData(prev => ({ ...prev, type: "income" }))}
            >
              <TrendingUp className="inline-block mr-1" size={18} /> Ingreso
            </button>
          </div>

          {/* Monto */}
          <div className="mb-3">
            <h2 className="text-lg font-semibold mb-2">Monto</h2>
            <div className="text-3xl font-bold text-white text-right mb-3">$ {displayMonto}</div>
            <div className="grid grid-cols-3 gap-1.5">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "del"].map((key) => (
                <button
                  type="button"
                  key={key}
                  className={`py-3 border border-white/40 rounded-md text-xl font-bold ${key === "del" ? "text-red-400 hover:bg-neutral-700" : "hover:bg-neutral-600"} bg-[#0D1119]`}
                  onClick={() => handleMontoClick(key)}
                >
                  {key === "del" ? <Delete size={25} /> : key}
                </button>
              ))}
            </div>
          </div>

          {/* Categorías */}
          <div className="mb-3">
            <h2 className="text-lg font-semibold mb-2">Categoría</h2>
            <div className="grid grid-cols-4 gap-1.5">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`${cat.bgColor} rounded-lg p-2 flex flex-col items-center justify-center min-h-[60px] ${formData.category === cat.id ? "ring-2 ring-blue-500" : ""} transition-all duration-200`}
                >
                  <div className={`${cat.textColor} mb-1`}>{cat.icon}</div>
                  <span className={`${cat.textColor} text-xs font-medium text-center`}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fecha */}
          <div className="relative mb-3">
            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Fecha</label>
            <button
              type="button"
              onClick={toggleCalendar}
              className="flex items-center gap-2 w-full h-12 bg-[#0D1119] border border-white/40 text-gray-300 rounded-md px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span>{formatDateDisplay()}</span>
            </button>
            {showCalendar && (
              <div className="absolute z-10 top-full mt-2 bg-[#0F1525] border border-gray-700 rounded-md shadow-lg p-4 left-1/2 -translate-x-1/2">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  numberOfMonths={1}
                  locale={es}
                  modifiersClassNames={{
                    selected: "bg-blue-600 text-white",
                    today: "border border-white",
                  }}
                  className="text-white"
                  classNames={{
                    caption_label: "text-white",
                    nav_button_previous: "text-white hover:bg-gray-700",
                    nav_button_next: "text-white hover:bg-gray-700",
                    day_selected: "bg-blue-600 text-white",
                    day_today: "border border-blue-500",
                    day: "text-white hover:bg-gray-700",
                    head_cell: "text-gray-400",
                  }}
                />
              </div>
            )}
          </div>

          {/* Cuenta/Presupuesto */}
          <div>
            <label htmlFor="account" className="block text-sm font-medium text-gray-300 mb-1">Presupuesto</label>
            <select
              id="account"
              name="account"
              value={formData.account}
              onChange={handleInputChange}
              className="w-full p-2.5 rounded-md bg-[#0D1119] border border-white/40 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>Selecciona un presupuesto</option>
              <option value="efectivo">Efectivo</option>
              <option value="banco">Cuenta de Banco</option>
              <option value="tarjeta_credito">Tarjeta de Crédito</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2.5 rounded-md bg-[#0D1119] border border-white/40 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Completada">Completada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-md font-semibold border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-md font-bold bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 transition-colors duration-200"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;