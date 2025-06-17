"use client";

import { useState, useEffect } from "react";
import { Calendar, X } from "lucide-react";

interface Movement {
  id: string | number;
  description: string;
  amount: number;
  date: string;
  type: "Ingreso" | "Gasto" | "Transferencia";
}

interface Account {
  id: number;
  title: string;
  movements: Movement[];
}

interface MovementsModalProps {
  open: boolean;
  onClose: () => void;
  account: Account | null;
}

const MovementsModal = ({ open, onClose, account }: MovementsModalProps) => {
  const [filter, setFilter] = useState<"Todos" | "Ingreso" | "Gasto" | "Transferencia">("Todos");
  const [showForm, setShowForm] = useState(false);
  const [localMovements, setLocalMovements] = useState<Movement[]>([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    type: "Gasto",
  });
  const [error, setError] = useState<string | null>(null);

  // Fetch movimientos cuando el modal se abre o cambia la cuenta
  useEffect(() => {
    if (!open || !account) {
      setLocalMovements([]);
      return;
    }

    const fetchMovements = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token no encontrado");
          return;
        }

        const response = await fetch(`http://localhost:8080/finzen/cuentas/${account.id}/movimientos`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const mappedMovements: Movement[] = data.map((mov: any) => ({
            id: mov.id || mov.idMovimiento || Date.now(),
            description: mov.descripcion || mov.description || "",
            amount: mov.monto || mov.amount || 0,
            date: mov.fecha || mov.date || new Date().toISOString().split("T")[0],
            type: mov.tipo || mov.type || "Gasto",
          }));
          setLocalMovements(mappedMovements);
          setError(null);
        } else {
          if (response.status === 401) {
            setError("Token inválido o expirado");
          } else {
            setError(`Error al obtener movimientos: ${response.status}`);
          }
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
        console.error("Error fetching movements:", err);
      }
    };

    fetchMovements();
  }, [open, account]);

  if (!open || !account) return null;

  const filteredMovements =
    filter === "Todos"
      ? localMovements
      : localMovements.filter((mov) => mov.type === filter);

  const formatAmount = (amount: number) =>
    amount > 0
      ? `+$${amount.toLocaleString("es-CO", { minimumFractionDigits: 2 })}`
      : `$${Math.abs(amount).toLocaleString("es-CO", { minimumFractionDigits: 2 })}`;

  const handleAddTransaction = async () => {
    const amount = parseFloat(formData.amount);
    if (!formData.description || isNaN(amount)) {
      setError("Por favor, completa todos los campos correctamente");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token no encontrado");
        return;
      }

      const newMovement = {
        descripcion: formData.description,
        monto: amount,
        fecha: formData.date,
        tipo: formData.type,
      };

      const response = await fetch(``, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovement),
      });

      if (response.ok) {
        const createdMovement = await response.json();
        setLocalMovements([
          ...localMovements,
          {
            id: createdMovement.id || Date.now(),
            description: formData.description,
            amount,
            date: formData.date,
            type: formData.type as Movement["type"],
          },
        ]);
        setFormData({
          description: "",
          amount: "",
          date: new Date().toISOString().split("T")[0],
          type: "Gasto",
        });
        setShowForm(false);
        setError(null);
      } else {
        if (response.status === 401) {
          setError("Token inválido o expirado");
        } else {
          setError("Error al crear el movimiento");
        }
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error("Error creating movement:", err);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#020817] border border-white/20 text-white p-6 rounded-lg w-[600px] shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-400">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-1">Movimientos de {account.title}</h2>
        <p className="text-sm text-gray-400 mb-5">Historial de transacciones de tu cuenta</p>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Filtros y botón Añadir */}
        

        {/* Formulario de nueva transacción */}
        {showForm && (
          <div className="bg-[#020817] border border-gray-700 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">Descripción</label>
                <input
                  type="text"
                  className="w-full bg-[#020817] border border-gray-600 rounded px-3 py-2 text-white"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Importe</label>
                <input
                  type="number"
                  className="w-full bg-[#020817] border border-gray-600 rounded px-3 py-2 text-white"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Fecha</label>
                <input
                  type="date"
                  className="w-full bg-[#020817] border border-gray-600 rounded px-3 py-2 text-white"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Tipo</label>
                <select
                  className="w-full bg-[#020817] border border-gray-600 rounded px-3 py-2 text-white"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="Ingreso">Ingreso</option>
                  <option value="Gasto">Gasto</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                onClick={handleAddTransaction}
              >
                Añadir transacción
              </button>
            </div>
          </div>
        )}

        {/* Encabezados de tabla */}
        <div className="flex justify-between text-sm text-gray-400 py-2 border-b border-gray-700">
          <span>Descripción</span>
          <span>Fecha</span>
          <span>Importe</span>
        </div>

        {/* Lista de movimientos */}
        <ul className="divide-y divide-gray-700 max-h-60 overflow-auto">
          {filteredMovements.length > 0 ? (
            filteredMovements.map((mov) => (
              <li key={mov.id} className="flex justify-between items-center py-3 text-sm">
                <span
                  className={`font-semibold ${
                    mov.type === "Ingreso"
                      ? "text-green-400"
                      : mov.type === "Gasto"
                      ? "text-red-400"
                      : "text-blue-400"
                  }`}
                >
                  {mov.description}
                </span>
                <span className="flex items-center gap-1 text-gray-300">
                  <Calendar size={16} />
                  {mov.date}
                </span>
                <span
                  className={`font-semibold ${
                    mov.amount > 0
                      ? "text-green-400"
                      : mov.type === "Transferencia"
                      ? "text-blue-400"
                      : "text-red-400"
                  }`}
                >
                  {formatAmount(mov.amount)}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-400 py-4">No hay movimientos para esta cuenta.</li>
          )}
        </ul>

        <button
          className="mt-6 px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-sm"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default MovementsModal;