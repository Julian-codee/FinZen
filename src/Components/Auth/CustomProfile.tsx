"use client"

import { useState } from "react"
import { CheckCircle, Rocket, Users, Briefcase, HeartHandshakeIcon, Settings, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useRegister } from "./RegisterContext"
import { showErrorAlert } from "../Ui/Alerts/Alerts"
import UserDetailsForm from "./UserDeatailsForm"
import { Hero } from "./Hero"

type ProfileType = "padre_de_familia" | "joven_profesional" | "emprendedor" | "jubilado" | "personalizado" | ""

const profileOptions = [
  {
    id: "padre_de_familia",
    icon: <Users className="w-11 h-11 p-[0.7rem] text-blue-400 bg-blue-400/20 rounded-2xl" />,
    title: "Padre de familia",
    description: "Gestiona finanzas familiares, gastos del hogar y ahorro para educación",
  },
  {
    id: "joven_profesional",
    icon: <Briefcase className="w-11 h-11 p-[0.7rem] text-purple-400 bg-purple-500/20 rounded-2xl" />,
    title: "Joven Profesional",
    description: "Optimiza tu presupuesto, controla gastos y planifica inversiones iniciales",
  },
  {
    id: "emprendedor",
    icon: <Rocket className="w-11 h-11 p-[0.7rem] text-yellow-400 bg-amber-600/30 rounded-2xl" />,
    title: "Emprendedor",
    description: "Separa finanzas personales y de negocio, gestiona flujo de caja",
  },
  {
    id: "jubilado",
    icon: <HeartHandshakeIcon className="w-11 h-11 p-[0.7rem] text-green-400 bg-green-400/20 rounded-2xl" />,
    title: "Jubilado",
    description: "Administra pensiones, optimiza gastos fijos y planifica herencias",
  },
  {
    id: "personalizado",
    icon: <Settings className="w-11 h-11 p-[0.7rem] text-gray-400 bg-gray-400/20 rounded-2xl" />,
    title: "Perfil Personalizado",
    description: "Configura Finzen según tus necesidades financieras específicas",
  },
]

export default function SimplifiedProfileSelector() {
  const [selected, setSelected] = useState<ProfileType>("")
  const [showHeroForm, setShowHeroForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { updateRegisterData } = useRegister()

  const handleContinue = async () => {
    if (!selected) {
      showErrorAlert("Por favor selecciona un tipo de usuario")
      return
    }

    setIsLoading(true)
    try {
      updateRegisterData({ tipoPersona: selected })

      if (selected === "personalizado") {
        navigate("/Hero")
      }
    } catch (error: any) {
      showErrorAlert(error.message || "Error al registrar el usuario")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setShowHeroForm(false)
  }

  if (showHeroForm && selected === "personalizado") {
    return <Hero onBack={handleBack} />
  }

  if (UserDetailsForm && selected && selected !== "personalizado") {
    return <UserDetailsForm userType={selected} onBack={handleBack} />
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-center">¿Qué tipo de usuario eres?</h1>
      <p className="text-gray-400 mb-10 text-center max-w-xl text-sm sm:text-md">
        Personaliza tu experiencia en Finzen seleccionando el perfil que mejor se adapte a tus necesidades financieras.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl px-2 mb-10">
        {profileOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id as ProfileType)}
            className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 ${
              selected === option.id
                ? "border-sky-500 bg-[#1E2530]"
                : "border-slate-500/30 hover:border-blue-500/50 bg-[#020817]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>{option.icon}</div>
              {selected === option.id && <CheckCircle className="text-blue-500 w-5 h-5" />}
            </div>
            <h2 className="text-base sm:text-lg font-semibold">{option.title}</h2>
            <p className="text-sm text-gray-400 mt-1">{option.description}</p>
          </div>
        ))}
      </div>

      <button
        className={`w-full max-w-xs sm:max-w-sm bg-blue-500 hover:bg-blue-600 transition px-10 py-3 rounded-md text-white font-semibold text-sm sm:text-base ${
          isLoading || !selected ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleContinue}
        disabled={isLoading || !selected}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
            Procesando...
          </>
        ) : (
          "Continuar →"
        )}
      </button>
    </div>
  )
}
