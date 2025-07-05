"use client"

import { useState, useEffect, ReactElement } from "react"
import axios from "axios"
import {
  X,
  UtensilsCrossed,
  ShoppingCart,
  Home,
  Car,
  Gamepad2,
  Zap,
  Coffee,
  Heart,
  Pizza,
  Wifi,
  Phone,
  GraduationCap,
  PartyPopper,
  Music,
  Plus,
  Calendar,
} from "lucide-react"
import type { AddBudgetData } from "../types/budget-types" // Asegúrate de que esta ruta sea correcta

// Definiciones de tipos para las entidades
// Asumimos que el backend devuelve idCuenta, idInversion, idTarjeta como números.
interface Account {
  idCuenta: number
  nombre: string
}

interface Investment {
  idInversion: number
  nombre: string
}

interface Card {
  idTarjeta: number
  nombre: string
}

interface Category {
  id: number
  ide: string // Identificador en string, por ejemplo "comida"
  name: string
  icon: ReactElement
  bgColor: string
  textColor: string
}

interface AddBudgetDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddBudget: (budgetData: AddBudgetData) => Promise<void>;
}

export default function AddBudgetDialog({ isOpen, onClose, onAddBudget }: AddBudgetDialogProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null) // Almacena el ID numérico de la categoría
  const [budgetName, setBudgetName] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedEntityType, setSelectedEntityType] = useState<"cuenta" | "tarjeta" | "inversion" | "">("") // Tipo de entidad (cuenta, tarjeta, inversion)
  const [selectedEntityId, setSelectedEntityId] = useState("") // ID de la entidad específica seleccionada
  const [accounts, setAccounts] = useState<Account[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Hardcoded categories (consider fetching from API if they are dynamic)
  const categories: Category[] = [
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
  ]

  // Fetch all entity types on component mount
  useEffect(() => {
    const fetchEntities = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Sesión no encontrada. Por favor, inicia sesión.");
          return;
        }
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Realiza todas las llamadas en paralelo
        const [cuentasResponse, inversionesResponse, tarjetasResponse] = await Promise.all([
          axios.get<Account[]>("https://finzenbackend-production.up.railway.app/finzen/cuentas", config),
          axios.get<Investment[]>("https://finzenbackend-production.up.railway.app/finzen/inversiones", config),
          axios.get<Card[]>("https://finzenbackend-production.up.railway.app/finzen/tarjetas", config),
        ]);

        console.log("Cuentas cargadas:", cuentasResponse.data); // Log para depuración
        console.log("Inversiones cargadas:", inversionesResponse.data); // Log para depuración
        console.log("Tarjetas cargadas:", tarjetasResponse.data); // Log para depuración

        setAccounts(cuentasResponse.data);
        setInvestments(inversionesResponse.data);
        setCards(tarjetasResponse.data);

      } catch (err) {
        console.error("Error al cargar las entidades:", err);
        setError("Error al cargar cuentas, inversiones o tarjetas. Verifica tu conexión y que tengas entidades creadas.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntities();
  }, []); // El array de dependencias vacío asegura que se ejecuta solo al montar

  const handleCategoryToggle = (categoryId: number) => { // Ahora acepta el ID numérico
    setSelectedCategory(categoryId)
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    // Validaciones de campos
    if (!budgetName.trim()) {
      setError("Por favor, ingresa el nombre del presupuesto.");
      setIsLoading(false);
      return;
    }
    const parsedAmount = Number.parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Por favor, ingresa un monto válido mayor que 0.");
      setIsLoading(false);
      return;
    }
    if (selectedCategory === null) {
      setError("Por favor, selecciona una categoría.");
      setIsLoading(false);
      return;
    }
    if (!selectedEntityType) {
      setError("Por favor, selecciona el tipo de entidad (Cuenta, Tarjeta o Inversión).");
      setIsLoading(false);
      return;
    }
    if (!selectedEntityId) {
      setError("Por favor, selecciona una entidad específica.");
      setIsLoading(false);
      return;
    }

    try {
      const category = categories.find((cat) => cat.id === selectedCategory);
      if (!category) {
        throw new Error("Categoría seleccionada no encontrada.");
      }

      let payload: any = {
        nombre: budgetName.trim(),
        montoAsignado: parsedAmount,
        idCategoriaPresupuesto: category.id,
      };

      // Adjuntar el ID de la entidad basado en el tipo seleccionado
      const parsedEntityId = Number(selectedEntityId);
      if (isNaN(parsedEntityId)) {
        setError("ID de entidad no válido. Esto no debería ocurrir."); // Lógica de fallback
        setIsLoading(false);
        return;
      }

      // Añadimos la propiedad de ID correcta al payload según el tipo de entidad
      if (selectedEntityType === "cuenta") {
        payload.idCuenta = parsedEntityId;
      } else if (selectedEntityType === "inversion") {
        payload.idInversion = parsedEntityId;
      } else if (selectedEntityType === "tarjeta") {
        payload.idTarjeta = parsedEntityId;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Sesión no encontrada. Por favor, inicia sesión.");
        setIsLoading(false);
        return;
      }

      // El endpoint para crear un presupuesto es único: /finzen/presupuesto
      // El backend determinará a qué entidad asociarlo por la presencia de idCuenta, idInversion o idTarjeta en el payload.
      await axios.post("https://finzenbackend-production.up.railway.app/finzen/presupuesto", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Llamada a onAddBudget para actualizar el estado local de la lista de presupuestos
      onAddBudget({
        name: budgetName.trim(),
        montoAsignado: parsedAmount,
        selectedCategoryId: category.id, // Usa el nombre correcto según AddBudgetData
        entityId: Number(selectedEntityId), // Pasar el ID de la entidad al padre como número
        entityType: selectedEntityType as 'cuenta' | 'tarjeta' | 'inversion', // Pasar el tipo de entidad al padre
      });

      // Reset form and close dialog
      setBudgetName("");
      setAmount("");
      setSelectedCategory(null);
      setSelectedEntityType("");
      setSelectedEntityId("");
      setError(null);
      onClose();

    } catch (err) {
      console.error("Error al crear el presupuesto:", err);
      if (axios.isAxiosError(err) && err.response) {
        // Mensaje de error más detallado desde el backend
        setError(`Error al crear el presupuesto: ${err.response.data.message || err.response.statusText || JSON.stringify(err.response.data)}`);
      } else {
        setError("Error al crear el presupuesto. Por favor, intenta de nuevo. (Error de red o desconocido).");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setBudgetName("")
    setAmount("")
    setSelectedCategory(null)
    setSelectedEntityType("")
    setSelectedEntityId("")
    setError(null)
    setIsLoading(false);
    onClose()
  }

  // Función para determinar qué lista de entidades mostrar en el select
  const getEntitiesToShow = () => {
    if (selectedEntityType === "cuenta") return accounts;
    if (selectedEntityType === "inversion") return investments;
    if (selectedEntityType === "tarjeta") return cards;
    return [];
  };

  // Función para obtener el nombre del campo ID para el tipo de entidad
  const getIdFieldName = () => {
    if (selectedEntityType === "cuenta") return "idCuenta";
    if (selectedEntityType === "inversion") return "idInversion";
    if (selectedEntityType === "tarjeta") return "idTarjeta";
    return ""; // Esto no debería pasar si selectedEntityType está bien validado
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#020817] border border-white/40 rounded-xl p-5 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Crear Nuevo Presupuesto</h2>
            <p className="text-gray-400 text-sm">Establece un presupuesto para controlar tus gastos por categoría.</p>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white" disabled={isLoading}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensajes de error y carga */}
        {error && (
          <div className="mb-4 p-2 bg-red-500/20 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}
        {isLoading && (
            <div className="mb-4 p-2 bg-blue-500/20 text-blue-400 rounded-md">
              Cargando...
            </div>
          )}

        <div className="mb-4">
          <h3 className="text-base font-semibold text-white mb-2">Nombre del Presupuesto</h3>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              className="w-full bg-[#020817] border border-[#475569] text-white pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ej: Presupuesto Enero 2024"
              disabled={isLoading}
            />
            {budgetName.trim() && (
              <p className="text-xs text-gray-400 mt-1">
                Este nombre te ayudará a identificar el presupuesto en el historial
              </p>
            )}
          </div>
        </div>

        {/* Selección de Tipo de Entidad */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-white mb-2">Asociar a</h3>
          <select
            value={selectedEntityType}
            onChange={(e) => {
              setSelectedEntityType(e.target.value as "cuenta" | "tarjeta" | "inversion" | "");
              setSelectedEntityId(""); // Reset entity ID when type changes
            }}
            className="w-full bg-[#020817] border border-[#475569] text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
            disabled={isLoading}
          >
            <option value="" disabled>Selecciona un tipo de entidad</option>
            <option value="cuenta">Cuenta</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="inversion">Inversión</option>
          </select>
        </div>

        {/* Selección de Entidad Específica (condicional) */}
        {selectedEntityType && (
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white mb-2">
              Selecciona {selectedEntityType.charAt(0).toUpperCase() + selectedEntityType.slice(1)}
            </h3>
            <select
              value={selectedEntityId}
              onChange={(e) => setSelectedEntityId(e.target.value)}
              className="w-full bg-[#020817] border border-[#475569] text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
              disabled={isLoading || getEntitiesToShow().length === 0}
            >
              <option value="" disabled>Selecciona una {selectedEntityType}</option>
              {getEntitiesToShow().length > 0 ? (
                getEntitiesToShow().map((entity: any) => {
                  const idField = getIdFieldName();
                  console.log(`Renderizando opción ${selectedEntityType}: ID=${entity[idField]}, Nombre=${entity.nombre}`); // Log para depuración
                  return (
                    <option key={entity[idField]} value={entity[idField]}>
                      {entity.nombre}
                    </option>
                  );
                })
              ) : (
                <option value="" disabled>No hay {selectedEntityType}s disponibles</option>
              )}
            </select>
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-base font-semibold text-white mb-3">Categoría</h3>
          <div className="flex bg-[#334155] rounded-lg p-1 mb-3">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                viewMode === "grid" ? "bg-[#020817] text-white" : "text-gray-400 hover:text-white"
              }`}
              disabled={isLoading}
            >
              Vista Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                viewMode === "list" ? "bg-[#020817] text-white" : "text-gray-400 hover:text-white"
              }`}
              disabled={isLoading}
            >
              Lista
            </button>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-5 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`${category.bgColor} rounded-lg p-2 flex flex-col items-center justify-center min-h-[50px] transition-all hover:scale-105 ${
                    selectedCategory === category.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  disabled={isLoading}
                >
                  <div className={`${category.textColor} mb-1`}>{category.icon}</div>
                  <span className="text-xs text-black font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-800 text-white"
                      : "bg-[#1E293B] text-gray-300 hover:bg-[#334155]"
                  }`}
                  onClick={() => handleCategoryToggle(category.id)}
                  // No se puede deshabilitar un `li` directamente para eventos de click
                  // Si necesitas deshabilitar, podrías envolver el contenido en un div y deshabilitarlo.
                  // O manejarlo internamente en el handler.
                >
                  <div className="flex items-center space-x-2">
                    <div className={`${category.textColor}`}>{category.icon}</div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  {selectedCategory === category.id && <span className="text-xs text-blue-400">Seleccionada</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-base font-semibold text-white mb-2">Cantidad Total</h3>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[#020817] border border-[#475569] text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ej: 500000"
            min="0"
            disabled={isLoading}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
          disabled={isLoading || !budgetName.trim() || !amount || selectedCategory === null || !selectedEntityType || !selectedEntityId}
        >
          {isLoading ? "Creando..." : "Crear Presupuesto"}
        </button>
      </div>
    </div>
  )
}