"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { X, XCircle } from "lucide-react";

import { Meta, Estadisticas, GoalsState, Alert } from "../Types/types";
import { AddNewGoal } from "./AddNewGoal";
import { AlertComponent } from "./AlertComponent";
import { ConfirmDialog } from "./ConfirmDialog";
import { InputDialog } from "./InputDialog";
import { GoalCard } from "./GoalCard";
import { GoalStats } from "./GoalStats";
import { GoalTabs } from "./GoalTabs";

export default function FinancialGoals() {
  const [view, setView] = useState<"active" | "completed" | "upcoming">("active");
  const [showModal, setShowModal] = useState(false);
  const [goals, setGoals] = useState<GoalsState>({ active: [], completed: [], upcoming: [] });
  const [idUsuario, setIdUsuario] = useState<number>(0);
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'warning' as 'warning' | 'danger'
  });

  const [inputDialog, setInputDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    placeholder: '',
    onConfirm: (value: string) => {}
  });

  const API_BASE_URL = "http://localhost:8080/finzen/metas";

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

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token de autenticación no encontrado");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  const showAlert = (type: Alert['type'], title: string, message: string, duration = 5000) => {
    const id = Date.now().toString();
    const newAlert: Alert = { id, type, title, message, duration };
    setAlerts(prev => [...prev, newAlert]);
    if (duration > 0) setTimeout(() => removeAlert(id), duration);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleApiError = (error: any, defaultMessage: string) => {
    console.error(defaultMessage, error);
    let msg = defaultMessage;
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        msg = "Sesión expirada. Por favor, inicia sesión nuevamente.";
      } else if (error.response?.data?.message) {
        msg = error.response.data.message;
      } else if (typeof error.response?.data === 'string') {
        msg = error.response.data;
      }
    }
    setError(msg);
    showAlert('error', 'Error', msg);
  };

  const fetchEstadisticas = async () => {
    if (!idUsuario) return;
    try {
      const response = await axios.get<Estadisticas>(`${API_BASE_URL}/estadisticas`, getAuthHeaders());
      setEstadisticas(response.data);
      setError(null);
    } catch (error) {
      handleApiError(error, "Error al obtener estadísticas");
    }
  };

  const fetchUpcomingGoals = async (): Promise<Meta[]> => {
    if (!idUsuario) return [];
    try {
      const response = await axios.get<Meta[]>(`${API_BASE_URL}/proximas-vencer?dias=30`, getAuthHeaders());
      return response.data || [];
    } catch (error) {
      handleApiError(error, "Error al obtener metas próximas a vencer");
      return [];
    }
  };

  const fetchGoals = async () => {
    if (!idUsuario) return;
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Meta[]>(API_BASE_URL, getAuthHeaders());
      const metas = response.data || [];
      const upcoming = await fetchUpcomingGoals();
      setGoals({
        active: metas.filter((m) => m.estado !== "terminado"),
        completed: metas.filter((m) => m.estado === "terminado"),
        upcoming
      });
    } catch (error) {
      handleApiError(error, "Error al obtener metas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idUsuario) {
      const load = async () => {
        await fetchGoals();
        await fetchEstadisticas();
      };
      load();
    }
  }, [idUsuario]);

  const handleDeleteGoal = (id: number, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Eliminar Meta',
      message: `¿Estás seguro de eliminar la meta "${title}"? Esta acción no se puede deshacer.`,
      type: 'danger',
      onConfirm: async () => {
        try {
          await axios.delete(`${API_BASE_URL}/${id}`, getAuthHeaders());
          await Promise.all([fetchGoals(), fetchEstadisticas()]);
          showAlert('success', 'Meta eliminada', `La meta "${title}" ha sido eliminada.`);
        } catch (error) {
          handleApiError(error, "Error al eliminar meta");
        }
      }
    });
  };

  const handleChangeStatus = async (id: number, estado: Meta["estado"]) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}/estado`, estado, getAuthHeaders());
      await Promise.all([fetchGoals(), fetchEstadisticas()]);
      showAlert('success', 'Estado actualizado', `Estado actualizado a "${estado}".`);
    } catch (error) {
      handleApiError(error, "Error al actualizar estado");
    }
  };

  const handleAporte = (id: number, title: string) => {
    setInputDialog({
      isOpen: true,
      title: 'Realizar Aporte',
      message: `Ingresa el monto que deseas aportar a la meta "${title}":`,
      placeholder: '0.00',
      onConfirm: async (monto: string) => {
        try {
          const value = parseFloat(monto.replace(/[,$]/g, ''));
          if (isNaN(value) || value <= 0) {
            showAlert('warning', 'Monto inválido', 'Ingresa un valor mayor a 0');
            return;
          }
          await axios.put(`${API_BASE_URL}/${id}/aporte`, value, getAuthHeaders());
          await Promise.all([fetchGoals(), fetchEstadisticas()]);
          showAlert('success', 'Aporte realizado', `Se ha agregado $${value} a tu meta "${title}".`);
        } catch (error) {
          handleApiError(error, "Error al realizar el aporte");
        }
      }
    });
  };

  const handleGoalAdded = async () => {
    await Promise.all([fetchGoals(), fetchEstadisticas()]);
    setShowModal(false);
    showAlert('success', 'Meta creada', 'Tu nueva meta ha sido creada exitosamente.');
  };

  const renderGoals = (): Meta[] => {
    switch (view) {
      case "active": return goals.active;
      case "completed": return goals.completed;
      case "upcoming": return goals.upcoming;
      default: return [];
    }
  };

  if (loading || !idUsuario) {
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <p className="text-gray-400 text-lg">Cargando metas...</p>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
        {alerts.map(alert => (
          <AlertComponent key={alert.id} alert={alert} onClose={removeAlert} />
        ))}
      </div>

      <ConfirmDialog {...confirmDialog} onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))} />
      <InputDialog {...inputDialog} onClose={() => setInputDialog(prev => ({ ...prev, isOpen: false }))} />

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-200 p-4 rounded-lg mb-4 shadow-sm">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <p className="font-semibold">Error</p>
            <button onClick={() => setError(null)} className="ml-auto text-red-300 hover:text-red-100">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <div className="text-white font-semibold text-base">
          {estadisticas?.totalMetas || 0} metas activas por un total de
          <span className="text-[#38bdf8] font-bold ml-1">
            ${estadisticas?.totalObjetivo?.toLocaleString() || 0}
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-500 transition-colors shadow-sm"
        >
          + Nueva Meta
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div >
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <AddNewGoal onCancel={() => setShowModal(false)} idUsuario={idUsuario} onGoalAdded={handleGoalAdded} />
          </div>
        </div>
      )}

      <GoalStats stats={estadisticas} goals={goals} />
      <GoalTabs view={view} onChange={setView} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderGoals().length > 0 ? renderGoals().map(goal => (
          <GoalCard
            key={goal.idMeta}
            goal={goal}
            onDelete={handleDeleteGoal}
            onAporte={handleAporte}
            onChangeStatus={handleChangeStatus}
          />
        )) : (
          <div className="col-span-full text-center text-gray-400 py-10">
            {view === "active" && "No tienes metas activas."}
            {view === "completed" && "No tienes metas completadas."}
            {view === "upcoming" && "No tienes metas próximas a vencer."}
          </div>
        )}
      </div>
    </>
  );
}