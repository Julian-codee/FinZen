import { Card } from "./Card";
import { Estadisticas, GoalsState } from "../Types/types";

interface Props {
  stats: Estadisticas | null;
  goals: GoalsState;
}

export function GoalStats({ stats, goals }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card
        title="Metas Activas"
        value={goals.active.length.toString()}
        subtitle="Total de metas en progreso"
      />
      <Card
        title="Progreso General"
        value={`${stats?.porcentajeCompletado?.toFixed(2) || 0}%`}
        subtitle={`$${stats?.totalAhorrado?.toLocaleString() || 0} de $${stats?.totalObjetivo?.toLocaleString() || 0}`}
        progress
      />
      <Card
        title="Metas Completadas"
        value={stats?.metasCompletadas?.toString() || "0"}
        subtitle="En los últimos 6 meses"
      />
      <Card
        title="Próximas Metas"
        value={goals.upcoming.length.toString()}
        subtitle="Programadas para iniciar"
      />
    </div>
  );
}
