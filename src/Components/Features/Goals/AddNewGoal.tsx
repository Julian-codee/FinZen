import { useState } from "react";
import { addMonths, addYears, format } from "date-fns";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import {
  UtensilsCrossed,
  ShoppingCart,
  Home,
  Car,
  Gamepad2,
  Zap,
  Coffee,
  Heart,
  Pizza,
  Wifi,
  Phone,
  GraduationCap,
  PartyPopper,
  Music,
  Plus,
} from "lucide-react";

const categories = [
  {
    id: 1,
    ide: "comida",
    name: "Comida",
    icon: <UtensilsCrossed className="w-4 h-4" />,
    textColor: "text-[#EA580C]",
  },
  {
    id: 2,
    ide: "supermercado",
    name: "Supermercado",
    icon: <ShoppingCart className="w-4 h-4" />,
    textColor: "text-[#059669]",
  },
  {
    id: 3,
    ide: "vivienda",
    name: "Vivienda",
    icon: <Home className="w-4 h-4" />,
    textColor: "text-[#2563EB]",
  },
  {
    id: 4,
    ide: "transporte",
    name: "Transporte",
    icon: <Car className="w-4 h-4" />,
    textColor: "text-[#3B82F6]",
  },
  {
    id: 5,
    ide: "entretenimiento",
    name: "Entretenimiento",
    icon: <Gamepad2 className="w-4 h-4" />,
    textColor: "text-[#9333EA]",
  },
  {
    id: 6,
    ide: "servicios",
    name: "Servicios",
    icon: <Zap className="w-4 h-4" />,
    textColor: "text-[#D97706]",
  },
  {
    id: 7,
    ide: "cafe",
    name: "Café",
    icon: <Coffee className="w-4 h-4" />,
    textColor: "text-[#92400E]",
  },
  {
    id: 8,
    ide: "salud",
    name: "Salud",
    icon: <Heart className="w-4 h-4" />,
    textColor: "text-[#DC2626]",
  },
  {
    id: 9,
    ide: "restaurante",
    name: "Restaurante",
    icon: <Pizza className="w-4 h-4" />,
    textColor: "text-[#EA580C]",
  },
  {
    id: 10,
    ide: "internet",
    name: "Internet",
    icon: <Wifi className="w-4 h-4" />,
    textColor: "text-[#3B82F6]",
  },
  {
    id: 11,
    ide: "telefono",
    name: "Teléfono",
    icon: <Phone className="w-4 h-4" />,
    textColor: "text-[#9333EA]",
  },
  {
    id: 12,
    ide: "educacion",
    name: "Educación",
    icon: <GraduationCap className="w-4 h-4" />,
    textColor: "text-[#059669]",
  },
  {
    id: 13,
    ide: "ocio",
    name: "Ocio",
    icon: <PartyPopper className="w-4 h-4" />,
    textColor: "text-[#DC2626]",
  },
  {
    id: 14,
    ide: "musica",
    name: "Música",
    icon: <Music className="w-4 h-4" />,
    textColor: "text-[#9333EA]",
  },
  {
    id: 15,
    ide: "otros",
    name: "Otros",
    icon: <Plus className="w-4 h-4" />,
    textColor: "text-[#6B7280]",
  },
];

export const AddNewGoal = () => {
  const [nombreMeta, setNombreMeta] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    number | null
  >(null);
  const [montoObjetivo, setMontoObjetivo] = useState("");
  const [montoInicial, setMontoInicial] = useState("");
  const [montoAporte, setMontoAporte] = useState("");
  const [frecuencia, setFrecuencia] = useState("Mensual");
  const [fechaObjetivo, setFechaObjetivo] = useState<Date | undefined>();
  const [opcionFecha, setOpcionFecha] = useState("");
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const formatDate = () =>
    fechaObjetivo
      ? format(fechaObjetivo, "d MMMM yyyy", { locale: es })
      : "Selecciona una fecha";

  const handleFechaChange = (value: string) => {
    setOpcionFecha(value);
    setMostrarCalendario(false);
    const now = new Date();

    const fechas: { [key: string]: Date } = {
      "3m": addMonths(now, 3),
      "6m": addMonths(now, 6),
      "9m": addMonths(now, 9),
      "1a": addYears(now, 1),
      "2a": addYears(now, 2),
      "5a": addYears(now, 5),
      "10a": addYears(now, 10),
    };

    if (value === "personalizada") {
      setFechaObjetivo(undefined);
    } else {
      setFechaObjetivo(fechas[value]);
    }
  };

  return (
    <div className="bg-[#0f172a] text-white p-6 rounded-lg max-w-xl w-full mx-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-1">Crear Nueva Meta Financiera</h2>
      <p className="text-gray-400 mb-6">
        Define una nueva meta de ahorro para tu futuro financiero.
      </p>

      {/* Nombre y categoría */}
      <label className="block mb-2 font-medium">Nombre de la meta</label>
      <input
        type="text"
        placeholder="Ej: Fondo de emergencia"
        value={nombreMeta}
        onChange={(e) => setNombreMeta(e.target.value)}
        className="w-full p-2 mb-4 rounded-md bg-[#020817] border border-white/30 text-gray-200"
      />

      {/*Categoria*/}

      <label className="block mb-2 font-medium">Categoría</label>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaSeleccionada(cat.id)}
            className={`flex flex-col items-center p-3 rounded-md transition hover:scale-105 border border-white/20 text-sm ${
              categoriaSeleccionada === cat.id ? "" : "bg-[#1e293b]"
            }`}
          >
            <div className={`mb-1 ${cat.textColor}`}>{cat.icon}</div>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Montos */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">Monto objetivo</label>
          <input
            type="number"
            placeholder="$ 0.00"
            value={montoObjetivo}
            onChange={(e) => setMontoObjetivo(e.target.value)}
            className="w-full p-2 rounded-md bg-[#020817] border border-white/30 text-gray-200"
          />
        </div>
        <div>
          <label className="block mb-2">Monto inicial (opcional)</label>
          <input
            type="number"
            placeholder="$ 0"
            value={montoInicial}
            onChange={(e) => setMontoInicial(e.target.value)}
            className="w-full p-2 rounded-md bg-[#020817] border border-white/30 text-gray-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">Monto de aporte</label>
          <input
            type="number"
            placeholder="$ 0.00"
            value={montoAporte}
            onChange={(e) => setMontoAporte(e.target.value)}
            className="w-full p-2 rounded-md bg-[#020817] border border-white/30 text-gray-200"
          />
        </div>
        <div>
          <label className="block mb-2">Frecuencia de aporte</label>
          <select
            value={frecuencia}
            onChange={(e) => setFrecuencia(e.target.value)}
            className="w-full p-2 rounded-md bg-[#020817] border border-white/30 text-gray-200"
          >
            <option value="Mensual">Mensual</option>
            <option value="Quincenal">Quincenal</option>
            <option value="Semanal">Semanal</option>
          </select>
        </div>
      </div>

      {/* Fecha objetivo */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Fecha objetivo</label>
        <select
          value={opcionFecha}
          onChange={(e) => handleFechaChange(e.target.value)}
          className="w-full p-2 rounded-md bg-[#020817] border border-white/30 text-gray-200 mb-2"
        >
          <option value="">Selecciona una opción</option>
          <option value="3m">3 meses</option>
          <option value="6m">6 meses</option>
          <option value="9m">9 meses</option>
          <option value="1a">1 año</option>
          <option value="2a">2 años</option>
          <option value="5a">5 años</option>
          <option value="10a">10 años</option>
          <option value="personalizada">Fecha personalizada</option>
        </select>

        {opcionFecha === "personalizada" && (
          <>
            <input
              type="text"
              value={fechaObjetivo ? formatDate() : ""}
              placeholder="Selecciona una fecha"
              readOnly
              onClick={() => setMostrarCalendario(!mostrarCalendario)}
              className="w-full p-2 mb-2 rounded-md bg-[#020817] border border-white/30 text-gray-200 cursor-pointer"
            />

            {mostrarCalendario && (
              <div className="p-4 rounded-md bg-[#1e293b] border border-white/20">
                <DayPicker
                  mode="single"
                  selected={fechaObjetivo}
                  onSelect={(date) => {
                    setFechaObjetivo(date);
                    setMostrarCalendario(false);
                  }}
                  locale={es}
                  modifiersClassNames={{
                    selected: "bg-blue-600 text-white",
                    today: "border border-white",
                  }}
                  className="text-white"
                  styles={{
                    caption: { color: "#fff" },
                    head_cell: { color: "#cbd5e1" },
                    day: { padding: "0.5rem", margin: "0.25rem" },
                    months: { justifyContent: "center" },
                  }}
                />
              </div>
            )}
          </>
        )}

        {fechaObjetivo && opcionFecha !== "personalizada" && (
          <p className="text-sm text-gray-300 mt-2">
            Fecha seleccionada:{" "}
            <span className="text-white">{formatDate()}</span>
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600">
          Cancelar
        </button>
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500">
          Crear meta
        </button>
      </div>
    </div>
  );
};
