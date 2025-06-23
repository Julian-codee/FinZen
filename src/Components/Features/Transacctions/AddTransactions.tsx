"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarDays, ShoppingCart, Home, Coffee, Gamepad2, Music, Plus, Delete,
  TrendingDown, TrendingUp, UtensilsCrossed, Zap, Heart, Pizza, Wifi, Phone,
  GraduationCap, PartyPopper, Car
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
// Asegúrate de que la ruta a Sidebar sea correcta en tu proyecto
import { Sidebar } from "../../Ui/UiDashBoard/SideBar"; 

export const AddTransaction: React.FC = () => {
  const [monto, setMonto] = useState<string>("0");
  const [displayMonto, setDisplayMonto] = useState<string>("0,00");
  const [tipoTransaccion, setTipoTransaccion] = useState<"gasto" | "ingreso">("gasto");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [nota, setNota] = useState<string>("");
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState<string>("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const formatDate = () => selectedDate
    ? format(selectedDate, "d MMMM", { locale: es })
    : "Selecciona una fecha";

  const handleSelect = (selectedDay: Date | undefined) => {
    if (selectedDay) {
      setSelectedDate(selectedDay);
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    const cleanMonto = monto.replace(/\./g, "").replace(/,/g, "");
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

    if (monto === "0,") {
      setDisplayMonto("0,");
    } else if (monto.startsWith("0") && monto.length > 1 && !monto.startsWith("0,")) {
      setDisplayMonto(
        formatter.format(parseFloat(cleanMonto.substring(1).replace(",", ".")))
      );
    } else if (monto.includes(",")) {
      const parts = monto.split(",");
      let formattedInt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      let displayedDecPart = parts[1] ?? "";
      if (parts[1]?.length === 1) displayedDecPart += "0";
      setDisplayMonto(`${formattedInt},${displayedDecPart}`);
    }
  }, [monto]);

  const handleMontoClick = (valor: string) => {
    setMonto((prevMonto) => {
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

  const handleGuardarTransaccion = () => {
    const id = Date.now().toString(); // Genera un ID único basado en la marca de tiempo

    const nuevaTransaccion = {
      id, // Asigna el ID único
      amount: parseFloat(monto.replace(",", ".")), // Asegúrate de parsear el monto correctamente
      type: tipoTransaccion === "gasto" ? "expense" : "income",
      category: categoriaSeleccionada || "otros", // Valor por defecto si no se selecciona
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : "", // Formato YYYY-MM-DD
      description: nota || "Sin descripción", // Nota como descripción
      subtitle: "", // Si tienes un subtítulo, agrégalo aquí
      account: cuentaSeleccionada || "No especificado", // Cuenta seleccionada
      method: cuentaSeleccionada || "No especificado", // Método (puede ser el mismo que la cuenta o diferente)
      status: "Completada", // Estado de la transacción
    };

    const STORAGE_KEY = "finzen_transactions";
    const almacenadas = localStorage.getItem(STORAGE_KEY);
    const transaccionesPrevias = almacenadas ? JSON.parse(almacenadas) : [];

    const nuevasTransacciones = [...transaccionesPrevias, nuevaTransaccion];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasTransacciones));

    // Emitir evento personalizado
    window.dispatchEvent(new CustomEvent("transaction-added", {
      detail: nuevaTransaccion, // Opcional, el otro componente solo necesita saber que hubo un cambio
    }));

    alert("✅ Transacción guardada");

    // Resetear el formulario
    setMonto("0");
    setTipoTransaccion("gasto");
    setCategoriaSeleccionada(null);
    setSelectedDate(new Date());
    setNota("");
    setCuentaSeleccionada("");
  };

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

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center py-4 px-2">
        <div className="w-full max-w-lg bg-[#020817] rounded-lg shadow-lg p-4">
          <h1 className="text-xl font-bold mb-1">Agregar Transacción</h1>
          <p className="text-gray-400 text-sm mb-4">Registra tus gastos e ingresos de manera rápida y sencilla.</p>

          <input
            type="text"
            placeholder="Nombre de la Transacción"
            className="w-full p-2.5 rounded-md bg-[#020817] border border-white/40 text-gray-300 mb-4"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />

          {/* Tipo de transacción */}
          <div className="flex rounded-md p-0.5 mb-4">
            <button
              className={`flex-1 py-2 m-2 border rounded-md font-semibold transition-colors duration-200 ${tipoTransaccion === "gasto" ? "bg-rose-500 text-white" : "text-red-500 border-white/40 hover:bg-neutral-700"}`}
              onClick={() => setTipoTransaccion("gasto")}
            >
              <TrendingDown className="inline-block mr-1" size={18} /> Gasto
            </button>
            <button
              className={`flex-1 py-2 m-2 border rounded-md font-semibold transition-colors duration-200 ${tipoTransaccion === "ingreso" ? "bg-green-600 text-white" : "text-green-600 border-white/40 hover:bg-neutral-700"}`}
              onClick={() => setTipoTransaccion("ingreso")}
            >
              <TrendingUp className="inline-block mr-1" size={18} /> Ingreso
            </button>
          </div>

          {/* Monto */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Monto</h2>
            <div className="text-3xl font-bold text-white text-right mb-3">$ {displayMonto}</div>
            <div className="grid grid-cols-3 gap-1.5">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "del"].map((key) => (
                <button
                  key={key}
                  className={`py-3 border border-white/40 rounded-md text-xl font-bold ${key === "del" ? "text-red-400 hover:bg-neutral-700" : "hover:bg-neutral-600"}`}
                  onClick={() => handleMontoClick(key)}
                >
                  {key === "del" ? <Delete size={25} /> : key}
                </button>
              ))}
            </div>
          </div>

          {/* Categorías */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Categoría</h2>
            <div className="grid grid-cols-4 gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaSeleccionada(cat.id)}
                  className={`${cat.bgColor} rounded-lg p-2 flex flex-col items-center justify-center min-h-[60px] ${categoriaSeleccionada === cat.id ? "ring-2 ring-blue-500" : ""}`}
                >
                  <div className={`${cat.textColor} mb-1`}>{cat.icon}</div>
                  <span className={`${cat.textColor} text-xs font-medium text-center`}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fecha */}
          <div className="relative mb-6">
            <button
              onClick={toggleCalendar}
              className="flex items-center gap-2 w-full h-12 bg-[#020817] border border-white/40 text-gray-300 rounded-md px-4"
            >
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span>{formatDate()}</span>
            </button>
            {showCalendar && (
              <div className="absolute z-10 bottom-full mb-2 bg-[#0F1525] border border-gray-700 rounded-md shadow-lg p-4">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelect}
                  numberOfMonths={1}
                  locale={es}
                  modifiersClassNames={{
                    selected: "bg-blue-600 text-white",
                    today: "border border-white",
                  }}
                />
              </div>
            )}
          </div>

          {/* Cuenta */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Presupuesto</h2>
            <select
              value={cuentaSeleccionada}
              onChange={(e) => setCuentaSeleccionada(e.target.value)}
              className="w-full p-2.5 rounded-md bg-[#020817] border border-white/40 text-gray-300"
            >
              <option value="" disabled>Selecciona un presupuesto</option>
              <option value="efectivo">Efectivo</option>
              <option value="banco">Cuenta de Banco</option>
              <option value="tarjeta_credito">Tarjeta de Crédito</option>
            </select>
          </div>

          <button
            onClick={handleGuardarTransaccion}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 rounded-md text-lg"
          >
            Guardar Transacción
          </button>
        </div>
      </div>
    </>
  );
};