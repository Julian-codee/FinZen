import { useState } from "react";
import { addMonths, addYears, format, isBefore } from "date-fns";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import axios from "axios";

interface Meta {
  idMeta: number;
  titulo: string;
  descripcion?: string;
  estado: "creado" | "iniciado" | "terminado";
  valor: number;
  montoAhorrado: number;
  idUsuario: number;
  fechaInicio: string;
  fechaLimite?: string;
  enProgreso: boolean;
  icon?: string;
  montoAporte?: number;
}

interface MetaDto {
  titulo: string;
  descripcion: string;
  estado: "creado" | "iniciado" | "terminado";
  valor: number;
  montoAhorrado: number;
  idUsuario: number;
  fechaInicio: string;
  fechaLimite?: string;
  enProgreso: boolean;
  icon?: string;
}

interface GoalsState {
  active: Meta[];
  completed: Meta[];
  upcoming: Meta[];
}

interface AddNewGoalProps {
  onCancel: () => void;
  idUsuario: number;
  setGoals?: React.Dispatch<React.SetStateAction<GoalsState>>;
  onGoalAdded: () => Promise<void>;
}

type OpcionFechaType =
  | ""
  | "3m"
  | "6m"
  | "9m"
  | "1a"
  | "2a"
  | "5a"
  | "10a"
  | "personalizada";

export const AddNewGoal = ({
  onCancel,
  idUsuario,
  setGoals,
  onGoalAdded,
}: AddNewGoalProps) => {
  const [nombreMeta, setNombreMeta] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState<"creado" | "iniciado" | "terminado">(
    "creado"
  );
  const [montoObjetivo, setMontoObjetivo] = useState("");
  const [montoAporte, setMontoAporte] = useState("");
  const [fechaObjetivo, setFechaObjetivo] = useState<Date | undefined>(
    undefined
  );
  const [opcionFecha, setOpcionFecha] = useState<OpcionFechaType>("");
  const [icon, setIcon] = useState("💰");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = "http://localhost:8080/finzen/metas";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token de autenticación no encontrado");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };

  const handleApiError = (error: any, defaultMessage: string) => {
    console.error(defaultMessage, error);
    let errorMessage = defaultMessage;

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        errorMessage = "Sesión expirada. Por favor, inicia sesión nuevamente.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data) {
        errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : defaultMessage;
      }
    }

    setError(errorMessage);
    return errorMessage;
  };

  const formatDate = (): string =>
    fechaObjetivo
      ? format(fechaObjetivo, "d MMMM yyyy", { locale: es })
      : "Selecciona una fecha";

  const handleFechaChange = (value: OpcionFechaType) => {
    setOpcionFecha(value);
    const now = new Date();

    const fechas: Record<
      Exclude<OpcionFechaType, "" | "personalizada">,
      Date
    > = {
      "3m": addMonths(now, 3),
      "6m": addMonths(now, 6),
      "9m": addMonths(now, 9),
      "1a": addYears(now, 1),
      "2a": addYears(now, 2),
      "5a": addYears(now, 5),
      "10a": addYears(now, 10),
    };

    if (value === "personalizada") {
      setFechaObjetivo(undefined);
    } else if (value !== "") {
      const fecha = fechas[value];
      if (isBefore(fecha, now)) {
        setError("No puedes seleccionar una fecha pasada.");
      } else {
        setFechaObjetivo(fecha);
        setError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombreMeta.trim()) {
      setError("El nombre de la meta es obligatorio.");
      return;
    }

    if (!montoObjetivo || parseFloat(montoObjetivo) <= 0) {
      setError("Monto objetivo inválido.");
      return;
    }

    if (!montoAporte || parseFloat(montoAporte) < 0) {
      setError("El aporte inicial es obligatorio y no puede ser menor a cero.");
      return;
    }

    if (!fechaObjetivo) {
      setError("Debes seleccionar una fecha válida.");
      return;
    }

    const metaDto: MetaDto = {
      titulo: nombreMeta,
      descripcion,
      estado,
      valor: parseFloat(montoObjetivo),
      montoAhorrado: parseFloat(montoAporte),
      idUsuario,
      fechaInicio: new Date().toISOString().split("T")[0],
      fechaLimite: fechaObjetivo.toISOString().split("T")[0],
      enProgreso: estado === "iniciado",
      icon,
    };

    try {
      setLoading(true);

      const response = await axios.post<Meta>(
        API_BASE_URL,
        metaDto,
        getAuthHeaders()
      );

      if (setGoals) {
        const newGoal: Meta = {
          ...metaDto,
          idMeta: response.data.idMeta,
          montoAporte: parseFloat(montoAporte),
        };

        setGoals((prev) => ({
          ...prev,
          active: [...prev.active, newGoal],
        }));
      }

      await onGoalAdded();
      setError(null);
      setTimeout(() => {
        onCancel();
      }, 500);
    } catch (error) {
      handleApiError(error, "Error al crear meta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0f172a] text-white p-6 rounded-lg shadow-lg space-y-5 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold">Nueva Meta Financiera</h2>
      <p className="text-gray-400 mb-4">
        Completa la información para planear tu objetivo de ahorro.
      </p>

      {error && (
        <div className="bg-red-600 text-white p-3 rounded-md mb-4">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-sm underline mt-1"
          >
            Cerrar
          </button>
        </div>
      )}

      {loading && (
        <div className="bg-blue-600 text-white p-3 rounded-md mb-4 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          <p>Creando meta...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Nombre de la meta</label>
          <input
            type="text"
            value={nombreMeta}
            onChange={(e) => setNombreMeta(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1e293b] border border-white/20"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Estado inicial</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as MetaDto["estado"])}
            className="w-full p-2 rounded-md bg-[#1e293b] border border-white/20"
            disabled={loading}
          >
            <option value="creado">Creado</option>
            <option value="iniciado">Iniciado</option>
            <option value="terminado">Terminado</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 rounded-md bg-[#1e293b] border border-white/20"
          rows={3}
          placeholder="¿Cuál es el propósito de esta meta?"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Monto objetivo</label>
          <input
            type="number"
            value={montoObjetivo}
            onChange={(e) => setMontoObjetivo(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1e293b] border border-white/20"
            placeholder="$ 0.00"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Aporte inicial</label>
          <input
            type="number"
            value={montoAporte}
            onChange={(e) => setMontoAporte(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1e293b] border border-white/20"
            placeholder="$ 0.00"
            disabled={loading}
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Ícono</label>
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full p-2 rounded-md bg-[#1e293b] border border-white/20"
          placeholder="💰"
          maxLength={10}
          disabled={loading}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Fecha objetivo</label>
        <select
          value={opcionFecha}
          onChange={(e) => handleFechaChange(e.target.value as OpcionFechaType)}
          className="w-full p-2 rounded-md bg-[#1e293b] border border-white/20 mb-2"
          disabled={loading}
        >
          <option value="">Selecciona una opción</option>
          <option value="3m">3 meses</option>
          <option value="6m">6 meses</option>
          <option value="9m">9 meses</option>
          <option value="1a">1 año</option>
          <option value="2a">2 años</option>
          <option value="5a">5 años</option>
          <option value="10a">10 años</option>
          <option value="personalizada">Fecha personalizada</option>
        </select>
      </div>

      {opcionFecha === "personalizada" && (
        <div className="bg-[#1e293b] p-4 rounded-md">
          <DayPicker
            mode="single"
            selected={fechaObjetivo}
            onSelect={(date) => {
              if (date && !isBefore(date, new Date())) {
                setFechaObjetivo(date);
                setError(null);
              } else {
                setError("No puedes seleccionar una fecha pasada.");
              }
            }}
            locale={es}
            className="text-white"
            disabled={loading}
          />
        </div>
      )}

      {fechaObjetivo && (
        <p className="text-sm text-gray-300">
          Fecha seleccionada:{" "}
          <span className="text-white font-semibold">{formatDate()}</span>
        </p>
      )}

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          disabled={loading}
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          )}
          {loading ? "Creando..." : "Crear Meta"}
        </button>
      </div>
    </form>
  );
};
