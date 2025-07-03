"use client"

import React, { useState, useEffect, ReactElement } from "react"
import { X, DollarSign } from "lucide-react" // Importa DollarSign para el icono de monto
import axios from "axios"

// Interfaces de las entidades (deben coincidir con tu backend)
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
  id: number; // Asumo que el ID de la categoría es un number en tu backend
  ide: string; // Puede ser un slug o identificador de string
  name: string;
  icon?: React.ReactElement; // Icono es opcional si solo se usa en el UI de categorías completas
  bgColor?: string; // Opcional para este select simple
  textColor?: string; // Opcional para este select simple
}


interface AddTransactionDialogProps {
  isOpen: boolean
  onClose: () => void
  // El onSubmit ahora debe recibir el ID de la entidad y el tipo de entidad, además de los datos de la transacción
  onSubmit: (
    amount: number,
    description: string,
    categoryId: number, // Cambiado a number para que coincida con el backend
    entityId: number, // ID numérico de la entidad (cuenta, tarjeta, inversión)
    entityType: 'cuenta' | 'tarjeta' | 'inversion'
  ) => void
  categories: Category[] // Las categorías ahora deben tener un ID numérico
}

export default function AddTransactionDialog({ isOpen, onClose, onSubmit, categories }: AddTransactionDialogProps) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null) // Cambiado a number | null
  const [selectedEntityType, setSelectedEntityType] = useState<"cuenta" | "tarjeta" | "inversion" | "">("")
  const [selectedEntityId, setSelectedEntityId] = useState("") // Usará el string del select, luego se parsea a number
  const [accounts, setAccounts] = useState<Account[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // --- Carga de entidades (cuentas, inversiones, tarjetas) ---
  useEffect(() => {
    if (!isOpen) return; // Solo cargar cuando el diálogo esté abierto

    const fetchEntities = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Sesión no encontrada. Por favor, inicia sesión.");
          setIsLoading(false);
          return;
        }
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [cuentasResponse, inversionesResponse, tarjetasResponse] = await Promise.all([
          axios.get<Account[]>("http://localhost:8080/finzen/cuentas", config),
          axios.get<Investment[]>("http://localhost:8080/finzen/inversiones", config),
          axios.get<Card[]>("http://localhost:8080/finzen/tarjetas", config),
        ]);

        setAccounts(cuentasResponse.data);
        setInvestments(inversionesResponse.data);
        setCards(tarjetasResponse.data);
        console.log("Entidades cargadas - Cuentas:", cuentasResponse.data, "Inversiones:", inversionesResponse.data, "Tarjetas:", tarjetasResponse.data);

      } catch (err) {
        console.error("Error al cargar las entidades:", err);
        setError("Error al cargar cuentas, inversiones o tarjetas. Verifica tu conexión y que tengas entidades creadas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntities();
  }, [isOpen]); // Dependencia en `isOpen` para recargar cuando se abre el diálogo

  // --- Lógica para obtener las entidades a mostrar en el select ---
  const getEntitiesToShow = () => {
    if (selectedEntityType === "cuenta") return accounts;
    if (selectedEntityType === "inversion") return investments;
    if (selectedEntityType === "tarjeta") return cards;
    return [];
  };

  // --- Lógica para obtener el nombre del campo ID (ej: idCuenta) ---
  const getIdFieldName = () => {
    if (selectedEntityType === "cuenta") return "idCuenta";
    if (selectedEntityType === "inversion") return "idInversion";
    if (selectedEntityType === "tarjeta") return "idTarjeta";
    return "";
  };

  // --- Manejador del submit del formulario ---
  const handleSubmitClick = () => {
    setError(null); // Limpiar errores previos

    const amountValue = Number.parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Por favor, ingresa un monto válido mayor que 0.");
      return;
    }
    if (!description.trim()) {
      setError("Por favor, ingresa una descripción para la transacción.");
      return;
    }
    if (selectedCategory === null) { // Usar null para verificar que se haya seleccionado
      setError("Por favor, selecciona una categoría.");
      return;
    }
    if (!selectedEntityType) {
      setError("Por favor, selecciona un tipo de entidad (Cuenta, Tarjeta o Inversión).");
      return;
    }
    if (!selectedEntityId) {
      setError("Por favor, selecciona una entidad específica.");
      return;
    }

    const parsedEntityId = Number(selectedEntityId);
    if (isNaN(parsedEntityId)) {
        setError("Error interno: ID de entidad no válido.");
        return;
    }

    // Llamar a la función onSubmit del componente padre con todos los datos
    onSubmit(amountValue, description.trim(), selectedCategory, parsedEntityId, selectedEntityType);

    // Reiniciar estados del formulario
    setAmount("");
    setDescription("");
    setSelectedCategory(null);
    setSelectedEntityType("");
    setSelectedEntityId("");
    setError(null);
    // onClose(); // El padre debe decidir cuándo cerrar el diálogo, normalmente después de la respuesta exitosa del API
  };

  // --- Manejador del cierre del diálogo ---
  const handleCloseDialog = () => {
    // Limpiar estados al cerrar
    setAmount("");
    setDescription("");
    setSelectedCategory(null);
    setSelectedEntityType("");
    setSelectedEntityId("");
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#020817] border border-white/40 rounded-xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Registrar Gasto</h2>
            <p className="text-gray-400 text-sm">
              Selecciona una categoría y la entidad asociada.
            </p>
          </div>
          <button onClick={handleCloseDialog} className="text-gray-400 hover:text-white" disabled={isLoading}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensaje de error/carga */}
        {error && (
          <div className="mb-4 p-2 bg-red-500/20 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}
        {isLoading && (
          <div className="mb-4 p-2 bg-blue-500/20 text-blue-400 rounded-md">
            Cargando entidades...
          </div>
        )}

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="transaction-amount" className="block text-sm font-medium text-gray-300 mb-2">
            Monto
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <DollarSign className="w-4 h-4" /> {/* Icono de dólar */}
            </span>
            <input
              id="transaction-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#020817] border border-white/40 text-white pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="0"
              min="0"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <label htmlFor="transaction-description" className="block text-sm font-medium text-gray-300 mb-2">
            Descripción
          </label>
          <input
            id="transaction-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#020817] border border-white/40 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ej: Compra en supermercado"
            disabled={isLoading}
          />
        </div>

        {/* Tipo de Entidad */}
        <div className="mb-4">
          <label htmlFor="entity-type" className="block text-sm font-medium text-gray-300 mb-2">
            Tipo de Entidad
          </label>
          <select
            id="entity-type"
            value={selectedEntityType}
            onChange={(e) => {
              setSelectedEntityType(e.target.value as "cuenta" | "tarjeta" | "inversion" | "");
              setSelectedEntityId(""); // Reset entity selection when type changes
            }}
            className="w-full bg-[#020817] border border-white/40 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
            disabled={isLoading}
          >
            <option value="" disabled>Selecciona un tipo</option>
            <option value="cuenta">Cuenta</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="inversion">Inversión</option>
          </select>
        </div>

        {/* Entidad Específica (condicional) */}
        {selectedEntityType && (
          <div className="mb-4">
            <label htmlFor="specific-entity" className="block text-sm font-medium text-gray-300 mb-2">
              Selecciona {selectedEntityType.charAt(0).toUpperCase() + selectedEntityType.slice(1)}
            </label>
            <select
              id="specific-entity"
              value={selectedEntityId}
              onChange={(e) => setSelectedEntityId(e.target.value)}
              className="w-full bg-[#020817] border border-white/40 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
              disabled={isLoading || getEntitiesToShow().length === 0}
            >
              <option value="" disabled>Selecciona una {selectedEntityType}</option>
              {getEntitiesToShow().length > 0 ? (
                getEntitiesToShow().map((entity: any) => {
                  const idField = getIdFieldName();
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

        {/* Category Selection */}
        <div className="mb-4">
          <label htmlFor="transaction-category" className="block text-sm font-medium text-gray-300 mb-2">
            Categoría
          </label>
          <select
            id="transaction-category"
            value={selectedCategory === null ? "" : selectedCategory} // Ajuste para el valor inicial
            onChange={(e) => setSelectedCategory(Number(e.target.value))} // Convertir a número
            className="w-full bg-[#020817] border border-white/40 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleCloseDialog}
            className="flex-1 bg-[#475569] hover:bg-[#64748B] text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmitClick}
            disabled={isLoading || !amount || !description.trim() || selectedCategory === null || !selectedEntityType || !selectedEntityId}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Registrar Gasto
          </button>
        </div>
      </div>
    </div>
  );
}