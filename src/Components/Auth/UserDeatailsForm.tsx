/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { DollarSign, Target, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "./RegisterContext";
import { showErrorAlert } from "../Ui/Alerts/Alerts";

interface UserDetailsFormProps {
  userType: string;
  onBack: () => void;
}

export default function UserDetailsForm({ userType, onBack }: UserDetailsFormProps) {
  const [ingresos, setIngresos] = useState("");
  const [meta, setMeta] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateRegisterData, submitRegister } = useRegister();

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    // Evita formatear un string vacío a "0"
    if (!numericValue) return "";
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleIngresosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setIngresos(rawValue);
  };

  const handleMetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setMeta(rawValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ingresoMensualValue = Number(ingresos);
    const metaActualValue = Number(meta);

    if (isNaN(ingresoMensualValue) || ingresoMensualValue <= 0) {
      showErrorAlert("Por favor ingresa un monto válido y positivo para tus ingresos mensuales.");
      return;
    }

    if (isNaN(metaActualValue) || metaActualValue <= 0) {
      showErrorAlert("Por favor ingresa un monto válido y positivo para tu meta financiera.");
      return;
    }

    setIsLoading(true);
    try {
      // Actualizar los datos de registro en el contexto
      // Asegúrate de que los nombres de los campos coincidan con RegisterData
      await updateRegisterData({
        ingresoMensual: ingresoMensualValue,
        metaActual: metaActualValue,
        tipoPersona: userType,
      });
      

      // La llamada a submitRegister ahora se hará con los datos actualizados
      await submitRegister();

      navigate("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      showErrorAlert(error.message || "Error al registrar el usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Cuéntanos más sobre ti</h1>
          <p className="text-gray-400">
            Perfil seleccionado:{" "}
            <span className="text-blue-400 font-semibold">{userType}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ¿Cuáles son tus ingresos mensuales?
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formatCurrency(ingresos)}
                onChange={handleIngresosChange}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 bg-[#1E2530] border border-slate-500/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                COP
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ¿Cuál es el monto de tu meta financiera?
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formatCurrency(meta)}
                onChange={handleMetaChange}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 bg-[#1E2530] border border-slate-500/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                COP
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg text-white font-semibold ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
                Creando cuenta...
              </>
            ) : (
              "Completar Registro"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}