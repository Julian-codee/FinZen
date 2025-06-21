import { useState } from "react";
import { Download } from "lucide-react"; // <-- Import Lucide icon

const goals = {
  active: [
    {
      title: "Fondo de emergencia",
      goal: 6000,
      saved: 5100,
      deadline: "Mayo 2024",
      monthly: 300,
      progress: 85,
      icon: "🏦",
    },
    {
      title: "Vacaciones en Europa",
      goal: 8000,
      saved: 3200,
      deadline: "Diciembre 2024",
      monthly: 500,
      progress: 40,
      icon: "✈️",
    },
    {
      title: "Entrada para vivienda",
      goal: 25000,
      saved: 12500,
      deadline: "Junio 2025",
      monthly: 1000,
      progress: 50,
      icon: "🏡",
    },
    {
      title: "Nuevo vehículo",
      goal: 15000,
      saved: 3700,
      deadline: "Marzo 2025",
      monthly: 800,
      progress: 25,
      icon: "🚗",
    },
    {
      title: "Maestría en finanzas",
      goal: 12000,
      saved: 0,
      deadline: "Septiembre 2025",
      monthly: 600,
      progress: 0,
      icon: "🎓",
    },
  ],
  completed: [],
  upcoming: [],
};

export default function FinancialGoals() {
  const [view, setView] = useState<"active" | "completed" | "upcoming">(
    "active"
  );

  const renderGoals = () => {
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

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          <span className="text-white">5 metas </span>
          <span className="text-[#38bdf8]">activas</span>
          <span className="text-white"> con un total de </span>
          <span className="text-[#38bdf8]">$66,800</span>
          <span className="text-white"> por ahorrar</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-600 text-white font-semibold rounded px-4 py-2 hover:bg-blue-500">
            + Nueva Meta
          </button>
          <button className="border border-gray-500 px-3 py-2 rounded hover:bg-gray-700">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card
          title="Metas Activas"
          value="5"
          subtitle="Total de metas en progreso"
        />
        <Card
          title="Progreso General"
          value="45%"
          subtitle="$30,500 de $66,800"
          progress
        />
        <Card
          title="Metas Completadas"
          value="2"
          subtitle="En los últimos 6 meses"
        />
        <Card
          title="Próximas Metas"
          value="2"
          subtitle="Programadas para iniciar"
        />
        <div></div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setView("active")}
          className={`px-4 py-2 rounded mr-2 ${
            view === "active" ? "bg-blue-700" : "bg-gray-800"
          }`}
        >
          Activas
        </button>
        <button
          onClick={() => setView("completed")}
          className={`px-4 py-2 rounded mr-2 ${
            view === "completed" ? "bg-blue-700" : "bg-gray-800"
          }`}
        >
          Completadas
        </button>
        <button
          onClick={() => setView("upcoming")}
          className={`px-4 py-2 rounded ${
            view === "upcoming" ? "bg-blue-700" : "bg-gray-800"
          }`}
        >
          Próximas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderGoals().length > 0 ? (
          renderGoals().map((goal, i) => (
            <div
              key={i}
              className="bg-[#1e293b] rounded-md p-4 shadow-lg border border-indigo-600/60"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl">
                  {goal.icon} {goal.title}
                </span>
                <span className="text-gray-400 text-sm">
                  Meta: ${goal.goal.toLocaleString()}
                </span>
              </div>
              <div className="text-2xl font-bold">
                ${goal.saved.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 mb-2">
                Progreso {goal.progress}%
              </div>
              <div className="w-full bg-gray-700 h-2 rounded">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
                <span>Fecha límite: {goal.deadline}</span>
                <span>${goal.monthly}/mes</span>
              </div>
              <button className="w-full mt-3 py-1 bg-gray-800 rounded text-sm hover:bg-gray-700">
                Actualizar progreso
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-400">No hay metas para mostrar.</div>
        )}
      </div>
    </>
  );
}

function Card({
  title,
  value,
  subtitle,
  progress,
}: {
  title: string;
  value: string;
  subtitle: string;
  progress?: boolean;
}) {
  return (
    <div className="bg-[#1e293b] p-4 rounded-md shadow-lg border border-gray-700">
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <div className="text-2xl font-bold">{value}</div>
      {progress ? (
        <div className="mt-2">
          <div className="w-full bg-gray-700 h-2 rounded">
            <div
              className="bg-yellow-400 h-2 rounded"
              style={{ width: value }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-400 mt-1">{subtitle}</div>
      )}
    </div>
  );
}
