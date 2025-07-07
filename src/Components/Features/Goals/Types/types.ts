// types.ts

export interface Meta {
    idMeta: number;
    titulo: string;
    descripcion?: string;
    estado: "creado" | "iniciado" | "terminado";
    valor: number;
    montoAhorrado: number;
    idUsuario: number;
    fechaInicio: string;
    fechaLimite?: string;
    enProgreso: boolean;
    icon?: string;
  }
  
  export interface Estadisticas {
    totalMetas: number;
    totalObjetivo: number;
    totalAhorrado: number;
    porcentajeCompletado: number;
    metasCompletadas: number;
  }
  
  export interface GoalsState {
    active: Meta[];
    completed: Meta[];
    upcoming: Meta[];
  }
  
  export interface CardProps {
    title: string;
    value: string;
    subtitle: string;
    progress?: boolean;
  }
  
  export interface Alert {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
  }