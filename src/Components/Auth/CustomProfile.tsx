// src/components/CustomProfile.tsx
import { useState } from "react";
import { CheckCircle, Rocket, Users, Briefcase, HeartHandshakeIcon, Settings } from "lucide-react";

type ProfileType = "padre" | "joven" | "emprendedor" | "jubilado" | "personalizado";

const profileOptions = [
  {
    id: "padre",
    icon: <Users className="w-11.5 h-11 p-[0.7rem] text-blue-400 bg-blue-400/20 rounded-4xl" />,
    title: "Padre de familia",
    description: "Gestiona finanzas familiares, gastos del hogar y ahorro para educación",
  },
  {
    id: "joven",
    icon: <Briefcase className="w-11.5 h-11 p-[0.7rem] text-purple-400 bg-purple-500/20 rounded-4xl" />,
    title: "Joven Profesional",
    description: "Optimiza tu presupuesto, controla gastos y planifica inversiones iniciales",
  },
  {
    id: "emprendedor",
    icon: <Rocket className="w-11.5 h-11 p-[0.7rem] text-yellow-400 bg-amber-600/30 rounded-4xl" />,
    title: "Emprendedor",
    description: "Separa finanzas personales y de negocio, gestiona flujo de caja",
  },
  {
    id: "jubilado",
    icon: <HeartHandshakeIcon className="w-11.5 h-11 p-[0.7rem] text-green-400 bg-green-400/20 rounded-4xl" />,
    title: "Jubilado",
    description: "Administra pensiones, optimiza gastos fijos y planifica herencias",
  },
  {
    id: "personalizado",
    icon: <Settings className="w-11.5 h-11 p-[0.7rem] text-gray-400 bg-gray-400/20 rounded-4xl" />,
    title: "Perfil Personalizado",
    description: "Configura Finzen según tus necesidades financieras específicas",
  },
];

export default function CustomProfile() {
  const [selected, setSelected] = useState<ProfileType>("joven");

  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">¿Qué tipo de usuario eres?</h1>
      <p className="text-gray-400 mb-12 text-center max-w-2xl text-md">
        Personaliza tu experiencia en Finzen seleccionando el perfil que mejor se adapte a tus necesidades financieras.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full mb-8">
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
              <div className="text-blue-300">{option.icon}</div>
              {selected === option.id && <CheckCircle className="text-blue-500 w-5 h-5" />}
            </div>
            <h2 className="text-lg font-semibold">{option.title}</h2>
            <p className="text-sm text-gray-400 mt-1">{option.description}</p>
          </div>
        ))}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600/100 transition px-20 py-2 rounded-md text-white font-semibold"
        onClick={() => console.log("Perfil seleccionado:", selected)}
      >
        Continuar →
      </button>
    </div>
  );
}
