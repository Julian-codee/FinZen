import { useEffect, useState } from "react";
import { Download, X, CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";
import { AddNewGoal } from "./AddNewGoal";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

// Interfaces para tipado
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
}

interface Estadisticas {
  totalMetas: number;
  totalObjetivo: number;
  totalAhorrado: number;
  porcentajeCompletado: number;
  metasCompletadas: number;
}

interface GoalsState {
  active: Meta[];
  completed: Meta[];
  upcoming: Meta[];
}

interface CardProps {
  title: string;
  value: string;
  subtitle: string;
  progress?: boolean;
}

// Componente de Modal de Confirmación
function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "warning"
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger';
}) {
  if (!isOpen) return null;

  const isDanger = type === 'danger';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e293b] rounded-xl shadow-2xl max-w-md w-full border border-white/20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {isDanger ? (
              <XCircle className="w-6 h-6 text-red-400" />
            ) : (
              <AlertCircle className="w-6 h-6 text-yellow-400" />
            )}
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          
          <p className="text-gray-300 mb-6">{message}</p>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDanger 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Modal de Input
function InputDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  placeholder,
  inputType = "text",
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  message: string;
  placeholder: string;
  inputType?: string;
  confirmText?: string;
  cancelText?: string;
}) {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (inputValue.trim()) {
      onConfirm(inputValue);
      setInputValue("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e293b] rounded-xl shadow-2xl max-w-md w-full border border-white/20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          
          <p className="text-gray-300 mb-4">{message}</p>
          
          <div className="mb-6">
            <div className="flex items-center bg-[#020817] rounded-lg px-3 py-2 border border-white/20 focus-within:ring-2 focus-within:ring-blue-600">
              <span className="text-gray-400 mr-2">$</span>
              <input
                type={inputType}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
                autoFocus
              />
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                setInputValue("");
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={!inputValue.trim()}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinancialGoals() {
  const [view, setView] = useState<"active" | "completed" | "upcoming">("active");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [goals, setGoals] = useState<GoalsState>({ active: [], completed: [], upcoming: [] });
  const [idUsuario, setIdUsuario] = useState<number>(0); 
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'warning' | 'danger';
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const [inputDialog, setInputDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    placeholder: string;
    onConfirm: (value: string) => void;
  }>({ isOpen: false, title: '', message: '', placeholder: '', onConfirm: () => {} });

  const API_BASE_URL = "http://localhost:8080/finzen/metas";

  // Obtener el ID del usuario autenticado
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:8080/finzen/usuarios", getAuthHeaders());
        setIdUsuario(response.data.idUsuario);
      } catch (error) {
        handleApiError(error, "Error al obtener el ID del usuario");
      }
    };
    fetchUserId();
  }, []);

  // Función para obtener headers con token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // It's better to redirect to login or handle this globally
      toast.error("Token de autenticación no encontrado. Por favor, inicia sesión.");
      throw new Error("Token de autenticación no encontrado");
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    };
  };

  // Función mejorada para manejar errores con react-hot-toast
  const handleApiError = (error: any, defaultMessage: string) => {
    console.error(defaultMessage, error);
    let errorMessage = defaultMessage;
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        errorMessage = "Sesión expirada. Por favor, inicia sesión nuevamente.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data) {
        errorMessage = typeof error.response.data === 'string' 
          ? error.response.data 
          : defaultMessage;
      }
    }
    
    setError(errorMessage); // Keep local error state for more persistent messages if needed
    toast.error(errorMessage); // Show toast alert for error
    return errorMessage;
  };

  // Función para obtener estadísticas
  const fetchEstadisticas = async () => {
    if (!idUsuario) return;
    try {
      const response = await axios.get<Estadisticas>(
        `${API_BASE_URL}/estadisticas`,
        getAuthHeaders()
      );
      setEstadisticas(response.data);
      setError(null);
    } catch (error) {
      handleApiError(error, "Error al obtener estadísticas");
    }
  };

  // Función para obtener metas próximas a vencer
  const fetchUpcomingGoals = async (): Promise<Meta[]> => {
    if (!idUsuario) return [];
    try {
      const response = await axios.get<Meta[]>(
        `${API_BASE_URL}/proximas-vencer?dias=30`,
        getAuthHeaders()
      );
      return response.data || [];
    } catch (error) {
      handleApiError(error, "Error al obtener metas próximas a vencer");
      return [];
    }
  };

  // Obtener metas por usuario
  const fetchGoals = async () => {
    if (!idUsuario) return;
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<Meta[]>(
        API_BASE_URL,
        getAuthHeaders()
      );
      
      const metas = response.data || [];
      
      const upcomingMetas = await fetchUpcomingGoals();
      
      console.log("Metas obtenidas:", metas);
      
      setGoals({
        active: metas.filter((m) => m.estado !== "terminado"),
        completed: metas.filter((m) => m.estado === "terminado"),
        upcoming: upcomingMetas,
      });
    } catch (error) {
      handleApiError(error, "Error al obtener metas");
    } finally {
      setLoading(false);
    }
  };

  // Obtener metas y estadísticas al cargar el componente
  useEffect(() => {
    if (idUsuario) {
      const loadData = async () => {
        await fetchGoals();
        await fetchEstadisticas();
      };
      loadData();
    }
  }, [idUsuario]);

  // Manejar eliminación de una meta
  const handleDeleteGoal = async (idMeta: number, titulo: string): Promise<void> => {
    setConfirmDialog({
      isOpen: true,
      title: 'Eliminar Meta',
      message: `¿Estás seguro de que quieres eliminar la meta "${titulo}"? Esta acción no se puede deshacer.`,
      type: 'danger',
      onConfirm: async () => {
        try {
          await axios.delete(
            `${API_BASE_URL}/${idMeta}`,
            getAuthHeaders()
          );
          
          setGoals((prev) => ({
            active: prev.active.filter((g) => g.idMeta !== idMeta),
            completed: prev.completed.filter((g) => g.idMeta !== idMeta),
            upcoming: prev.upcoming.filter((g) => g.idMeta !== idMeta),
          }));
          
          await Promise.all([fetchGoals(), fetchEstadisticas()]);
          
          toast.success(`La meta "${titulo}" ha sido eliminada exitosamente.`);
          setError(null);
        } catch (error) {
          const errorMessage = handleApiError(error, "Error al eliminar meta");
          toast.error(`Error al eliminar: ${errorMessage}`);
        }
      }
    });
  };

  // Actualizar estado de meta
  const handleChangeStatus = async (idMeta: number, nuevoEstado: Meta["estado"]) => {
    try {
      await axios.put(
        `${API_BASE_URL}/${idMeta}/estado`,
        JSON.stringify(nuevoEstado), // Send as raw body
        getAuthHeaders()
      );

      await Promise.all([fetchGoals(), fetchEstadisticas()]);
      
      const estadoTexto = nuevoEstado === 'creado' ? 'Creado' : 
                          nuevoEstado === 'iniciado' ? 'Iniciado' : 'Terminado';
      toast.success(`El estado de la meta ha sido cambiado a "${estadoTexto}".`);
    } catch (error) {
      const errorMessage = handleApiError(error, "Error al actualizar estado");
      toast.error(`Error al actualizar estado: ${errorMessage}`);
    }
  };

  // Función de aporte mejorada
  const handleAporte = async (idMeta: number, titulo: string) => {
    setInputDialog({
      isOpen: true,
      title: 'Realizar Aporte',
      message: `Ingresa el monto que deseas aportar a la meta "${titulo}":`,
      placeholder: '0.00',
      onConfirm: async (montoAporte: string) => {
        try {
          const aporte = parseFloat(montoAporte.replace(/[,$]/g, ''));
          if (isNaN(aporte) || aporte <= 0) {
            toast.error('Por favor ingresa un monto válido mayor a 0.');
            return;
          }

          await axios.put(
            `${API_BASE_URL}/${idMeta}/aporte`,
            aporte,
            getAuthHeaders()
          );

          await Promise.all([fetchGoals(), fetchEstadisticas()]);
          toast.success(`Se ha agregado $${aporte.toLocaleString()} a tu meta "${titulo}".`);
        } catch (error) {
          const mensaje = handleApiError(error, "Error al realizar el aporte");
          toast.error(`Error en el aporte: ${mensaje}`);
        }
      }
    });
  };

  // Función para refrescar datos después de agregar nueva meta
  const handleGoalAdded = async () => {
    await Promise.all([fetchGoals(), fetchEstadisticas()]);
    setShowModal(false);
    toast.success('Tu nueva meta ha sido creada exitosamente.');
  };

  // Renderizar metas según la vista seleccionada
  const renderGoals = (): Meta[] => {
    switch (view) {
      case "active":
        return goals.active;
      case "completed":
        return goals.completed;
      case "upcoming":
        return goals.upcoming;
      default:
        return [];
    }
  };

  if (loading || !idUsuario) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-white">Cargando metas...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a202c',
            color: '#fff',
            border: '1px solid #4a5568',
          },
          success: {
            iconTheme: {
              primary: '#34d399', // green-400
              secondary: '#1a202c',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444', // red-500
              secondary: '#1a202c',
            },
          },
        }}
      />

      {/* Modal de Confirmación */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      {/* Modal de Input */}
      <InputDialog
        isOpen={inputDialog.isOpen}
        onClose={() => setInputDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={inputDialog.onConfirm}
        title={inputDialog.title}
        message={inputDialog.message}
        placeholder={inputDialog.placeholder}
        inputType="number"
        confirmText="Agregar Aporte"
        cancelText="Cancelar"
      />

      {/* Mostrar errores persistentes si existen (optional, toasts are primary) */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-200 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <p className="font-medium">Error</p>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-300 hover:text-red-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          <span className="text-white">{estadisticas?.totalMetas || 0} metas </span>
          <span className="text-[#38bdf8]">activas</span>
          <span className="text-white"> con un total de </span>
          <span className="text-[#38bdf8]">${estadisticas?.totalObjetivo?.toLocaleString() || 0}</span>
          <span className="text-white"> por ahorrar</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white font-semibold rounded px-4 py-2 hover:bg-blue-500 transition-colors"
          >
            + Nueva Meta
          </button>
          <button className="border border-gray-500 px-3 py-2 rounded hover:bg-gray-700 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal Para agregar Nueva Meta */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative bg-[#0f172a] rounded-lg max-w-2xl w-full overflow-y-auto max-h-[90vh] shadow-lg border border-white/10">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6">
              <AddNewGoal 
                onCancel={() => setShowModal(false)} 
                idUsuario={idUsuario} 
                onGoalAdded={handleGoalAdded}
              />
            </div>
          </div>
        </div>
      )}

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card
          title="Metas Activas"
          value={goals.active.length.toString()}
          subtitle="Total de metas en progreso"
        />
        <Card
          title="Progreso General"
          value={`${estadisticas?.porcentajeCompletado?.toFixed(2) || 0}%`}
          subtitle={`$${estadisticas?.totalAhorrado?.toLocaleString() || 0} de $${estadisticas?.totalObjetivo?.toLocaleString() || 0}`}
          progress
        />
        <Card
          title="Metas Completadas"
          value={estadisticas?.metasCompletadas?.toString() || "0"}
          subtitle="En los últimos 6 meses"
        />
        <Card
          title="Próximas Metas"
          value={goals.upcoming.length.toString()}
          subtitle="Programadas para iniciar"
        />
        <div></div>
      </div>

      {/* Navegación de pestañas */}
      <div className="mb-4 bg-gray-800 w-fit p-1 rounded-lg flex space-x-2">
        {(["active", "completed", "upcoming"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setView(type)}
            className={`px-4 p-1 rounded transition-colors ${
              view === type ? "bg-blue-700" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {type === "active" ? "Activas" : type === "completed" ? "Completadas" : "Próximas"}
          </button>
        ))}
      </div>

      {/* Grid de metas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderGoals().length > 0 ? (
          renderGoals().map((goal) => {
            const progreso = (goal.montoAhorrado / goal.valor) * 100;
            const isCompleted = goal.estado === "terminado" || progreso >= 100;
            
            return (
              <div
                key={goal.idMeta}
                className={`bg-[#1e293b] rounded-md p-4 shadow-md border transition-all ${
                  isCompleted ? 'border-green-500' : 'border-indigo-500'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl">
                    {goal.icon || "💰"} {goal.titulo}
                  </span>
                  <span className="text-gray-400 text-sm">
                    Meta: ${goal.valor?.toLocaleString() || 0}
                  </span>
                </div>
                
                <div className="text-2xl font-bold">
                  ${goal.montoAhorrado?.toLocaleString() || 0}
                </div>
                
                <div className="text-sm text-gray-400 mb-2">
                  Progreso {progreso.toFixed(2)}%
                  {isCompleted && <span className="text-green-400 ml-2">✓ Completado</span>}
                </div>
                
                <div className="w-full bg-gray-700 h-2 rounded">
                  <div
                    className={`h-2 rounded transition-all ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(progreso, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
                  <span>
                    Fecha límite: {goal.fechaLimite 
                      ? new Date(goal.fechaLimite).toLocaleDateString("es-ES") 
                      : "No definida"
                    }
                  </span>
                </div>
                
                <div className="flex justify-between gap-2 mt-3">
                  {!isCompleted && (
                    <button
                      onClick={() => handleAporte(goal.idMeta, goal.titulo)}
                      className="py-1 px-3 bg-green-600 rounded text-sm hover:bg-green-500 transition-colors"
                    >
                      Añadir Aporte
                    </button>
                  )}
                  
                  <select
                    value={goal.estado}
                    onChange={(e) => handleChangeStatus(goal.idMeta, e.target.value as Meta["estado"])}
                    className="py-1 px-2 bg-blue-600 rounded text-sm hover:bg-blue-500 transition-colors"
                  >
                    <option value="creado">Creado</option>
                    <option value="iniciado">Iniciado</option>
                    <option value="terminado">Terminado</option>
                  </select>
                  
                  <button
                    onClick={() => handleDeleteGoal(goal.idMeta, goal.titulo)}
                    className="py-1 px-3 bg-red-600 rounded text-sm hover:bg-red-500 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">
            {view === "active" && "No tienes metas activas en este momento."}
            {view === "completed" && "No tienes metas completadas."}
            {view === "upcoming" && "No tienes metas próximas a vencer."}
          </div>
        )} 
      </div>
    </>
  );
}

function Card({ title, value, subtitle, progress }: CardProps) {
  return (
    <div className="bg-[#1e293b] p-4 rounded-md shadow-md border border-gray-600 transition-transform hover:scale-105">
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <div className="text-2xl font-bold">{value}</div>
      {progress ? (
        <div className="mt-2">
          <div className="w-full bg-gray-700 h-2 rounded">
            <div
              className="bg-yellow-400 h-2 rounded transition-all"
              style={{ width: value }}
            ></div>
          </div>
          <div className="text-sm text-gray-400 mt-1">{subtitle}</div>
        </div>
      ) : (
        <div className="text-sm text-gray-400 mt-1">{subtitle}</div>
      )}
    </div>
  );
}