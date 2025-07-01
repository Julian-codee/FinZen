import { useState, useEffect } from "react";
import { Login } from "./Login";
import { AuthBackground } from "../../assets/Backgrounds/Auht-background";
import {
  LucideCreditCard,
  LucidePieChart,
  LucideSmartphone,
  LucideShield,
  LucideTrendingUp,
  LucideDollarSign,
  LucideCheck,
  LucideChartColumnIncreasing,
} from "lucide-react";

const slides = [
  {
    title: "Gestión de cuentas unificada",
    description:
      "Conecta todas tus cuentas bancarias, tarjetas e inversiones en un solo lugar para una visión completa.",
    icon: <LucideCreditCard className="w-6 h-6 text-purple-500" />,
  },
  {
    title: "Presupuestos inteligentes",
    description:
      "Crea presupuestos automáticos, ajustados a tus hábitos, para tomar mejores decisiones financieras.",
    icon: <LucidePieChart className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Acceso Móvil Completo",
    description:
      "Consulta saldos, realiza transferencias y gestiona tu dinero desde cualquier lugar, sin interrupciones.",
    icon: <LucideSmartphone className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "Seguimiento Financiero En Tiempo Real",
    description:
      "Monitorea cada movimiento de tu dinero al instante, sin retrasos y con notificaciones en tiempo real.",
    icon: <LucideTrendingUp className="w-6 h-6 text-green-500" />,
  },
  {
    title: "Seguridad A Nivel Bancario",
    description:
      "Protege tus finanzas con tecnología avanzada, cifrado de datos y acceso seguro en todo momento.",
    icon: <LucideShield className="w-6 h-6 text-red-500" />,
  },
];

export const AuthPage = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto">
      <AuthBackground mode="login" theme="dark" />

      <div className="relative z-20 h-full flex flex-col md:flex-row">
        {/* LADO IZQUIERDO */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 md:ml-14 py-10 md:py-0">
          <span className="text-sm bg-opacity-10 rounded-full px-4 py-1 w-fit mb-4 font-medium backdrop-blur border border-indigo-400/80 text-indigo-400 bg-indigo-700/20">
            La plataforma financiera del futuro
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white mt-3">
            Finzen
          </h1>
          <p className="text-base md:text-lg mb-10 max-w-md text-white">
            Tu asistente financiero personal impulsado por inteligencia
            artificial
          </p>

          {/* SLIDER */}
          <div className="bg-gray-600/30 border border-amber-50/20 backdrop-blur-sm bg-opacity-10 rounded-2xl p-6 w-full max-w-md h-auto flex flex-col items-center">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                {slides[current].icon}
              </div>
              <h2 className="text-white font-semibold text-center">
                {slides[current].title}
              </h2>
            </div>
            <p className="text-sm text-white/70 text-center mt-2.5">
              {slides[current].description}
            </p>

            {/* Indicadores */}
            <div className="flex gap-2 mt-6 justify-center">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2 h-2 rounded-full ${
                    current === idx ? "bg-white" : "bg-white/30"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Destacados */}
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mt-10 text-center">
            <div className="bg-gray-600/30 border border-amber-50/20 backdrop-blur-xs bg-opacity-10 w-full rounded-2xl p-6 flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-green-700/25 flex items-center justify-center text-center mb-4">
                <LucideDollarSign className="w-5 h-5 text-green-500" />
              </div>
              <h4 className="text-sm">
                <span className="text-white font-semibold">
                  Ahorra Hasta Un 30%
                </span>
              </h4>
              <p className="text-sm text-white/50 mt-2">
                Con nuestras recomendaciones personalizadas
              </p>
            </div>

            <div className="bg-gray-600/30 border border-amber-50/20 backdrop-blur-xs bg-opacity-10 w-full rounded-2xl p-6 flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-yellow-700/25 flex items-center justify-center mb-4">
                <LucideChartColumnIncreasing className="w-6 h-6 text-yellow-500" />
              </div>
              <h4 className="text-sm">
                <span className="text-white font-semibold">
                  +15M de usuarios activos
                </span>
              </h4>
              <p className="text-sm text-white/50 mt-2">
                Confían en Finzen para sus finanzas
              </p>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mt-8 text-sm text-white/90 space-y-2 max-w-md">
            <p>+15,000 personas se unieron esta semana</p>
            <div className="flex flex-wrap gap-1.5 text-xs text-white/80 mt-1">
              <div className="flex items-center gap-1">
                <LucideCheck className="w-3 h-3 text-green-400 border border-green-600 rounded-full" />
                <span>Configurado en 2 minutos</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideCheck className="w-3 h-3 text-green-400 border border-green-600 rounded-full" />
                <span>Prueba de 30 Días Gratis</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideCheck className="w-3 h-3 text-green-400 border border-green-600 rounded-full" />
                <span>Cancela en cualquier momento</span>
              </div>
            </div>
          </div>
        </div>

        {/* LADO DERECHO (Formulario) */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-10 mt-10 md:mt-0">
          <Login />
        </div>
      </div>
    </div>
  );
};
