// components/FinancialGoals/GoalCard.tsx
import { Meta } from "../Types/types";
import { Trash2, Plus, Calendar, Target, TrendingUp } from "lucide-react";

interface Props {
  goal: Meta;
  onDelete: (id: number, title: string) => void;
  onAporte: (id: number, title: string) => void;
  onChangeStatus: (id: number, estado: Meta["estado"]) => void;
}

export function GoalCard({ goal, onDelete, onAporte, onChangeStatus }: Props) {
  const progreso = (goal.montoAhorrado / goal.valor) * 100;
  const isCompleted = goal.estado === "terminado" || progreso >= 100;
  const montoPendiente = goal.valor - goal.montoAhorrado;

  const getStatusColor = (estado: Meta["estado"]) => {
    switch (estado) {
      case "creado": return "bg-gray-500 text-gray-100";
      case "iniciado": return "bg-blue-500 text-blue-100";
      case "terminado": return "bg-green-500 text-green-100";
      default: return "bg-gray-500 text-gray-100";
    }
  };

  const getStatusLabel = (estado: Meta["estado"]) => {
    switch (estado) {
      case "creado": return "Creado";
      case "iniciado": return "En progreso";
      case "terminado": return "Completado";
      default: return "Desconocido";
    }
  };

  return (
    <div className={`
      relative overflow-hidden rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
      ${isCompleted 
        ? 'bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/30' 
        : 'bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50'
      }
    `}>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />
      
      {/* Header */}
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{goal.icon || "💰"}</div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{goal.titulo}</h3>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.estado)}`}>
              <div className="w-2 h-2 rounded-full bg-current opacity-70" />
              {getStatusLabel(goal.estado)}
            </div>
          </div>
        </div>
        
        {isCompleted && (
          <div className="flex items-center gap-2 text-green-400">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">¡Completado!</span>
          </div>
        )}
      </div>

      {/* Amount Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-2">
          <div className="text-3xl font-bold text-white">
            ${goal.montoAhorrado?.toLocaleString() || 0}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Meta</div>
            <div className="text-lg font-semibold text-gray-200">
              ${goal.valor?.toLocaleString() || 0}
            </div>
          </div>
        </div>
        
        {!isCompleted && (
          <div className="text-sm text-gray-400 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Faltan ${montoPendiente.toLocaleString()} para completar
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">Progreso</span>
          <span className="text-sm font-medium text-gray-200">
            {progreso.toFixed(1)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-700/50 h-3 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isCompleted 
                ? 'bg-gradient-to-r from-green-500 to-green-400' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}
            style={{ width: `${Math.min(progreso, 100)}%` }}
          />
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Calendar className="w-4 h-4" />
        <span>
          Fecha límite: {goal.fechaLimite
            ? new Date(goal.fechaLimite).toLocaleDateString("es-ES")
            : "No definida"}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {!isCompleted && (
          <button
            onClick={() => onAporte(goal.idMeta, goal.titulo)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-green-600 to-green-500 rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Añadir Aporte
          </button>
        )}
        
        <select
          value={goal.estado}
          onChange={(e) => onChangeStatus(goal.idMeta, e.target.value as Meta["estado"])}
          className="px-3 py-2 bg-slate-700/80 backdrop-blur-sm rounded-lg text-sm border border-slate-600 hover:border-slate-500 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="creado">Creado</option>
          <option value="iniciado">Iniciado</option>
          <option value="terminado">Terminado</option>
        </select>
        
        <button
          onClick={() => onDelete(goal.idMeta, goal.titulo)}
          className="flex items-center justify-center gap-2 py-2 px-4 bg-red-600/80 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-red-600 transition-all duration-200 transform hover:scale-105 active:scale-95 border border-red-500/30"
        >
          <Trash2 className="w-4 h-4" />
          Eliminar
        </button>
      </div>
    </div>
  );
}