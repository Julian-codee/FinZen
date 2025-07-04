import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarDays,
  ShoppingCart,
  Home,
  Coffee,
  Gamepad2,
  Music,
  Plus,
  Delete,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
  Zap,
  Heart,
  Pizza,
  Wifi,
  Phone,
  GraduationCap,
  PartyPopper,
  Car,
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react"; // Importa useCallback
import { DayPicker } from "react-day-picker";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import axios from "axios";
import "react-day-picker/dist/style.css";

// Interfaces para los datos del backend
interface Budget {
  idPresupuesto: number;
  nombre: string;
  montoAsignado: number;
}

interface Account {
  id?: number;
  idCuenta: number;
  nombre: string;
}

interface Investment {
  id?: number;
  idInversion: number;
  nombre: string;
}

interface Card {
  id?: number;
  idTarjeta: number;
  nombre: string;
}

export const AddTransaction: React.FC = () => {
  const [monto, setMonto] = useState<string>("0");
  const [displayMonto, setDisplayMonto] = useState<string>("0,00");
  const [tipoTransaccion, setTipoTransaccion] = useState<"gasto" | "ingreso">("gasto");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [nota, setNota] = useState<string>("");
  const [nombreTransaccion, setNombreTransaccion] = useState<string>("");
  const [presupuestoSeleccionado, setPresupuestoSeleccionado] = useState<string>("");
  const [presupuestos, setPresupuestos] = useState<Budget[]>([]);
  const [tipoEntidad, setTipoEntidad] = useState<"cuenta" | "inversion" | "tarjeta" | "">("");
  const [entidadId, setEntidadId] = useState<string>("");
  const [cuentas, setCuentas] = useState<Account[]>([]);
  const [inversiones, setInversiones] = useState<Investment[]>([]);
  const [tarjetas, setTarjetas] = useState<Card[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Definición de categorías
  const categories = [
    { id: 1, ide: "comida", name: "Comida", icon: <UtensilsCrossed className="w-4 h-4" />, bgColor: "bg-[#FED7AA]", textColor: "text-[#EA580C]" },
    { id: 2, ide: "supermercado", name: "Supermercado", icon: <ShoppingCart className="w-4 h-4" />, bgColor: "bg-[#BBF7D0]", textColor: "text-[#059669]" },
    { id: 3, ide: "vivienda", name: "Vivienda", icon: <Home className="w-4 h-4" />, bgColor: "bg-[#DBEAFE]", textColor: "text-[#2563EB]" },
    { id: 4, ide: "transporte", name: "Transporte", icon: <Car className="w-4 h-4" />, bgColor: "bg-[#BFDBFE]", textColor: "text-[#3B82F6]" },
    { id: 5, ide: "entretenimiento", name: "Entretenimiento", icon: <Gamepad2 className="w-4 h-4" />, bgColor: "bg-[#E9D5FF]", textColor: "text-[#9333EA]" },
    { id: 6, ide: "servicios", name: "Servicios", icon: <Zap className="w-4 h-4" />, bgColor: "bg-[#FEF3C7]", textColor: "text-[#D97706]" },
    { id: 7, ide: "cafe", name: "Café", icon: <Coffee className="w-4 h-4" />, bgColor: "bg-[#FED7AA]", textColor: "text-[#92400E]" },
    { id: 8, ide: "salud", name: "Salud", icon: <Heart className="w-4 h-4" />, bgColor: "bg-[#FECACA]", textColor: "text-[#DC2626]" },
    { id: 9, ide: "restaurante", name: "Restaurante", icon: <Pizza className="w-4 h-4" />, bgColor: "bg-[#FED7AA]", textColor: "text-[#EA580C]" },
    { id: 10, ide: "internet", name: "Internet", icon: <Wifi className="w-4 h-4" />, bgColor: "bg-[#BFDBFE]", textColor: "text-[#3B82F6]" },
    { id: 11, ide: "telefono", name: "Teléfono", icon: <Phone className="w-4 h-4" />, bgColor: "bg-[#E9D5FF]", textColor: "text-[#9333EA]" },
    { id: 12, ide: "educacion", name: "Educación", icon: <GraduationCap className="w-4 h-4" />, bgColor: "bg-[#BBF7D0]", textColor: "text-[#059669]" },
    { id: 13, ide: "ocio", name: "Ocio", icon: <PartyPopper className="w-4 h-4" />, bgColor: "bg-[#FECACA]", textColor: "text-[#DC2626]" },
    { id: 14, ide: "musica", name: "Música", icon: <Music className="w-4 h-4" />, bgColor: "bg-[#E9D5FF]", textColor: "text-[#9333EA]" },
    { id: 15, ide: "otros", name: "Otros", icon: <Plus className="w-4 h-4" />, bgColor: "bg-[#F3F4F6]", textColor: "text-[#6B7280]" },
  ];

  // Obtener cuentas, inversiones y tarjetas al cargar el componente
  useEffect(() => {
    const fetchEntidades = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Sesión no encontrada. Por favor, inicia sesión.");
          return;
        }
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [cuentasResponse, inversionesResponse, tarjetasResponse] = await Promise.all([
          axios.get<Account[]>("http://localhost:8080/finzen/cuentas", config),
          axios.get<Investment[]>("http://localhost:8080/finzen/inversiones", config),
          axios.get<Card[]>("http://localhost:8080/finzen/tarjetas", config),
        ]);

        // Mapear los IDs para asegurar que sean números y consistentes
        const mappedCuentas = cuentasResponse.data.map(item => ({ ...item, id: Number(item.idCuenta) }));
        setCuentas(mappedCuentas);

        const mappedInversiones = inversionesResponse.data.map(item => ({ ...item, id: Number(item.idInversion) }));
        setInversiones(mappedInversiones);

        const mappedTarjetas = tarjetasResponse.data.map(item => ({ ...item, id: Number(item.idTarjeta) }));
        setTarjetas(mappedTarjetas);

      } catch (error) {
        console.error("Error al obtener entidades:", error);
        setCuentas([]);
        setInversiones([]);
        setTarjetas([]);
        setErrorMessage("Error al cargar cuentas, inversiones o tarjetas. Verifica tu conexión y que tengas entidades creadas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntidades();
  }, []);

  // Obtener presupuestos cuando se selecciona una entidad (solo para gastos)
  useEffect(() => {
    const fetchPresupuestos = async () => {
      // Only fetch budgets if it's a 'gasto' and an entity is selected
      if (tipoTransaccion === "ingreso" || !tipoEntidad || !entidadId) {
        setPresupuestos([]);
        setPresupuestoSeleccionado("");
        return;
      }

      const parsedEntidadId = Number(entidadId);
      if (isNaN(parsedEntidadId) || parsedEntidadId <= 0) {
        setErrorMessage("ID de entidad seleccionado no es válido. Por favor, selecciona uno válido.");
        setPresupuestos([]);
        setPresupuestoSeleccionado("");
        return;
      }

      setIsLoading(true);
      setErrorMessage("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Sesión no encontrada. Por favor, inicia sesión.");
          return;
        }
        const config = { headers: { Authorization: `Bearer ${token}` } };
        let endpoint = "";

        // Assuming your backend has these specific endpoints for budgets by entity type
        if (tipoEntidad === "cuenta") {
          endpoint = `http://localhost:8080/finzen/presupuesto/getCuenta/${parsedEntidadId}`;
        } else if (tipoEntidad === "inversion") {
          endpoint = `http://localhost:8080/finzen/presupuesto/getInversiones/${parsedEntidadId}`;
        } else if (tipoEntidad === "tarjeta") {
          endpoint = `http://localhost:8080/finzen/presupuesto/getTajeta/${parsedEntidadId}`;
        } else {
          setErrorMessage("Tipo de entidad no reconocido para obtener presupuestos.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get<any[]>(endpoint, config);
        const fetchedPresupuestosRaw = Array.isArray(response.data) ? response.data : [];

        const mappedPresupuestos: Budget[] = fetchedPresupuestosRaw.map(p => ({
          idPresupuesto: p.idPresupuesto,
          nombre: p.nombre,
          montoAsignado: p.montoAsignado
        }));

        setPresupuestos(mappedPresupuestos);
      } catch (error) {
        console.error("Error al obtener presupuestos:", error);
        setPresupuestos([]);
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(`Error al cargar presupuestos: ${error.response.data.message || error.response.statusText}`);
        } else {
          setErrorMessage("Error al cargar los presupuestos. Asegúrate de que existan presupuestos para la entidad seleccionada.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (tipoTransaccion === "gasto") { // Only fetch budgets if transaction is a 'gasto'
      fetchPresupuestos();
    }
  }, [tipoEntidad, entidadId, tipoTransaccion]); // Add tipoTransaccion to dependency array

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handleSelect = (selectedDay: Date | undefined) => {
    if (selectedDay) {
      setSelectedDate(selectedDay);
      setShowCalendar(false);
    }
  };

  const formatDate = () => {
    if (selectedDate) {
      return format(selectedDate, "d MMMM", { locale: es });
    }
    return "Selecciona una fecha";
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
    } else if (
      monto.startsWith("0") &&
      monto.length > 1 &&
      !monto.startsWith("0,")
    ) {
      setDisplayMonto(
        formatter.format(parseFloat(cleanMonto.substring(1).replace(",", ".")))
      );
    } else if (monto.includes(",")) {
      const parts = monto.split(",");
      if (parts[1] && parts[1].length >= 2) {
        // No cambia si ya tiene 2 decimales
      } else {
        let formattedInt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let displayedDecPart = parts[1];
        if (parts[1] === undefined || parts[1] === "") {
          displayedDecPart = "";
        } else if (parts[1].length === 1) {
          displayedDecPart += ""; // Deja solo un decimal si se está escribiendo
        }
        setDisplayMonto(`${formattedInt},${displayedDecPart}`);
      }
    }
  }, [monto]);

  const handleMontoClick = (valor: string) => {
    setMonto((prevMonto) => {
      let currentInput = prevMonto;

      if (valor === "del") {
        if (currentInput.length === 1 || currentInput === "0") {
          return "0";
        }
        if (
          currentInput.endsWith(",") &&
          currentInput.length === 2 &&
          currentInput.startsWith("0")
        ) {
          return "0";
        }
        return currentInput.slice(0, -1);
      }

      if (valor === ",") {
        if (currentInput.includes(",")) {
          return currentInput;
        }
        if (currentInput === "0") {
          return "0,";
        }
        return currentInput + ",";
      }

      if (currentInput === "0" && valor !== ",") {
        return valor;
      }

      if (currentInput.includes(",")) {
        const parts = currentInput.split(",");
        if (parts[1] && parts[1].length >= 2) {
          return currentInput;
        }
      }
      return currentInput + valor;
    });
  };

  const handleGuardarTransaccion = async () => {
    setErrorMessage("");

    // 1. Validaciones de campos comunes
    if (!nombreTransaccion.trim()) {
      setErrorMessage("Por favor, ingresa el nombre de la transacción.");
      return;
    }
    const parsedMonto = parseFloat(monto.replace(",", "."));
    if (isNaN(parsedMonto) || parsedMonto <= 0) {
      setErrorMessage("Por favor, ingresa un monto válido mayor que 0.");
      return;
    }
    if (!selectedDate) {
      setErrorMessage("Por favor, selecciona una fecha.");
      return;
    }
    if (!tipoEntidad || !entidadId) {
      setErrorMessage("Por favor, selecciona el tipo y la entidad para la transacción.");
      return;
    }

    const parsedEntidadIdNumber = Number(entidadId);
    if (isNaN(parsedEntidadIdNumber) || parsedEntidadIdNumber <= 0) {
      setErrorMessage("Por favor, selecciona una entidad válida (Cuenta, Inversión o Tarjeta).");
      return;
    }

    let transactionData: any;
    let endpoint: string;

    const formattedDate = format(selectedDate, "yyyy-MM-dd"); // Format date as "YYYY-MM-DD" for backend

    if (tipoTransaccion === "gasto") {
      if (!categoriaSeleccionada) {
        setErrorMessage("Por favor, selecciona una categoría para el gasto.");
        return;
      }
      const categoriaObj = categories.find(cat => cat.ide === categoriaSeleccionada);
      if (!categoriaObj) {
        setErrorMessage("Categoría seleccionada no válida. (Error interno)");
        return;
      }
      const parsedPresupuestoId = Number(presupuestoSeleccionado);
      if (isNaN(parsedPresupuestoId) || parsedPresupuestoId <= 0) {
        setErrorMessage("Por favor, selecciona un presupuesto válido para el gasto.");
        return;
      }

      transactionData = {
        nombre: nombreTransaccion.trim(),
        idCategoria: categoriaObj.id,
        fecha: formattedDate,
        descripcion: nota,
        monto: parsedMonto,
        idPresupuesto: parsedPresupuestoId,
      };
      endpoint = "http://localhost:8080/finzen/gasto";

    } else { // tipoTransaccion === "ingreso"
      transactionData = {
        nombre: nombreTransaccion.trim(),
        descripcion: nota || "Ingreso General", // 'fuente' in DTO is 'descripcion' in entity
        fecha: formattedDate,
        monto: parsedMonto,
        // No idPresupuesto for incomes as per backend DTO
      };
      endpoint = "http://localhost:8080/finzen/ingreso";
    }

    // Add the selected entity ID to the transaction data for both types
    if (tipoEntidad === "cuenta") {
      transactionData.idCuenta = parsedEntidadIdNumber;
    } else if (tipoEntidad === "inversion") {
      transactionData.idInversion = parsedEntidadIdNumber;
    } else if (tipoEntidad === "tarjeta") {
      transactionData.idTarjeta = parsedEntidadIdNumber;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Sesión no encontrada. Por favor, inicia sesión.");
        return;
      }

      const response = await axios.post(endpoint, transactionData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Transacción guardada exitosamente. Respuesta del backend:", response.data);

      // Reiniciar estados después de un éxito
      setMonto("0");
      setTipoTransaccion("gasto"); // Default back to gasto
      setCategoriaSeleccionada(null);
      setSelectedDate(new Date());
      setNota("");
      setNombreTransaccion("");
      setPresupuestoSeleccionado("");
      setTipoEntidad("");
      setEntidadId("");
      setPresupuestos([]);
      setErrorMessage("Transacción guardada exitosamente.");

      // Despacha un evento personalizado para notificar a otros componentes
      window.dispatchEvent(new Event('transaction-added'));

    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(`Error: ${error.response.data.message || error.response.statusText || "Hubo un problema con la solicitud."}`);
      } else {
        setErrorMessage("Error al guardar la transacción. Por favor, intenta de nuevo. Error de red o desconocido.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center py-4 px-2">
        <div className="w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-[#020817] rounded-lg shadow-lg p-4">
          <h1 className="text-xl font-bold mb-1">Agregar Transacción</h1>
          <p className="text-gray-400 text-sm mb-4">
            Registra tus gastos e ingresos de manera rápida y sencilla.
          </p>
          {/* Mensaje de error o éxito */}
          {errorMessage && (
            <div className={`mb-4 p-2 rounded-md ${errorMessage.includes("exitosa") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {errorMessage}
            </div>
          )}
          {/* Indicador de carga */}
          {isLoading && (
            <div className="mb-4 p-2 bg-blue-500/20 text-blue-400 rounded-md">
              Cargando...
            </div>
          )}
          <p className="text-left mb-2 pl-2.5">Nombre de la Transacción</p>
          <input
            type="text"
            placeholder="Nombre de la Transacción"
            value={nombreTransaccion}
            onChange={(e) => setNombreTransaccion(e.target.value)}
            className="w-full p-2.5 rounded-md bg-[#020817] border border-white/40 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2.5 mb-4"
            aria-label="Nombre de la transacción"
            disabled={isLoading}
          />
          <div className="flex rounded-md p-0.5 mb-4">
            <button
              className={`flex-1 py-5 text-base border m-2 border-white/40 rounded-md font-semibold transition-colors duration-200 ${
                tipoTransaccion === "gasto" ? "bg-rose-500 text-white" : "text-red-500 hover:bg-neutral-700"
              }`}
              onClick={() => setTipoTransaccion("gasto")}
              disabled={isLoading}
              aria-label="Seleccionar transacción de gasto"
            >
              <TrendingDown className="inline-block mr-1" size={18} /> Gasto
            </button>
            <button
              className={`flex-1 py-2 text-base border m-2 border-white/40 rounded-md font-semibold transition-colors duration-200 ${
                tipoTransaccion === "ingreso" ? "bg-green-600 text-white" : "text-green-600 hover:bg-neutral-700"
              }`}
              onClick={() => {
                setTipoTransaccion("ingreso");
                setCategoriaSeleccionada(null); // Clear category for income
                setPresupuestoSeleccionado(""); // Clear budget for income
                setPresupuestos([]); // Clear fetched budgets to hide the dropdown
              }}
              disabled={isLoading}
              aria-label="Seleccionar transacción de ingreso"
            >
              <TrendingUp className="inline-block mr-1" size={18} /> Ingreso
            </button>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Monto</h2>
            <div className="flex justify-end mb-3">
              <span className="text-3xl font-bold text-white">$ {displayMonto}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {/* Botones de montos predefinidos */}
              {["10,000", "30,000", "50,000", "60,000", "80,000", "100,000", "300,000", "500,000"].map((val) => (
                <button
                  key={val}
                  className="col-span-1 bg-neutral-800 hover:bg-neutral-700 text-gray-300 py-2.5 rounded-md text-base font-medium disabled:opacity-50"
                  onClick={() => setMonto(val.replace(/,/g, ""))}
                  disabled={isLoading}
                  aria-label={`Agregar monto ${val}`}
                >
                  ${val}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {/* Teclado numérico */}
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "del"].map((key) => (
                <button
                  key={key}
                  className={`py-3 border border-white/40 rounded-md text-xl font-bold ${
                    key === "del" ? "bg-[#020817] hover:bg-neutral-700 text-red-400" : "bg-[#020817] hover:bg-neutral-600"
                  } disabled:opacity-50`}
                  onClick={() => handleMontoClick(key === "del" ? "del" : key)}
                  disabled={isLoading}
                  aria-label={key === "del" ? "Borrar dígito" : `Agregar ${key}`}
                >
                  {key === "del" ? <Delete size={25} className="mx-auto" /> : key}
                </button>
              ))}
            </div>
          </div>

          {/* La sección de categoría solo se muestra para gastos */}
          {tipoTransaccion === "gasto" && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Categoría</h2>
              <div className="grid grid-cols-4 gap-1.5">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setCategoriaSeleccionada(category.ide)}
                    className={`${
                      category.bgColor
                    } rounded-lg p-2 flex flex-col items-center justify-center min-h-[60px] transition-all hover:scale-105 ${
                      categoriaSeleccionada === category.ide ? "ring-2 ring-blue-500" : ""
                    } disabled:opacity-50`}
                    disabled={isLoading}
                    aria-label={`Seleccionar categoría ${category.name}`}
                  >
                    <div className={`${category.textColor} mb-1`}>{category.icon}</div>
                    <span className={`${category.textColor} text-xs font-medium text-center leading-tight`}>
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative inline-block w-full mb-6">
            <button
              onClick={toggleCalendar}
              className="inline-flex items-center gap-2 w-full h-12 bg-[#020817] border border-white/40 text-gray-300 text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isLoading}
              aria-label="Seleccionar fecha"
            >
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span>{formatDate()}</span>
            </button>
            {showCalendar && (
              <div className="absolute z-20 bottom-full mb-2 bg-[#0F1525] border border-gray-700 rounded-md shadow-lg p-4 w-full">
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

          {/* Selección de Tipo de Entidad */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Tipo de Entidad</h2>
            <select
              value={tipoEntidad}
              onChange={(e) => {
                setTipoEntidad(e.target.value as "cuenta" | "inversion" | "tarjeta" | "");
                setEntidadId("");
                setPresupuestoSeleccionado(""); // Clear budget if entity type changes
                setPresupuestos([]); // Clear budgets if entity type changes
              }}
              className="w-full p-2.5 rounded-md bg-[#020817] border border-white/40 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isLoading}
              aria-label="Seleccionar tipo de entidad"
            >
              <option value="" disabled>
                Selecciona un tipo
              </option>
              <option value="cuenta">Cuenta</option>
              <option value="inversion">Inversión</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>

          {/* Selección de Entidad Específica */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              {tipoEntidad ? tipoEntidad.charAt(0).toUpperCase() + tipoEntidad.slice(1) : "Entidad"}
            </h2>
            <select
              value={entidadId}
              onChange={(e) => {
                setEntidadId(e.target.value);
                // Only clear budget if it's a gasto, otherwise it's already cleared
                if (tipoTransaccion === "gasto") {
                  setPresupuestoSeleccionado("");
                }
              }}
              className="w-full p-2.5 rounded-md bg-[#020817] border border-white/40 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={!tipoEntidad || isLoading}
              aria-label={`Seleccionar ${tipoEntidad || "entidad"}`}
            >
              <option value="" disabled>
                Selecciona una {tipoEntidad || "entidad"}
              </option>
              {/* Renderizado condicional de opciones de cuenta, inversión o tarjeta */}
              {tipoEntidad === "cuenta" && Array.isArray(cuentas) && (
                cuentas.length > 0 ? (
                  cuentas.map((cuenta, index) => (
                    <option key={cuenta.id ? `${cuenta.id}-${index}` : `cuenta-${index}`} value={cuenta.id}>
                      {cuenta.nombre}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No hay cuentas disponibles
                  </option>
                )
              )}
              {tipoEntidad === "inversion" && Array.isArray(inversiones) && (
                inversiones.length > 0 ? (
                  inversiones.map((inversion, index) => (
                    <option key={inversion.id ? `${inversion.id}-${index}` : `inversion-${index}`} value={inversion.id}>
                      {inversion.nombre}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No hay inversiones disponibles
                  </option>
                )
              )}
              {tipoEntidad === "tarjeta" && Array.isArray(tarjetas) && (
                tarjetas.length > 0 ? (
                  tarjetas.map((tarjeta, index) => (
                    <option key={tarjeta.id ? `${tarjeta.id}-${index}` : `tarjeta-${index}`} value={tarjeta.id}>
                      {tarjeta.nombre}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No hay tarjetas disponibles
                  </option>
                )
              )}
            </select>
          </div>

          {/* Sección de Presupuesto - CONDICIONAL para gastos */}
          {tipoTransaccion === "gasto" && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Presupuesto</h2>
              <select
                value={presupuestoSeleccionado}
                onChange={(e) => setPresupuestoSeleccionado(e.target.value)}
                className="w-full p-2.5 rounded-md bg-[#020817] border border-white/40 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={!entidadId || isLoading || presupuestos.length === 0} // Disable if no entity selected or no budgets available
                aria-label="Seleccionar presupuesto"
              >
                <option value="" disabled>
                  Selecciona un presupuesto
                </option>
                {Array.isArray(presupuestos) && (
                  presupuestos.length > 0 ? (
                    presupuestos.map((presupuesto, index) => (
                      <option
                        key={presupuesto.idPresupuesto ? `${presupuesto.idPresupuesto}-${index}` : `presupuesto-${index}`}
                        value={presupuesto.idPresupuesto}
                      >
                        {presupuesto.nombre} ($ {presupuesto.montoAsignado.toLocaleString("es-CO")})
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No hay presupuestos disponibles para esta entidad
                    </option>
                  )
                )}
              </select>
            </div>
          )}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Nota (Opcional)</h2>
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Añadir una nota sobre esta transacción..."
              rows={2}
              className="w-full p-2.5 rounded-md bg-[#020817] border border-white/40 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              disabled={isLoading}
              aria-label="Nota de la transacción"
            ></textarea>
          </div>
          <button
            onClick={handleGuardarTransaccion}
            className="w-full bg-gradient-to-r from-indigo-400 to-blue-500 text-white font-semibold py-3 px-4 rounded-md text-lg transition-colors duration-200 hover:from-indigo-600 hover:to-blue-600 disabled:opacity-50"
            disabled={isLoading}
            aria-label="Guardar transacción"
          >
            {isLoading ? "Guardando..." : "Guardar Transacción"}
          </button>
        </div>
      </div>
    </>
  );
};