import { useState, useEffect } from "react";
import { AuthBackground } from "../../assets/Backgrounds/Auht-background";
import {
  LucideCreditCard,
  LucidePieChart,
  LucideSmartphone,
  LucideShield,
  LucideTrendingUp
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
  }
];

export const Login = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AuthBackground mode="login" theme="dark" />

      <div className="relative z-20 h-full flex">
        {/* LADO IZQUIERDO */}
        <div className="w-1/2 flex flex-col justify-center px-16 text-white">
          <span className="text-sm bg-white bg-opacity-10 rounded-full px-4 py-1 w-fit mb-4 font-medium">
            La plataforma financiera del futuro
          </span>

          <h1 className="text-5xl font-bold mb-4">Finzen</h1>
          <p className="text-lg mb-10 max-w-md">
            Tu asistente financiero personal impulsado por inteligencia
            artificial
          </p>

          {/* SLIDER */}
          <div className="bg-white/10 backdrop-blur-xs bg-opacity-10 rounded-2xl p-6 max-w-md">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                {slides[current].icon}
              </div>
              <h2 className="text-white font-semibold">
                {slides[current].title}
              </h2>
            </div>
            <p className="text-sm text-gray-200">
              {slides[current].description}
            </p>

            {/* Indicadores */}
            <div className="flex gap-2 mt-4 justify-center">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    current === idx ? "bg-white" : "bg-white/30"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mt-8 text-sm text-white/90 space-y-2">
            <p>+15,000 personas se unieron esta semana</p>
            <div className="flex flex-wrap gap-4 text-xs text-white/80">
              <span>✅ Configuración en 2 minutos</span>
              <span>✅ Prueba gratuita de 30 días</span>
              <span>✅ Cancelación en cualquier momento</span>
            </div>
          </div>
        </div>

        {/* LADO DERECHO (Formulario) */}
        <div className="w-1/2 flex items-center justify-center px-10">
          <div className="w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
            {/* Aquí va tu formulario de login/registro */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Iniciar sesión
            </h2>
            {/* ...formulario aquí */}
          </div>
        </div>
      </div>
    </div>
  );
};
