"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarDays, ShoppingCart, Home, Coffee, Gamepad2, Music, Plus, Delete,
  TrendingDown, TrendingUp, UtensilsCrossed, Zap, Heart, Pizza, Wifi, Phone,
  GraduationCap, PartyPopper, Car, CheckCircle, XCircle, Menu // Import Menu icon
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import { DayPicker } from "react-day-picker";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import toast, { Toaster } from 'react-hot-toast';

// Componente Toast personalizado para éxito
const CustomSuccessToast: React.FC<{ t: any; message: string }> = ({ t, message }) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-white">
            ¡Transacción Exitosa!
          </p>
          <p className="mt-1 text-sm text-gray-300">
            {message}
          </p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-green-600/30">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-green-400 hover:text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Cerrar
      </button>
    </div>
  </div>
);

// Componente Toast personalizado para error
const CustomErrorToast: React.FC<{ t: any; message: string }> = ({ t, message }) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <XCircle className="h-6 w-6 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-white">
            Error al Guardar
          </p>
          <p className="mt-1 text-sm text-gray-300">
            {message}
          </p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-red-600/30">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-red-400 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Cerrar
      </button>
    </div>
  </div>
);

export const AddTransaction: React.FC = () => {
  const [monto, setMonto] = useState<string>("0");
  const [displayMonto, setDisplayMonto] = useState<string>("0,00");
  const [tipoTransaccion, setTipoTransaccion] = useState<"gasto" | "ingreso">("gasto");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [nota, setNota] = useState<string>("");
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState<string>("");

  // Estado y función para controlar el sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => { // Use useCallback for toggleSidebar
    setIsSidebarOpen((prev) => !prev);
  }, []);

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
    // Validaciones básicas antes de guardar
    if (parseFloat(monto.replace(",", ".")) <= 0) {
        toast.custom((t) => (
            <CustomErrorToast t={t} message="El monto debe ser mayor a 0." />
        ));
        return;
    }
    if (!categoriaSeleccionada) {
        toast.custom((t) => (
            <CustomErrorToast t={t} message="Por favor, selecciona una categoría." />
        ));
        return;
    }
    if (!selectedDate) {
        toast.custom((t) => (
            <CustomErrorToast t={t} message="Por favor, selecciona una fecha." />
        ));
        return;
    }
    if (!cuentaSeleccionada) {
        toast.custom((t) => (
            <CustomErrorToast t={t} message="Por favor, selecciona un presupuesto." />
        ));
        return;
    }

    const id = Date.now().toString(); // Genera un ID único basado en la marca de tiempo

    const nuevaTransaccion = {
      id,
      amount: parseFloat(monto.replace(",", ".")),
      type: tipoTransaccion === "gasto" ? "expense" : "income",
      category: categoriaSeleccionada, // Ya se valida que no sea null
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "", // Formato `YYYY-MM-DD`
      description: nota || `Transacción de ${categoriaSeleccionada}`, // Usar nota o una descripción por defecto
      notes: nota || `Transacción de ${categoriaSeleccionada}`, // Asumiendo que `notes` es lo que se muestra
      time: format(new Date(), "HH:mm"), // Añadir la hora actual
      account: cuentaSeleccionada,
      paymentMethod: cuentaSeleccionada, // Asumiendo que paymentMethod es igual a account
      status: "Completada",
    };

    const STORAGE_KEY = "finzen_transactions";
    const almacenadas = localStorage.getItem(STORAGE_KEY);
    let transaccionesPrevias = [];
    if (almacenadas) {
        try {
            transaccionesPrevias = JSON.parse(almacenadas);
        } catch (e) {
            console.error("Error al parsear transacciones de localStorage:", e);
        }
    }

    const nuevasTransacciones = [...transaccionesPrevias, nuevaTransaccion];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasTransacciones));

    // Emitir evento personalizado
    window.dispatchEvent(new CustomEvent("transaction-added", {
      detail: nuevaTransaccion,
    }));

    // Mostrar notificación de éxito con el custom toast
    toast.custom((t) => (
        <CustomSuccessToast t={t} message="Tu transacción ha sido guardada." />
    ));

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
    <div className="flex min-h-screen bg-[#020817] text-gray-100">
      {/* Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Toaster ahora posicionado en la parte inferior derecha */}
      <Toaster position="bottom-right" reverseOrder={false} />

      <main
        className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        } ml-0`}
      >
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <button onClick={toggleSidebar} className="p-2 rounded-md border border-gray-600 hover:bg-gray-800" aria-label="Abrir menú de navegación">
            <Menu className="w-5 h-5" />
          </button>
         
        </div>


        <div className="w-full max-w-lg bg-[#020817] rounded-lg shadow-lg p-4 mx-auto"> {/* Added mx-auto for centering */}
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
      </main>
    </div>
  );
};