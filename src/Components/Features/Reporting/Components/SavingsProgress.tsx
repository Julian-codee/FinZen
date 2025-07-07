"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definir la interfaz para la estructura de la Meta que viene del backend
interface Meta {
  idMeta: number;
  titulo: string;
  descripcion?: string;
  estado: "creado" | "iniciado" | "terminado";
  valor: number; // Esto es el 'meta' objetivo
  montoAhorrado: number; // Esto es el 'actual'
  idUsuario: number;
  fechaInicio: string;
  fechaLimite?: string;
  enProgreso: boolean;
  icon?: string;
}

// Función auxiliar para obtener los headers de autorización (similar a FinancialGoals.tsx)
// En una aplicación real, esta función debería estar en un módulo de utilidades o contexto de autenticación.
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Aquí solo lanzamos un error que será capturado por el catch, sin redirección explícita.
    throw new Error("Token de autenticación no encontrado");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };
};

const SavingsProgress = () => {
  const [goals, setGoals] = useState<Meta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [idUsuario, setIdUsuario] = useState<number | null>(null); // Para almacenar el ID del usuario

  // Base URL para la API de metas
  const API_BASE_URL = "http://localhost:8080/finzen/metas";
  // Endpoint para obtener el ID del usuario (si es necesario)
  const USER_API_URL = "http://localhost:8080/finzen/usuarios";

  // Función para obtener el ID del usuario autenticado
  // Esta parte es importante si tu endpoint de metas requiere el ID del usuario
  // o si necesitas verificar si hay un usuario logueado antes de intentar cargar metas.
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Asumiendo que esta ruta devuelve el usuario autenticado y su ID
        const response = await axios.get(USER_API_URL, getAuthHeaders());
        setIdUsuario(response.data.idUsuario);
      } catch (err) {
        console.error("Error al obtener el ID del usuario:", err);
        // No establecemos error aquí como un mensaje final, solo para depuración
        // El error de carga de metas se manejará en el siguiente useEffect
        setLoading(false); // Detener la carga si no se puede obtener el ID de usuario
      }
    };
    fetchUserId();
  }, []);

  // Función para obtener las metas del backend
  useEffect(() => {
    const fetchGoals = async () => {
      // Solo intentar cargar metas si tenemos un idUsuario o si el token es suficiente
      // Tu backend usa el token para identificar al usuario, así que el idUsuario del frontend
      // no es estrictamente necesario para la llamada a /finzen/metas, pero lo mantenemos
      // para asegurar que hay un usuario logueado.
      if (idUsuario === null) {
          setLoading(false); // Si no hay usuario, no hay metas que cargar
          setError("No se pudo obtener la información del usuario.");
          return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Meta[]>(
          API_BASE_URL,
          getAuthHeaders()
        );
        // No se filtra por estado aquí para mostrar todas las metas.
        setGoals(response.data);
      } catch (err) {
        console.error("Error al obtener las metas:", err);
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("Sesión expirada. Por favor, inicia sesión nuevamente para ver tus metas.");
        } else {
          setError("Error al cargar tus metas. Intenta de nuevo más tarde.");
        }
      } finally {
        setLoading(false);
      }
    };

    // Llama a fetchGoals una vez que el idUsuario esté disponible
    // O inmediatamente si el token es suficiente para el endpoint de metas sin pre-obtener el ID
    if (idUsuario !== null) {
      fetchGoals();
    }
  }, [idUsuario]); // La dependencia del idUsuario asegura que se cargue una vez que se autentique

  if (loading) {
    return (
      <div className="border border-white/40 rounded-lg p-6 shadow-md text-white flex justify-center items-center h-40">
        Cargando progreso de ahorro...
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-500/40 rounded-lg p-6 shadow-md text-red-400">
        <h2 className="text-lg font-semibold mb-1">Error al cargar</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Mensaje si no hay metas
  if (goals.length === 0) {
    return (
      <div className="border border-white/40 rounded-lg p-6 shadow-md text-white">
        <h2 className="text-lg font-semibold mb-1">Progreso de Ahorro</h2>
        <p className="text-gray-400 text-sm mb-4">
          Seguimiento de tus metas de ahorro
        </p>
        <p className="text-gray-400">No tienes metas de ahorro registradas en este momento.</p>
        {/* Aquí puedes añadir un botón o enlace para crear una meta si lo deseas, pero sin redirección forzada */}
        <p className="text-gray-400 text-sm mt-2">Crea nuevas metas para ver tu progreso aquí.</p>
      </div>
    );
  }

  return (
    <div className="border border-white/40 rounded-lg p-6 shadow-md text-white">
      <h2 className="text-lg font-semibold mb-1">Progreso de Ahorro</h2>
      <p className="text-gray-400 text-sm mb-4">
        Seguimiento de tus metas de ahorro
      </p>

      {goals.map((g) => {
        // Asegurarse de que el cálculo de porcentaje no divida por cero
        const porcentaje = g.valor > 0 ? Math.round((g.montoAhorrado / g.valor) * 100) : 0;
        const restante = g.valor - g.montoAhorrado;

        return (
          <div key={g.idMeta} className="mb-4">
            <div className="flex justify-between items-center text-sm font-medium mb-1">
              <span>{g.titulo}</span>
              <span>${g.montoAhorrado.toLocaleString()} / ${g.valor.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full bg-gray-700 mb-1">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${Math.min(porcentaje, 100)}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-400 mb-2">
              {porcentaje}% completado — ${restante.toLocaleString()} restantes
            </div>
          </div>
        );
      })}

      {/* Aquí podrías poner un enlace a tu página de metas si el usuario quiere ver más,
          pero sin redirección forzada, solo un enlace normal.
          Si no quieres ningún enlace, puedes eliminar esta parte. */}
      <a href="/Goals" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
        Ver todas las metas <span>→</span>
      </a>
    </div>
  );
};

export default SavingsProgress;