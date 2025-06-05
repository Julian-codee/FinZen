"use client"

import type React from "react"
import { useState } from "react"
import { DollarSign, Target, Loader2, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useRegister } from "./RegisterContext"
import { showErrorAlert } from "../Ui/Alerts/Alerts"

interface UserDetailsFormProps {
  userType: string;
  onBack: () => void;
}

export default function UserDetailsForm({ userType, onBack }: UserDetailsFormProps) {
  const [ingresos, setIngresos] = useState(""); // Valor real
  const [ingresosFormatted, setIngresosFormatted] = useState(""); // Valor formateado
  const [meta, setMeta] = useState(""); // Valor real
  const [metaFormatted, setMetaFormatted] = useState(""); // Valor formateado
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { updateRegisterData, submitRegister } = useRegister()

  const getUserTypeTitle = (type: string) => {
    const titles = {
      padre_de_familia: "Padre de Familia",
      joven_profesional: "Joven Profesional",
      emprendedor: "Emprendedor",
      jubilado: "Jubilado",
      personalizado: "Perfil Personalizado",
    };
    return titles[type as keyof typeof titles] || type;
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleIngresosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setIngresos(rawValue);
    setIngresosFormatted(formatCurrency(rawValue));
  };

  const handleMetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setMeta(rawValue);
    setMetaFormatted(formatCurrency(rawValue));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ingresos.trim()) {
      showErrorAlert("Por favor ingresa tus ingresos mensuales");
      return;
    }

    if (!meta.trim()) {
      showErrorAlert("Por favor ingresa el monto de tu meta financiera");
      return;
    }

    const ingresoMensual = Number(ingresos);
    const metaActual = Number(meta);

    setIsLoading(true)
    try {
      updateRegisterData({
        ingresoMensual,
        metaActual,
        tipoPersona: userType,
        ingresoMensual:ingresoMensual,
        metaActual:metaActual,
      })
      await submitRegister()
      navigate("/dashboard")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration error:", error);
      showErrorAlert(error.message || "Error al registrar el usuario");
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  

  const handleIngresosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Elimina las comas para obtener el valor real
    setIngresos(rawValue); // Actualiza el valor real
    setIngresosFormatted(formatCurrency(rawValue)); // Actualiza el valor formateado
  };

  const handleMetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Elimina las comas para obtener el valor real
    setMeta(rawValue); // Actualiza el valor real
    setMetaFormatted(formatCurrency(rawValue)); // Actualiza el valor formateado
  };

  

  return (
    <>
     {/* <--- CONTENEDOR DEL CARGADOR DE PANTALLA COMPLETA ---> */}
      {Loading && (
        //Loader de pantalla completa

        <div className="fixed inset-0 bg-black/60 bg-opacity-70 flex flex-col items-center justify-center z-[9999]">
          <div className="w-32 h-32 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl animate-pulse"></div>

            <div className="w-full h-full relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm"></div>

              <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-12 bg-cyan-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 h-12 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]"></div>
                  <div className="w-1.5 h-12 bg-indigo-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]"></div>
                  <div className="w-1.5 h-12 bg-purple-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]"></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
              </div>
            </div>

            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-100"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-200"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"></div>
          </div>

          <p className="mt-4 text-white text-lg -top-4">Iniciando sesión...</p>
        </div>
      )}
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
            <span className="text-blue-400 font-semibold">{getUserTypeTitle(userType)}</span>
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
                value={ingresosFormatted}
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
                value={metaFormatted}
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
            disabled={Loading}
            className={`w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg text-white font-semibold ${
              Loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {Loading ? (
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
  )
}